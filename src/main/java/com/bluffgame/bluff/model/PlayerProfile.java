package com.bluffgame.bluff.model;

import java.math.BigInteger;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class PlayerProfile {

    @Id    
    private BigInteger id;

    private String playerName;

    private String dpUrl;

    private BigInteger points;

    public PlayerProfile(
        @JsonProperty("id") BigInteger id,
        @JsonProperty("playerName") String playerName, 
        @JsonProperty("dpUrl") String dpUrl,
        @JsonProperty("points") BigInteger points
    ) {
        this.id = id;
        this.playerName = playerName;
        this.dpUrl = dpUrl;
        this.points = points;
    }

    public BigInteger getId() {
        return this.id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public String getPlayerName() {
        return this.playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    public String getDpUrl() {
        return this.dpUrl;
    }

    public void setDpUrl(String dpUrl) {
        this.dpUrl = dpUrl;
    }

    public BigInteger getPoints() {
        return this.points;
    }

    public void setPoints(BigInteger points) {
        this.points = points;
    }
}
