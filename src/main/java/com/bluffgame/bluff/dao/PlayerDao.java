package com.bluffgame.bluff.dao;

import java.math.BigInteger;

import com.bluffgame.bluff.model.PlayerProfile;

import org.springframework.data.mongodb.repository.MongoRepository;


public interface PlayerDao extends MongoRepository<PlayerProfile, BigInteger> {
}
