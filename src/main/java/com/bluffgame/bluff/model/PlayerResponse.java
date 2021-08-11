package com.bluffgame.bluff.model;

import java.math.BigInteger;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PlayerResponse {

    private BigInteger playerId;
    
    private String joiningCode;

    private Map<Integer, Integer> cards;

    private Map<Integer, Integer> bluffs;

    private boolean calledBluff;

    private boolean givenPass;

    public PlayerResponse(
        @JsonProperty("playerId") BigInteger playerId,
        @JsonProperty("joiningCode") String joiningCode,
        @JsonProperty("cards") Map<Integer, Integer> cards,
        @JsonProperty("bluffs") Map<Integer, Integer> bluffs,
        @JsonProperty("cards") boolean calledBluff,
        @JsonProperty("bluffs") boolean givenPass
    ) {
        System.out.println("check = "+playerId+" "+calledBluff+" "+givenPass);
        for (Map.Entry<Integer, Integer> a: cards.entrySet()) {
            System.out.println("cards = "+a.getKey()+": "+a.getValue());
        }
        System.out.println("");
        for (Map.Entry<Integer, Integer> a: bluffs.entrySet()) {
            System.out.println("bluffs = "+a.getKey()+": "+a.getValue());
        }
        System.out.println("");
    }

    public BigInteger getPlayerId() {
        return this.playerId;
    }

    public void setPlayerId(BigInteger playerId) {
        this.playerId = playerId;
    }

    public String getJoiningCode() {
        return this.joiningCode;
    }

    public void setJoiningCode(String joiningCode) {
        this.joiningCode = joiningCode;
    }

    public Map<Integer,Integer> getCards() {
        return this.cards;
    }

    public void setCards(Map<Integer,Integer> cards) {
        this.cards = cards;
    }

    public Map<Integer,Integer> getBluffs() {
        return this.bluffs;
    }

    public void setBluffs(Map<Integer,Integer> bluffs) {
        this.bluffs = bluffs;
    }

    public boolean getCalledBluff() {
        return this.calledBluff;
    }

    public void setCalledBluff(boolean calledBluff) {
        this.calledBluff = calledBluff;
    }

    public boolean getGivenPass() {
        return this.givenPass;
    }

    public void setGivenPass(boolean givenPass) {
        this.givenPass = givenPass;
    }
}
