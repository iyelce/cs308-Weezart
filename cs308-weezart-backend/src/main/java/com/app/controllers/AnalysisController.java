package com.app.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/analysis")
public class AnalysisController {
	@Autowired 
	private AnalysisService analysisService;

	// these are the table analysis for songs
	
	@GetMapping("/song/last-5/{userId}")
	public ResponseEntity<List<Song>> latest5AnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisLatest5Manual(userId));
	}
	
	@GetMapping("/song/top-5/{userId}")
	public ResponseEntity<List<Song>> top5AnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisTop5Manual(userId));
	}	

	@GetMapping("/song/genre/{genre}/{userId}")
	public ResponseEntity<List<Song>> genreAnalysisController(@PathVariable String genre, @PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisGenreManual(userId, genre));
	}
	
	@GetMapping("/song/release-date/{startDate}/{endDate}/{userId}")
	public ResponseEntity<List<Song>> releaseDateAnalysisController(@PathVariable Integer startDate, @PathVariable Integer endDate, @PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisReleaseDateManual(userId, startDate, endDate));
	}
	
	// these are the chart analysis for songs
	@GetMapping("/song/daily-added/{userId}")
	public ResponseEntity<Map<String, Long>> dailySongsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisDailyAddedSongs(userId));
	}
	
	@GetMapping("/song/daily-liked/{userId}")
	public ResponseEntity<Map<String, Long>> dailyLikedSongsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisDailyLikedSongs(userId));
	}
	
	@GetMapping("/song/daily-rating/{userId}")
	public ResponseEntity<Map<String, Double>> dailyAverageRatingAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisDailyAverageRating(userId));
	}
	
	
	// these are the numerical analysis for songs, one for total one for date constrained

	@GetMapping("/song/counts/{userId}")
	public ResponseEntity<List<Integer>> songCountsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisSongCounts(userId));
	}
	
	@GetMapping("/song/constrained-counts/{userId}/{dateConstraint}")
	public ResponseEntity<List<Integer>> songConstainedCountsAnalysisController(@PathVariable String userId, @PathVariable String dateConstraint){
		return ResponseEntity.ok(analysisService.analysisConstrainedSongCounts(userId, dateConstraint));
	}
	
	
	
	
	//------------------------- ALBUM ANALYSIS -----------------------------------
	
	
	@GetMapping("/album/last-5/{userId}")
	public ResponseEntity<List<Album>> latest5AlbumAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisLatest5Album(userId));
	}
	
	@GetMapping("/album/top-5/{userId}")
	public ResponseEntity<List<Album>> top5AlbumAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisTop5Album(userId));
	}
	
	@GetMapping("/album/genre/{genre}/{userId}")
	public ResponseEntity<List<Album>> genreAlbumAnalysisController(@PathVariable String genre, @PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisGenreAlbum(userId, genre));
	}
	
	
	@GetMapping("/album/release-date/{userId}")
	public ResponseEntity<List<Album>> releaseDateAlbumAnalysisController(@RequestBody DateRange dateRange, @PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisReleaseDateAlbum(userId, dateRange.getStartDate(), dateRange.getEndDate()));
	}
	
	
	@GetMapping("/album/daily-added/{userId}")
	public ResponseEntity<Map<String, Long>> dailyAlbumsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisDailyAddedAlbums(userId));
	}
	
	
	@GetMapping("/album/daily-liked/{userId}")
	public ResponseEntity<Map<String, Long>> dailyLikedAlbumsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisDailyLikedAlbums(userId));
	}
	
	
	@GetMapping("/album/daily-rating/{userId}")
	public ResponseEntity<Map<String, Double>> dailyAverageRatingAlbumsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisDailyAverageRatingAlbums(userId));
	}
	
	
	@GetMapping("/album/counts/{userId}")
	public ResponseEntity<List<Integer>> albumCountsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisAlbumCounts(userId));
	}
	
	
	@GetMapping("/album/constrained-counts/{userId}/{dateConstraint}")
	public ResponseEntity<List<Integer>> albumConstainedCountsAnalysisController(@PathVariable String userId, @PathVariable String dateConstraint){
		return ResponseEntity.ok(analysisService.analysisConstrainedAlbumCounts(userId, dateConstraint));
	}

	
	
	//------------------------- ARTIST ANALYSIS -----------------------------------
	

	
	@GetMapping("/artist/last-5/{userId}")
	public ResponseEntity<List<Artist>> latest5ArtistAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisLatest5Artist(userId));
	}
	
	
	@GetMapping("/artist/top-5/{userId}")
	public ResponseEntity<List<Artist>> top5ArtistAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisTop5Artist(userId));
	}
	
	
	@GetMapping("/artist/genre/{genre}/{userId}")
	public ResponseEntity<List<Artist>> genreArtistAnalysisController(@PathVariable String genre, @PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisGenreArtist(userId, genre));
	}
	
	
	@GetMapping("/artist/release-date/{userId}")
	public ResponseEntity<List<Artist>> releaseDateArtistAnalysisController(@RequestBody DateRange dateRange, @PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisReleaseDateArtist(userId, dateRange.getStartDate(), dateRange.getEndDate()));
	}
	
	
	@GetMapping("/artist/daily-added/{userId}")
	public ResponseEntity<Map<String, Long>> dailyArtistsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisDailyAddedArtists(userId));
	}
	
	
	@GetMapping("/artist/daily-liked/{userId}")
	public ResponseEntity<Map<String, Long>> dailyLikedArtistsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisDailyLikedArtists(userId));
	}
	
	
	@GetMapping("/artist/daily-rating/{userId}")
	public ResponseEntity<Map<String, Double>> dailyAverageRatingArtistsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisDailyAverageRatingArtists(userId));
	}
	
	
	@GetMapping("/artist/counts/{userId}")
	public ResponseEntity<List<Integer>> artistCountsAnalysisController(@PathVariable String userId){
		return ResponseEntity.ok(analysisService.analysisArtistCounts(userId));
	}
	
	
	@GetMapping("/artist/constrained-counts/{userId}/{dateConstraint}")
	public ResponseEntity<List<Integer>> artistConstainedCountsAnalysisController(@PathVariable String userId, @PathVariable String dateConstraint){
		return ResponseEntity.ok(analysisService.analysisConstrainedArtistCounts(userId, dateConstraint));
	}
	
}
