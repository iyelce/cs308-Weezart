package com.app.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.DateRange;
import com.app.models.Song;
import com.app.models.UserSong;
import com.app.repo.UserSongRepository;
import com.app.services.AnalysisService;
import com.app.services.GroupSongService;


@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/group")
public class GroupSongController {
	@Autowired 
	private GroupSongService groupSongService;
	
	@GetMapping("/get-playlist/{userIds}")
	public ResponseEntity<?> getGroup(@PathVariable String userIds){
		return ResponseEntity.ok(groupSongService.returnPlaylist(userIds));
	}
	
	@PostMapping("/post-playlist/{userIds}")
	public ResponseEntity<?> postGroup(@PathVariable String userIds){
		return ResponseEntity.ok(groupSongService.createPlaylist(userIds));
	}	
	
	@DeleteMapping("/delete-playlist/{userIds}/{deletedId}")
	public void deleteGroup(@PathVariable String userIds, @PathVariable String deletedId){
		groupSongService.deleteGroup(userIds, deletedId);
	}
	
	@GetMapping("get-all-playlists/{id}")
	public ResponseEntity<?> getAllGroups(@PathVariable String id){
		return ResponseEntity.ok(groupSongService.getAll(id));
	}
	
	@GetMapping("analysis-playlist/{userIds}")
	public ResponseEntity<?> analysisGroup(@PathVariable String userIds){
		return ResponseEntity.ok(groupSongService.analysisPlaylist(userIds));
	}
}
