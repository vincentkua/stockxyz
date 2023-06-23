package nus.iss.stockserver.repository;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import nus.iss.stockserver.models.Notification;

@Repository
public class NotificationRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String INSERTSQL = "insert into notification(title , content) values (? , ? )";

    public Integer insertNotification(String title, String content) {
        Integer rowsupdated = jdbcTemplate.update(INSERTSQL, title, content);
        return rowsupdated;
    }

    private static final String GETSQL = "select * from notification ORDER BY id DESC";

    public List<Notification> getNotifications() {
        List<Notification> notifications = new LinkedList<>();
        notifications = jdbcTemplate.query(GETSQL, BeanPropertyRowMapper.newInstance(Notification.class));
        System.out.println(notifications);
        return notifications;
    }


    private static final String DELETESQL = "delete from notification where id > 0";

    public Integer deleteNotification() {
        Integer rowsupdated = jdbcTemplate.update(DELETESQL);
        return rowsupdated;
    }

}
