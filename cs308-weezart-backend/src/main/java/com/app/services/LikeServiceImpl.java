package com.app.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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
public class LikeServiceImpl implements LikeService {
	
	
	@Autowired
	private UserSongRepository userSongRepo;
	
	@Autowired
	private UserArtistRepository userArtistRepo;
	
	@Autowired
	private UserAlbumRepository userAlbumRepo;
	
    private static final Logger log = LoggerFactory.getLogger(LikeServiceImpl.class);


	@Transactional
	public UserSong relateLikeSong(SongPayload song, String userID) {
		
		Song givenSong = new Song(song.getId(), song.getAlbumImageURL(), song.getName(), song.getAlbumName(), song.getAlbumId(), song.getArtistsName(), song.getArtistsId(), song.getPopularity(),
				song.getDuration_ms(), song.isExplicit(), song.getAlbumRelease());
		
		User givenUser = new User(Long.parseLong(userID));
		
		UserSong currentSong = userSongRepo.findBySongAndUser(givenSong, givenUser);
		
		currentSong.setLiked(true);
		currentSong.setLikeTime(getCurrentDateTimeAsString());
		
		return userSongRepo.save(currentSong);
	}
	
	
	@Transactional
	public UserSong relateUnlikeSong(SongPayload song, String userID) {
		
		Song givenSong = new Song(song.getId(), song.getAlbumImageURL(), song.getName(), song.getAlbumName(), song.getAlbumId(), song.getArtistsName(), song.getArtistsId(), song.getPopularity(),
				song.getDuration_ms(), song.isExplicit(), song.getAlbumRelease());
		
		User givenUser = new User(Long.parseLong(userID));
		
		UserSong currentSong = userSongRepo.findBySongAndUser(givenSong, givenUser);
		log.info("song: " + currentSong.toString());
		
		currentSong.setLiked(false);
		currentSong.setLikeTime(null);
		
		return userSongRepo.save(currentSong);
	}
	
	@Transactional
	public UserArtist relateLikeArtist(ArtistPayload artist, String userId) {
		
		Artist givenArtist = new Artist(artist.getName(), artist.getGenres(), artist.getImageUrl(), artist.getFollowerCount(), artist.getId());
		
		User givenUser = new User(Long.parseLong(userId));
		
		UserArtist currentArtist = userArtistRepo.findByArtistAndUser(givenArtist, givenUser);
		
		currentArtist.setLiked(true);
		currentArtist.setLikeTime(getCurrentDateTimeAsString());
		
		return userArtistRepo.save(currentArtist);
	}
	
	
	@Transactional
	public UserArtist relateUnlikeArtist(ArtistPayload artist, String userId) {
		
		Artist givenArtist = new Artist(artist.getName(), artist.getGenres(), artist.getImageUrl(), artist.getFollowerCount(), artist.getId());
		
		User givenUser = new User(Long.parseLong(userId));
		
		UserArtist currentArtist = userArtistRepo.findByArtistAndUser(givenArtist, givenUser);
		
		currentArtist.setLiked(false);
		currentArtist.setLikeTime(null);
		
		return userArtistRepo.save(currentArtist);
	}
	
	
	@Transactional
	public UserAlbum relateLikeAlbum(AlbumPayload album, String userId) {
		
		Album givenAlbum = new Album(album.getId(), album.getName(), album.getImageUrl(), album.getReleaseDate(),
				album.getNumberOfTracks(), album.getArtistsName(), album.getArtistsId(), album.getSongsName(), album.getSongsId());
		
		User givenUser = new User(Long.parseLong(userId));
		
		UserAlbum currentAlbum = userAlbumRepo.findByAlbumAndUser(givenAlbum, givenUser);
		
		currentAlbum.setLiked(true);
		currentAlbum.setLikeTime(getCurrentDateTimeAsString());
		
		return userAlbumRepo.save(currentAlbum);
	}
	
	@Transactional
	public UserAlbum relateUnlikeAlbum(AlbumPayload album, String userId) {
		
		Album givenAlbum = new Album(album.getId(), album.getName(), album.getImageUrl(), album.getReleaseDate(),
				album.getNumberOfTracks(), album.getArtistsName(), album.getArtistsId(), album.getSongsName(), album.getSongsId());
		
		User givenUser = new User(Long.parseLong(userId));
		
		UserAlbum currentAlbum = userAlbumRepo.findByAlbumAndUser(givenAlbum, givenUser);
		
		currentAlbum.setLiked(false);
		currentAlbum.setLikeTime(null);
		
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
