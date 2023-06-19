package nus.iss.stockserver.services;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.mail.Authenticator;
import jakarta.mail.Message;
import jakarta.mail.MessagingException;
import jakarta.mail.Multipart;
import jakarta.mail.PasswordAuthentication;
import jakarta.mail.Session;
import jakarta.mail.Transport;
import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeBodyPart;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.internet.MimeMultipart;

@Service
public class EmailService {

        @Value("${emailpassword}")
        private String emailpassword;


    public Boolean sendEmail(String toemail , String msg) {

        System.out.println("send email request received");

        String title = "Stocksxyz Account Password Reset";

        try {
            Properties prop = new Properties();
            prop.put("mail.smtp.auth", true);
            prop.put("mail.smtp.starttls.enable", "true");
            prop.put("mail.smtp.host", "smtp.office365.com");
            prop.put("mail.smtp.port", "587");

            Session session = Session.getInstance(prop, new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication("stocksxyz@outlook.com", emailpassword);
                }
            });

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("stocksxyz@outlook.com"));
            message.setRecipients(
                    Message.RecipientType.TO, InternetAddress.parse(toemail));
            message.setSubject(title);

            MimeBodyPart mimeBodyPart = new MimeBodyPart();
            mimeBodyPart.setContent(msg, "text/html; charset=utf-8");

            Multipart multipart = new MimeMultipart();
            multipart.addBodyPart(mimeBodyPart);
            message.setContent(multipart);

            Transport.send(message);

            System.out.println("Email Sent....");
            return true;
        } catch (AddressException e) {
            e.printStackTrace();
            System.out.println("Failed to send email");
            return false;
        } catch (MessagingException e) {
            e.printStackTrace();
            System.out.println("Failed to send email");
            return false;
        }

    }
    
}
