package com.app.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserAlbum;
import com.app.models.UserArtist;
import com.app.models.UserSong;
import com.app.repo.UserRepository;
import com.app.services.AddService;
import com.app.services.UserService;
import com.app.services.UserServiceImpl.CustomException;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/user")
public class UserController {

	private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private AddService addService;
	
	@Autowired
	private UserDetailsService userDetailsService;
		
	
	@GetMapping("/profile/{userId}")
	public ResponseEntity<?> getUserProfileById(@PathVariable String userId) {
		
		try {
			User user = userService.getProfileById(userId);
							
			log.info("user RETURNED");
			return ResponseEntity.ok(user);
		} catch(CustomException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
			
		}
	}
	
	@GetMapping("/added-songs/{userId}")
	public ResponseEntity<?> getAddedSongsById(@PathVariable String userId) {
		try {
			List<UserSong> songs = addService.addedSongs(userId);
			return ResponseEntity.ok(songs);
		}
		catch (CustomException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
	}
	
	@GetMapping("/added-albums/{userId}")
	public ResponseEntity<?> getAddedAlbumsById(@PathVariable String userId) {
		
		try {
			List<UserAlbum> albums = addService.addedAlbums(userId);
			return ResponseEntity.ok(albums);

		}catch (CustomException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
	}
	
	@GetMapping("/added-artists/{userId}")
	public ResponseEntity<?> getAddedArtistsById(@PathVariable String userId) {
		
		try {
			List<UserArtist> artists = addService.addedArtists(userId);
			return ResponseEntity.ok(artists);

		}catch (CustomException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		}
		
	}
	
	

}
