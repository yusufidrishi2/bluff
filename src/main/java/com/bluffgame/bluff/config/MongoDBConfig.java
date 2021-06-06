package com.bluffgame.bluff.config;

import com.bluffgame.bluff.dao.PlayerDao;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories(basePackageClasses = PlayerDao.class)
@Configuration
public class MongoDBConfig {
}

