/**
 * ===============================================
 * MODERN LOADING SCREEN v2.0 (SPA Unified)
 * JavaScript - Audio Control, Real Loading & Dynamic Content
 * ===============================================
 */

// ===============================================
// CONFIGURATION (Fallback si config.js non chargé)
// ===============================================
const CONFIG = typeof LOADING_CONFIG !== 'undefined' ? LOADING_CONFIG : {
    server: {
        name: "Mon Serveur RP",
        logo: "logo/logo.png",
        discordUrl: "#",
        youtubeUrl: "#",
        websiteUrl: "#",
        useVideoBackground: false,
        videoBackground: "",
        imageBackground: "img/background.png"
    },
    songs: [
        { file: 'song/song1.mp3', name: 'Song 1' },
        { file: 'song/song2.mp3', name: 'Song 2' },
        { file: 'song/song3.mp3', name: 'Song 3' }
    ],
    welcomePhrases: [
        'Commencez votre nouvelle aventure passionnante.',
        'Découvrez les merveilles de votre nouvelle ville.',
        'Votre histoire commence ici.'
    ],
    news: { items: [] },
    serverInfo: { items: [] },
    keybinds: { categories: [], keys: [] }
};

const VOLUME_STEP = 0.05;
const DEFAULT_VOLUME = 0.3;
const PARTICLE_COUNT = 50;

// ===============================================
// STATE
// ===============================================
let state = {
    currentSongIndex: 0,
    isMuted: false,
    volume: DEFAULT_VOLUME,
    isKeybindsVisible: false
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
    statusText: null,
    keybindsSongName: null,
    keybindsMuteText: null,
    keybindsPlayerVisualizer: null,
    keybindsProgressFill: null,
    keybindsStatusText: null,
    playerName: null,
    welcomeDisplay: null,
    particles: null,
    infoTooltip: null,
    keyTooltip: null,
    bgContainer: null,
    mainContainer: null,
    keybindsSection: null
};

// ===============================================
// INITIALIZATION
// ===============================================
document.addEventListener('DOMContentLoaded', () => {
    initializeElements();
    loadAudioPreferences();
    initializeBackground();
    initializeAudio();
    initializeWelcome();
    initializeParticles();
    initializeKeyboard();
    initializeCategoryFilters();
    initializeFivemEvents();
    initializeNewsCard();
    initializeServerInfoCard();
    initializeTooltips();
    initializeKeyboardControls();
    initializeStaffCards();
    initializeSocialButtons();
});

function initializeElements() {
    elements.audio = document.getElementById('loading');
    elements.bgContainer = document.getElementById('bgContainer');
    elements.mainContainer = document.querySelector('.main-container');
    elements.keybindsSection = document.getElementById('keybindsSection');
    elements.songName = document.getElementById('songname');
    elements.muteText = document.getElementById('muteText');
    elements.playerVisualizer = document.querySelector('.player-visualizer');
    elements.progressFill = document.getElementById('progressFill');
    elements.statusText = document.getElementById('statusText');
    elements.keybindsSongName = document.getElementById('keybindsSongname');
    elements.keybindsMuteText = document.getElementById('keybindsMuteText');
    elements.keybindsPlayerVisualizer = document.getElementById('keybindsPlayerVisualizer');
    elements.keybindsProgressFill = document.getElementById('keybindsProgressFill');
    elements.keybindsStatusText = document.getElementById('keybindsStatusText');
    elements.playerName = document.getElementById('playerName');
    elements.welcomeDisplay = document.getElementById('welcomeDisplay');
    elements.particles = document.getElementById('particles');
    elements.infoTooltip = document.getElementById('infoTooltip');
    elements.keyTooltip = document.getElementById('keyTooltip');
}

// ===============================================
// AUDIO PREFERENCES (LocalStorage)
// ===============================================
function loadAudioPreferences() {
    const savedVolume = localStorage.getItem('loading_volume');
    const savedMuted = localStorage.getItem('loading_muted');
    if (savedVolume !== null) state.volume = parseFloat(savedVolume);
    if (savedMuted !== null) state.isMuted = (savedMuted === 'true');
}

// ===============================================
// BACKGROUND INITIALIZATION
// ===============================================
function initializeBackground() {
    const container = elements.bgContainer;
    if (!container) return;

    if (CONFIG.server.useVideoBackground && CONFIG.server.videoBackground) {
        const iframe = document.createElement('iframe');
        iframe.id = 'bgVideo';
        let videoId = '';
        try {
            const parts = CONFIG.server.videoBackground.split('/');
            videoId = parts[parts.length - 1].split('?')[0];
        } catch (e) {}
        iframe.src = `${CONFIG.server.videoBackground}?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&mute=1&vq=hd1080&playlist=${videoId}`;
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; encrypted-media';
        container.appendChild(iframe);
    } else if (CONFIG.server.imageBackground) {
        container.style.backgroundImage = `url(${CSS.escape ? CONFIG.server.imageBackground : CONFIG.server.imageBackground})`;
        container.style.backgroundSize = 'cover';
        container.style.backgroundPosition = 'center';
    }
}

// ===============================================
// AUDIO FUNCTIONS
// ===============================================
function initializeAudio() {
    if (!elements.audio) return;
    const songs = CONFIG.songs || [];
    if (songs.length === 0) return;

    state.currentSongIndex = getRandomInt(0, songs.length - 1);
    setSong(state.currentSongIndex);
    elements.audio.volume = state.volume;

    if (state.isMuted) {
        elements.audio.pause();
        updateMuteDisplay(true);
    } else {
        elements.audio.play().catch(() => {});
        updateMuteDisplay(false);
    }
}

function setSong(index) {
    const songs = CONFIG.songs || [];
    const song = songs[index];
    if (!song || !elements.audio) return;
    elements.audio.src = song.file;
    updateSongDisplay(song.name);
    if (!state.isMuted) {
        elements.audio.play().catch(() => {});
    }
}

function updateSongDisplay(name) {
    const updateEl = (el) => {
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            el.textContent = name;
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200);
    };
    updateEl(elements.songName);
    updateEl(elements.keybindsSongName);
}

function nextSong() {
    const songs = CONFIG.songs || [];
    state.currentSongIndex = (state.currentSongIndex + 1) % songs.length;
    setSong(state.currentSongIndex);
}

function previousSong() {
    const songs = CONFIG.songs || [];
    state.currentSongIndex = (state.currentSongIndex - 1 + songs.length) % songs.length;
    setSong(state.currentSongIndex);
}

function toggleMute() {
    if (!elements.audio) return;
    state.isMuted = !state.isMuted;
    localStorage.setItem('loading_muted', state.isMuted);
    if (state.isMuted) {
        elements.audio.pause();
        updateMuteDisplay(true);
    } else {
        elements.audio.play().catch(() => {});
        updateMuteDisplay(false);
    }
}

function updateMuteDisplay(muted) {
    const mainMute = elements.muteText;
    const miniMute = elements.keybindsMuteText;
    const mainVis = elements.playerVisualizer;
    const miniVis = elements.keybindsPlayerVisualizer;

    if (mainMute) mainMute.textContent = muted ? 'Unmute' : 'Mute';
    if (miniMute) miniMute.textContent = muted ? 'Unmute' : 'Mute';

    if (muted) {
        mainVis?.classList.add('paused');
        miniVis?.classList.add('paused');
    } else {
        mainVis?.classList.remove('paused');
        miniVis?.classList.remove('paused');
    }
}

function adjustVolume(delta) {
    if (!elements.audio) return;
    state.volume = Math.max(0, Math.min(1, state.volume + delta));
    elements.audio.volume = state.volume;
    localStorage.setItem('loading_volume', state.volume);
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
            background: rgba(10, 10, 15, 0.95);
            padding: 1rem 2rem;
            border-radius: 10px;
            font-size: 1.2rem;
            font-weight: 600;
            color: white;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            border: 1px solid rgba(255,255,255,0.1);
        `;
        document.body.appendChild(indicator);
    }
    indicator.textContent = `🔊 ${percentage}%`;
    indicator.style.opacity = '1';
    clearTimeout(indicator._timeout);
    indicator._timeout = setTimeout(() => { indicator.style.opacity = '0'; }, 1000);
}

// ===============================================
// WELCOME FUNCTIONS
// ===============================================
function initializeWelcome() {
    const phrases = CONFIG.welcomePhrases || [];
    if (phrases.length > 0 && elements.welcomeDisplay) {
        elements.welcomeDisplay.textContent = phrases[getRandomInt(0, phrases.length - 1)];
    }
    try {
        if (window.nuiHandoverData && window.nuiHandoverData.name) {
            if (elements.playerName) elements.playerName.textContent = window.nuiHandoverData.name;
        }
    } catch (e) {
        if (elements.playerName) elements.playerName.textContent = 'Joueur';
    }
}

// ===============================================
// SPA TAB SWITCHING
// ===============================================
function toggleKeybinds(visible) {
    state.isKeybindsVisible = visible;
    if (visible) {
        elements.mainContainer.style.display = 'none';
        elements.keybindsSection.style.display = 'flex';
        elements.keybindsSection.querySelectorAll('.key').forEach((key, idx) => {
            key.style.animationDelay = `${0.002 * idx}s`;
        });
    } else {
        elements.mainContainer.style.display = 'grid';
        elements.keybindsSection.style.display = 'none';
    }
}
window.toggleKeybinds = toggleKeybinds;

// ===============================================
// FIVEM REAL LOADING PROGRESS
// ===============================================
function initializeFivemEvents() {
    let progress = 0;
    window.fivemProgressReceived = false;

    const progressInterval = setInterval(() => {
        if (window.fivemProgressReceived) { clearInterval(progressInterval); return; }
        progress += Math.random() * 2;
        if (progress >= 100) { progress = 100; clearInterval(progressInterval); }
        updateGlobalProgress(progress);
    }, 450);

    const defaultTexts = [
        'CONNEXION AU SERVEUR',
        'CHARGEMENT DES RESSOURCES',
        'PRÉPARATION DES ASSETS',
        'SYNCHRONISATION EN COURS',
        'ÉTABLISSEMENT DE LA CONNEXION'
    ];
    let currentTextIndex = 0;
    const textInterval = setInterval(() => {
        if (window.fivemProgressReceived) { clearInterval(textInterval); return; }
        currentTextIndex = (currentTextIndex + 1) % defaultTexts.length;
        updateStatusText(defaultTexts[currentTextIndex]);
    }, 4000);

    const handlers = {
        startInitFunction(data) { window.fivemProgressReceived = true; },
        startInitFunctionType(data) { window.fivemProgressReceived = true; },
        initFunctionInvoking(data) {
            window.fivemProgressReceived = true;
            updateStatusText(`CHARGEMENT : ${data.name.toUpperCase()}`);
        },
        initFunctionInvoked(data) { window.fivemProgressReceived = true; },
        endInitFunctionType(data) { window.fivemProgressReceived = true; },
        onLogLine(data) {
            window.fivemProgressReceived = true;
            if (data.message && data.message.trim().length > 0) {
                updateStatusText(data.message.toUpperCase());
            }
        },
        loadProgress(data) {
            window.fivemProgressReceived = true;
            if (data.loadFraction !== undefined) {
                const percentage = data.loadFraction * 100;
                updateGlobalProgress(percentage);
                // Arrêt immédiat de l'interval quand chargement terminé
                if (percentage >= 100) {
                    clearInterval(progressInterval);
                    clearInterval(textInterval);
                }
            }
        }
    };

    window.addEventListener('message', function(e) {
        if (handlers[e.data.eventName]) {
            handlers[e.data.eventName](e.data);
        }
        if (e.data.action === 'showTest') {
            document.body.style.display = 'block';
            const closeBtn = document.getElementById('closeTestBtn');
            if (closeBtn) closeBtn.style.display = 'block';
            updateGlobalProgress(0);
            toggleKeybinds(false);
            if (elements.audio) {
                elements.audio.play().catch(() => {});
                updateMuteDisplay(false);
            }
        } else if (e.data.action === 'hideTest') {
            document.body.style.display = 'none';
            const closeBtn = document.getElementById('closeTestBtn');
            if (closeBtn) closeBtn.style.display = 'none';
            if (elements.audio) {
                elements.audio.pause();
                updateMuteDisplay(true);
            }
        }
    });
}

function closeTestMode() {
    fetch(`https://${GetParentResourceName()}/closeTest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify({})
    });
}
window.closeTestMode = closeTestMode;

function updateGlobalProgress(percentage) {
    if (elements.progressFill) elements.progressFill.style.width = `${percentage}%`;
    if (elements.keybindsProgressFill) elements.keybindsProgressFill.style.width = `${percentage}%`;
}

function updateStatusText(text) {
    const fadeText = (el) => {
        if (!el) return;
        el.style.opacity = '0';
        setTimeout(() => { el.textContent = text; el.style.opacity = '1'; }, 200);
    };
    fadeText(elements.statusText);
    fadeText(elements.keybindsStatusText);
}

// ===============================================
// PARTICLES ANIMATION
// ===============================================
function initializeParticles() {
    if (!elements.particles) return;
    for (let i = 0; i < PARTICLE_COUNT; i++) createParticle(i);
}

function createParticle(index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = getRandomInt(2, 6);
    const left = getRandomInt(0, 100);
    const delay = getRandomInt(0, 15);
    const duration = getRandomInt(10, 20);
    const hue = getRandomInt(220, 280);
    particle.style.cssText = `
        left: ${left}%;
        width: ${size}px;
        height: ${size}px;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
        background: hsl(${hue}, 70%, 60%);
        box-shadow: 0 0 ${size * 2}px hsl(${hue}, 70%, 60%);
    `;
    elements.particles.appendChild(particle);
}

// ===============================================
// NEWS CARD - Dynamic Content
// ===============================================
function sanitize(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function initializeNewsCard() {
    const newsConfig = CONFIG.news;
    if (!newsConfig) return;

    const titleEl = document.getElementById('newsTitle');
    const dateEl = document.getElementById('newsDate');
    const iconEl = document.getElementById('newsIcon');
    const listEl = document.getElementById('newsList');

    if (titleEl && newsConfig.title) titleEl.textContent = newsConfig.title;
    if (dateEl && newsConfig.lastUpdate) dateEl.textContent = `Mise à jour : ${newsConfig.lastUpdate}`;
    if (iconEl && newsConfig.icon) iconEl.textContent = newsConfig.icon;
    if (!listEl || !newsConfig.items) return;

    listEl.innerHTML = '';
    newsConfig.items.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'news-item';
        li.dataset.index = index;
        li.dataset.type = 'news';
        // Sanitisation via textContent pour éviter XSS
        const typeClass = `type-${sanitize(item.type.toLowerCase())}`;
        li.innerHTML = `<span class="highlight ${typeClass}">${sanitize(item.type)}</span> ${sanitize(item.text)}`;
        li.addEventListener('mouseenter', (e) => showInfoTooltip(e, item, 'news'));
        li.addEventListener('mousemove', (e) => positionTooltip(e, elements.infoTooltip));
        li.addEventListener('mouseleave', () => hideTooltip(elements.infoTooltip));
        listEl.appendChild(li);
    });
    checkScrollIndicator(listEl, newsConfig.maxVisible || 4);
}

// ===============================================
// SERVER INFO CARD - Dynamic Content
// ===============================================
function initializeServerInfoCard() {
    const infoConfig = CONFIG.serverInfo;
    if (!infoConfig) return;

    const titleEl = document.getElementById('serverInfoTitle');
    const iconEl = document.getElementById('serverInfoIcon');
    const listEl = document.getElementById('serverInfoList');
    const footerEl = document.getElementById('serverInfoFooter');

    if (titleEl && infoConfig.title) titleEl.textContent = infoConfig.title;
    if (iconEl && infoConfig.icon) iconEl.textContent = infoConfig.icon;
    if (footerEl && infoConfig.footerMessage) {
        footerEl.textContent = infoConfig.footerMessage;
        if (infoConfig.footerColor) footerEl.style.color = infoConfig.footerColor;
    }
    if (!listEl || !infoConfig.items) return;

    listEl.innerHTML = '';
    infoConfig.items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'keybind';
        div.dataset.index = index;
        div.dataset.type = 'info';
        div.innerHTML = `
            ${item.icon ? `<span class="keybind-icon">${sanitize(item.icon)}</span>` : ''}
            <kbd>${sanitize(item.key)}</kbd>
            <span>${sanitize(item.text)}</span>
        `;
        div.addEventListener('mouseenter', (e) => showInfoTooltip(e, item, 'info'));
        div.addEventListener('mousemove', (e) => positionTooltip(e, elements.infoTooltip));
        div.addEventListener('mouseleave', () => hideTooltip(elements.infoTooltip));
        listEl.appendChild(div);
    });
    checkScrollIndicator(listEl, infoConfig.maxVisible || 4);
}

// ===============================================
// SCROLL INDICATOR
// ===============================================
function checkScrollIndicator(listEl, maxVisible) {
    if (listEl.children.length > maxVisible) {
        const indicator = document.createElement('div');
        indicator.className = 'scroll-indicator visible';
        indicator.innerHTML = `
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
            <span>Défiler pour voir plus</span>
        `;
        listEl.parentElement.appendChild(indicator);
        listEl.addEventListener('scroll', () => {
            const isAtBottom = listEl.scrollHeight - listEl.scrollTop <= listEl.clientHeight + 10;
            indicator.classList.toggle('visible', !isAtBottom);
        });
    }
}

// ===============================================
// KEYBOARD VIRTUAL INITIALIZATION
// ===============================================
function initializeKeyboard() {
    const keys = document.querySelectorAll('.key');
    const keybindsConfig = CONFIG.keybinds && CONFIG.keybinds.keys ? CONFIG.keybinds.keys : [];

    keys.forEach(keyElement => {
        const keyId = keyElement.dataset.key;
        const keyConfig = keybindsConfig.find(k => k.key === keyId);
        if (keyConfig) {
            keyElement.classList.add('has-action', `category-${keyConfig.category}`);
            keyElement.dataset.name = keyConfig.name;
            keyElement.dataset.description = keyConfig.description;
            keyElement.dataset.category = keyConfig.category;
            keyElement.dataset.icon = keyConfig.icon || '🎮';
            keyElement.addEventListener('mouseenter', handleKeyHover);
            keyElement.addEventListener('mouseleave', handleKeyLeave);
            keyElement.addEventListener('mousemove', handleKeyMove);
        }
    });
}

function handleKeyHover(event) {
    const key = event.currentTarget;
    if (!key.classList.contains('has-action')) return;
    showKeyTooltip(event, key);
    key.classList.add('active');
}

function handleKeyLeave(event) {
    hideTooltip(elements.keyTooltip);
    event.currentTarget.classList.remove('active');
}

function handleKeyMove(event) {
    positionTooltip(event, elements.keyTooltip);
}

// ===============================================
// TOOLTIP CONTROLS
// ===============================================
function initializeTooltips() {
    if (!elements.infoTooltip) elements.infoTooltip = document.getElementById('infoTooltip');
    if (!elements.keyTooltip) elements.keyTooltip = document.getElementById('keyTooltip');
}

function showInfoTooltip(event, item, type) {
    const tooltip = elements.infoTooltip;
    if (!tooltip) return;

    const badge = document.getElementById('tooltipBadge');
    const dateInfo = document.getElementById('tooltipDateInfo');
    const title = document.getElementById('tooltipTitle');
    const description = document.getElementById('tooltipDescription');
    const footer = document.getElementById('tooltipFooter');
    const author = document.getElementById('tooltipAuthor');

    if (type === 'news') {
        const typeClass = `type-${item.type.toLowerCase()}`;
        badge.textContent = item.type;
        badge.className = `tooltip-badge ${typeClass}`;
        dateInfo.textContent = item.date || '';
        title.textContent = item.text;
        description.textContent = item.description || 'Pas de description disponible.';
        if (item.author) {
            footer.style.display = 'flex';
            author.textContent = item.author;
        } else {
            footer.style.display = 'none';
        }
    } else if (type === 'info') {
        badge.textContent = item.key;
        badge.className = 'tooltip-badge type-key';
        dateInfo.textContent = '';
        title.textContent = item.text;
        description.textContent = item.description || 'Pas de description disponible.';
        footer.style.display = 'none';
    }
    positionTooltip(event, tooltip);
    tooltip.classList.add('visible');
}

function showKeyTooltip(event, key) {
    const tooltip = elements.keyTooltip;
    if (!tooltip) return;
    const categories = CONFIG.keybinds && CONFIG.keybinds.categories ? CONFIG.keybinds.categories : [];
    const category = categories.find(c => c.id === key.dataset.category);
    document.getElementById('keyTooltipIcon').textContent = key.dataset.icon;
    document.getElementById('keyTooltipName').textContent = key.dataset.name;
    document.getElementById('keyTooltipDesc').textContent = key.dataset.description;
    const categoryEl = document.getElementById('keyTooltipCategory');
    categoryEl.textContent = `${category?.icon || ''} ${category?.name || key.dataset.category}`;
    categoryEl.style.background = category?.color || 'var(--primary)';
    positionTooltip(event, tooltip);
    tooltip.classList.add('visible');
}

function hideTooltip(tooltip) {
    if (tooltip) tooltip.classList.remove('visible');
}

function positionTooltip(event, tooltip) {
    if (!tooltip) return;
    const padding = 15;
    const tooltipRect = tooltip.getBoundingClientRect();
    let x = event.clientX + padding;
    let y = event.clientY + padding + 10;
    if (x + tooltipRect.width > window.innerWidth - 20) x = event.clientX - tooltipRect.width - padding;
    if (y + tooltipRect.height > window.innerHeight - 20) y = event.clientY - tooltipRect.height - padding;
    if (x < 20) x = 20;
    if (y < 20) y = 20;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

// ===============================================
// CATEGORY FILTERS (Keyboard)
// ===============================================
function initializeCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;
    const categories = CONFIG.keybinds && CONFIG.keybinds.categories ? CONFIG.keybinds.categories : [];
    container.innerHTML = '';
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.category = category.id;
        btn.textContent = `${category.icon} ${category.name}`;
        btn.style.setProperty('--category-color', category.color);
        btn.addEventListener('click', () => filterByCategory(category.id));
        container.appendChild(btn);
    });
    const allBtn = document.querySelector('.filter-btn[data-category="all"]');
    if (allBtn) allBtn.addEventListener('click', () => filterByCategory('all'));
}

function filterByCategory(categoryId) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === categoryId);
    });
    document.querySelectorAll('.key').forEach(key => {
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
// KEYBOARD CONTROLS
// ===============================================
function initializeKeyboardControls() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
}

function handleKeyDown(event) {
    // Utilisation de event.key (moderne) — event.which/keyCode dépréciés
    if (event.key === ' ') {
        event.preventDefault();
        toggleMute();
    }
}

function handleKeyUp(event) {
    switch (event.key) {
        case 'ArrowLeft':  previousSong(); break;
        case 'ArrowRight': nextSong(); break;
        case 'ArrowUp':    adjustVolume(VOLUME_STEP); break;
        case 'ArrowDown':  adjustVolume(-VOLUME_STEP); break;
    }

    if (state.isKeybindsVisible) {
        const keyMap = {
            ' ': 'Space', 'Escape': 'Escape', 'Tab': 'Tab',
            'Shift': 'Shift', 'Control': 'Ctrl', 'Alt': 'Alt',
            'Enter': 'Enter', 'Backspace': 'Backspace',
            'ArrowUp': 'ArrowUp', 'ArrowDown': 'ArrowDown',
            'ArrowLeft': 'ArrowLeft', 'ArrowRight': 'ArrowRight'
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
}

// ===============================================
// UTILITY FUNCTIONS
// ===============================================
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ===============================================
// STAFF CARDS ANIMATIONS (initialisées au DOMContentLoaded)
// ===============================================
function initializeStaffCards() {
    document.querySelectorAll('.staff-card').forEach((card, index) => {
        card.style.animationDelay = `${0.1 * index}s`;
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateX(10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// ===============================================
// SOCIAL BUTTONS RIPPLE
// ===============================================
function initializeSocialButtons() {
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// Dynamic CSS inject
const _style = document.createElement('style');
_style.textContent = `
    @keyframes ripple { to { transform: scale(4); opacity: 0; } }
    .song-name { transition: opacity 0.2s ease, transform 0.2s ease; }
    .status-text { transition: opacity 0.3s ease; }
`;
document.head.appendChild(_style);
