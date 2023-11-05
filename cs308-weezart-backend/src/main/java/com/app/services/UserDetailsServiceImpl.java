package com.app.services;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.models.User;
import com.app.repo.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByUsername(username);
		if(user != null) {
			return createUserDetails(user.getUsername(), user.getPassword(), user.getAuthority());
		}
		throw new UsernameNotFoundException("Username not found");
	}

	private UserDetails createUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities) {
    	UserDetails user = new org.springframework.security.core.userdetails.User(
                username,
                password,
                authorities
            );
    	
        return user;
    }

}
