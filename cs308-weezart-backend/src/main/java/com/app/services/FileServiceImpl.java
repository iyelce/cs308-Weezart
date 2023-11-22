package com.app.services;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
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
import com.app.repo.UserSongRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class FileServiceImpl implements FileService {

	@Autowired
	private UserSongRepository userSongRepo;

	private static final Logger log = LoggerFactory.getLogger(FileService.class);

	public File exportUserSongs(String userId) throws IOException {

		User givenUser = new User(Long.parseLong(userId));
		List<UserSong> userSongs = userSongRepo.findAllByUser(givenUser);

		String directoryPath = "src/main/resources/exportedFiles/";
		String fileName = directoryPath + userId + "_songs.json";
		File exportedFile = new File(fileName);

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

		/*
		 * File convFile = new File(file.getOriginalFilename());
		 * 
		 * file.transferTo(convFile);
		 * 
		 * String content = FileUtils.readFileToString(convFile,
		 * StandardCharsets.UTF_8);
		 */

		InputStream inputStream = file.getInputStream();

		String content = new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);

		log.info(content);

		ObjectMapper objectMapper = new ObjectMapper();
		JsonNode j = objectMapper.readTree(content);
		for (JsonNode jsonNode : j) {

			JsonNode songNode = jsonNode.get("song");
			Song song = objectMapper.treeToValue(songNode, Song.class);

			log.info(songNode.asText());

			User user = new User(Long.parseLong(userId));

			UserSong userSong = new UserSong();

			userSong.setUser(user);
			userSong.setSong(song);

			if (jsonNode.get("addTime)") != null)
				userSong.setAddTime(jsonNode.get("addTime").asText());
			if (jsonNode.get("liked)") != null)
				userSong.setLiked(jsonNode.get("liked").asBoolean());
			if (jsonNode.get("likeTime)") != null)
				userSong.setLikeTime(jsonNode.get("likeTime").asText());

			List<Integer> ratings = new ArrayList<>();
			List<String> ratingDates = new ArrayList<>();

			if (jsonNode.get("rating)") != null) {
				JsonNode ratingNode = jsonNode.get("rating");
				for (JsonNode rating : ratingNode) {
					ratings.add(rating.asInt());
				}
			}

			if (jsonNode.get("ratingTime)") != null) {
				JsonNode ratingDateNode = jsonNode.get("ratingTime");
				for (JsonNode ratingDate : ratingDateNode) {
					ratingDates.add(ratingDate.asText());
				}

			}

			userSong.setRating(ratings);
			userSong.setRatingTime(ratingDates);

			if (userSongRepo.findBySongAndUser(song, user) != null)
				continue;

			userSongRepo.save(userSong);
		}

	}

}
