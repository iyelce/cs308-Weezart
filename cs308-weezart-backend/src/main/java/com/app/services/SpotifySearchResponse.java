package com.app.services;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.Song;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class SpotifySearchResponse {
//	public Song songJsonParser(String songJson) throws JsonMappingException, JsonProcessingException {
//		//ObjectMapper objectMapper = new ObjectMapper();
//		
//		//JsonNode rootNode = objectMapper.readTree(songJson);
//		
//		
//	}
	
    private static final Logger log = LoggerFactory.getLogger(SpotifyService.class);

	
	public Album albumJsonParser(String albumJson) throws JsonMappingException, JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		
		Album album = objectMapper.readValue(albumJson, Album.class);
		
		return album;
	}
	
	public List<Artist> artistJsonParser(String artistJson) throws JsonMappingException, JsonProcessingException {
		
		String name = "", imageUrl = "";
		List<String> genres = new ArrayList<>();
		int followerCount = 0;
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		JsonNode rootNode = objectMapper.readTree(artistJson);
		
		log.info("root aldım");
		
		JsonNode artistsNode = rootNode.get("artists");
		
		JsonNode itemsNode = artistsNode.get("items");
		
		log.info("items aldım");
		
		List<Artist> artistList = new ArrayList<>();
		
		int count = 0;
		
		for(JsonNode item : itemsNode) {
			
			log.info("her itemi aldım " + count);
			
			
			JsonNode followersNode = item.get("followers");
			
			
			log.info("follower aldım ");
			
			if(followersNode != null)  {followerCount= followersNode.get("total").asInt();}

			
			JsonNode genresNode = item.get("genres");
			
			log.info("genres aldım");
			
			if(genresNode != null)  {
				
				for(JsonNode genreNode : genresNode) {
					genres.add(genreNode.asText());
				}
			}
		
		JsonNode imagesNode = item.get("images");

		if(imagesNode != null)  {imageUrl = imagesNode.get(0).get("url").asText();}
			
		
		name = item.get("name").asText();
		
		
		Artist artist = new Artist(name, genres, imageUrl, followerCount);
		
		artistList.add(artist);		
		}		
		return artistList;
	}
}
