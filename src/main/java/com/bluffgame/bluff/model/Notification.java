package com.bluffgame.bluff.model;

public class Notification {

    private NotificationType notificationType;
    
    private String message;

    public Notification(NotificationType notificationType, String message) {
        this.notificationType = notificationType;
        this.message = message;    
    }

    public NotificationType getNotificationType() {
        return this.notificationType;
    }

    public void setNotificationType(NotificationType notificationType) {
        this.notificationType = notificationType;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
