package com.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;
import com.app.services.RemoveService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/remove")
public class RemoveController {

	@Autowired
	private RemoveService removeService;
	
	@PostMapping("/song/{userId}")
	public void removeSong(@RequestBody SongPayload song, @PathVariable String userId) {
		removeService.removeSong(song, userId);
	}
	
	@PostMapping("/artist/{userId}")
	public void removeArtist(@RequestBody ArtistPayload artist, @PathVariable String userId) {
		removeService.removeArtist(artist, userId);
	}
	
	@PostMapping("/album/{userId}")
	public void removeAlbum(@RequestBody AlbumPayload album, @PathVariable String userId) {
		removeService.removeAlbum(album, userId);
	}
	
}
