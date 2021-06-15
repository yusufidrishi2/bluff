package com.bluffgame.bluff.config;

import java.util.List;

import com.bluffgame.bluff.model.Notification;
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

    
    public static void sendResponseForJoiningFriendlyGame(List<PlayerProfile> playerProfiles, long joiningCode) {
        SchedulerConfig.globalTemplate.convertAndSend(
            "/topic/join-friendly-game/"+joiningCode, 
            playerProfiles
        );
    }

    public static void joinRandomGame(PlayerProfile playerProfile) {
        SchedulerConfig.globalTemplate.convertAndSend("/topic/join-random-game/"+playerProfile.getId(), playerProfile);
    }

    public static void sendNotification(PlayerProfile playerProfile, Notification notification) {
        SchedulerConfig.globalTemplate.convertAndSend("/topic/notification/"+playerProfile.getId(), playerProfile);
    }
}
