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
import com.app.repo.AlbumRepository;
import com.app.repo.ArtistRepository;
import com.app.repo.SongRepository;
import com.app.repo.UserAlbumRepository;
import com.app.repo.UserArtistRepository;
import com.app.repo.UserRepository;
import com.app.repo.UserSongRepository;

import jakarta.transaction.Transactional;

@Service
public class AddServiceImpl implements AddService{

	@Autowired
	private SongRepository songRepo;
	
	@Autowired
	private UserSongRepository userSongRepo;
	
	@Autowired
	private ArtistRepository artistRepo;
	
	@Autowired
	private UserArtistRepository userArtistRepo;
	
	@Autowired
	private AlbumRepository albumRepo;
	
	@Autowired
	private UserAlbumRepository userAlbumRepo;
	
	@Autowired
	private UserRepository userRepo;
	
    private static final Logger log = LoggerFactory.getLogger(SpotifyService.class);
	
	public Song addSong(SongPayload song) {
		
		Song givenSong = new Song(song.getId(), song.getName(), song.getAlbumName(), song.getAlbumId(), song.getArtistsName(), song.getArtistsId(), song.getPopularity(),
				song.getDuration_ms(), song.isExplicit(), song.getAlbumRelease());
		
		log.info("eklemeden önce var mı diye bakıyorum");
		
		if(songRepo.findByid(givenSong.getId()) == null){
			log.info("ife girdim");
			return songRepo.save(givenSong);
		}

		else { log.info("ife girmedim"); return null; }
	}
	
	public UserSong relateUserSong(SongPayload song, String userID) {
		
		UserSong userSong = new UserSong();
		
		Song givenSong = new Song(song.getId(), song.getName(), song.getAlbumName(), song.getAlbumId(), song.getArtistsName(), song.getArtistsId(), song.getPopularity(),
				song.getDuration_ms(), song.isExplicit(), song.getAlbumRelease());
		
		userSong.setSong(givenSong);
		
		User givenUser = new User(Long.parseLong(userID));
		
		userSong.setUser(givenUser);
		
		userSong.setAddTime(getCurrentDateTimeAsString());
		
		return userSongRepo.save(userSong);
		
	}
	
	public Artist addArtist(ArtistPayload artist) {
			
		Artist givenArtist = new Artist(artist.getName(), artist.getGenres(), artist.getImageUrl(), artist.getFollowerCount(), artist.getId());
			
		log.info("eklemeden önce var mı diye bakıyorum");
			
		if(artistRepo.findByid(givenArtist.getId()) == null){
			log.info("ife girdim");
			return artistRepo.save(givenArtist);
		}
	
		else { log.info("ife girmedim"); return null; }
	}
	
	public UserArtist relateUserArtist(ArtistPayload artist, String userID) {
		
		UserArtist userArtist = new UserArtist();
		
		Artist givenArtist = new Artist(artist.getName(), artist.getGenres(), artist.getImageUrl(), artist.getFollowerCount(), artist.getId());
	
		
		userArtist.setArtist(givenArtist);
		
		User givenUser = new User(Long.parseLong(userID));
		
		userArtist.setUser(givenUser);
		
		userArtist.setAddTime(getCurrentDateTimeAsString());
		
		return userArtistRepo.save(userArtist);
		
	}
	
	public Album addAlbum(AlbumPayload album) {
		
		Album givenAlbum = new Album(album.getId(), album.getName(), album.getImageUrl(), album.getReleaseDate(),
				album.getNumberOfTracks(), album.getArtistsName(), album.getArtistsId(), album.getSongsName(), album.getSongsId());
		
		if(albumRepo.findByid(album.getId()) == null) {
			return albumRepo.save(givenAlbum);
		}
		else return null;
	}
	
	public UserAlbum relateUserAlbum(AlbumPayload album, String userID) {
		
		UserAlbum userAlbum = new UserAlbum();
		
		Album givenAlbum = new Album(album.getId(), album.getName(), album.getImageUrl(), album.getReleaseDate(),
				album.getNumberOfTracks(), album.getArtistsName(), album.getArtistsId(), album.getSongsName(), album.getSongsId());
		
		userAlbum.setAlbum(givenAlbum);
		
		User givenUser = new User(Long.parseLong(userID));
		
		userAlbum.setUser(givenUser);
		
		userAlbum.setAddTime(getCurrentDateTimeAsString());
		
		return userAlbumRepo.save(userAlbum);
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

	@Transactional
	public User followUser(String username, String targetUsername) {
		User currentUser = userRepo.findByUsername(username);
		User targetUser = userRepo.findByUsername(targetUsername);
		
		List<String> currentFollowing = currentUser.getFollowing();
		if(currentFollowing == null) currentFollowing = new ArrayList<>();
		currentFollowing.add(targetUser.getUsername());
		
		currentUser.setFollowing(currentFollowing);
		
		List<String> targetFollowers = targetUser.getFollowers();
		if(targetFollowers == null) targetFollowers = new ArrayList<>();
		targetFollowers.add(currentUser.getUsername());
		
		targetUser.setFollowers(targetFollowers);
		
		userRepo.save(currentUser);
		return userRepo.save(targetUser);
	}
	
}
