package com.app.services;import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.app.controllers.SpotifyController;
import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.Song;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

@Service
public class SpotifyService {
	
    private final RestTemplate restTemplate = new RestTemplate();

    private static final Logger log = LoggerFactory.getLogger(SpotifyService.class);
    
    private final SpotifySearchResponse spotifySearchResponse = new SpotifySearchResponse();
	

	public List<Artist> artistSearch(String query, String accessToken) throws JsonMappingException, JsonProcessingException {
		 	String searchUrl = "https://api.spotify.com/v1/search?q=" + query + "&type=artist";
		    HttpHeaders headers = new HttpHeaders();
		    
		    log.info(accessToken);
		    headers.set("Authorization", "Bearer " + accessToken);

		    HttpEntity<String> entity = new HttpEntity<>(headers);
		    
		    log.info("authentication yolluyorum");

		    ResponseEntity<String> responseEntity = restTemplate.exchange(searchUrl, HttpMethod.GET, entity, String.class);

		    log.info("response da geldi oldu sayılır");
		    
		    //log.info(responseEntity.toString());
		    
		    // Process the JSON response and extract artists
		    List<Artist> artists = spotifySearchResponse.artistJsonParser(responseEntity.getBody());
		    
		    return artists;
	}
	
	public List<Song> songSearch(String query, String accessToken) throws JsonMappingException, JsonProcessingException {
		String searchUrl = "https://api.spotify.com/v1/search?q=" + query + "&type=track";
	    HttpHeaders headers = new HttpHeaders();
	    
	    log.info(accessToken);
	    headers.set("Authorization", "Bearer " + accessToken);

	    HttpEntity<String> entity = new HttpEntity<>(headers);
	    
	    log.info("authentication yolluyorum");

	    ResponseEntity<String> responseEntity = restTemplate.exchange(searchUrl, HttpMethod.GET, entity, String.class);

	    log.info("response da geldi oldu sayılır");
	    
	    //log.info(responseEntity.toString());
	    
	    // Process the JSON response and extract artists
	    List<Song> songs = spotifySearchResponse.songJsonParser(responseEntity.getBody());
	    
	    return songs;
	}
	
	public List<Album> albumSearch(String query, String accessToken) throws JsonMappingException, JsonProcessingException {
		String searchUrl = "https://api.spotify.com/v1/search?q=" + query + "&type=album";
	    HttpHeaders headers = new HttpHeaders();
	    
	    log.info(accessToken);
	    headers.set("Authorization", "Bearer " + accessToken);

	    HttpEntity<String> entity = new HttpEntity<>(headers);
	    
	    log.info("authentication yolluyorum");

	    ResponseEntity<String> responseEntity = restTemplate.exchange(searchUrl, HttpMethod.GET, entity, String.class);

	    log.info("response da geldi oldu sayılır");
	    
	    //log.info(responseEntity.toString());
	    
	    // Process the JSON response and extract artists
	    List<Album> albums = spotifySearchResponse.albumJsonParser(responseEntity.getBody(), accessToken);
	    
	    return albums;
	}

	

}
