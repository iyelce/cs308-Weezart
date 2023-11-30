package com.app.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserAlbum;
import com.app.models.UserArtist;
import com.app.models.UserSong;
import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;
import com.app.repo.UserAlbumRepository;
import com.app.repo.UserArtistRepository;
import com.app.repo.UserSongRepository;

import jakarta.transaction.Transactional;

@Service 
public class RateServiceImpl implements RateService{

	@Autowired
	private UserSongRepository userSongRepo;
	
	@Autowired
	private UserArtistRepository userArtistRepo;
	
	@Autowired
	private UserAlbumRepository userAlbumRepo;
	
    private static final Logger log = LoggerFactory.getLogger(SpotifyService.class);
	
	@Transactional 
	public UserSong relateRateSong(SongPayload song, String userID, int rating) {

		Song givenSong = new Song(song.getId(), song.getAlbumImageURL(), song.getName(), song.getAlbumName(),
				song.getAlbumId(), song.getArtistsName(), song.getArtistsId(), song.getPopularity(),
				song.getDuration_ms(), song.isExplicit(), song.getAlbumRelease());
		
		User givenUser = new User(Long.parseLong(userID));
		
		UserSong currentSong = userSongRepo.findBySongAndUser(givenSong, givenUser);
		
		List <Integer> rates = currentSong.getRating();
		if(rates == null) rates = new ArrayList<>();
		rates.add(rating);
		
		List <String> rateDates = currentSong.getRatingTime();
		if(rateDates == null) rateDates = new ArrayList<>();
		rateDates.add(getCurrentDateTimeAsString());
		
		currentSong.setRating(rates);
		currentSong.setRatingTime(rateDates);
		currentSong.setLikeTime(getCurrentDateTimeAsString());
		
		return userSongRepo.save(currentSong);
	}

	@Transactional
	public UserArtist relateRateArtist(ArtistPayload artist, String userId, int rating) {
		
		Artist givenArtist = new Artist(artist.getName(), artist.getGenres(), artist.getImageUrl(), artist.getFollowerCount(), artist.getId());
		
		User givenUser = new User(Long.parseLong(userId));
		
		UserArtist currentArtist = userArtistRepo.findByArtistAndUser(givenArtist, givenUser);
		
		List <Integer> rates = currentArtist.getRating();
		if(rates == null) rates = new ArrayList<>();
		rates.add(rating);
		
		List <String> rateDates = currentArtist.getRatingTime();
		if(rateDates == null) rateDates = new ArrayList<>();
		rateDates.add(getCurrentDateTimeAsString());
		
		currentArtist.setRating(rates);
		currentArtist.setRatingTime(rateDates);
		currentArtist.setLikeTime(getCurrentDateTimeAsString());
		
		return userArtistRepo.save(currentArtist);
	}

	@Transactional
	public UserAlbum relateRateAlbum(AlbumPayload album, String userId, int rating) {
		
		Album givenAlbum = new Album(album.getId(), album.getName(), album.getImageUrl(), album.getReleaseDate(),
				album.getNumberOfTracks(), album.getArtistsName(), album.getArtistsId(), album.getSongsName(), album.getSongsId());
		
		User givenUser = new User(Long.parseLong(userId));
		
		UserAlbum currentAlbum = userAlbumRepo.findByAlbumAndUser(givenAlbum, givenUser);
		
		log.info("test");
		
		List <Integer> rates = currentAlbum.getRating();
		if(rates == null) rates = new ArrayList<>();
		rates.add(rating);
		
		List <String> rateDates = currentAlbum.getRatingTime();
		if(rateDates == null) rateDates = new ArrayList<>();
		rateDates.add(getCurrentDateTimeAsString());
		
		currentAlbum.setRating(rates);
		currentAlbum.setRatingTime(rateDates);
		currentAlbum.setLikeTime(getCurrentDateTimeAsString());
		
		return userAlbumRepo.save(currentAlbum);
	}

	public String getCurrentDateTimeAsString() {
        // Get the current date and time
        LocalDateTime currentDateTime = LocalDateTime.now();

        // Define the format for the date and time
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // Format the current date and time using the formatter
        String formattedDateTime = currentDateTime.format(formatter);

        return formattedDateTime;
    }
}
