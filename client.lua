local screenShutdown = false

local function closeLoadingScreen()
    if screenShutdown then return end
    screenShutdown = true
    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()
end

-- Multichar : le jeu est prêt, on ferme le loading screen
-- playerSpawned ne fire pas avec un système de sélection de personnage
AddEventHandler('onClientGameTypeStart', function()
    CreateThread(function()
        Wait(1000) -- laisse le temps au multichar de s'initialiser
        closeLoadingScreen()
    end)
end)

-- Fallback : playerSpawned (mode sans multichar ou spawn direct)
AddEventHandler('playerSpawned', function()
    closeLoadingScreen()
end)

-- Fallback ultime : timeout de sécurité après 20 secondes
CreateThread(function()
    Wait(20000)
    closeLoadingScreen()
end)

-- Permet au multichar de fermer manuellement le loading screen via NUI message
RegisterNUICallback('closeLoadingScreen', function(_, cb)
    closeLoadingScreen()
    cb({ ok = true })
end)

-- Permet aussi de le fermer via un event net (depuis le multichar server-side)
RegisterNetEvent('acn_loadingscreen:close')
AddEventHandler('acn_loadingscreen:close', function()
    closeLoadingScreen()
end)

-- Ouverture de la NUI en jeu via /testload
RegisterNetEvent('acn_loadingscreen:showTest')
AddEventHandler('acn_loadingscreen:showTest', function()
    SendNUIMessage({ action = 'showTest' })
    SetNuiFocus(true, true)
end)

-- Fermeture via le bouton 'Quitter le Test'
RegisterNUICallback('closeTest', function(_, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({ action = 'hideTest' })
    cb({ ok = true })
end)
