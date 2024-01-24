package com.app.controllers;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.Song;
import com.app.services.SpotifyAPIService;
import com.app.services.SpotifySearchResponse;
import com.app.services.SpotifyService;
import com.app.spotify.SpotifyAuthenticator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/api/spotify")
public class SpotifyController {

	private final SpotifyService spotifyService;

	private static final Logger log = LoggerFactory.getLogger(SpotifyController.class);

	@Autowired
	private final SpotifyAuthenticator spotifyAuthenticator;

	private final SpotifyAPIService spotifyAPIService = new SpotifyAPIService();

	private final SpotifySearchResponse spotifyParser = new SpotifySearchResponse();

	private String TOKEN_FINAL = "";

	@Value("${spotify.id}")
	private String CLIENT_ID;

	@Value("${spotify.secret}")
	private String CLIENT_SECRET;

	private String REDIRECT_URI = "http://localhost:3000/api/spotify/callback";

	private final RestTemplate restTemplate = new RestTemplate();

	@Autowired
	public SpotifyController(SpotifyService spotifyService, SpotifyAuthenticator spotifyAuthenticator) {
		this.spotifyService = spotifyService;
		this.spotifyAuthenticator = spotifyAuthenticator;
	}

	@GetMapping("/search-artist")
	public ResponseEntity<List<Artist>> searchArtist(@RequestParam String query)
			throws JsonMappingException, JsonProcessingException {

		log.info("search edicem");

		List<Artist> results = spotifyService.artistSearch(query, spotifyAuthenticator.authenticateWithSpotify());
		return ResponseEntity.ok(results);
	}

	@GetMapping("/search-song")
	public ResponseEntity<List<Song>> searchSong(@RequestParam String query)
			throws JsonMappingException, JsonProcessingException {
		List<Song> results = spotifyService.songSearch(query, spotifyAuthenticator.authenticateWithSpotify());

		return ResponseEntity.ok(results);
	}

	@GetMapping("/search-album")
	public ResponseEntity<List<Album>> searchAlbum(@RequestParam String query)
			throws JsonMappingException, JsonProcessingException {
		List<Album> results = spotifyService.albumSearch(query, spotifyAuthenticator.authenticateWithSpotify());

		return ResponseEntity.ok(results);
	}

	@GetMapping("/get-songs-from-album")
	public ResponseEntity<Map<String, String>> getSongFromAlbum(@RequestParam String albumId)
			throws JsonMappingException, JsonProcessingException {
		Map<String, String> songIdsAndNames = spotifyAPIService.getSongFromAlbum(albumId,
				spotifyAuthenticator.authenticateWithSpotify());

		return ResponseEntity.ok(songIdsAndNames);
	}

	@GetMapping("/login")
	public String loginToSpotify() throws JsonMappingException, JsonProcessingException {

		String scope = "user-top-read";

		String state = UUID.randomUUID().toString().replaceAll("-", "").substring(15);

		String spotifyUrl = "https://accounts.spotify.com/authorize?" + "response_type=code" + "&client_id=" + CLIENT_ID
				+ "&scope=" + scope + "&redirect_uri=" + REDIRECT_URI + "&state=" + state;

		return spotifyUrl;
	}

	@GetMapping("/get-spotify-token") // api/spotify/get-spotify-token
	public String getSpotifyToken() {
		if (this.TOKEN_FINAL == "")
			return "NOT_LOGGED_IN";
		else
			return this.TOKEN_FINAL;
	}

	@PostMapping("/callback") // http://localhost:8080/api/spotify/callback
	public String test(@RequestParam("code") String code, @RequestParam("state") String state)
			throws JsonMappingException, JsonProcessingException {

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		MultiValueMap<String, String> formParams = new LinkedMultiValueMap<>();
		formParams.add("code", code);
		formParams.add("redirect_uri", REDIRECT_URI);
		formParams.add("grant_type", "authorization_code");

		String credentials = CLIENT_ID + ":" + CLIENT_SECRET;
		String base64Credentials = new String(Base64.encodeBase64(credentials.getBytes()));

		headers.set("Authorization", "Basic " + base64Credentials);

		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formParams, headers);

		String tokenUrl = "https://accounts.spotify.com/api/token";

		ResponseEntity<String> resp = restTemplate.exchange(tokenUrl, HttpMethod.POST, requestEntity, String.class);

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode rootNode = objectMapper.readTree(resp.getBody());

		String accessToken = rootNode.get("access_token").asText();

		return accessToken;
		
	}

	@GetMapping("/get-users-top-tracks")
	public List<Song> getTopTracks(@RequestParam("token") String accessToken)
			throws JsonMappingException, JsonProcessingException {

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken);

		UriComponentsBuilder uriBuilder = UriComponentsBuilder // returns 10 songs, range is long term
				.fromUriString("https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10");

		ResponseEntity<String> result = restTemplate.exchange(uriBuilder.toUriString(), HttpMethod.GET,
				new HttpEntity<>(headers), String.class);

		List<Song> resultList = new ArrayList<>();

		ObjectMapper objectMapper = new ObjectMapper();

		JsonNode songNode = objectMapper.readTree(result.getBody());

		JsonNode itemsNode = songNode.get("items");

		for (JsonNode item : itemsNode) {

			String id = "", name = "", albumName = "", albumId = "", albumRelease = "", albumImage = "";
			int popularity = 0, duration_ms = 0;
			boolean explicit = false;

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

			JsonNode imageNode = albumNode.get("images");
			albumImage = imageNode.get(0).get("url").asText();

			albumRelease = albumNode.get("release_date").asText();

			JsonNode artistNode = item.get("artists");

			for (JsonNode artists : artistNode) {
				artistsName.add(artists.get("name").asText());
				artistsId.add(artists.get("id").asText());
			}

			Song song = new Song(id, albumImage, name, albumName, albumId, artistsName, artistsId, popularity,
					duration_ms, explicit, albumRelease);
			resultList.add(song);
		}

		return resultList;
	}

	@GetMapping("/top-track-based-recommendations")
	public List<Song> getTrackRecommendation(@RequestParam("token") String accessToken)
			throws JsonMappingException, JsonProcessingException {
		List<Song> songList = getTopTracks(accessToken);
		List<Artist> artistList = getTopArtists(accessToken);

		String songIds = "";
		String artistIds = "";

		for (int i = 0; i < 3; i++) {
			songIds += songList.get(i).getId() + ",";
		}
		songIds = songIds.substring(0, songIds.length() - 1);

		for (int i = 0; i < 2; i++) {
			artistIds += artistList.get(i).getId() + ",";
		}
		artistIds = artistIds.substring(0, artistIds.length() - 1);

		String recommendationURL = "https://api.spotify.com/v1/recommendations?limit=5&seed_artists=" + artistIds
				+ "&seed_tracks=" + songIds;

		log.info(recommendationURL);

		HttpHeaders headers = new HttpHeaders();

		headers.set("Authorization", "Bearer " + spotifyAuthenticator.authenticateWithSpotify());

		HttpEntity<String> entity = new HttpEntity<>(headers);

		ResponseEntity<String> response = restTemplate.exchange(recommendationURL, HttpMethod.GET, entity,
				String.class);

		List<Song> reccSongs = new ArrayList<>();

		ObjectMapper objectMapper = new ObjectMapper();

		JsonNode rootNode = objectMapper.readTree(response.getBody());

		JsonNode songNode = rootNode.get("tracks");

		for (JsonNode item : songNode) {

			String id = "", name = "", albumName = "", albumId = "", albumRelease = "", albumImage = "";
			int popularity = 0, duration_ms = 0;
			boolean explicit = false;

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

			JsonNode imageNode = albumNode.get("images");
			albumImage = imageNode.get(0).get("url").asText();

			albumRelease = albumNode.get("release_date").asText();

			JsonNode artistNode = item.get("artists");

			for (JsonNode artists : artistNode) {
				artistsName.add(artists.get("name").asText());
				artistsId.add(artists.get("id").asText());
			}

			Song song = new Song(id, albumImage, name, albumName, albumId, artistsName, artistsId, popularity,
					duration_ms, explicit, albumRelease);
			reccSongs.add(song);
		}

		return reccSongs;
	}

	@GetMapping("/get-users-top-artists")
	public List<Artist> getTopArtists(@RequestParam("token") String accessToken)
			throws JsonMappingException, JsonProcessingException {

		HttpHeaders headers = new HttpHeaders();
		headers.set("Authorization", "Bearer " + accessToken);

		UriComponentsBuilder uriBuilder = UriComponentsBuilder // returns 10 artists, range is long term
				.fromUriString("https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10");

		ResponseEntity<String> result = restTemplate.exchange(uriBuilder.toUriString(), HttpMethod.GET,
				new HttpEntity<>(headers), String.class);

		List<Artist> resultList = new ArrayList<>();

		ObjectMapper objectMapper = new ObjectMapper();

		JsonNode artistsNode = objectMapper.readTree(result.getBody());

		JsonNode itemsNode = artistsNode.get("items");

		for (JsonNode item : itemsNode) {

			String name = "", imageUrl = "", id = "";
			List<String> genres = new ArrayList<>();
			int followerCount = 0;

			id = item.get("id").asText();

			JsonNode followersNode = item.get("followers");

			if (followersNode != null) {
				followerCount = followersNode.get("total").asInt();
			}

			JsonNode genresNode = item.get("genres");

			if (genresNode != null) {

				for (JsonNode genreNode : genresNode) {
					genres.add(genreNode.asText());
				}
			}

			name = item.get("name").asText();

			if (item.get("images") != null) {
				JsonNode imagesNode = item.get("images");
				if (imagesNode.isArray() && imagesNode.size() > 0) {
					imageUrl = imagesNode.get(0).get("url").asText();
				}
			}

			Artist artist = new Artist(name, genres, imageUrl, followerCount, id);

			resultList.add(artist);
		}
		return resultList;

	}

	/*
	 * NASIL ÇALIŞTIĞINI YAZMASAM UNUTURUM:
	 * 
	 * 1. POSTMANDA GİRİŞ YAP
	 * 
	 * 2. LOG IN VIA SPOTIFY 1'E ISTEK YOLLA
	 * 
	 * 3. DÖNEN LİNKİ TARAYICIYA YAPIŞTIR, SONUCUNDA DÖNDÜRDÜĞÜ LİNKİ POSTMANA AT
	 * (CALLBACKLI LINK, POST OLACAK, BEARER TOKEN SEÇMEYI UNUTMA)
	 * 
	 * 4. ONDAN DÖNEN LİNKİ DE POSTMANDE AÇ, (GET USERS TOP TRACKLİ LİNK, GET
	 * OLACAK, BEARER TOKEN SEÇMEYİ UNUTMA)
	 * 
	 * BUNUN SONUCUNDA TOP TRACKS DÖNÜYOR, BELLİ BİR SAYIYA FİLTRELEYEBİLİRSİN FALAN
	 * FİLAN
	 * 
	 * 
	 */

}
