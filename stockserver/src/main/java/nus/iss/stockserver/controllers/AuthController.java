package nus.iss.stockserver.controllers;

import java.io.StringReader;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@RestController
@RequestMapping(path = "/api")
public class AuthController {

    @PostMapping(value = "/signup")
    public ResponseEntity<String> signupuser(@RequestBody String jsonbody) {
        System.out.println("signup request received");

        JsonReader reader = Json.createReader(new StringReader(jsonbody));
        JsonObject datajson = reader.readObject();

        String email = datajson.getString("email");
        String password = datajson.getString("password");

        System.out.println("email >>>" + email);
        System.out.println("password >>>" + password);

        return null;
    }

}
