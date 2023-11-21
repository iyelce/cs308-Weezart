package com.app.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserAlbum;
import com.app.models.UserArtist;
import com.app.models.UserSong;
import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;
import com.app.services.AddService;
import com.app.services.SpotifyService;
import com.app.services.UserServiceImpl.CustomException;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/add")
public class AddController {
	
	@Autowired private AddService addService;
	
    private static final Logger log = LoggerFactory.getLogger(SpotifyService.class);

	@PostMapping("/song/{userId}")
	public ResponseEntity<?> addSong(@RequestBody SongPayload songPayload, @PathVariable String userId) {
		
		log.info("şarkı ekliyom");
		try {
		addService.addSong(songPayload);
		
		log.info("şarkı ekledim, relate edicem");
		
		
		UserSong userSongRelation = addService.relateUserSong(songPayload, userId);
		
		log.info("relate ettim");
		return ResponseEntity.ok(userSongRelation);
		} catch(CustomException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
		
	}
	
	@PostMapping("/artist/{userId}")
	public ResponseEntity<?> addArtist(@RequestBody ArtistPayload artistPayload, @PathVariable String userId) {
		
		try { 
			addService.addArtist(artistPayload);
			
			UserArtist userArtistRelation = addService.relateUserArtist(artistPayload, userId);
			
			return ResponseEntity.ok(userArtistRelation);
		} catch(CustomException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
	}
	
	@PostMapping("/album/{userId}")
	public ResponseEntity<?> addAlbum(@RequestBody AlbumPayload albumPayload, @PathVariable String userId) {
		
		try {
			addService.addAlbum(albumPayload);
			
			log.info("album adding");
			
			UserAlbum userAlbumRelation = addService.relateUserAlbum(albumPayload, userId);
			
			log.info("album added");
			return ResponseEntity.ok(userAlbumRelation);
		}catch(CustomException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}
		
	}
	
	@PostMapping("/friend/{currentUsername}/{targetUsername}")
	public ResponseEntity<User> followUser(@PathVariable String currentUsername, @PathVariable String targetUsername) {
		
		User user = addService.followUser(currentUsername, targetUsername);
		
		return ResponseEntity.ok(user);
	}
}
