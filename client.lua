
local spawn1 = false							

AddEventHandler("playerSpawned", function () 	-- Wait for player to spawn
	if not spawn1 then
		ShutdownLoadingScreenNui()				-- Close loading screen resource
		spawn1 = true
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