package com.app.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	
	public List<Artist> artistJsonParser(String artistJson) throws JsonMappingException, JsonProcessingException {
		
		String name = "", imageUrl = "", id = "";
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
			
			
			id = item.get("id").asText();
		
			
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
		
		
		Artist artist = new Artist(name, genres, imageUrl, followerCount, id);
		
		artistList.add(artist);		
		}		
		return artistList;
	}
	
	public List<Song> songJsonParser(String songJson) throws JsonMappingException, JsonProcessingException {
			
		List<Song> songList = new ArrayList<>();
		
		String id = "", name = "", albumName = "", albumId = "";
		int popularity = 0, duration_ms = 0;
		boolean explicit = false;
		
		ObjectMapper objectMapper = new ObjectMapper();
		
		JsonNode rootNode = objectMapper.readTree(songJson);
		
		JsonNode songNode = rootNode.get("tracks");
		
		JsonNode itemsNode = songNode.get("items");
		
		for(JsonNode item : itemsNode) {	
			
			List<String> artistsName = new ArrayList<>();
			List<String> artistsId = new ArrayList<>();
			
			id = item.get("id").asText();
			
			name = item.get("name").asText();
			
			popularity = item.get("popularity").asInt();
			
			duration_ms = item.get("duration_ms").asInt();
			
			explicit = item.get("explicit").asBoolean();
			
			JsonNode albumNode = item.get("album");
			
			albumId = albumNode.get("id").asText();
			
			albumName = albumNode.get("name").asText();
			
			JsonNode artistNode = item.get("artists");
			
			for(JsonNode artists : artistNode) {
				artistsName.add(artists.get("name").asText());
				artistsId.add(artists.get("id").asText());
			}
			
			Song song = new Song(id, name, albumName, albumId, artistsName, artistsId, popularity, duration_ms, explicit);
			songList.add(song);
		}
		
		return songList;	
	}
	
	public List<Album> albumJsonParser(String albumJson) throws JsonMappingException, JsonProcessingException {
		
		//TODO songsName and songsId needs a different API call, somehow implement that
		
		List<Album> albumList = new ArrayList<>();
		
		String id = "", name = "", imageUrl = "", releaseDate = "";
		int numberOfTracks = 0;
		
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode rootNode = objectMapper.readTree(albumJson);
		
		JsonNode albumNode = rootNode.get("albums");
		
		JsonNode itemsNode = albumNode.get("items");
		
		for(JsonNode item : itemsNode) {
			
			List<String> songsName = new ArrayList<>();
			List<String> songsId = new ArrayList<>();
			List<String> artistsName = new ArrayList<>();
			List<String> artistsId = new ArrayList<>();
			
			id = item.get("id").asText();
			name = item.get("name").asText();
			releaseDate = item.get("release_date").asText();
			numberOfTracks = item.get("total_tracks").asInt();
			
			JsonNode imageNode = item.get("images");
			imageUrl = imageNode.get(0).get("url").asText();
			
			JsonNode artistsNode = item.get("artists");
			
			for(JsonNode artist : artistsNode) {
				if(artist.get("name") != null) {artistsName.add(artist.get("name").asText()); }
				if(artist.get("id")!= null) {artistsId.add(artist.get("id").asText()); }
			}
			
			Album album = new Album(id, name, imageUrl, releaseDate, numberOfTracks, artistsName, artistsId);
			albumList.add(album);
		}
		return albumList;
	}

	public Map<String, String> songFromAlbumParser(String songFromAlbumJson) throws JsonMappingException, JsonProcessingException {
		
		Map<String, String> songIdsAndNames = new HashMap<>();
		
		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode rootNode = objectMapper.readTree(songFromAlbumJson);
		
		JsonNode itemsNode = rootNode.get("items");
		
		for(JsonNode item : itemsNode) {
			songIdsAndNames.put(item.get("id").asText(), item.get("name").asText());
		}
		
		return songIdsAndNames;
	}

}
