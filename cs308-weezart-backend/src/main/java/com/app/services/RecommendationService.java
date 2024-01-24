package com.app.services;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.FriendNameAndSongs;
import com.app.models.Song;
import com.app.models.UserSong;


@Service
public interface RecommendationService {
	
	List<Song> popularityRec();
	List<Song> latestRec(String userId);
	FriendNameAndSongs friendRec(String userId);
	List<Album> releaseDateRec(String userId);
	List<Artist> genreArtistRec(String userId);
	
}
