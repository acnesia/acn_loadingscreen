/**
 * ===============================================
 * ACN LOADING SCREEN — main.js
 * ===============================================
 */

// ===============================================
// CONFIG FALLBACK
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

const VOLUME_STEP   = 0.05;
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
    // FIX: l'écran principal utilise maintenant id="mainScreen" / classe .screen
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
    initializeNewsPanel();
    initializeKeyboardControls();
    initializeStaffCards();
    initializeSocialButtons();
    initializeServerTag();
});

function initializeElements() {
    elements.audio                   = document.getElementById('loading');
    elements.bgContainer             = document.getElementById('bgContainer');
    // FIX: sélecteur mis à jour — le conteneur principal est maintenant #mainScreen
    elements.mainContainer           = document.getElementById('mainScreen');
    elements.keybindsSection         = document.getElementById('keybindsSection');
    elements.songName                = document.getElementById('songname');
    elements.muteText                = document.getElementById('muteText');
    // FIX: le visualiseur principal est maintenant id="visualizer"
    elements.playerVisualizer        = document.getElementById('visualizer');
    elements.progressFill            = document.getElementById('progressFill');
    elements.statusText              = document.getElementById('statusText');
    elements.keybindsSongName        = document.getElementById('keybindsSongname');
    elements.keybindsMuteText        = document.getElementById('keybindsMuteText');
    elements.keybindsPlayerVisualizer = document.getElementById('keybindsPlayerVisualizer');
    elements.keybindsProgressFill    = document.getElementById('keybindsProgressFill');
    elements.keybindsStatusText      = document.getElementById('keybindsStatusText');
    elements.playerName              = document.getElementById('playerName');
    elements.welcomeDisplay          = document.getElementById('welcomeDisplay');
    elements.particles               = document.getElementById('particles');
    elements.keyTooltip              = document.getElementById('keyTooltip');
    // infoTooltip supprimé dans le nouveau design — on le crée à la volée si besoin
    elements.infoTooltip             = document.getElementById('infoTooltip') || null;
}

// ===============================================
// SERVER TAG
// ===============================================
function initializeServerTag() {
    const el = document.getElementById('serverTagName');
    if (el && CONFIG.server && CONFIG.server.name) el.textContent = CONFIG.server.name;
}

// ===============================================
// AUDIO PREFERENCES
// ===============================================
function loadAudioPreferences() {
    const savedVolume = localStorage.getItem('loading_volume');
    const savedMuted  = localStorage.getItem('loading_muted');
    if (savedVolume !== null) state.volume   = parseFloat(savedVolume);
    if (savedMuted  !== null) state.isMuted  = (savedMuted === 'true');
}

// ===============================================
// BACKGROUND
// ===============================================
function initializeBackground() {
    const container = elements.bgContainer;
    if (!container) return;

    if (CONFIG.server.useVideoBackground && CONFIG.server.videoBackground) {
        const iframe = document.createElement('iframe');
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
        container.style.backgroundImage    = `url(${CONFIG.server.imageBackground})`;
        container.style.backgroundSize     = 'cover';
        container.style.backgroundPosition = 'center';
    }
}

// ===============================================
// AUDIO
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
    if (!state.isMuted) elements.audio.play().catch(() => {});
}

function updateSongDisplay(name) {
    const updateEl = (el) => {
        if (!el) return;
        el.style.opacity   = '0';
        el.style.transform = 'translateY(-8px)';
        setTimeout(() => {
            el.textContent     = name;
            el.style.opacity   = '1';
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
    if (elements.muteText)         elements.muteText.textContent         = muted ? 'Unmute' : 'Mute';
    if (elements.keybindsMuteText) elements.keybindsMuteText.textContent = muted ? 'Unmute' : 'Mute';

    const toggle = (el, add) => { if (el) el.classList.toggle('paused', add); };
    toggle(elements.playerVisualizer,         muted);
    toggle(elements.keybindsPlayerVisualizer, muted);
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
            position:fixed; top:50%; left:50%;
            transform:translate(-50%,-50%);
            background:rgba(8,10,16,.97);
            padding:.9rem 2rem;
            border-radius:10px;
            font-size:1.2rem; font-weight:600; color:#fff;
            z-index:10000; opacity:0;
            transition:opacity .3s ease;
            box-shadow:0 10px 25px rgba(0,0,0,.5);
            border:1px solid rgba(201,168,76,.3);
        `;
        document.body.appendChild(indicator);
    }
    indicator.textContent = `🔊 ${percentage}%`;
    indicator.style.opacity = '1';
    clearTimeout(indicator._timeout);
    indicator._timeout = setTimeout(() => { indicator.style.opacity = '0'; }, 1000);
}

// ===============================================
// WELCOME
// ===============================================
function initializeWelcome() {
    const phrases = CONFIG.welcomePhrases || [];
    if (phrases.length > 0 && elements.welcomeDisplay)
        elements.welcomeDisplay.textContent = phrases[getRandomInt(0, phrases.length - 1)];

    try {
        if (window.nuiHandoverData && window.nuiHandoverData.name) {
            if (elements.playerName) elements.playerName.textContent = window.nuiHandoverData.name;
        }
    } catch (e) {
        if (elements.playerName) elements.playerName.textContent = 'Joueur';
    }
}

// ===============================================
// SPA — TOGGLE KEYBINDS
// FIX: utilise elements.mainContainer qui pointe maintenant sur #mainScreen
// ===============================================
function toggleKeybinds(visible) {
    state.isKeybindsVisible = visible;

    // Guard : si l'un des éléments est null, on sort proprement
    if (!elements.mainContainer || !elements.keybindsSection) return;

    if (visible) {
        elements.mainContainer.style.display   = 'none';
        elements.keybindsSection.style.display = 'flex';
        elements.keybindsSection.querySelectorAll('.key').forEach((key, idx) => {
            key.style.animationDelay = `${0.002 * idx}s`;
        });
    } else {
        elements.mainContainer.style.display   = 'flex';
        elements.keybindsSection.style.display = 'none';
    }
}
window.toggleKeybinds = toggleKeybinds;

// ===============================================
// FIVEM LOADING EVENTS
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
        startInitFunction()      { window.fivemProgressReceived = true; },
        startInitFunctionType()  { window.fivemProgressReceived = true; },
        initFunctionInvoking(d)  {
            window.fivemProgressReceived = true;
            updateStatusText(`CHARGEMENT : ${d.name.toUpperCase()}`);
        },
        initFunctionInvoked()    { window.fivemProgressReceived = true; },
        endInitFunctionType()    { window.fivemProgressReceived = true; },
        onLogLine(d) {
            window.fivemProgressReceived = true;
            if (d.message && d.message.trim()) updateStatusText(d.message.toUpperCase());
        },
        loadProgress(d) {
            window.fivemProgressReceived = true;
            if (d.loadFraction !== undefined) {
                const pct = d.loadFraction * 100;
                updateGlobalProgress(pct);
                if (pct >= 100) { clearInterval(progressInterval); clearInterval(textInterval); }
            }
        }
    };

    window.addEventListener('message', (e) => {
        if (handlers[e.data.eventName]) handlers[e.data.eventName](e.data);

        if (e.data.action === 'showTest') {
            document.body.style.display = 'block';
            const btn = document.getElementById('closeTestBtn');
            if (btn) btn.style.display = 'block';
            updateGlobalProgress(0);
            toggleKeybinds(false);
            if (elements.audio) { elements.audio.play().catch(() => {}); updateMuteDisplay(false); }
        } else if (e.data.action === 'hideTest') {
            document.body.style.display = 'none';
            const btn = document.getElementById('closeTestBtn');
            if (btn) btn.style.display = 'none';
            if (elements.audio) { elements.audio.pause(); updateMuteDisplay(true); }
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
    // FIX: mise à jour du % affiché (#progressPct ajouté dans le nouveau HTML)
    const pct = Math.min(100, Math.round(percentage));
    if (elements.progressFill)        elements.progressFill.style.width        = `${pct}%`;
    if (elements.keybindsProgressFill) elements.keybindsProgressFill.style.width = `${pct}%`;
    const pctEl = document.getElementById('progressPct');
    if (pctEl) pctEl.textContent = `${pct}%`;
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
// PARTICLES
// ===============================================
function initializeParticles() {
    if (!elements.particles) return;
    for (let i = 0; i < PARTICLE_COUNT; i++) createParticle(i);
}

function createParticle() {
    const p    = document.createElement('div');
    p.className = 'particle';
    const left     = getRandomInt(0, 100);
    const delay    = getRandomInt(0, 18);
    const duration = getRandomInt(12, 22);
    p.style.cssText = `
        left:${left}%;
        animation-delay:${delay}s;
        animation-duration:${duration}s;
    `;
    elements.particles.appendChild(p);
}

// ===============================================
// NEWS PANEL (nouveau design — panneau droit #newsPanel)
// FIX: l'ancien design avait une card avec #newsList ; le nouveau a #newsPanel
// ===============================================
function sanitize(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function initializeNewsPanel() {
    const newsConfig = CONFIG.news;
    if (!newsConfig) return;

    // Mise à jour du label
    const titleEl = document.getElementById('newsTitle');
    if (titleEl && newsConfig.title) titleEl.textContent = newsConfig.title;

    const panel = document.getElementById('newsPanel');
    if (!panel || !newsConfig.items || newsConfig.items.length === 0) return;

    // Supprime le label pour ne pas le dupliquer, on l'a déjà
    // Génère les items sous forme de .info-item
    newsConfig.items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'info-item';

        const typeMap = {
            'NEW':    'tag-new',
            'UPDATE': 'tag-update',
            'FIX':    'tag-fix',
            'INFO':   'tag-info',
            'ADD':    'tag-add'
        };
        const tagClass = typeMap[(item.type || '').toUpperCase()] || 'tag-info';

        div.innerHTML = `
            <span class="tag ${tagClass}">${sanitize(item.type || 'INFO')}</span>
            <div class="item-title">${sanitize(item.text || '')}</div>
            ${item.date ? `<div class="item-date">${sanitize(item.date)}</div>` : ''}
        `;
        panel.appendChild(div);
    });
}

// ===============================================
// KEYBOARD VIRTUAL
// ===============================================
function initializeKeyboard() {
    const keybindsConfig = CONFIG.keybinds && CONFIG.keybinds.keys ? CONFIG.keybinds.keys : [];

    document.querySelectorAll('.key').forEach(keyElement => {
        const keyId    = keyElement.dataset.key;
        const keyConfig = keybindsConfig.find(k => k.key === keyId);
        if (keyConfig) {
            keyElement.classList.add('has-action', `category-${keyConfig.category}`);
            keyElement.dataset.name        = keyConfig.name;
            keyElement.dataset.description = keyConfig.description;
            keyElement.dataset.category    = keyConfig.category;
            keyElement.dataset.icon        = keyConfig.icon || '🎮';
            keyElement.addEventListener('mouseenter', handleKeyHover);
            keyElement.addEventListener('mouseleave', handleKeyLeave);
            keyElement.addEventListener('mousemove',  handleKeyMove);
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
// TOOLTIPS
// ===============================================
function showKeyTooltip(event, key) {
    const tooltip = elements.keyTooltip;
    if (!tooltip) return;
    const categories = CONFIG.keybinds && CONFIG.keybinds.categories ? CONFIG.keybinds.categories : [];
    const category   = categories.find(c => c.id === key.dataset.category);

    const iconEl = document.getElementById('keyTooltipIcon');
    const nameEl = document.getElementById('keyTooltipName');
    const descEl = document.getElementById('keyTooltipDesc');
    const catEl  = document.getElementById('keyTooltipCategory');

    if (iconEl) iconEl.textContent = key.dataset.icon;
    if (nameEl) nameEl.textContent = key.dataset.name;
    if (descEl) descEl.textContent = key.dataset.description;
    if (catEl)  {
        catEl.textContent    = `${category?.icon || ''} ${category?.name || key.dataset.category}`;
        catEl.style.background = category?.color || 'var(--gold)';
    }
    positionTooltip(event, tooltip);
    tooltip.classList.add('visible');
}

function hideTooltip(tooltip) {
    if (tooltip) tooltip.classList.remove('visible');
}

function positionTooltip(event, tooltip) {
    if (!tooltip) return;
    const padding      = 15;
    const tooltipRect  = tooltip.getBoundingClientRect();
    let x = event.clientX + padding;
    let y = event.clientY + padding + 10;
    if (x + tooltipRect.width  > window.innerWidth  - 20) x = event.clientX - tooltipRect.width  - padding;
    if (y + tooltipRect.height > window.innerHeight - 20) y = event.clientY - tooltipRect.height - padding;
    if (x < 20) x = 20;
    if (y < 20) y = 20;
    tooltip.style.left = `${x}px`;
    tooltip.style.top  = `${y}px`;
}

// ===============================================
// CATEGORY FILTERS
// ===============================================
function initializeCategoryFilters() {
    const container  = document.getElementById('categoryFilters');
    if (!container) return;
    const categories = CONFIG.keybinds && CONFIG.keybinds.categories ? CONFIG.keybinds.categories : [];

    container.innerHTML = '';
    categories.forEach(category => {
        const btn = document.createElement('button');
        btn.className        = 'filter-btn';
        btn.dataset.category = category.id;
        btn.textContent      = `${category.icon} ${category.name}`;
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
        } else {
            key.classList.toggle('filtered-out', key.dataset.category !== categoryId);
        }
    });
}

// ===============================================
// KEYBOARD CONTROLS
// ===============================================
function initializeKeyboardControls() {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup',   handleKeyUp);
}

function handleKeyDown(event) {
    if (event.key === ' ') { event.preventDefault(); toggleMute(); }
}

function handleKeyUp(event) {
    switch (event.key) {
        case 'ArrowLeft':  previousSong(); break;
        case 'ArrowRight': nextSong();     break;
        case 'ArrowUp':    adjustVolume( VOLUME_STEP); break;
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
        const keyEl = document.querySelector(`.key[data-key="${keyId}"]`);
        if (keyEl) {
            keyEl.classList.add('active');
            setTimeout(() => keyEl.classList.remove('active'), 200);
        }
    }
}

// ===============================================
// STAFF CARDS
// ===============================================
function initializeStaffCards() {
    document.querySelectorAll('.staff-card').forEach((card, index) => {
        card.style.animationDelay = `${0.1 * index}s`;
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
                position:absolute; background:rgba(255,255,255,.25);
                border-radius:50%; transform:scale(0);
                animation:ripple .6s linear; pointer-events:none;
            `;
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width  = ripple.style.height = `${size}px`;
            ripple.style.left   = `${e.clientX - rect.left  - size / 2}px`;
            ripple.style.top    = `${e.clientY - rect.top   - size / 2}px`;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ===============================================
// UTILITY
// ===============================================
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Dynamic CSS
const _style = document.createElement('style');
_style.textContent = `
    @keyframes ripple { to { transform:scale(4); opacity:0; } }
    .song-name  { transition: opacity .2s ease, transform .2s ease; }
    .status-label { transition: opacity .3s ease; }
`;
document.head.appendChild(_style);
