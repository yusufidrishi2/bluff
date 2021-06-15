package com.bluffgame.bluff.model;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import com.bluffgame.bluff.config.SchedulerConfig;
import com.fasterxml.jackson.annotation.JsonProperty;

public class FriendlyPlayerProfile {

    private int playersAllowed;

    private long joiningCode;

    private List<PlayerProfile> playerProfiles;

    public FriendlyPlayerProfile(
        @JsonProperty("playersAllowed") int playersAllowed,
        @JsonProperty("joiningCode") long joiningCode,
        @JsonProperty("id") BigInteger id,
        @JsonProperty("playerName") String playerName, 
        @JsonProperty("dpUrl") String dpUrl,
        @JsonProperty("points") BigInteger points
    ) {
        this.playerProfiles = new ArrayList<>();
        this.playerProfiles.add(new PlayerProfile(id, playerName, dpUrl, points));
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

    public synchronized int getTotalPlayers() {
        return this.playerProfiles.size();
    }

    public PlayerProfile getPlayerProfile() {
        return playerProfiles.get(0);
    }

    public synchronized void addPlayer(PlayerProfile playerProfile) {
        this.playerProfiles.add(playerProfile);
        SchedulerConfig.sendResponseForJoiningFriendlyGame(playerProfiles, this.joiningCode);
    }
}
