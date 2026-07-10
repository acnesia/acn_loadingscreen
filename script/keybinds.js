/**
 * ===============================================
 * KEYBINDS PAGE - Interactive Keyboard JS v2
 * With shared audio and tooltip on hover only
 * ===============================================
 */

// ===============================================
// STATE
// ===============================================
let state = {
    currentSongIndex: 0,
    isMuted: false,
    volume: 0.3
};

// ===============================================
// DOM ELEMENTS
// ===============================================
const elements = {
    audio: null,
    songName: null,
    muteText: null,
    playerVisualizer: null,
    progressFill: null,
    statusText: null
};

// ===============================================
// INITIALIZATION
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    initializeKeyboard();
    initializeCategoryFilters();
    initializeTooltip();
    initializeAudio();
    initializeLoadingBar();
});

function initializeElements() {
    elements.audio = document.getElementById('loading');
    elements.songName = document.getElementById('songname');
    elements.muteText = document.getElementById('muteText');
    elements.playerVisualizer = document.getElementById('playerVisualizer');
    elements.progressFill = document.getElementById('progressFill');
    elements.statusText = document.getElementById('statusText');
}

// ===============================================
// KEYBOARD INITIALIZATION
// ===============================================
function initializeKeyboard() {
    const keys = document.querySelectorAll('.key');
    const keybindsConfig = LOADING_CONFIG.keybinds.keys;

    keys.forEach(keyElement => {
        const keyId = keyElement.dataset.key;
        const keyConfig = keybindsConfig.find(k => k.key === keyId);

        if (keyConfig) {
            // Mark key as having an action
            keyElement.classList.add('has-action');
            keyElement.classList.add(`category-${keyConfig.category}`);

            // Store config data
            keyElement.dataset.name = keyConfig.name;
            keyElement.dataset.description = keyConfig.description;
            keyElement.dataset.category = keyConfig.category;
            keyElement.dataset.icon = keyConfig.icon || '🎮';

            // Add event listeners for tooltip only
            keyElement.addEventListener('mouseenter', handleKeyHover);
            keyElement.addEventListener('mouseleave', handleKeyLeave);
            keyElement.addEventListener('mousemove', handleKeyMove);
        }
    });
}

// ===============================================
// KEY HOVER HANDLERS - Tooltip Only
// ===============================================
function handleKeyHover(event) {
    const key = event.currentTarget;

    if (!key.classList.contains('has-action')) return;

    // Show tooltip
    showTooltip(event, key);

    // Add active class
    key.classList.add('active');
}

function handleKeyLeave(event) {
    const key = event.currentTarget;

    // Hide tooltip
    hideTooltip();

    // Remove active class
    key.classList.remove('active');
}

function handleKeyMove(event) {
    positionTooltip(event);
}

// ===============================================
// TOOLTIP
// ===============================================
function initializeTooltip() {
    // Tooltip already exists in HTML
}

function showTooltip(event, key) {
    const tooltip = document.getElementById('keyTooltip');
    const category = LOADING_CONFIG.keybinds.categories.find(c => c.id === key.dataset.category);

    // Update tooltip content
    document.getElementById('tooltipIcon').textContent = key.dataset.icon;
    document.getElementById('tooltipName').textContent = key.dataset.name;
    document.getElementById('tooltipDesc').textContent = key.dataset.description;

    const categoryEl = document.getElementById('tooltipCategory');
    categoryEl.textContent = `${category?.icon || ''} ${category?.name || key.dataset.category}`;
    categoryEl.style.background = category?.color || 'var(--primary)';

    // Position and show
    positionTooltip(event);
    tooltip.classList.add('visible');
}

function hideTooltip() {
    const tooltip = document.getElementById('keyTooltip');
    tooltip.classList.remove('visible');
}

function positionTooltip(event) {
    const tooltip = document.getElementById('keyTooltip');
    const padding = 20;

    let x = event.clientX + padding;
    let y = event.clientY + padding;

    // Get tooltip dimensions
    const tooltipRect = tooltip.getBoundingClientRect();

    // Prevent tooltip from going off right edge
    if (x + tooltipRect.width > window.innerWidth - 20) {
        x = event.clientX - tooltipRect.width - padding;
    }

    // Prevent tooltip from going off bottom edge
    if (y + tooltipRect.height > window.innerHeight - 20) {
        y = event.clientY - tooltipRect.height - padding;
    }

    // Prevent going off left edge
    if (x < 20) {
        x = 20;
    }

    // Prevent going off top edge
    if (y < 20) {
        y = 20;
    }

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

// ===============================================
// CATEGORY FILTERS
// ===============================================
function initializeCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    const categories = LOADING_CONFIG.keybinds.categories;

    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.category = category.id;
        btn.innerHTML = `${category.icon} ${category.name}`;
        btn.style.setProperty('--category-color', category.color);

        btn.addEventListener('click', () => filterByCategory(category.id));
        container.appendChild(btn);
    });

    // "All" button listener
    document.querySelector('.filter-btn[data-category="all"]').addEventListener('click', () => filterByCategory('all'));
}

function filterByCategory(categoryId) {
    const keys = document.querySelectorAll('.key');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Update active button
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === categoryId);
    });

    // Filter keys
    keys.forEach(key => {
        if (categoryId === 'all') {
            key.classList.remove('filtered-out');
            if (key.classList.contains('has-action')) {
                key.classList.add('filtered-in');
                setTimeout(() => key.classList.remove('filtered-in'), 500);
            }
        } else {
            if (key.dataset.category === categoryId) {
                key.classList.remove('filtered-out');
                key.classList.add('filtered-in');
                setTimeout(() => key.classList.remove('filtered-in'), 500);
            } else {
                key.classList.add('filtered-out');
            }
        }
    });
}

// ===============================================
// AUDIO FUNCTIONS (Shared with main page)
// ===============================================
function initializeAudio() {
    if (!elements.audio) return;

    const songs = LOADING_CONFIG.songs || [];
    if (songs.length === 0) return;

    // Set random initial song
    state.currentSongIndex = getRandomInt(0, songs.length - 1);
    setSong(state.currentSongIndex);

    // Set initial volume
    elements.audio.volume = state.volume;

    // Handle autoplay
    elements.audio.play().catch(() => {
        console.log('Autoplay blocked');
    });

    // Keyboard controls
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

function setSong(index) {
    const songs = LOADING_CONFIG.songs || [];
    const song = songs[index];
    if (!song || !elements.audio) return;

    elements.audio.src = song.file;

    if (elements.songName) {
        elements.songName.style.opacity = '0';
        setTimeout(() => {
            elements.songName.textContent = song.name;
            elements.songName.style.opacity = '1';
        }, 200);
    }

    if (!state.isMuted) {
        elements.audio.play().catch(console.log);
    }
}

function nextSong() {
    const songs = LOADING_CONFIG.songs || [];
    state.currentSongIndex = (state.currentSongIndex + 1) % songs.length;
    setSong(state.currentSongIndex);
}

function previousSong() {
    const songs = LOADING_CONFIG.songs || [];
    state.currentSongIndex = (state.currentSongIndex - 1 + songs.length) % songs.length;
    setSong(state.currentSongIndex);
}

function toggleMute() {
    if (!elements.audio) return;

    state.isMuted = !state.isMuted;

    if (state.isMuted) {
        elements.audio.pause();
        if (elements.muteText) elements.muteText.textContent = 'Unmute';
        if (elements.playerVisualizer) elements.playerVisualizer.classList.add('paused');
    } else {
        elements.audio.play().catch(console.log);
        if (elements.muteText) elements.muteText.textContent = 'Mute';
        if (elements.playerVisualizer) elements.playerVisualizer.classList.remove('paused');
    }
}

function adjustVolume(delta) {
    if (!elements.audio) return;

    state.volume = Math.max(0, Math.min(1, state.volume + delta));
    elements.audio.volume = state.volume;

    showVolumeFeedback();
}

function showVolumeFeedback() {
    const percentage = Math.round(state.volume * 100);

    let indicator = document.querySelector('.volume-indicator');
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.className = 'volume-indicator';
        indicator.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            border-radius: 12px;
            font-size: 1.2rem;
            font-weight: 600;
            color: white;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(indicator);
    }

    indicator.textContent = `🔊 ${percentage}%`;
    indicator.style.opacity = '1';

    clearTimeout(indicator.timeout);
    indicator.timeout = setTimeout(() => {
        indicator.style.opacity = '0';
    }, 1000);
}

// ===============================================
// LOADING BAR
// ===============================================
function initializeLoadingBar() {
    let progress = 0;

    const progressInterval = setInterval(() => {
        progress += Math.random() * 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        if (elements.progressFill) {
            elements.progressFill.style.width = `${progress}%`;
        }
    }, 400);

    // Rotate loading text
    const texts = [
        'CHARGEMENT DES TOUCHES',
        'CONFIGURATION DU CLAVIER',
        'PRÉPARATION DES RACCOURCIS',
        'SYNCHRONISATION EN COURS'
    ];
    let currentText = 0;

    setInterval(() => {
        currentText = (currentText + 1) % texts.length;
        if (elements.statusText) {
            elements.statusText.style.opacity = '0';
            setTimeout(() => {
                elements.statusText.textContent = texts[currentText];
                elements.statusText.style.opacity = '1';
            }, 200);
        }
    }, 3000);
}

// ===============================================
// KEYBOARD CONTROLS
// ===============================================
function handleKeyDown(event) {
    const key = event.which || event.keyCode;

    if (key === 32) { // Spacebar
        event.preventDefault();
        toggleMute();
    }
}

function handleKeyUp(event) {
    const key = event.which || event.keyCode;

    switch (key) {
        case 37: previousSong(); break; // Arrow Left
        case 39: nextSong(); break; // Arrow Right
        case 38: adjustVolume(0.05); break; // Arrow Up
        case 40: adjustVolume(-0.05); break; // Arrow Down
    }

    // Highlight pressed key on virtual keyboard
    const keyMap = {
        ' ': 'Space',
        'Escape': 'Escape',
        'Tab': 'Tab',
        'Shift': 'Shift',
        'Control': 'Ctrl',
        'Alt': 'Alt',
        'Enter': 'Enter',
        'Backspace': 'Backspace',
        'ArrowUp': 'ArrowUp',
        'ArrowDown': 'ArrowDown',
        'ArrowLeft': 'ArrowLeft',
        'ArrowRight': 'ArrowRight'
    };

    let keyId = event.key.toUpperCase();
    if (keyMap[event.key]) keyId = keyMap[event.key];
    if (event.key.startsWith('F') && !isNaN(event.key.slice(1))) keyId = event.key;

    const keyElement = document.querySelector(`.key[data-key="${keyId}"]`);
    if (keyElement) {
        keyElement.classList.add('active');
        setTimeout(() => keyElement.classList.remove('active'), 200);
    }
}

// ===============================================
// UTILITY
// ===============================================
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===============================================
// CONSOLE
// ===============================================
console.log('%c⌨️ Keybinds Page v2.0', 'font-size: 18px; font-weight: bold; color: #6366f1;');
console.log('%cTooltip on hover only - No side panel', 'font-size: 12px; color: #8b5cf6;');
