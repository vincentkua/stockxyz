package nus.iss.stockserver.models;

import java.sql.Timestamp;

public class Notification {

    private Integer id;
    private String title ;
    private String content;
    private Timestamp uploaded;
    public Notification() {
    }
    public Notification(Integer id, String title, String content, Timestamp uploaded) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.uploaded = uploaded;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public Timestamp getUploaded() {
        return uploaded;
    }
    public void setUploaded(Timestamp uploaded) {
        this.uploaded = uploaded;
    }
    @Override
    public String toString() {
        return "Notification [id=" + id + ", title=" + title + ", content=" + content + ", uploaded=" + uploaded + "]";
    }

    

    

    

    
}
