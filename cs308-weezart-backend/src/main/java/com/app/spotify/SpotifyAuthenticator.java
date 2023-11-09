package com.app.spotify;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.app.controllers.SpotifyController;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class SpotifyAuthenticator {
	
	@Value("${spotify.id}")
	private String clientId;
	
	@Value("${spotify.secret}")
	private String clientSecret;
	
    private static final Logger log = LoggerFactory.getLogger(SpotifyController.class);
	
	public String authenticateWithSpotify() throws JsonMappingException, JsonProcessingException {
		
	    String spotifyAuthUrl = "https://accounts.spotify.com/api/token";

	    RestTemplate restTemplate = new RestTemplate();

	    HttpHeaders headers = new HttpHeaders();
	    headers.add("Content-Type", "application/x-www-form-urlencoded");
	    
	    UriComponents uriComponents = UriComponentsBuilder.fromHttpUrl(spotifyAuthUrl)
	            .queryParam("grant_type", "client_credentials&client_id="+ clientId +"&client_secret=" + clientSecret)
	            .build();

	    log.info("access token isteği attım");
	    
	    RequestEntity<Object> requestEntity = new RequestEntity<>(headers, HttpMethod.POST, uriComponents.toUri());

	    
	    ResponseEntity<String> responseEntity = restTemplate.exchange(requestEntity, String.class);
	    
	    
	    String accessTokenJson = responseEntity.getBody();
	    
	    ObjectMapper objectMapper = new ObjectMapper();
	    
	    JsonNode jsonNode = objectMapper.readTree(accessTokenJson);
	    
	    String accessToken = jsonNode.get("access_token").asText();
	    
	    log.info(accessToken);
	    
	    return accessToken;
	}
}
