package com.bluffgame.bluff.config;

import java.util.List;

import com.bluffgame.bluff.model.GameInititals;
import com.bluffgame.bluff.model.Notification;
import com.bluffgame.bluff.model.NotificationType;
import com.bluffgame.bluff.model.PlayerChance;
import com.bluffgame.bluff.model.PlayerProfile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@Configuration
public class SchedulerConfig {

    @Autowired
    SimpMessagingTemplate template;

    static SimpMessagingTemplate globalTemplate;

    @Autowired
    SchedulerConfig() {
        Thread thread = new Thread() {
            @Override
            public void run() {
                try { Thread.sleep(3000); } catch (Exception e) {}
                SchedulerConfig.globalTemplate = template;
            }
        };
        thread.start();
    }

    
    public static void sendResponseForJoiningGame(List<PlayerProfile> playerProfiles, long joiningCode) {
        System.out.println("\nCheck = "+playerProfiles);
        
        SchedulerConfig.globalTemplate.convertAndSend(
            "/topic/join-game/"+joiningCode, 
            playerProfiles
        );
    }

    public static void startTheGame(long joiningCode, GameInititals gameInititals) {
        SchedulerConfig.globalTemplate.convertAndSend(
            "/topic/start-game/"+joiningCode,
            gameInititals
        );
    }

    public static void sendNextChance(long joiningCode, PlayerChance playerChance) {
        SchedulerConfig.globalTemplate.convertAndSend(
            "/topic/player-chances/"+joiningCode,
            playerChance 
        );
    }

    public static void sendNotification(PlayerProfile playerProfile, Notification notification) {
        SchedulerConfig.globalTemplate.convertAndSend(
            "/topic/notification/"+playerProfile.getId(), 
            playerProfile
        );
    }
}
