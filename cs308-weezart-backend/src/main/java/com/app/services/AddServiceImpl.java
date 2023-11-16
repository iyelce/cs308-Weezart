package com.app.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.models.Artist;
import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserArtist;
import com.app.models.UserSong;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;
import com.app.repo.ArtistRepository;
import com.app.repo.SongRepository;
import com.app.repo.UserArtistRepository;
import com.app.repo.UserSongRepository;

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
		
		return userArtistRepo.save(userArtist);
		
	}
	
}
