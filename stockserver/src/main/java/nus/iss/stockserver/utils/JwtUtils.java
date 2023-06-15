package nus.iss.stockserver.utils;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512); // Random secret key , change when server restart
    private static final long EXPIRATION_TIME = 864_000_000; // 10 days

    public void generateJWT(String email) {
        // Generate JWT Token
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + EXPIRATION_TIME);

        String jwtToken = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SECRET_KEY)
                .compact();

        System.out.println(">>> SECRET:" + SECRET_KEY);
        System.out.println(">>> JWTTOKEN:" + jwtToken);     
    }

     public void validateJWT(String jwtToken) {
        // Validate JWT Token
        Jws<Claims> claimsJws;
        try {
            claimsJws = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(jwtToken);

            System.out.println(">>> JWT is valid.");

            // Get JWT Subject
            String subject = claimsJws.getBody().getSubject();
            System.out.println(">>> JWT Subject: " + subject);

        } catch (Exception e) {
            System.out.println(">>> JWT is invalid.");
        }

    }
    
}
