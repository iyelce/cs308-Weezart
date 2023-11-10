package com.app.controllers;

import java.util.List;
import java.util.Map;

import javax.naming.directory.SearchResult;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.filter.JwtTokenFilter;
import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.Song;
import com.app.services.SpotifyService;
import com.app.spotify.SpotifyAuthenticator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@RestController
@RequestMapping("/api/spotify")
public class SpotifyController {
	
	private final SpotifyService spotifyService;
	
    private static final Logger log = LoggerFactory.getLogger(SpotifyController.class);
	
	@Autowired
	private final SpotifyAuthenticator spotifyAuthenticator;
	
    @Autowired
    public SpotifyController(SpotifyService spotifyService, SpotifyAuthenticator spotifyAuthenticator) {
        this.spotifyService = spotifyService;
        this.spotifyAuthenticator = spotifyAuthenticator;
    }

    @GetMapping("/search-artist")
    public ResponseEntity<List<Artist>> searchArtist(@RequestParam String query, @RequestParam String type) throws JsonMappingException, JsonProcessingException {
        
    	log.info("search edicem");
    	
    	List<Artist> results = spotifyService.artistSearch(query, type, spotifyAuthenticator.authenticateWithSpotify());
        return ResponseEntity.ok(results);
    }
    
    @GetMapping("/search-song")
    public ResponseEntity<List<Song>> searchSong(@RequestParam String query) throws JsonMappingException, JsonProcessingException {
    	List<Song> results = spotifyService.songSearch(query, spotifyAuthenticator.authenticateWithSpotify());
    	
    	return ResponseEntity.ok(results);
    }
    
    @GetMapping("/search-album")
    public ResponseEntity<List<Album>> searchAlbum(@RequestParam String query) throws JsonMappingException, JsonProcessingException {
    	List<Album> results = spotifyService.albumSearch(query, spotifyAuthenticator.authenticateWithSpotify());
    	
    	return ResponseEntity.ok(results);
    }
    
    @GetMapping("/get-songs-from-album")
    public ResponseEntity<Map<String, String>> getSongFromAlbum(@RequestParam String albumId) throws JsonMappingException, JsonProcessingException {
    	Map<String, String> songIdsAndNames = spotifyService.getSongFromAlbum(albumId, spotifyAuthenticator.authenticateWithSpotify());
    	
    	return ResponseEntity.ok(songIdsAndNames);
    }
}
