
local screenShutdown = false

AddEventHandler("playerSpawned", function()
    if not screenShutdown then
        screenShutdown = true
        ShutdownLoadingScreenNui()
    end
end)

RegisterNetEvent('esx_loadingscreen:showTest', function()
    SendNUIMessage({
        action = 'showTest'
    })
    SetNuiFocus(true, true)
end)

RegisterNUICallback('closeTest', function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({
        action = 'hideTest'
    })
    cb('ok')
end)
