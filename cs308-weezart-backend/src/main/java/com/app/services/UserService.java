package com.app.services;

import com.app.models.User;

public interface UserService {
	User createUser(String username, String passwordHashed, String email);
}
