package com.app.services;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.LikeAlbum;
import com.app.models.LikeArtist;
import com.app.models.LikeSong;
import com.app.models.Song;
import com.app.models.User;
import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;
import com.app.repo.LikeAlbumRepository;
import com.app.repo.LikeArtistRepository;
import com.app.repo.LikeSongRepository;

@Service
public class LikeServiceImpl implements LikeService {
	
	
	@Autowired
	private LikeSongRepository likeSongRepo;
	
	@Autowired
	private LikeArtistRepository likeArtistRepo;
	
	@Autowired
	private LikeAlbumRepository likeAlbumRepo;

	public LikeSong relateLikeSong(SongPayload song, String userID) {
		
		LikeSong likeSong = new LikeSong();
		
		Song givenSong = new Song(song.getId(), song.getName(), song.getAlbumName(), song.getAlbumId(), song.getArtistsName(), song.getArtistsId(), song.getPopularity(),
				song.getDuration_ms(), song.isExplicit(), song.getAlbumRelease());
		
		likeSong.setSong(givenSong);
		
		User givenUser = new User(Long.parseLong(userID));
		
		likeSong.setUser(givenUser);
		
		likeSong.setTime(getCurrentDateTimeAsString());
		
		return likeSongRepo.save(likeSong);
	}
	
	public LikeArtist relateLikeArtist(ArtistPayload artist, String userId) {
		
		LikeArtist likeArtist = new LikeArtist();
		
		Artist givenArtist = new Artist(artist.getName(), artist.getGenres(), artist.getImageUrl(), artist.getFollowerCount(), artist.getId());
		
		likeArtist.setArtist(givenArtist);
		
		User givenUser = new User(Long.parseLong(userId));
		
		likeArtist.setUser(givenUser);
		
		likeArtist.setTime(getCurrentDateTimeAsString());
		
		return likeArtistRepo.save(likeArtist);
	}
	
	public LikeAlbum relateLikeAlbum(AlbumPayload album, String userId) {
		
		LikeAlbum likeAlbum = new LikeAlbum();
		
		Album givenAlbum = new Album(album.getId(), album.getName(), album.getImageUrl(), album.getReleaseDate(),
				album.getNumberOfTracks(), album.getArtistsName(), album.getArtistsId(), album.getSongsName(), album.getSongsId());
		
		likeAlbum.setAlbum(givenAlbum);
		
		User givenUser = new User(Long.parseLong(userId));
		
		likeAlbum.setUser(givenUser);
		
		likeAlbum.setTime(getCurrentDateTimeAsString());
		
		return likeAlbumRepo.save(likeAlbum);
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
