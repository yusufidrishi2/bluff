package com.bluffgame.bluff.model;

import java.math.BigInteger;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JoiningFriendlyPlayerProfile {

    private int playersAllowed;

    private long joiningCode;

    private PlayerProfile playerProfile;

    public JoiningFriendlyPlayerProfile(
        @JsonProperty("playersAllowed") int playersAllowed,
        @JsonProperty("joiningCode") long joiningCode,
        @JsonProperty("id") BigInteger id,
        @JsonProperty("playerName") String playerName, 
        @JsonProperty("dpUrl") String dpUrl,
        @JsonProperty("points") BigInteger points
    ) {
        this.playerProfile = new PlayerProfile(id, playerName, dpUrl, points);
        this.playersAllowed = playersAllowed;
        this.joiningCode = joiningCode;    
    }

    public int getPlayersAllowed() {
        return this.playersAllowed;
    }

    public void setPlayersAllowed(int playersAllowed) {
        this.playersAllowed = playersAllowed;
    }

    public long getJoiningCode() {
        return this.joiningCode;
    }

    public void setJoiningCode(long joiningCode) {
        this.joiningCode = joiningCode;
    }

    public PlayerProfile getPlayerProfile() {
        return playerProfile;
    }
}
