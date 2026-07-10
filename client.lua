local screenShutdown = false

-- Fermeture du loading screen natif au premier spawn
AddEventHandler('playerSpawned', function()
    if screenShutdown then return end
    screenShutdown = true
    ShutdownLoadingScreenNui()
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
