/**
 * ===============================================
 * CONFIGURATION DU LOADING SCREEN
 * Modifiez facilement les paramètres ici
 * ===============================================
 */

const LOADING_CONFIG = {

    // ===============================================
    // INFORMATIONS DU SERVEUR
    // ===============================================
    server: {
        name: "Acnesia RP",
        logo: "logo/logo.png",
        discordUrl: "https://discord.gg/QYhRz2WV8Y",
        youtubeUrl: "https://www.youtube.com/@thanatos2784",
        websiteUrl: "https://www.google.com/",
        useVideoBackground: false, // true = Vidéo YouTube, false = Image locale de repli
        videoBackground: "https://www.youtube.com/embed/iAXzw0I3Ncg",
        imageBackground: "img/background.png"
    },

    // ===============================================
    // ÉQUIPE DU STAFF
    // ===============================================
    staff: [
        {
            name: "Acnesia",
            role: "Owner",
            roleType: "owner", // owner, manager, developer, admin, moderator, support
            avatar: "img/acnesia.png",
            description: "",
            online: true
        },
        {
            name: "ajagaming",
            role: "Manager",
            roleType: "manager",
            avatar: "img/luc.png",
            description: "S'occupe des staff et recrutement",
            online: true
        },
        {
            name: "Acnesia",
            role: "Développeur / Mappeur",
            roleType: "developer",
            avatar: "img/acnesia.png",
            description: "",
            online: true
        },
        {
            name: "Ormeta",
            role: "Gérant de la Console",
            roleType: "admin",
            avatar: "img/ormeta.png",
            description: "Contactez-le si le owner n'est pas dispo",
            online: true
        }
    ],

    // ===============================================
    // NEWS & MISES À JOUR
    // Ajoutez une description pour afficher des détails au survol
    // ===============================================
    news: {
        title: "Updates & News",
        icon: "📰",
        lastUpdate: "28/11/2024",
        maxVisible: 4, // Nombre d'éléments visibles avant scroll
        items: [
            {
                type: "Nouveau",
                text: "Mapping japonais",
                description: "Nouveau quartier japonais avec restaurants, temples et boutiques traditionnelles. Zone de RP unique !",
                date: "28/11/2024",
                author: "Acnesia"
            },
            {
                type: "Ajout",
                text: "Factures pour chaque job",
                description: "Les métiers peuvent maintenant générer des factures automatiques pour leurs services.",
                date: "25/11/2024",
                author: "Acnesia"
            },
            {
                type: "Update",
                text: "QS-Housing 4.0",
                description: "Mise à jour majeure du système immobilier avec nouvelles fonctionnalités de décoration.",
                date: "20/11/2024",
                author: "Acnesia"
            },
            {
                type: "Update",
                text: "QS-Housing 5.0",
                description: "Nouvelle version avec système de partage de maisons et coffres partagés.",
                date: "15/11/2024",
                author: "Acnesia"
            },
            {
                type: "Fix",
                text: "Traduction des factures",
                description: "Correction des textes en anglais dans le système de facturation.",
                date: "10/11/2024",
                author: "ajagaming"
            }
        ]
    },

    // ===============================================
    // INFORMATIONS SERVEUR
    // Ajoutez une description pour afficher des détails au survol
    // ===============================================
    serverInfo: {
        title: "Informations Serveur",
        icon: "⚙️",
        maxVisible: 4, // Nombre d'éléments visibles avant scroll
        items: [
            {
                key: "F7",
                text: "Factures, Documents, etc...",
                description: "Accédez à tous vos documents administratifs : factures, permis de conduire, carte d'identité, contrats de travail et licences professionnelles.",
                icon: "📄"
            },
            {
                key: "ALT",
                text: "Utiliser la plupart des scripts",
                description: "Maintenez ALT pour afficher les interactions contextuelles disponibles autour de vous (PNJ, objets, véhicules).",
                icon: "👆"
            },
            {
                key: "F5",
                text: "Liste des touches principales",
                description: "Affiche la page complète de toutes les touches et raccourcis clavier disponibles sur le serveur.",
                icon: "⌨️"
            },
            {
                key: "F1",
                text: "Menu principal du serveur",
                description: "Ouvre le menu principal avec accès aux paramètres, inventaire rapide et options de personnage.",
                icon: "📋"
            },
            {
                key: "M",
                text: "Carte et GPS",
                description: "Affiche la carte complète de la ville avec système GPS intégré pour définir des waypoints.",
                icon: "🗺️"
            },
            {
                key: "P",
                text: "Téléphone portable",
                description: "Ouvre votre smartphone avec toutes les applications : messages, contacts, banque, Twitter, etc.",
                icon: "📱"
            }
        ],
        footerMessage: "🎮 Et surtout, Amusez-vous !",
        footerColor: "#22d3ee"
    },


    // ===============================================
    // MUSIQUES
    // ===============================================
    songs: [
        { file: 'song/song1.mp3', name: 'Asketa & Natan Chaim - More [NCS Release]' },
        { file: 'song/song2.mp3', name: 'Akacia - Electric [NCS Release]' },
        { file: 'song/song3.mp3', name: 'Wiguez & Vizzen - Running Wild [NCS Release]' }
    ],

    // ===============================================
    // PHRASES DE BIENVENUE
    // ===============================================
    welcomePhrases: [
        'Commencez votre nouvelle aventure passionnante.',
        'Découvrez les merveilles de votre nouvelle ville.',
        'Ouvrez la porte à un tout nouveau chapitre.',
        'Entrez dans un monde de nouvelles possibilités.',
        'Embrassez votre nouveau début.',
        'Votre histoire commence ici.',
        'Préparez-vous à vivre des moments inoubliables.'
    ],

    // ===============================================
    // TOUCHES DU SERVEUR (KEYBINDS)
    // Configurez ici toutes les touches de votre serveur
    // ===============================================
    keybinds: {
        // Catégories de touches
        categories: [
            {
                id: "general",
                name: "Général",
                icon: "🎮",
                color: "#6366f1"
            },
            {
                id: "vehicle",
                name: "Véhicule",
                icon: "🚗",
                color: "#10b981"
            },
            {
                id: "interaction",
                name: "Interaction",
                icon: "👋",
                color: "#f59e0b"
            },
            {
                id: "inventory",
                name: "Inventaire",
                icon: "🎒",
                color: "#ec4899"
            },
            {
                id: "communication",
                name: "Communication",
                icon: "📢",
                color: "#8b5cf6"
            },
            {
                id: "job",
                name: "Métiers",
                icon: "👔",
                color: "#22d3ee"
            },
            {
                id: "admin",
                name: "Administration",
                icon: "🛡️",
                color: "#ef4444"
            }
        ],

        // Définition des touches
        // key: identifiant de la touche sur le clavier
        // Touches spéciales: F1-F12, Tab, CapsLock, Shift, Ctrl, Alt, Space, Enter, Backspace, 
        //                    Insert, Delete, Home, End, PageUp, PageDown, ArrowUp, ArrowDown, ArrowLeft, ArrowRight
        //                    Num0-Num9, NumLock, NumDiv, NumMult, NumMinus, NumPlus, NumEnter, NumDot
        keys: [
            // ===== TOUCHES FONCTION =====
            {
                key: "F1",
                name: "Menu Principal",
                description: "Ouvre le menu principal du serveur avec toutes les options disponibles.",
                category: "general",
                icon: "📋"
            },
            {
                key: "F2",
                name: "Inventaire",
                description: "Ouvre votre inventaire personnel pour gérer vos objets.",
                category: "inventory",
                icon: "🎒"
            },
            {
                key: "F3",
                name: "Animations",
                description: "Ouvre le menu des animations et emotes disponibles.",
                category: "interaction",
                icon: "💃"
            },
            {
                key: "F4",
                name: "Menu Factures",
                description: "Affiche vos factures impayées et l'historique des paiements.",
                category: "general",
                icon: "📄"
            },
            {
                key: "F5",
                name: "Liste des Touches",
                description: "Affiche cette page d'aide avec toutes les touches du serveur.",
                category: "general",
                icon: "⌨️"
            },
            {
                key: "F6",
                name: "Menu Job",
                description: "Ouvre le menu spécifique à votre métier actuel.",
                category: "job",
                icon: "👔"
            },
            {
                key: "F7",
                name: "Documents & Factures",
                description: "Accès complet aux documents, factures, contrats et permis.",
                category: "general",
                icon: "📑"
            },
            {
                key: "F8",
                name: "Console FiveM",
                description: "Ouvre la console de développement FiveM.",
                category: "admin",
                icon: "🖥️"
            },
            {
                key: "F9",
                name: "Menu Garage",
                description: "Ouvre le menu de gestion de vos véhicules personnels.",
                category: "vehicle",
                icon: "🏠"
            },
            {
                key: "F10",
                name: "Réglages",
                description: "Accède aux paramètres et options du serveur.",
                category: "general",
                icon: "⚙️"
            },

            // ===== TOUCHES INTERACTION =====
            {
                key: "E",
                name: "Interagir",
                description: "Touche principale pour interagir avec les PNJ, objets et véhicules.",
                category: "interaction",
                icon: "👆"
            },
            {
                key: "G",
                name: "Entrer/Sortir Véhicule",
                description: "Monte ou descend du véhicule le plus proche.",
                category: "vehicle",
                icon: "🚪"
            },
            {
                key: "H",
                name: "Klaxon / Sirène",
                description: "Active le klaxon ou la sirène pour les véhicules d'urgence.",
                category: "vehicle",
                icon: "📢"
            },
            {
                key: "L",
                name: "Verrouiller Véhicule",
                description: "Verrouille ou déverrouille votre véhicule personnel.",
                category: "vehicle",
                icon: "🔐"
            },
            {
                key: "K",
                name: "Menu Radial",
                description: "Ouvre le menu radial avec les actions rapides.",
                category: "general",
                icon: "⭕"
            },
            {
                key: "J",
                name: "Ceinture de Sécurité",
                description: "Attache ou détache votre ceinture de sécurité.",
                category: "vehicle",
                icon: "🦺"
            },
            {
                key: "M",
                name: "Carte / GPS",
                description: "Affiche la carte complète avec le système GPS.",
                category: "general",
                icon: "🗺️"
            },
            {
                key: "N",
                name: "Push-to-Talk",
                description: "Maintenez pour parler dans le chat vocal.",
                category: "communication",
                icon: "🎙️"
            },
            {
                key: "B",
                name: "Pointer du Doigt",
                description: "Pointe dans la direction visée pour indiquer quelque chose.",
                category: "interaction",
                icon: "👉"
            },
            {
                key: "X",
                name: "Mains en l'air",
                description: "Lève les mains en l'air (utile lors des contrôles).",
                category: "interaction",
                icon: "🙌"
            },
            {
                key: "Z",
                name: "Couverture",
                description: "Se mettre à couvert derrière un obstacle.",
                category: "interaction",
                icon: "🛡️"
            },
            {
                key: "U",
                name: "Menu Véhicule",
                description: "Ouvre les options du véhicule (capot, coffre, portières).",
                category: "vehicle",
                icon: "🔧"
            },
            {
                key: "Y",
                name: "Menu Armes",
                description: "Ouvre la roue des armes disponibles.",
                category: "inventory",
                icon: "🔫"
            },
            {
                key: "I",
                name: "Inventaire Secondaire",
                description: "Accès rapide à l'inventaire ou coffre à proximité.",
                category: "inventory",
                icon: "📦"
            },
            {
                key: "O",
                name: "Menu Organisation",
                description: "Accès au menu de votre gang/organisation.",
                category: "job",
                icon: "👥"
            },
            {
                key: "P",
                name: "Téléphone",
                description: "Ouvre votre téléphone portable avec toutes ses applications.",
                category: "communication",
                icon: "📱"
            },
            {
                key: "T",
                name: "Chat Textuel",
                description: "Ouvre la fenêtre de chat pour envoyer un message.",
                category: "communication",
                icon: "💬"
            },
            {
                key: "R",
                name: "Recharger",
                description: "Recharge l'arme actuellement équipée.",
                category: "inventory",
                icon: "🔄"
            },
            {
                key: "C",
                name: "S'accroupir",
                description: "Passe en position accroupie pour être plus discret.",
                category: "interaction",
                icon: "🧎"
            },
            {
                key: "V",
                name: "Changer Vue",
                description: "Alterne entre la vue première et troisième personne.",
                category: "general",
                icon: "📷"
            },
            {
                key: "Q",
                name: "Couverture Gauche",
                description: "Se pencher à gauche derrière une couverture.",
                category: "interaction",
                icon: "↩️"
            },

            // ===== TOUCHES SPÉCIALES =====
            {
                key: "Tab",
                name: "Scoreboard",
                description: "Affiche la liste des joueurs connectés au serveur.",
                category: "general",
                icon: "📊"
            },
            {
                key: "Alt",
                name: "Interactions Contextuelles",
                description: "Maintenir pour voir les interactions disponibles autour de vous.",
                category: "interaction",
                icon: "👁️"
            },
            {
                key: "Ctrl",
                name: "Marcher/Accroupi",
                description: "Maintenez pour marcher lentement ou combiné avec C pour ramper.",
                category: "interaction",
                icon: "🚶"
            },
            {
                key: "Shift",
                name: "Sprint",
                description: "Maintenez pour courir plus vite (consomme de l'endurance).",
                category: "interaction",
                icon: "🏃"
            },
            {
                key: "Space",
                name: "Sauter / Frein",
                description: "Saute à pied, frein à main en véhicule.",
                category: "general",
                icon: "⬆️"
            },
            {
                key: "Enter",
                name: "Valider / Passager",
                description: "Valide une action ou monte en passager dans un véhicule.",
                category: "general",
                icon: "✅"
            },
            {
                key: "Backspace",
                name: "Annuler",
                description: "Annule l'action en cours ou ferme le menu actif.",
                category: "general",
                icon: "❌"
            },
            {
                key: "Delete",
                name: "Supprimer Waypoint",
                description: "Supprime le point GPS actuellement défini.",
                category: "general",
                icon: "🗑️"
            },

            // ===== PAVÉ NUMÉRIQUE =====
            {
                key: "Num1",
                name: "Émote 1",
                description: "Lance l'émote rapide assignée au slot 1.",
                category: "interaction",
                icon: "1️⃣"
            },
            {
                key: "Num2",
                name: "Émote 2",
                description: "Lance l'émote rapide assignée au slot 2.",
                category: "interaction",
                icon: "2️⃣"
            },
            {
                key: "Num3",
                name: "Émote 3",
                description: "Lance l'émote rapide assignée au slot 3.",
                category: "interaction",
                icon: "3️⃣"
            },
            {
                key: "Num4",
                name: "Phares",
                description: "Allume ou éteint les phares du véhicule.",
                category: "vehicle",
                icon: "💡"
            },
            {
                key: "Num5",
                name: "Régulateur",
                description: "Active le régulateur de vitesse du véhicule.",
                category: "vehicle",
                icon: "🚀"
            },
            {
                key: "Num6",
                name: "Indicateur Droit",
                description: "Active le clignotant droit du véhicule.",
                category: "vehicle",
                icon: "➡️"
            },
            {
                key: "Num7",
                name: "Mode Furtif",
                description: "Active le mode furtif (sirènes silencieuses).",
                category: "vehicle",
                icon: "🤫"
            },
            {
                key: "Num8",
                name: "Vitres",
                description: "Baisse ou monte les vitres du véhicule.",
                category: "vehicle",
                icon: "🪟"
            },
            {
                key: "Num9",
                name: "Néons",
                description: "Active les néons sous le véhicule.",
                category: "vehicle",
                icon: "✨"
            },
            {
                key: "Num0",
                name: "Radio Véhicule",
                description: "Active ou désactive la radio du véhicule.",
                category: "vehicle",
                icon: "📻"
            },
            {
                key: "NumPlus",
                name: "Station Suivante",
                description: "Passe à la station radio suivante.",
                category: "vehicle",
                icon: "⏭️"
            },
            {
                key: "NumMinus",
                name: "Station Précédente",
                description: "Revient à la station radio précédente.",
                category: "vehicle",
                icon: "⏮️"
            },

            // ===== TOUCHES NUMÉRIQUES (AU-DESSUS DU CLAVIER) =====
            {
                key: "1",
                name: "Slot Arme 1",
                description: "Sélectionne l'arme assignée au slot 1.",
                category: "inventory",
                icon: "🔫"
            },
            {
                key: "2",
                name: "Slot Arme 2",
                description: "Sélectionne l'arme assignée au slot 2.",
                category: "inventory",
                icon: "🔫"
            },
            {
                key: "3",
                name: "Slot Arme 3",
                description: "Sélectionne l'arme assignée au slot 3.",
                category: "inventory",
                icon: "🔫"
            },
            {
                key: "4",
                name: "Slot Arme 4",
                description: "Sélectionne l'arme assignée au slot 4.",
                category: "inventory",
                icon: "🔫"
            },
            {
                key: "5",
                name: "Slot Objet 1",
                description: "Utilise l'objet assigné au slot 5.",
                category: "inventory",
                icon: "📦"
            },
            {
                key: "6",
                name: "Slot Objet 2",
                description: "Utilise l'objet assigné au slot 6.",
                category: "inventory",
                icon: "📦"
            }
        ]
    }
};

// Export pour utilisation dans d'autres fichiers
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LOADING_CONFIG;
}
