fx_version 'cerulean'
games { 'gta5' }
lua54 "yes"

author 'Acnesia'
description 'Loading Screen SPA - acn_loadingscreen'
version '1.1.0'

loadscreen 'index.html'
ui_page 'index.html'
client_script 'client.lua'
server_script 'server.lua'
loadscreen_cursor 'yes'

files {
    'index.html',
    'config.js',
    'css/style.css',
    'script/main.js',
    'logo/logo.png',
    'song/*',
    'img/*'
}
