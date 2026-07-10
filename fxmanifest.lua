fx_version 'cerulean'
games { 'gta5' }
lua54 "yes"

author 'Acnesia'
description 'Loading Screen SPA - acn_loadingscreen'
version '1.1.1'

loadscreen 'index.html'
loadscreen_cursor 'yes'
client_script 'client.lua'
server_script 'server.lua'

files {
    'index.html',
    'config.js',
    'css/style.css',
    'script/main.js',
    'script/keybinds.js',
    'logo/logo.png',
    'song/*',
    'img/*'
}
