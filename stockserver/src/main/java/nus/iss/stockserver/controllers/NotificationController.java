package nus.iss.stockserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import nus.iss.stockserver.services.NotificationService;

@RestController
@RequestMapping(path = "/api")
public class NotificationController {

    @Autowired
    NotificationService notificationSvc;

    @PostMapping(value = "/notification")
    public ResponseEntity<String> postNotification(){
        
        String title = "Notification Title";
        String content = "This is the content";
        
        notificationSvc.sendNotification(title, content );

        return null;
    }
    
}
