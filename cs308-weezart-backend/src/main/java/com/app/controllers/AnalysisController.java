package com.app.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.models.Album;
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
	
	@GetMapping("/song/top5Liked/{userId}")
	public ResponseEntity<List<Song>> top5AnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisTop5Manual(userId));
	}	
	
	@GetMapping("/song/dailySongs/{userId}")
	public ResponseEntity<Map<String, Long>> dailySongsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisDailyAddedSongs(userId));
	}
	
	@GetMapping("/song/dailyLikedSongs/{userId}")
	public ResponseEntity<Map<String, Long>> dailyLikedSongsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisDailyLikedSongs(userId));
	}
	
	@GetMapping("/song/dailyAverageRating/{userId}")
	public ResponseEntity<Map<String, Double>> dailyAverageRatingAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisDailyAverageRating(userId));
	}
	
	@GetMapping("/song/songCounts/{userId}")
	public ResponseEntity<List<Integer>> songCountsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisSongCounts(userId));
	}
	
	@GetMapping("/song/songConstrainedCounts/{userId}/{dateConstraint}")
	public ResponseEntity<List<Integer>> songConstainedCountsAnalysisController(@PathVariable String userId, @PathVariable String dateConstraint){
		return ResponseEntity.ok(analysisService.analysisConstrainedSongCounts(userId, dateConstraint));
	}
	
	
	
	
	
	
	
	@GetMapping("/album/last5Liked/{userId}")
	public ResponseEntity<List<Album>> latest5AlbumAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisLatest5Album(userId));
	}
	
	@GetMapping("/album/top5Liked/{userId}")
	public ResponseEntity<List<Album>> top5AlbumAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisTop5Album(userId));
	}
	
	@GetMapping("/album/genre/{genre}/{userId}")
	public ResponseEntity<List<Album>> genreAlbumAnalysisController(@PathVariable String genre, @PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisGenreAlbum(userId, genre));
	}
	
	
}
