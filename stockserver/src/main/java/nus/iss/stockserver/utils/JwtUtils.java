package nus.iss.stockserver.utils;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import nus.iss.stockserver.models.Account;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtils {

    private static final Key SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512); // Random secret key , change
                                                                                       // when server restart
    private static final long EXPIRATION_TIME = 864_000_000; // 10 days

    private static final long RESET_TIME = 600_000; // 10 minutes

    public String generateJWT(String email, String role) {
        // Generate JWT Token
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + EXPIRATION_TIME);

        String jwtToken = Jwts.builder()
                .setSubject(email)
                .claim("role", role) // Add role as a custom claim
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SECRET_KEY)
                .compact();

        // System.out.println(">>> SECRET:" + SECRET_KEY);
        // System.out.println(">>> JWTTOKEN:" + jwtToken);

        return jwtToken;
    }

    public boolean validateJWT(String jwtToken) {

        try {
            Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(jwtToken);

            System.out.println(">>> JWT Token Validated.");
            // System.out.println(claimsJws.toString());
            return true;

        } catch (ExpiredJwtException e) {
            System.out.println(">>> JWT is expired.");
            // Handle token expiration
            return false;
        } catch (UnsupportedJwtException e) {
            System.out.println(">>> Unsupported JWT.");
            // Handle unsupported token
            return false;
        } catch (Exception e) {
            System.out.println(">>> JWT is invalid: " + e.getMessage());
            // Handle other exceptions
            return false;
        }

    }

    public Account getJWTaccount(String jwtToken) {

        Account account = new Account();
        Jws<Claims> claimsJws;
        try {
            claimsJws = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(jwtToken);

            // Get JWT Subject (Email)
            String subject = claimsJws.getBody().getSubject();
            account.setEmail(subject);

            // Get custom claims
            String role = claimsJws.getBody().get("role", String.class);
            account.setRoles(role);

            return account;

        } catch (Exception e) {
            System.out.println(">>> error while parsing jwt email and roles ");
            return null;
        }
    }

    public String generatepassresetJWT(String email) {
        // Generate JWT Token
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + RESET_TIME);

        String jwtToken = Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .signWith(SECRET_KEY)
                .compact();

        // System.out.println(">>> SECRET:" + SECRET_KEY);
        // System.out.println(">>> JWTTOKEN:" + jwtToken);

        return jwtToken;
    }

    public String getJWTResetMail(String jwtToken) {
        Jws<Claims> claimsJws;
        try {
            claimsJws = Jwts.parserBuilder()
                    .setSigningKey(SECRET_KEY)
                    .build()
                    .parseClaimsJws(jwtToken);

            // Get JWT Subject (Email)
            String subject = claimsJws.getBody().getSubject();

            return subject;

        } catch (Exception e) {
            System.out.println(">>> error while parsing jwt email and roles ");
            return null;
        }
    }

}
