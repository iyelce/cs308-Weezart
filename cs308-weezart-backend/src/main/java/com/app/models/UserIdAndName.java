package com.app.models;

public class UserIdAndName {

	String userId;
	String username;

	public UserIdAndName(String userId, String username) {
		super();
		this.userId = userId;
		this.username = username;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
}
