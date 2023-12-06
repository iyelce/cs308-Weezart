package com.app.services;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.Song;
import com.app.models.UserSong;

@Service
public interface AnalysisService {
	//List<Song> analysisReleaseDate(String userId, String StartYear, String FinishYear);
	// these are the table analysis for songs
	List<Song> analysisReleaseDateManual(String userId, int StartYear, int FinishYear);
	List<Song> analysisGenreManual(String userId, String genre);
	List<Song> analysisLatest5Manual(String userId);
	List<Song> analysisTop5Manual(String userId);
	// these are the chart analysis for songs
	Map<String, Long> analysisDailyAddedSongs(String userId);
	Map<String, Long> analysisDailyLikedSongs(String userId);
	Map<String, Double> analysisDailyAverageRating(String userId);
	// these are the numerical analysis for songs, one for total one for date constrained
	List<Integer> analysisSongCounts(String userId);
	List<Integer> analysisConstrainedSongCounts(String userId, String dateConstraint);
	
	// these are the table analysis for albums
	List<Album> analysisLatest5Album(String userId);
	List<Album> analysisTop5Album(String userId);
	List<Album> analysisGenreAlbum(String userId, String genre);
	List<Album> analysisReleaseDateAlbum(String userId, int StartYear, int FinishYear);
	//these are the chart analysis for albums
	Map<String, Long> analysisDailyAddedAlbums(String userId);
	Map<String, Long> analysisDailyLikedAlbums(String userId);
	Map<String, Double> analysisDailyAverageRatingAlbums(String userId);
	// these are the numerical analysis for albums, one for total one for date constrained
	List<Integer> analysisAlbumCounts(String userId);
	List<Integer> analysisConstrainedAlbumCounts(String userId, String dateConstraint);
	
	//these are the table analysis for artists
	List<Artist> analysisLatest5Artist(String userId);
	List<Artist> analysisTop5Artist(String userId);
	List<Artist> analysisGenreArtist(String userId, String genre);
}
