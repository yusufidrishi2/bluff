package com.bluffgame.bluff.service;

import java.math.BigInteger;

import com.bluffgame.bluff.dao.PlayerDao;
import com.bluffgame.bluff.model.PlayerProfile;
import com.bluffgame.bluff.security.AES;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
    
    private final PlayerDao playerDao;

    @Autowired
    public PlayerService(PlayerDao playerDao) {
        this.playerDao = playerDao;
    }

    public PlayerProfile addPlayer(PlayerProfile person) {
        this.playerDao.save(person);
        return person;
    }

    public PlayerProfile getPlayer(String id) {
        BigInteger decryptedString = new BigInteger(AES.decrypt(id));
        return this.playerDao.findById(decryptedString).orElse(null);
    }
}
