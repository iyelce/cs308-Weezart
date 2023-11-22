package com.app.models;

public class AuthenticationResponse {
    private final String token;
    private final Long userId;

    public AuthenticationResponse(String token, Long userId) {
        this.token = token;
        this.userId = userId;
    }

    public String getToken() {
        return token;
    }

    public Long getUserId() {
        return userId;
    }
}

