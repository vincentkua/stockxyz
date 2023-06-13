package nus.iss.stockserver.models;

public class Account {
    private Integer id;
    private String email;
    private String hpassword;
    private String roles;
    public Account() {
    }
    public Account(Integer id, String email, String hpassword, String roles) {
        this.id = id;
        this.email = email;
        this.hpassword = hpassword;
        this.roles = roles;
    }
    public Integer getId() {
        return id;
    }
    public void setId(Integer id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getHpassword() {
        return hpassword;
    }
    public void setHpassword(String hpassword) {
        this.hpassword = hpassword;
    }
    public String getRoles() {
        return roles;
    }
    public void setRoles(String roles) {
        this.roles = roles;
    }
    @Override
    public String toString() {
        return "Account [id=" + id + ", email=" + email + ", hpassword=" + hpassword + ", roles=" + roles + "]";
    }  
    
    
}
