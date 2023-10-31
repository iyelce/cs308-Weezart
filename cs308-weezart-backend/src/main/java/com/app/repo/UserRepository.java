package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.models.User;

public interface UserRepository extends JpaRepository<User, String> {
	User findByUsername(String username);

}
