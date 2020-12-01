package com.example.TradeHub.services;

import com.example.TradeHub.entities.Auction;
import com.example.TradeHub.entities.User;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ui.freemarker.FreeMarkerTemplateUtils;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class MailService {

    @Autowired
    JavaMailSender javaMailSender;

    @Autowired
    Configuration configuration;

    private final String imageUrl = "https://i.ibb.co/1ZWs10d/logo.png";

    public void notifyPreviousHighestBidderWithEmail(Auction auction, User user) throws MessagingException, IOException, TemplateException {
        final String emailRecipient = user.getEmail();
        MimeMessage message = javaMailSender.createMimeMessage();
        var model = this.newHighestBidderEmailDetails(auction, user);

        MimeMessageHelper helper = new MimeMessageHelper(message,
                MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED,
                StandardCharsets.UTF_8.name());

        Template template = configuration.getTemplate("email-template.ftl");
        String html = FreeMarkerTemplateUtils.processTemplateIntoString(template, model);
        helper.setTo(emailRecipient);
        helper.setText(html, true);
        helper.setSubject("Du har blivit överbjuden");
        helper.setFrom("TradeHub");
        javaMailSender.send(message);
    }

    private Map<String, Object> newHighestBidderEmailDetails(Auction auction, User user){
        Map<String, Object> model = new HashMap<>();
        model.put("name", user.getFullName());
        model.put("auctionTitle", auction.getTitle());
        model.put("newBid", auction.getHighestBid());
        model.put("auctionLink", "http://localhost:3000/" /* auction.getId() */);
        model.put("imageUrl", imageUrl);
        return model;
    }

}
