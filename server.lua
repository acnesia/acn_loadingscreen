AddEventHandler('playerConnecting', function(_, _, deferrals)
    local source = source

    deferrals.handover({
        name = GetPlayerName(source)
    })
end)

-- ESX SharedObject (méthode moderne uniquement)
local ESX = nil
pcall(function()
    ESX = exports["es_extended"]:getSharedObject()
end)

if ESX then
    ESX.RegisterCommand('testload', 'admin', function(xPlayer, args, showError)
        xPlayer.triggerEvent('esx_loadingscreen:showTest')
    end, false, {help = "Tester l'écran de chargement"})
else
    -- Fallback commande native ACE si ESX absent
    RegisterCommand('testload', function(source, args, rawCommand)
        if source > 0 then
            -- Permission spécifique uniquement (évite d'autoriser tous les "command")
            if IsPlayerAceAllowed(source, "command.testload") then
                TriggerClientEvent('esx_loadingscreen:showTest', source)
            else
                print("Permission refusée pour " .. GetPlayerName(source))
            end
        else
            print("Cette commande doit être exécutée en jeu.")
        end
    end, false)
end
