package nus.iss.stockserver.controllers;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import nus.iss.stockserver.models.Account;
import nus.iss.stockserver.services.NotificationService;
import nus.iss.stockserver.utils.JwtUtils;

@RestController
@RequestMapping(path = "/api")
public class NotificationController {

    @Autowired
    NotificationService notificationSvc;

    @Autowired
    JwtUtils jwtUtils;

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
                Boolean sendstatus = notificationSvc.sendNotification(title, content);

                if (sendstatus) {
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

}
