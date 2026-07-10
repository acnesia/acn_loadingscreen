-- Handover du nom du joueur a l'ecran de chargement
AddEventHandler('playerConnecting', function(_, _, deferrals)
    local playerId = source
    deferrals.handover({
        name = GetPlayerName(playerId)
    })
end)

-- Groupes ESX autorises a utiliser /testload
local AUTHORIZED_GROUPS = {
    admin      = true,
    superadmin = true
}

-- Recuperation ESX au moment de l'appel (evite la race condition au demarrage)
local function getESX()
    local ok, obj = pcall(function()
        return exports['es_extended']:getSharedObject()
    end)
    if ok and obj then
        return obj
    end
    return nil
end

-- Commande /testload : ouvre le loading screen en jeu pour les admins
RegisterCommand('testload', function(source)
    -- Bloquer l'execution depuis la console serveur
    if source <= 0 then
        print('[acn_loadingscreen] /testload doit etre utilisee en jeu uniquement.')
        return
    end

    local ESX = getESX()

    -- Verification ESX disponible
    if not ESX then
        print('[acn_loadingscreen] ESX est indisponible. Verifie que es_extended demarre avant acn_loadingscreen dans server.cfg.')
        TriggerClientEvent('chat:addMessage', source, {
            color = { 255, 165, 0 },
            args  = { 'Loading Screen', 'Erreur interne : ESX indisponible, contactez un admin.' }
        })
        return
    end

    local xPlayer = ESX.GetPlayerFromId(source)

    -- Verification joueur trouve
    if not xPlayer then
        print(('[acn_loadingscreen] Joueur introuvable (source: %s)'):format(source))
        return
    end

    local group = xPlayer.getGroup()

    -- Verification du groupe ESX
    if not AUTHORIZED_GROUPS[group] then
        TriggerClientEvent('chat:addMessage', source, {
            color = { 255, 70, 70 },
            args  = { 'Loading Screen', 'Permission refusee : groupe admin ou superadmin requis.' }
        })
        print(('[acn_loadingscreen] /testload refuse pour %s (groupe: %s)'):format(
            GetPlayerName(source), group or 'inconnu'
        ))
        return
    end

    -- Ouverture du loading screen
    TriggerClientEvent('acn_loadingscreen:showTest', source)
    print(('[acn_loadingscreen] Loading screen ouvert pour %s'):format(GetPlayerName(source)))
end, false)
