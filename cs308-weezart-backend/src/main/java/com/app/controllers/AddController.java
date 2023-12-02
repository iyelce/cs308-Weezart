package com.app.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserAlbum;
import com.app.models.UserArtist;
import com.app.models.UserSong;
import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;
import com.app.repo.AlbumRepository;
import com.app.repo.ArtistRepository;
import com.app.repo.SongRepository;
import com.app.repo.UserSongRepository;
import com.app.services.AddService;
import com.app.services.SpotifyService;
import com.app.services.UserServiceImpl.CustomException;
import com.app.spotify.SpotifyAuthenticator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/add")
public class AddController {

	@Autowired
	private AddService addService;
	@Autowired
	private SpotifyService spotifyService;
	@Autowired
	private SongRepository songRepo;
	@Autowired
	private UserSongRepository userSongRepo;
	@Autowired
	private AlbumRepository albumRepo;
	@Autowired
	private ArtistRepository artistRepo;
	@Autowired
	private SpotifyAuthenticator spotifyAuth;

	private static final Logger log = LoggerFactory.getLogger(SpotifyService.class);

	@GetMapping("/manual-song-assisted/{songQuery}/{artistQuery}/{userId}")
	public ResponseEntity<?> addSongManual(@PathVariable String songQuery, @PathVariable String artistQuery,
			@PathVariable String userId) throws JsonMappingException, JsonProcessingException {

		String query = songQuery + " " + artistQuery;
		Song didYouMeanSong = spotifyService.songSearch(query, spotifyAuth.authenticateWithSpotify()).get(0);

		return ResponseEntity.ok(didYouMeanSong);

	}

	@PostMapping("/manual-song-accepted/{userId}")
	public ResponseEntity<?> maybeBaby(@RequestBody SongPayload songPayload, @PathVariable String userId)
			throws JsonMappingException, JsonProcessingException {

		try {
			Song didYouMeanSong = new Song(songPayload);
			
			log.info("song id:_____" + didYouMeanSong.getId());
			
			log.info(songPayload.toString());
	
			if (songRepo.findByid(didYouMeanSong.getId()) == null) {
				songRepo.save(didYouMeanSong);
			}
			UserSong userSong = addService.relateUserSong(songPayload, userId);
	
			for (String artistName : didYouMeanSong.getArtistsName()) {
				log.info("artist kaydedecem-----" + artistName);
	
				Artist artist = spotifyService.artistSearch(artistName, spotifyAuth.authenticateWithSpotify()).get(0);
	
				log.info("artist kaydediyooommmmmm");
				log.info(artist.getName());
				artistRepo.save(artist);
				log.info("artist kayedttiimm");
				ArtistPayload artistPayload = new ArtistPayload(artist);
	
				addService.relateUserArtist(artistPayload, userId);
	
			}
	
			log.info("album kaydedecem-------" + didYouMeanSong.getAlbumName());
			Album album = spotifyService.albumSearch(didYouMeanSong.getAlbumName() + " " + didYouMeanSong.getName(),
					spotifyAuth.authenticateWithSpotify()).get(0);
			albumRepo.save(album);
			log.info("albumun insoun=hun alayyimrim" + album.getArtistsName().get(0));
			AlbumPayload albumPayload = new AlbumPayload(album);
			addService.relateUserAlbum(albumPayload, userId);
			return ResponseEntity.ok("SONG_SAVED");

		} catch(CustomException e) {
			String errorMessage = "SONG_ALREADY_EXISTS";
			log.info(errorMessage);
			return new ResponseEntity<>(errorMessage, HttpStatus.BAD_REQUEST);
		}

	}

	// note for analysis later: -1 population and -1 follower count means they are
	// unique and therefore no info is present
	@PostMapping("/manual-song-unique/{userId}")
	public ResponseEntity<?> addSongUnique(@RequestBody SongPayload songPayload, @PathVariable String userId) {

		String idGenerator = UUID.randomUUID().toString().replaceAll("-", "").substring(7);
		songPayload.setId("wzrtsng_" + idGenerator); // allows duplicates, TODO: decide what counts as duplicate.
														// just the name? all the payload info?

		// same thing here as below except there might be more than one artist. in case
		// it is a
		// mix between "known" and "unknown" unique artists, a new list or artist id's
		// are created and if the artist name isn't found on the database (i.e. it is an
		// "unknown" artist) a new id is generated for them; if the artist name is found
		// on the database (i.e. it is a "known" artist), then that artist's id is
		// added.

		List<String> artistNameList = songPayload.getArtistsName();
		List<String> newList = new ArrayList<>();

		for (String artistName : artistNameList) {
			if (artistRepo.findByName(artistName) == null) {
				String idGeneratorArt = UUID.randomUUID().toString().replaceAll("-", "").substring(7);
				newList.add("wzrtart_" + idGeneratorArt);

				Artist current = new Artist(artistName, null, "", -1, "wzrtart_" + idGeneratorArt);

				artistRepo.save(current);

				ArtistPayload artistPay = new ArtistPayload(current);

				addService.relateUserArtist(artistPay, userId);

			} else {
				newList.add(artistRepo.findByName(artistName).getId());
			}
		}

		songPayload.setArtistsId(newList);

		// if the unique album is not already stored in the master album table, assign a
		// new custom id to the album

		// once the function ends and saves the resulting song, album and artist to the
		// database, it will have been saved by its custom id

		// therefore if another unique album is attempted to be saved, the IDs will
		// match and the song will be linked to the existing album

		if (albumRepo.findByName(songPayload.getAlbumName()) == null) {

			int numOfTracks = 1;
			List<String> songIds = new ArrayList<>();
			songIds.add(songPayload.getId());

			List<String> songNames = new ArrayList<>();
			songNames.add(songPayload.getName());

			String idGeneratorAlb = UUID.randomUUID().toString().replaceAll("-", "").substring(7);
			songPayload.setAlbumId("wzrtalb_" + idGeneratorAlb);
			Album album = new Album(songPayload.getAlbumId(), songPayload.getAlbumName(), null,
					songPayload.getAlbumRelease(), numOfTracks, songPayload.getArtistsName(),
					songPayload.getArtistsId(), songNames, songIds);

			albumRepo.save(album);

			AlbumPayload albumPayload = new AlbumPayload(album);

			addService.relateUserAlbum(albumPayload, userId);

			// addService.relateUserAlbum(album, userId);
		} else {

			Album currentAlbum = albumRepo.findByName(songPayload.getAlbumName());
			if (!currentAlbum.getSongsName().contains(songPayload.getName())) {
				currentAlbum.getSongsName().add(songPayload.getName());
				currentAlbum.getSongsId().add(songPayload.getId());
				currentAlbum.setNumberOfTracks(currentAlbum.getNumberOfTracks() + 1);
			}
		}

		songPayload.setPopularity(-1);

		Song givenSong = new Song(songPayload.getId(), songPayload.getAlbumImageURL(), songPayload.getName(), songPayload.getAlbumName(),
				songPayload.getAlbumId(), songPayload.getArtistsName(), songPayload.getArtistsId(),
				songPayload.getPopularity(), songPayload.getDuration_ms(), songPayload.isExplicit(),
				songPayload.getAlbumRelease());

		songRepo.save(givenSong);

		return ResponseEntity.ok(addService.relateUserSong(songPayload, userId));

	}

	@PostMapping("/song/{userId}")
	public ResponseEntity<?> addSong(@RequestBody SongPayload songPayload, @PathVariable String userId) {

		log.info("şarkı ekliyom");
		try {
			addService.addSong(songPayload);

			log.info("şarkı ekledim, relate edicem");

			UserSong userSongRelation = addService.relateUserSong(songPayload, userId);

			log.info("relate ettim");
			return ResponseEntity.ok(userSongRelation);
		} catch (CustomException e) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
		}

	}

	@PostMapping("/artist/{userId}")
	public ResponseEntity<?> addArtist(@RequestBody ArtistPayload artistPayload, @PathVariable String userId) {

		try {
			addService.addArtist(artistPayload);

			UserArtist userArtistRelation = addService.relateUserArtist(artistPayload, userId);

			return ResponseEntity.ok(userArtistRelation);
		} catch (CustomException e) {
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
		} catch (CustomException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
		}

	}

	@PostMapping("/friend/{currentUsername}/{targetUsername}")
	public ResponseEntity<User> followUser(@PathVariable String currentUsername, @PathVariable String targetUsername) {

		User user = addService.followUser(currentUsername, targetUsername);

		return ResponseEntity.ok(user);
	}
}
