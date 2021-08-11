package com.bluffgame.bluff.model;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

public class GameInititals {
    
    private Map<BigInteger, List<Number>> playerIdCard;

    public GameInititals(List<PlayerProfile> playerProfiles) {
        this.playerIdCard = new Hashtable<>();
        List<List<Number>> eachPlayerCards = getCardsDistribution(playerProfiles.size());
        for (int i = 0; i < playerProfiles.size(); i++) {
            this.playerIdCard.put(playerProfiles.get(i).getId(), eachPlayerCards.get(i));
        }
    }

    public Map<BigInteger,List<Number>> getPlayerIdCard() {
        return this.playerIdCard;
    }

    public void setPlayerIdCard(Map<BigInteger,List<Number>> playerIdCard) {
        this.playerIdCard = playerIdCard;
    }

    private List<List<Number>> getCardsDistribution(int noOfPlayers) {
        List<Number> allCards = new ArrayList<>(); 
        for (int i = 0; i < 52; i++) {
            allCards.add(i);
        }
        Collections.shuffle(allCards);
        List<List<Number>> eachPlayerCards = new ArrayList<>();
        
        int tillIndexReach = 0;
        for (int i = 0; i < noOfPlayers; i++) {
            eachPlayerCards.add(new ArrayList<>());
            int cardIndex = 0;
            while (tillIndexReach + cardIndex < 52 && cardIndex < Math.floor(52 / noOfPlayers)) {
                eachPlayerCards.get(i).add(allCards.get(tillIndexReach + cardIndex));
                cardIndex++;
            }
            tillIndexReach = cardIndex;
        }
        return eachPlayerCards;
    }
}
