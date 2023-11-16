package com.app.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.models.Song;
import com.app.models.UserAlbum;
import com.app.models.UserArtist;
import com.app.models.UserSong;
import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;
import com.app.services.AddService;
import com.app.services.SpotifyService;

@RestController
@RequestMapping("/add")
public class AddController {
	
	@Autowired private AddService addService;
	
    private static final Logger log = LoggerFactory.getLogger(SpotifyService.class);

	@PostMapping("/song/{userId}")
	public ResponseEntity<UserSong> addSong(@RequestBody SongPayload songPayload, @PathVariable String userId) {
		
		log.info("şarkı ekliyom");
		
		addService.addSong(songPayload);
		
		log.info("şarkı ekledim, relate edicem");
		
		
		UserSong userSongRelation = addService.relateUserSong(songPayload, userId);
		
		log.info("relate ettim");
		
		return ResponseEntity.ok(userSongRelation);
	}
	
	@PostMapping("/artist/{userId}")
	public ResponseEntity<UserArtist> addArtist(@RequestBody ArtistPayload artistPayload, @PathVariable String userId) {
		
		addService.addArtist(artistPayload);
		
		UserArtist userArtistRelation = addService.relateUserArtist(artistPayload, userId);
		
		return ResponseEntity.ok(userArtistRelation);
	}
	
	@PostMapping("/album/{userId}")
	public ResponseEntity<UserAlbum> addAlbum(@RequestBody AlbumPayload albumPayload, @PathVariable String userId) {
		
		addService.addAlbum(albumPayload);
		
		UserAlbum userAlbumRelation = addService.relateUserAlbum(albumPayload, userId);
		
		return ResponseEntity.ok(userAlbumRelation);
	}
}
