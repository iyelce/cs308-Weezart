package com.app.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.models.DateRange;
import com.app.models.Song;
import com.app.models.UserSong;
import com.app.repo.UserSongRepository;
import com.app.services.AnalysisService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/analysis")
public class AnalysisController {
	@Autowired 
	private AnalysisService analysisService;
	@Autowired
	private UserSongRepository userSongRepo;
	
	
	@GetMapping("/song/releaseDate/{userId}")
	public ResponseEntity<List<Song>> releaseDateAnalysisController(@RequestBody DateRange dateRange, @PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisReleaseDateManual(userId, dateRange.getStartDate(), dateRange.getEndDate()));
	}
	
	@GetMapping("/song/genre/{genre}/{userId}")
	public ResponseEntity<List<Song>> genreAnalysisController(@PathVariable String genre, @PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisGenreManual(userId, genre));
	}
	
	@GetMapping("/song/last5Liked/{userId}")
	public ResponseEntity<List<Song>> latest5AnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisLatest5Manual(userId));
	}
	
	
	
}