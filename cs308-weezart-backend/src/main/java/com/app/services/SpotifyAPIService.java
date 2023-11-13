package com.app.services;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class SpotifyAPIService {
	
	
	private final RestTemplate restTemplate = new RestTemplate();
	

	
    private static final Logger log = LoggerFactory.getLogger(SpotifyService.class);
	
	public Map<String, String> getSongFromAlbum(String albumId, String accessToken) throws JsonMappingException, JsonProcessingException {
			
			log.info(albumId);
			String searchUrl = "https://api.spotify.com/v1/albums/"+ albumId + "/tracks";
			log.info(searchUrl);
			HttpHeaders headers = new HttpHeaders();
			
			headers.set("Authorization", "Bearer " + accessToken);
			
			HttpEntity<String> entity = new HttpEntity<>(headers);
			
			ResponseEntity<String> responseEntity = restTemplate.exchange(searchUrl, HttpMethod.GET, entity, String.class);
			
			String songFromAlbumJson = responseEntity.getBody();
			
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
