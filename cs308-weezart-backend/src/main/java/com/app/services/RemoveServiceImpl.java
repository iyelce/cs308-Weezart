package com.app.services;


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
public class RemoveServiceImpl implements RemoveService{

	@Autowired
	private UserSongRepository userSongRepo;
	
	@Autowired
	private UserArtistRepository userArtistRepo;
	
	@Autowired
	private UserAlbumRepository  userAlbumRepo;
	
	private static final Logger log = LoggerFactory.getLogger(RemoveServiceImpl.class);

	
	public void removeSong(SongPayload song, String userId) {
		Song givenSong = new Song(song.getId(), song.getAlbumImageURL(), song.getName(), song.getAlbumName(), song.getAlbumId(), song.getArtistsName(), song.getArtistsId(), song.getPopularity(),
				song.getDuration_ms(), song.isExplicit(), song.getAlbumRelease());
		
		User givenUser = new User(Long.parseLong(userId));
		
		UserSong toBeDeleted = userSongRepo.findBySongAndUser(givenSong, givenUser);
		
		userSongRepo.delete(toBeDeleted);
		
		log.info("successfully deleted");
	}
	
	public void removeArtist(ArtistPayload artist, String userId) {
		
		Artist givenArtist = new Artist(artist.getName(), artist.getGenres(), artist.getImageUrl(), artist.getFollowerCount(), artist.getId());
		
		User givenUser = new User(Long.parseLong(userId));
		
		UserArtist toBeDeleted = userArtistRepo.findByArtistAndUser(givenArtist, givenUser);
		
		if(toBeDeleted == null) return;
		
		String targetId = toBeDeleted.getArtist().getId();
		
		Iterable<UserSong> allRelations = userSongRepo.findAll();
		
		for(UserSong current : allRelations) {
			
			if(current.getSong().getArtistsId().contains(targetId)) userSongRepo.delete(current);
			
		}
		
		userArtistRepo.delete(toBeDeleted);
	}
	
	@Transactional
	public void removeAlbum(AlbumPayload album, String userId) {
		
		Album givenAlbum = new Album(album.getId(), album.getName(), album.getImageUrl(), album.getReleaseDate(),
				album.getNumberOfTracks(), album.getArtistsName(), album.getArtistsId(), album.getSongsName(), album.getSongsId());
		
		User givenUser = new User(Long.parseLong(userId));
		
		UserAlbum toBeDeleted = userAlbumRepo.findByAlbumAndUser(givenAlbum, givenUser);
		
		if(toBeDeleted == null) return;
		
		for(String id : toBeDeleted.getAlbum().getSongsId()) {
			
			log.info(id);
			
			userSongRepo.deleteBySongId(id);
		}
		
		userAlbumRepo.delete(toBeDeleted);
	}

}
