package com.app.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.models.*;
import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;
import com.app.repo.*;
import com.app.services.LikeService;
import com.app.services.SpotifyService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/like")
public class LikeController {

	@Autowired
	private LikeService likeService;

	@Autowired
	private SongRepository songRepo;
	
	@Autowired
	private AlbumRepository albumRepo;
	
	@Autowired
	private ArtistRepository artistRepo;

	@Autowired
	private UserSongRepository userSongRepo;
	
	@Autowired
	private UserAlbumRepository userAlbumRepo;
	
	@Autowired
	private UserArtistRepository userArtistRepo;

	private static final Logger log = LoggerFactory.getLogger(SpotifyService.class);

	@PostMapping("/song/{userId}")
	public ResponseEntity<UserSong> likeSong(@RequestBody SongPayload songPayload, @PathVariable String userId) {
		UserSong likeSongRelation = likeService.relateLikeSong(songPayload, userId);

		return ResponseEntity.ok(likeSongRelation);
	}

	@PostMapping("/artist/{userId}")
	public ResponseEntity<UserArtist> likeArtist(@RequestBody ArtistPayload artistPayload,
			@PathVariable String userId) {
		UserArtist likeArtistRelation = likeService.relateLikeArtist(artistPayload, userId);

		return ResponseEntity.ok(likeArtistRelation);
	}

	@PostMapping("/album/{userId}")
	public ResponseEntity<UserAlbum> likeAlbum(@RequestBody AlbumPayload albumPayload, @PathVariable String userId) {
		UserAlbum likeAlbumRelation = likeService.relateLikeAlbum(albumPayload, userId);

		return ResponseEntity.ok(likeAlbumRelation);
	}

	@GetMapping("/song/get-like-info/{songId}/{userId}")
	public ResponseEntity<Boolean> getLikeStatusSong(@PathVariable String songId, @PathVariable String userId) {
		Song givenSong = songRepo.findByid(songId);
		User givenUser = new User(Long.parseLong(userId));

		UserSong givenRelation = userSongRepo.findBySongAndUser(givenSong, givenUser);

		boolean likeStatus = givenRelation.isLiked();
		if(likeStatus) log.info("liked");

		else log.info("not liked");
		return ResponseEntity.ok(likeStatus);
	}
	
	@GetMapping("/album/get-like-info/{albumId}/{userId}")
	public ResponseEntity<Boolean> getLikeStatusAlbum(@PathVariable String albumId, @PathVariable String userId) {
		Album givenAlbum = albumRepo.findByid(albumId);
		User givenUser = new User(Long.parseLong(userId));

		UserAlbum givenRelation = userAlbumRepo.findByAlbumAndUser(givenAlbum, givenUser);

		boolean likeStatus = givenRelation.isLiked();
		if(likeStatus) log.info("liked");

		else log.info("not liked");
		return ResponseEntity.ok(likeStatus);
	}
	
	@GetMapping("/artist/get-like-info/{artistId}/{userId}")
	public ResponseEntity<Boolean> getLikeStatusArtist(@PathVariable String artistId, @PathVariable String userId) {
		Artist givenArtist = artistRepo.findByid(artistId);
		User givenUser = new User(Long.parseLong(userId));

		UserArtist givenRelation = userArtistRepo.findByArtistAndUser(givenArtist, givenUser);

		boolean likeStatus = givenRelation.isLiked();
		if(likeStatus) log.info("liked");

		else log.info("not liked");
		return ResponseEntity.ok(likeStatus);
	}
	
	
}
