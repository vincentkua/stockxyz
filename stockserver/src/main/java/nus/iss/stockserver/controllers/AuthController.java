package nus.iss.stockserver.controllers;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import nus.iss.stockserver.models.Account;
import nus.iss.stockserver.repository.StockRepository;
import nus.iss.stockserver.services.EmailService;
import nus.iss.stockserver.utils.JwtUtils;

@RestController
@RequestMapping(path = "/api")
public class AuthController {

    @Autowired
    StockRepository stockRepo;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    EmailService emailSvc;

    @GetMapping(value = "/validatejwt")
    public ResponseEntity<String> validatejwt(@RequestParam String jwt) {

        // System.out.println(jwt);
        Boolean jwtvalidity = jwtUtils.validateJWT(jwt);
        if (jwtvalidity) {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "JWT is Valid")
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
        } else {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Invalid JWT")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }
    }

    @GetMapping(value = "/parsejwt")
    public ResponseEntity<String> parsejwt(@RequestParam String jwt) {

        // System.out.println(jwt);

        Account account = jwtUtils.getJWTaccount(jwt);

        if (account != null) {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("email", account.getEmail())
                    .add("role", account.getRoles())
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
        } else {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Invalid JWT Token , Please Login to Continue")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }
    }

    @GetMapping(value = "/signin")
    public ResponseEntity<String> userlogin(@RequestParam String email, @RequestParam String password) {

        // Call Repo to get and check hpassword
        Account account = new Account();
        account = stockRepo.getUser(email);

        if (account == null) {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Account Not Existed!!!")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        } else {
            String pw_hash = account.getHpassword();
            if (BCrypt.checkpw(password, pw_hash)) {

                // Generate JWT Token
                String jwtToken = jwtUtils.generateJWT(email, account.getRoles());

                JsonObject responsejson = Json.createObjectBuilder()
                        .add("status", "Success Login")
                        .add("roles", account.getRoles())
                        .add("jwtToken", jwtToken)
                        .build();
                return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
            } else {
                JsonObject responsejson = Json.createObjectBuilder()
                        .add("status", "Invalid Password")
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
            }
        }
    }

    @PostMapping(value = "/signup")
    public ResponseEntity<String> signupuser(@RequestBody String jsonbody) {
        System.out.println("signup request received");

        JsonReader reader = Json.createReader(new StringReader(jsonbody));
        JsonObject datajson = reader.readObject();

        String email = datajson.getString("email");
        String password = datajson.getString("password");
        String pw_hash = BCrypt.hashpw(password, BCrypt.gensalt()); // Hash using Bcrypt library

        System.out.println("email >>>" + email);
        System.out.println("password >>>" + password);
        System.out.println("Encrypted >>>" + pw_hash);

        // Post new user o repository

        Integer rowsupdated = stockRepo.addUser(email, pw_hash);
        System.out.println("rowsupdated >>>" + rowsupdated);

        if (rowsupdated == 1) {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "New User Registered")
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
        } else {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Failed to add user")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }
    }

    @PostMapping(value = "updatePassword")
    public ResponseEntity<String> updatePassword(@RequestBody String jsonbody) {

        System.out.println("update password request received");

        JsonReader reader = Json.createReader(new StringReader(jsonbody));
        JsonObject datajson = reader.readObject();

        String token = datajson.getString("token");
        String newpassword = datajson.getString("newpassword");
        String pw_hash = BCrypt.hashpw(newpassword, BCrypt.gensalt()); // Hash using Bcrypt library

        Boolean tokenvalidity = jwtUtils.validateJWT(token);
        if (tokenvalidity) {
            String email = jwtUtils.getJWTResetMail(token);
            Integer rowsupdated = stockRepo.updateUserPassword(email, pw_hash);
            if (rowsupdated == 1) {
                JsonObject responsejson = Json.createObjectBuilder()
                        .add("status", "User Password Updated !")
                        .build();
                return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
            } else {
                JsonObject responsejson = Json.createObjectBuilder()
                        .add("status", "Unable to update user password")
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
            }

        } else {
            System.out.println("Invalid Token!!!");
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Invalid Reset Token")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY).body(responsejson.toString());
        }

    }

    @GetMapping(value = "/resetEmail")
    public ResponseEntity<String> resetEmail(@RequestParam String email) {
        System.out.println(email);
        Account account = stockRepo.getUser(email);
        if (account != null) {
            String passresetJWT = this.jwtUtils.generatepassresetJWT(email);
            System.out.println(passresetJWT);
            String resetLink = "http://localhost:4200/reset/" + passresetJWT;

            String emailContent = String.format("""
                    <p>Your Stock XYZ account password reset link: <a href='%s'>Click here</a></p>
                    <p>Please ignore this email if you did not request a password reset.</p>
                    """, resetLink);

            Boolean emailsent = emailSvc.sendEmail(email, emailContent);
            if (emailsent) {
                JsonObject responsejson = Json.createObjectBuilder()
                        .add("status", "Password Reset Email Sent to your mailbox!")
                        .build();
                return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
            } else {
                JsonObject responsejson = Json.createObjectBuilder()
                        .add("status", "Failed to sent Reset Email")
                        .build();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
            }

        } else {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Account not existed!!!")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }

    }

    @GetMapping(value = "/getResetEmail")
    public ResponseEntity<String> getResetEmail(@RequestParam String token) {
        System.out.println(token);

        Boolean validjwt = jwtUtils.validateJWT(token);

        if (validjwt) {
            String email = jwtUtils.getJWTResetMail(token);
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "JWT validated")
                    .add("email", email)
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
        } else {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Invalid Reset Token")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }

    }

}
