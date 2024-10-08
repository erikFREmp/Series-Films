package com.example.demo.model.dto;

public class UserTokenDto {
	private String username;
    private String token;
    
    public UserTokenDto(String username, String token) {
        this.username = username;
        this.token = token;
    }

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
