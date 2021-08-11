package com.bluffgame.bluff.service;

import java.math.BigInteger;
import java.util.Hashtable;
import java.util.Map;

import com.bluffgame.bluff.dao.PlayerDao;
import com.bluffgame.bluff.model.FriendlyPlayerProfile;
import com.bluffgame.bluff.model.JoiningFriendlyPlayerProfile;
import com.bluffgame.bluff.model.Notification;
import com.bluffgame.bluff.model.NotificationType;
import com.bluffgame.bluff.model.PlayerProfile;
import com.bluffgame.bluff.model.PlayerResponse;
import com.bluffgame.bluff.security.AES;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
    
    private final PlayerDao playerDao;

    private Map<Long, FriendlyPlayerProfile> activeFriendlyGames;

    @Autowired
    public PlayerService(PlayerDao playerDao) {
        this.playerDao = playerDao;
        this.activeFriendlyGames = new Hashtable<>();
    }

    public PlayerProfile addPlayer(PlayerProfile person) {
        this.playerDao.save(person);
        return person;
    }

    public PlayerProfile getPlayer(String id) {
        BigInteger decryptedString = new BigInteger(AES.decrypt(id));
        return this.playerDao.findById(decryptedString).orElse(null);
    }

    public void createFriendlyPlatform(FriendlyPlayerProfile friendlyPlayerProfile) {
        this.activeFriendlyGames.put(friendlyPlayerProfile.getJoiningCode(), friendlyPlayerProfile);
    }

    public Notification addPlayerInFriendlyGame(JoiningFriendlyPlayerProfile joiningFriendlyPlayerProfile) {
        FriendlyPlayerProfile friendlyPlayPlatform = this.activeFriendlyGames.get(joiningFriendlyPlayerProfile.getJoiningCode());
        if (friendlyPlayPlatform != null) {
            if (friendlyPlayPlatform.getTotalPlayers() < friendlyPlayPlatform.getPlayersAllowed()) {
                return friendlyPlayPlatform.addPlayer(joiningFriendlyPlayerProfile.getPlayerProfile());
            }
            return new Notification(NotificationType.FAILURE, "Game has already been started");
        }
        return new Notification(NotificationType.FAILURE, "There is no game available with code: "+joiningFriendlyPlayerProfile.getJoiningCode());
    }

    public void handlePlayerGameResponse(PlayerResponse playerResponse) {
        
    }
}
