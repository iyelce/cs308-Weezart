package com.app.services;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserSong;
import com.app.models.UserSongMixIn;
import com.app.repo.SongRepository;
import com.app.repo.UserSongRepository;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import com.fasterxml.jackson.core.type.TypeReference;


@Service
public class FileServiceImpl implements FileService {

	@Autowired
	private UserSongRepository userSongRepo;

	@Autowired
	private SongRepository songRepo;
	
	private static final Logger log = LoggerFactory.getLogger(FileService.class);

	public File exportUserSongs(String userId) throws IOException {

		User givenUser = new User(Long.parseLong(userId));
		List<UserSong> userSongs = userSongRepo.findAllByUser(givenUser);

		String directoryPath = "src/main/resources/exportedFiles/";
	    String fileName = userId + "_songs.json"; // Just the file name, without the directory
	    File exportedFile = new File(directoryPath + fileName);
		
		try (BufferedWriter writer = new BufferedWriter(new FileWriter(exportedFile))) {
			writer.write(userSongsToJson(userSongs));
		}	
		

		return exportedFile;
	}

	private String userSongsToJson(List<UserSong> userSongs) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.addMixIn(UserSong.class, UserSongMixIn.class);
		return objectMapper.writeValueAsString(userSongs);
	}

	public void importUserSongs(String userId, MultipartFile file) throws IOException {

	    InputStream inputStream = file.getInputStream();

	    String content = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);

	    log.info(content);

	    ObjectMapper objectMapper = new ObjectMapper();
	    JsonNode j = objectMapper.readTree(content);
	    log.info(j.toPrettyString());
	    for (JsonNode jsonNode : j) {
	    	log.info("for a girdimmmmmmm");

	    	JsonNode songNode = jsonNode.get("song");
	        Song song = objectMapper.treeToValue(songNode, Song.class);

	        // Check if the song already exists in the database
	        Song existingSongOptional = songRepo.findByid(song.getId());

	        // If the song doesn't exist, save it
	        if (existingSongOptional==null) {
	            songRepo.save(song);
	        }

	        log.info("song node:    " + songNode.asText());

	        User user = new User(Long.parseLong(userId));

	        UserSong userSong = new UserSong();
	        userSong.setUser(user);
	        userSong.setSong(song);
	        log.info("song artistleri: " + song.getArtistsName().get(0));
	        
	        List<Integer> rating = new ArrayList<>();
			rating.add(0);
	        
	        userSong.setAddTime(getCurrentTime());
	        userSong.setLiked(false);
	        userSong.setRating(rating);
	        
//
//	        if (jsonNode.get("addTime") != null)
//	            userSong.setAddTime(jsonNode.get("addTime").asText());
//	        if (jsonNode.get("liked") != null)
//	            userSong.setLiked(jsonNode.get("liked").asBoolean());
//	        if (jsonNode.get("likeTime") != null)
//	            userSong.setLikeTime(jsonNode.get("likeTime").asText());
//
//	        List<Integer> ratings = new ArrayList<>();
//	        List<String> ratingDates = new ArrayList<>();
//
//	        if (jsonNode.get("rating") != null) {
//	            JsonNode ratingNode = jsonNode.get("rating");
//	            for (JsonNode rating : ratingNode) {
//	                ratings.add(rating.asInt());
//	            }
//	        }
//
//	        if (jsonNode.get("ratingTime") != null) {
//	            JsonNode ratingDateNode = jsonNode.get("ratingTime");
//	            for (JsonNode ratingDate : ratingDateNode) {
//	                ratingDates.add(ratingDate.asText());
//	            }
//	        }
//
//	        userSong.setRating(ratings);
//	        userSong.setRatingTime(ratingDates);

	        if (userSongRepo.findBySongAndUser(song, user) != null)
	            continue;

	        userSongRepo.save(userSong);
	    }
	}
	
	private String getCurrentTime() {
	    // Use your preferred method to get the current time as a string
	    // For example, you can use SimpleDateFormat or Java 8's LocalDateTime
	    // Here's an example using LocalDateTime:
	    LocalDateTime currentTime = LocalDateTime.now();
	    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
	    return currentTime.format(formatter);
	}

	
	
//	public void importUserSongs(String userId, MultipartFile file) throws IOException {
//	    InputStream inputStream = file.getInputStream();
//	    String content = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
//
//	    log.info("JSON Content: " + content);
//	    
//	    
//	    ObjectMapper mapper = new ObjectMapper();
//	    
//	    
//	    List<UserSong> userSongs = Arrays.asList(mapper.readValue(content, UserSong[].class));
//
//	    for (UserSong userSong : userSongs) {
//	        // Additional logic if needed
//	        User user = new User(Long.parseLong(userId));
//	        userSong.setUser(user);
//
//	        if (userSongRepo.findBySongAndUser(userSong.getSong(), user) != null) {
//	            log.info("SARKI VAAAARR");
//	            continue;
//	        }
//
//	        log.info("YOK BOLE BI SARKI EKLEEEEE");
//	        userSongRepo.save(userSong);
//	    }
//	}


}
