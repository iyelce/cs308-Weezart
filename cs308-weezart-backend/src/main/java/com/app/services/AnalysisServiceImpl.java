package com.app.services;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.app.controllers.AuthenticationController;
import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserSong;
import com.app.repo.UserRepository;
import com.app.repo.UserSongRepository;

@Service
public class AnalysisServiceImpl implements AnalysisService{
    //public AnalysisServiceImpl(UserSongRepository userSongRepository) {
        //this.userSongRepository = userSongRepository;
    //}
    // analysis of 
        /*
    }
    public List<Song> analysisReleaseDate(String userId, String StartYear, String FinishYear) {
    	return userSongRepo.releaseDateAnalysis(userId, StartYear, FinishYear);
    }*/
	private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);
	
	@Autowired
	private UserSongRepository userSongRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	
	
    public List<Song> analysisReleaseDateManual(String userId, int StartYear, int FinishYear) {
    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserSong> userSongs = userSongRepo.findAllByUser(user);
    	List<Song> filteredSongs = new ArrayList<>();
    	// now we have all usersongs by a given id
    	
    	for (UserSong userSong : userSongs) {
    		Song song = userSong.getSong();
    		String albumReleaseYear = song.getAlbumRelease();
    		int year = Integer.parseInt(albumReleaseYear.substring(0,4));
    		if (year >= StartYear && year <= FinishYear) {
    			filteredSongs.add(song);
    		}
    	}
    	
    	
    	// this part is supposed to work have not been able to test whether rating is correctly sortted or not
        // Sort the filtered songs based on the last value in the rating array
    	filteredSongs.sort((song1, song2) -> {
    	    List<Integer> ratings1 = userSongRepo.findBySongAndUser(song1, user).getRating();
    	    List<Integer> ratings2 = userSongRepo.findBySongAndUser(song2, user).getRating();

    	    int lastRating1 = ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
    	    int lastRating2 = ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);

    	    // Sort in descending order
    	    return Integer.compare(lastRating2, lastRating1);
    	});

        // Take the top 5 songs
        List<Song> top2Songs = filteredSongs.size() > 2 ? filteredSongs.subList(0, 2) : filteredSongs;
    	
    	
    	
    	
    	
    	
    	
    	log.info("analizin sonuna geldiiik");
    	return top2Songs;
    }
}
