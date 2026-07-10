local screenShutdown = false

local function closeLoadingScreen()
    if screenShutdown then return end
    screenShutdown = true
    ShutdownLoadingScreen()
    ShutdownLoadingScreenNui()
end

-- Fermeture du loading screen natif au premier spawn
AddEventHandler('playerSpawned', function()
    closeLoadingScreen()
end)

-- Fallback : si playerSpawned ne fire pas (certains frameworks)
AddEventHandler('onClientGameTypeStart', function()
    CreateThread(function()
        Wait(3000)
        closeLoadingScreen()
    end)
end)

-- Fallback ultime : timeout de sécurité après 15 secondes
CreateThread(function()
    Wait(15000)
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
