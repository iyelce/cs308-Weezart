package com.app.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.app.controllers.AuthenticationController;
import com.app.models.Artist;
import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserSong;
import com.app.repo.ArtistRepository;
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
	
	@Autowired 
	private ArtistRepository artistRepo;
	
	
	
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
    
    
    public List<Song> analysisGenreManual(String userId, String genre){
    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserSong> userSongs = userSongRepo.findAllByUser(user);
    	List<Song> filteredSongs = new ArrayList<>();
    	for (UserSong userSong : userSongs) {
    		if(userSong.getSong().getPopularity()!=-1) {
	    		boolean genreFound = false;
	    		Song song = userSong.getSong();
	    		List<String> artistsId = song.getArtistsId();
	    		
	    		for (String artistId : artistsId) {
	    			log.info(artistId);
	    			Artist givenArtist = artistRepo.findByid(artistId);
	    			log.info("2. analizin sonuna geldiiik");
	    			List<String> genresList = givenArtist.getGenres();
	    			log.info(genre);
	    			if (genresList.contains(genre)) {
	    				genreFound = true;
	    				break;
	    			}
	    		}
	    		
	    		if (genreFound == true) {
	    			log.info("boola girdi");
	    			filteredSongs.add(song);
	    		}
    		}
    	}
    	
    	filteredSongs.sort((song1, song2) -> {
    	    List<Integer> ratings1 = userSongRepo.findBySongAndUser(song1, user).getRating();
    	    List<Integer> ratings2 = userSongRepo.findBySongAndUser(song2, user).getRating();

    	    int lastRating1 = ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
    	    int lastRating2 = ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);

    	    // Sort in descending order
    	    return Integer.compare(lastRating2, lastRating1);
    	});

        // Take the top 5 songs
        List<Song> top2Songs = filteredSongs.size() > 5 ? filteredSongs.subList(0, 5) : filteredSongs;
    	
    	
    	
    	
    	
    	
    	
    	log.info("2. analizin sonuna geldiiik");
    	return top2Songs;
    	
    	
    }
    
    
    public List<Song> analysisLatest5Manual(String userId){
    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserSong> userSongs = userSongRepo.findAllByUser(user);
    	List<Song> filteredSongs = new ArrayList<>();
    	
        List<UserSong> sortedUserSongs = userSongs.stream()
                .sorted((us1, us2) -> us2.getLikeTime().compareTo(us1.getLikeTime()))
                .collect(Collectors.toList());

        // Extract Song objects from sortedUserSongs
        List<Song> top5Songs = sortedUserSongs.stream()
                .limit(5)
                .map(UserSong::getSong)
                .collect(Collectors.toList());

        return top5Songs;
    
    	
    }
    
    
    
    public List<Song> analysisTop5Manual(String userId){
    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserSong> userSongs = userSongRepo.findAllByUser(user);
    	List<Song> filteredSongs = new ArrayList<>();
    	
    	for(UserSong userSong: userSongs) {
    		Song song = userSong.getSong();
    		filteredSongs.add(song);
    	}
   	
    	
    	filteredSongs.sort((song1, song2) -> {
    	    List<Integer> ratings1 = userSongRepo.findBySongAndUser(song1, user).getRating();
    	    List<Integer> ratings2 = userSongRepo.findBySongAndUser(song2, user).getRating();

    	    int lastRating1 = ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
    	    int lastRating2 = ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);

    	    // Sort in descending order
    	    return Integer.compare(lastRating2, lastRating1);
    	});
    	List<Song> top2Songs = filteredSongs.size() > 5 ? filteredSongs.subList(0, 5) : filteredSongs;
    	return top2Songs;
    }
    
    
    public Map<String, Long> analysisDailyAddedSongs(String userId) {
            User user = userRepo.findByiduser(Long.parseLong(userId));
            List<UserSong> userSongs = userSongRepo.findAllByUser(user);

            // Create a map to store the count of songs added per day
            Map<String, Long> songsAddedPerDay = new HashMap<>();

            // Group userSongs by addTime date and count songs for each date
            songsAddedPerDay = userSongs.stream()
                    .collect(Collectors.groupingBy(
                            userSong -> LocalDate.parse(userSong.getAddTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                    .toString(),
                            Collectors.counting()
                    ));

            return songsAddedPerDay;
        }
    
    public Map<String, Long> analysisDailyLikedSongs(String userId) {
    	// empty check
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserSong> userSongs = userSongRepo.findAllByUser(user);

        // Create a map to store the count of songs added per day
        Map<String, Long> songsAddedPerDay = new HashMap<>();

        // Group userSongs by addTime date and count songs for each date
        songsAddedPerDay = userSongs.stream()
        		.filter(userSong->userSong.getLikeTime()!= null)
                .collect(Collectors.groupingBy(
                        userSong -> LocalDate.parse(userSong.getLikeTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                .toString(),
                        Collectors.counting()
                ));

        return songsAddedPerDay;
    }
    
}
