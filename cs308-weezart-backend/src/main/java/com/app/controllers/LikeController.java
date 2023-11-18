package com.app.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.app.models.UserAlbum;
import com.app.models.UserArtist;
import com.app.models.UserSong;
import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;
import com.app.services.LikeService;
import com.app.services.SpotifyService;

@RestController
@RequestMapping("/like")
public class LikeController {
	
	@Autowired private LikeService likeService;
	
    private static final Logger log = LoggerFactory.getLogger(SpotifyService.class);
    
    @PostMapping("/song/{userId}")
    public ResponseEntity<UserSong> likeSong(@RequestBody SongPayload songPayload, @PathVariable String userId) {
    	UserSong likeSongRelation = likeService.relateLikeSong(songPayload, userId);
    	
    	return ResponseEntity.ok(likeSongRelation);
    }
    
    @PostMapping("/artist/{userId}")
    public ResponseEntity<UserArtist> likeArtist(@RequestBody ArtistPayload artistPayload, @PathVariable String userId) {
    	UserArtist likeArtistRelation = likeService.relateLikeArtist(artistPayload, userId);
    	
    	return ResponseEntity.ok(likeArtistRelation);
    }
    
    @PostMapping("/album/{userId}")
    public ResponseEntity<UserAlbum> likeAlbum(@RequestBody AlbumPayload albumPayload, @PathVariable String userId) {
    	UserAlbum likeAlbumRelation = likeService.relateLikeAlbum(albumPayload, userId);
    	
    	return ResponseEntity.ok(likeAlbumRelation);
    }
}
