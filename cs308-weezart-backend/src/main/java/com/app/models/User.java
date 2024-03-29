package com.app.models;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long iduser;
	private String username;
	private String password;
	private String email;
	private GrantedAuthority authority;
	private List<String> followers;
	private List<String> following;
	
	
	
	public User() {
		super();
	}

	public User(long iduser) {
		super();
		this.iduser = iduser;
	}
	
	public long getiduser() {
		return iduser;
	}
	public void setiduser(long iduser) {
		this.iduser = iduser;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Collection<? extends GrantedAuthority> getAuthority() {
        return Collections.singletonList(authority);
    }
	public void setAuthority(String role) {
		this.authority = new SimpleGrantedAuthority(role);
	}

	public List<String> getFollowers() {
		return followers;
	}

	public void setFollowers(List<String> followers) {
		this.followers = followers;
	}

	public List<String> getFollowing() {
		return following;
	}

	public void setFollowing(List<String> following) {
		this.following = following;
	}
	
	public boolean hasRole(String role) {
        return authority.getAuthority().equals(role);
    }
	
}
