package nus.iss.stockserver.services;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class NotificationService {

    @Value("${fcmserverkey}")
    private String FCMSERVERKEY;

    public final static String FCMURL = "https://fcm.googleapis.com/fcm/send";

    List<String> clientListenTokens = new LinkedList<>();

    public Boolean addListenToken(String newToken) {
        if (!clientListenTokens.contains(newToken)) {
            System.out.println(">>> New Notification client added....");
            clientListenTokens.add(newToken);
            return true;
        } else {
            System.out.println(">>> Notification client was existed....");
            return false;
        }

    }

    public Boolean sendNotification(String title, String content) {
        try {
            for (String targetClient : clientListenTokens) {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.add("Authorization", "key=" + FCMSERVERKEY);

                Map<String, String> notification = new HashMap<>();
                notification.put("title", title);
                notification.put("body", content);

                Map<String, Object> requestBody = new HashMap<>();
                requestBody.put("notification", notification);
                requestBody.put("to", targetClient);

                ObjectMapper objectMapper = new ObjectMapper();
                String jsonBody = "";

                jsonBody = objectMapper.writeValueAsString(requestBody);

                HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);

                RestTemplate restTemplate = new RestTemplate();
                ResponseEntity<String> responseEntity = restTemplate.exchange(
                        FCMURL,
                        HttpMethod.POST,
                        requestEntity,
                        String.class);

                String payload = responseEntity.getBody();
                System.out.println(payload);

            }
            
            return true;

        } catch (Exception e) {

            return false;
        }

    }

}
