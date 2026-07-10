fx_version 'cerulean'
games { 'gta5' }
lua54 'yes'

author 'Acnesia'
description 'Loading Screen SPA - acn_loadingscreen'
version '1.2.0'

-- Frame natif pendant la connexion au serveur
loadscreen 'index.html'
loadscreen_cursor 'yes'

-- NUI persistante indispensable pour /testload en jeu
ui_page 'index.html'

client_script 'client.lua'
server_script 'server.lua'

files {
    'index.html',
    'config.js',
    'css/style.css',
    'script/main.js',
    'logo/logo.png',
    'song/*',
    'img/*'
}
