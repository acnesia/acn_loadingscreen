AddEventHandler('playerConnecting', function(_, _, deferrals)
    local source = source

    deferrals.handover({
        name = GetPlayerName(source)
    })
end)

local ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

if not ESX then
    pcall(function()
        ESX = exports["es_extended"]:getSharedObject()
    end)
end

if ESX then
    ESX.RegisterCommand('testload', 'admin', function(xPlayer, args, showError)
        xPlayer.triggerEvent('esx_loadingscreen:showTest')
    end, false, {help = "Tester l'écran de chargement"})
else
    -- Fallback commande native ace permission si ESX n'est pas prêt ou absent
    RegisterCommand('testload', function(source, args, rawCommand)
        if source > 0 then
            if IsPlayerAceAllowed(source, "command.testload") or IsPlayerAceAllowed(source, "command") then
                TriggerClientEvent('esx_loadingscreen:showTest', source)
            else
                print("Permission refusée pour " .. GetPlayerName(source))
            end
        else
            print("Cette commande doit être exécutée en jeu.")
        end
    end, false)
end