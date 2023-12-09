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
import com.app.services.RateService;
import com.app.services.SpotifyService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/rate")
public class RateController {

	@Autowired
	private RateService rateService;

	@Autowired
	private LikeService likeService;

	@Autowired
	private SongRepository songRepo;

	@Autowired
	private UserSongRepository userSongRepo;

	private static final Logger log = LoggerFactory.getLogger(SpotifyService.class);

	@PostMapping("/song/{userId}/{rating}")
	public ResponseEntity<UserSong> rateSong(@RequestBody SongPayload songPayload, @PathVariable String userId,
			@PathVariable int rating) {
		UserSong rateSongRelation = rateService.relateRateSong(songPayload, userId, rating);

		return ResponseEntity.ok(rateSongRelation);
	}

	@PostMapping("/artist/{userId}/{rating}")
	public ResponseEntity<UserArtist> rateArtist(@RequestBody ArtistPayload artistPayload, @PathVariable String userId,
			@PathVariable int rating) {
		UserArtist rateArtistRelation = rateService.relateRateArtist(artistPayload, userId, rating);

		return ResponseEntity.ok(rateArtistRelation);
	}

	@PostMapping("/album/{userId}/{rating}")
	public ResponseEntity<UserAlbum> rateAlbum(@RequestBody AlbumPayload albumPayload, @PathVariable String userId,
			@PathVariable int rating) {
		UserAlbum rateAlbumRelation = rateService.relateRateAlbum(albumPayload, userId, rating);

		return ResponseEntity.ok(rateAlbumRelation);
	}

	@GetMapping("/song/get-rate-info/{songId}/{userId}")
	public ResponseEntity<Integer> getLikeStatus(@PathVariable String songId, @PathVariable String userId) {
		Song givenSong = songRepo.findByid(songId);
		User givenUser = new User(Long.parseLong(userId));

		UserSong givenRelation = userSongRepo.findBySongAndUser(givenSong, givenUser);

		int lastRating = givenRelation.getRating().get(givenRelation.getRating().size() - 1);

		return ResponseEntity.ok(lastRating);
	}
}
