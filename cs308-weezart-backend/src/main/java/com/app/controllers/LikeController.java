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

import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserAlbum;
import com.app.models.UserArtist;
import com.app.models.UserSong;
import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;
import com.app.repo.SongRepository;
import com.app.repo.UserSongRepository;
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
	private UserSongRepository userSongRepo;

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
	public ResponseEntity<Boolean> getLikeStatus(@PathVariable String songId, @PathVariable String userId) {
		Song givenSong = songRepo.findByid(songId);
		User givenUser = new User(Long.parseLong(userId));

		UserSong givenRelation = userSongRepo.findBySongAndUser(givenSong, givenUser);

		boolean likeStatus = givenRelation.isLiked();

		return ResponseEntity.ok(likeStatus);
	}
}
