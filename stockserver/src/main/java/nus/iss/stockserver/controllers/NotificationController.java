package nus.iss.stockserver.controllers;

import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import nus.iss.stockserver.models.Account;
import nus.iss.stockserver.models.Notification;
import nus.iss.stockserver.repository.NotificationRepository;
import nus.iss.stockserver.services.NotificationService;
import nus.iss.stockserver.utils.JwtUtils;

@RestController
@RequestMapping(path = "/api")
public class NotificationController {

    @Autowired
    NotificationService notificationSvc;

    @Autowired
    NotificationRepository notificationRepo;

    @Autowired
    JwtUtils jwtUtils;

    @GetMapping(value = "/notification")
    public ResponseEntity<String> getNotifications(@RequestHeader String Authorization) {
        System.out.println("Get Notification request received");
        String jwtToken = Authorization.substring(7); // skip the bearer_ by 7 chars
        Boolean validToken = jwtUtils.validateJWT(jwtToken);
        List<Notification> notifications = new LinkedList<>();

        if (validToken) {
            notifications = notificationRepo.getNotifications();
            JsonArrayBuilder jsonArray = Json.createArrayBuilder();

            for (Notification notification : notifications) {
                JsonObject jsonObject = Json.createObjectBuilder()
                        .add("id", notification.getId())
                        .add("title", notification.getTitle())
                        .add("content", notification.getContent())
                        .add("uploaded", notification.getUploaded().toString())
                        .build();
                jsonArray.add(jsonObject);
            }

            JsonObject responsejson = Json.createObjectBuilder()
                    .add("notifications", jsonArray)
                    .build();

            return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());

        } else {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Invalid JWT Token")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }

    }

    @PostMapping(value = "/notification")
    public ResponseEntity<String> postNotification(@RequestBody String jsonbody, @RequestHeader String Authorization) {
        System.out.println("Send Notification request received");

        String jwtToken = Authorization.substring(7); // skip the bearer_ by 7 chars
        Boolean validToken = jwtUtils.validateJWT(jwtToken);

        if (validToken) {
            Account user = jwtUtils.getJWTaccount(jwtToken);

            if (user.getRoles().equals("admin")) {
                JsonReader reader = Json.createReader(new StringReader(jsonbody));
                JsonObject datajson = reader.readObject();
                String title = datajson.getString("title");
                String content = datajson.getString("content");
                Integer rowsupdated = notificationRepo.insertNotification(title, content);
                Boolean sendstatus = notificationSvc.sendNotification(title, content);

                if (sendstatus && rowsupdated == 1) {
                    JsonObject responsejson = Json.createObjectBuilder()
                            .add("status", "Notification Sent !")
                            .build();
                    return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
                } else {
                    JsonObject responsejson = Json.createObjectBuilder()
                            .add("status", "Failed to send message")
                            .build();
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
                }

            } else {

                JsonObject responsejson = Json.createObjectBuilder()
                        .add("status", "Only Admin can send notification ")
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());

            }
        } else {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Invalid JWT Token ")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }

    }

    @DeleteMapping(value = "/deletenotification")
    public ResponseEntity<String> deleteNotifications(@RequestHeader String Authorization) {
        System.out.println("Delete Notification Request Received...");

        String jwtToken = Authorization.substring(7); // skip the bearer_ by 7 chars
        Boolean validToken = jwtUtils.validateJWT(jwtToken);

        if (validToken) {
            Account user = jwtUtils.getJWTaccount(jwtToken);

            if (user.getRoles().equals("admin")) {

                try {
                    Integer rowsupdated = notificationRepo.deleteNotification();
                    System.out.println("All Notification Record deleted , total deleted = " + rowsupdated);

                    JsonObject responsejson = Json.createObjectBuilder()
                            .add("status", "Notification Cleared !")
                            .build();
                    return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
                } catch (Exception e) {
                    JsonObject responsejson = Json.createObjectBuilder()
                            .add("status", "SQL Error, Failed to delete data")
                            .build();
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
                }

            } else {
                JsonObject responsejson = Json.createObjectBuilder()
                        .add("status", "Only Admin can delete notification records")
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());

            }

        } else {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Invalid JWT Token")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }

    }

}
