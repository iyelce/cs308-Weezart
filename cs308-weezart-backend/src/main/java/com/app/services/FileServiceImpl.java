package com.app.services;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.models.User;
import com.app.models.UserSong;
import com.app.models.UserSongMixIn;
import com.app.repo.UserSongRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;	

@Service
public class FileServiceImpl implements FileService{

	@Autowired
	private UserSongRepository userSongRepo;
	
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

}
