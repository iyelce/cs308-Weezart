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

import com.app.models.LikeArtist;
import com.app.models.LikeSong;
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
    public ResponseEntity<LikeSong> likeSong(@RequestBody SongPayload songPayload, @PathVariable String userId) {
    	LikeSong likeSongRelation = likeService.relateLikeSong(songPayload, userId);
    	
    	return ResponseEntity.ok(likeSongRelation);
    }
    
    @PostMapping("/artist/{userId}")
    public ResponseEntity<LikeArtist> likeArtist(@RequestBody ArtistPayload artistPayload, @PathVariable String userId) {
    	LikeArtist likeArtistRelation = likeService.relateLikeArtist(artistPayload, userId);
    	
    	return ResponseEntity.ok(likeArtistRelation);
    }
}
