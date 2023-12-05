package com.app.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
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
import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserSong;
import com.app.models.UserAlbum;
import com.app.repo.AlbumRepository;
import com.app.repo.ArtistRepository;
import com.app.repo.UserAlbumRepository;
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
	private UserAlbumRepository userAlbumRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired 
	private ArtistRepository artistRepo;
	
	@Autowired
	private AlbumRepository albumRepo;
	
	
	
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
    
    /*
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
    
    	
    }*/
    
    public List<Song> analysisLatest5Manual(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));

        // Retrieve all songs associated with the user
        List<UserSong> userSongs = userSongRepo.findAllByUser(user);

        // Sort user songs based on the liketime in descending order, considering null values
        List<UserSong> sortedUserSongs = userSongs.stream()
        		.filter(UserSong::isLiked)
                .sorted(Comparator.comparing(UserSong::getLikeTime, Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());

        // Extract Song objects from sortedUserSongs
        List<Song> top5Songs = sortedUserSongs.stream()
                .limit(5)
                .map(UserSong::getSong)
                .collect(Collectors.toList());

        return top5Songs;
    }
    
    
    
    public List<Song> analysisTop5Manual(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserSong> userSongs = userSongRepo.findAllByUser(user);
        List<Song> filteredSongs = new ArrayList<>();

        for (UserSong userSong : userSongs) {
            Song song = userSong.getSong();
            filteredSongs.add(song);
        }

        filteredSongs.sort((song1, song2) -> {
            List<Integer> ratings1 = userSongRepo.findBySongAndUser(song1, user).getRating();
            List<Integer> ratings2 = userSongRepo.findBySongAndUser(song2, user).getRating();

            int lastRating1 = ratings1 == null || ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
            int lastRating2 = ratings2 == null || ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);

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
    
    public Map<String, Double> analysisDailyAverageRating(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserSong> userSongs = userSongRepo.findAllByUser(user);

        // Create a map to store the average rating per day
        Map<String, Double> averageRatingPerDay = userSongs.stream()
                .filter(userSong -> userSong.getRatingTime() != null && !userSong.getRatingTime().isEmpty())  // Null check and filter out UserSongs with empty rating times
                .collect(Collectors.groupingBy(
                        userSong -> LocalDate.parse(userSong.getRatingTime().get(userSong.getRatingTime().size() - 1), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                .toString(),
                        HashMap::new, // Explicitly specify HashMap as the map type
                        Collectors.averagingDouble(userSong -> {
                            List<Integer> ratings = userSong.getRating();
                            if (!ratings.isEmpty()) {
                                // Use the last index of the ratings array
                                return ratings.get(ratings.size() - 1);
                            }
                            return 0; // Default value if ratings array is empty
                        })
                ));

        return averageRatingPerDay;
    }
    
    
    public List<Integer> analysisSongCounts(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserSong> userSongs = userSongRepo.findAllByUser(user);

        int totalAddedCount = userSongs.size();
        int likedCount = (int) userSongs.stream().filter(UserSong::isLiked).count();
        int ratedCount = (int) userSongs.stream()
                .filter(userSong -> userSong.getRating() != null && !userSong.getRating().isEmpty())
                .count();

        return List.of(totalAddedCount, likedCount, ratedCount);
    }

    
    
    
    
    
    public List<Integer> analysisConstrainedSongCounts(String userId, String dateConstraint) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserSong> userSongs = userSongRepo.findAllByUser(user);

        // Parse the dateConstraint string to LocalDate
        LocalDate constraintDate = LocalDate.parse(dateConstraint, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // Filter userSongs based on the date constraint
        List<UserSong> constrainedUserSongs = userSongs.stream()
                .filter(userSong -> {
                    // Assuming getAddTime returns a string in "yyyy-MM-dd HH:mm:ss" format
                    LocalDate songDate = LocalDate.parse(userSong.getAddTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                    return !songDate.isBefore(constraintDate);
                })
                .collect(Collectors.toList());

        // Perform count operations on the constrained userSongs
        int totalAddedCount = constrainedUserSongs.size();
        int likedCount = (int) constrainedUserSongs.stream().filter(UserSong::isLiked).count();
        int ratedCount = (int) constrainedUserSongs.stream()
                .filter(userSong -> userSong.getRating() != null && !userSong.getRating().isEmpty())
                .count();

        return List.of(totalAddedCount, likedCount, ratedCount);
    }

    
    
    public List<Album> analysisLatest5Album(String userId){

    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);
    	List<Album> filteredAlbums = new ArrayList<>();
    	
        List<UserAlbum> sortedUserAlbums = userAlbums.stream()
        		.filter(UserAlbum::isLiked)
                .sorted(Comparator.comparing(UserAlbum::getLikeTime, Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());

        // Extract Album objects from sortedUserSongs
        List<Album> top5Albums = sortedUserAlbums.stream()
                .limit(5)
                .map(UserAlbum::getAlbum)
                .collect(Collectors.toList());

        return top5Albums;
    
    	
    }
    

   
    public List<Album> analysisTop5Album(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);
        List<Album> filteredAlbums = new ArrayList<>();

        for (UserAlbum userAlbum : userAlbums) {
            Album album = userAlbum.getAlbum();
            filteredAlbums.add(album);
        }

        filteredAlbums.sort((album1, album2) -> {
            List<Integer> ratings1 = userAlbumRepo.findByAlbumAndUser(album1, user).getRating();
            List<Integer> ratings2 = userAlbumRepo.findByAlbumAndUser(album2, user).getRating();

            int lastRating1 = ratings1 == null || ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
            int lastRating2 = ratings2 == null || ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);
            log.info(String.valueOf(lastRating1));
            log.info(String.valueOf(lastRating2));
            // Sort in descending order
            return Integer.compare(lastRating2, lastRating1);
        });

        List<Album> top2Albums = filteredAlbums.size() > 5 ? filteredAlbums.subList(0, 5) : filteredAlbums;
        return top2Albums;
    }
    
    public List<Album> analysisGenreAlbum(String userId, String genre){
    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);
    	List<Album> filteredAlbums = new ArrayList<>();
    	for (UserAlbum userAlbum : userAlbums) {
    		if(userAlbum.getAlbum().getImageUrl() != null) {
	    		boolean genreFound = false;
	    		Album album = userAlbum.getAlbum();
	    		List<String> artistsId = album.getArtistsId();
	    		
	    		for (String artistId : artistsId) {
	    			log.info(artistId);
	    			if (artistRepo.findByid(artistId)!=null) {
	    				Artist givenArtist = artistRepo.findByid(artistId);
	    			
		    			log.info("2. analizin sonuna geldiiik");
		    			List<String> genresList = givenArtist.getGenres();
		    			log.info(genre);
		    			
		    			if (genresList.contains(genre)) {
		    				genreFound = true;
		    				break;
		    			}
	    			}
	    		}
	    		
	    		if (genreFound == true) {
	    			log.info("boola girdi");
	    			filteredAlbums.add(album);
	    		}
    		}
    	}
    	
    	
    	filteredAlbums.sort((album1, album2) -> {
    	    List<Integer> ratings1 = userAlbumRepo.findByAlbumAndUser(album1, user).getRating();
    	    List<Integer> ratings2 = userAlbumRepo.findByAlbumAndUser(album2, user).getRating();

            int lastRating1 = ratings1 == null || ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
            int lastRating2 = ratings2 == null || ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);

    	    // Sort in descending order
    	    return Integer.compare(lastRating2, lastRating1);
    	});

        // Take the top 5 songs
        List<Album> top2Albums = filteredAlbums.size() > 5 ? filteredAlbums.subList(0, 5) : filteredAlbums;
    	
    	
    	
    	
    	
    	
    	
    	log.info("2. analizin sonuna geldiiik");
    	return top2Albums;
    }
    
    /*
     * 
     *     public List<Song> analysisReleaseDateManual(String userId, int StartYear, int FinishYear) {
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
     */
    
    
    
    public List<Album> analysisReleaseDateAlbum(String userId, int StartYear, int FinishYear){
    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);
    	List<Album> filteredAlbums = new ArrayList<>();    	
    
    
		for (UserAlbum userAlbum : userAlbums) {
			Album album = userAlbum.getAlbum();
			String albumReleaseYear = album.getReleaseDate();
			int year = Integer.parseInt(albumReleaseYear.substring(0,4));
			if (year >= StartYear && year <= FinishYear) {
				filteredAlbums.add(album);
			}
		}
		
    	filteredAlbums.sort((album1, album2) -> {
    	    List<Integer> ratings1 = userAlbumRepo.findByAlbumAndUser(album1, user).getRating();
    	    List<Integer> ratings2 = userAlbumRepo.findByAlbumAndUser(album2, user).getRating();

            int lastRating1 = ratings1 == null || ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
            int lastRating2 = ratings2 == null || ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);

    	    // Sort in descending order
    	    return Integer.compare(lastRating2, lastRating1);
    	});

        // Take the top 5 songs
        List<Album> top2Albums = filteredAlbums.size() > 2 ? filteredAlbums.subList(0, 2) : filteredAlbums;
    	
    	
    	
    	
    	
    	
    	
    	log.info("analizin sonuna geldiiik");
    	return top2Albums;
	
    }
    
    
    public Map<String, Long> analysisDailyAddedAlbums(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);

        // Create a map to store the count of songs added per day
        Map<String, Long> albumsAddedPerDay = new HashMap<>();

        // Group userSongs by addTime date and count songs for each date
        albumsAddedPerDay = userAlbums.stream()
                .collect(Collectors.groupingBy(
                        userSong -> LocalDate.parse(userSong.getAddTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                .toString(),
                        Collectors.counting()
                ));

        return albumsAddedPerDay;
    }
    
    public Map<String, Long> analysisDailyLikedAlbums(String userId) {
    	// empty check
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);

        // Create a map to store the count of songs added per day
        Map<String, Long> albumsAddedPerDay = new HashMap<>();

        // Group userSongs by addTime date and count songs for each date
        albumsAddedPerDay = userAlbums.stream()
        		.filter(userAlbum->userAlbum.getLikeTime()!= null)
                .collect(Collectors.groupingBy(
                        userAlbum -> LocalDate.parse(userAlbum.getLikeTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                .toString(),
                        Collectors.counting()
                ));

        return albumsAddedPerDay;
    }
    
    public Map<String, Double> analysisDailyAverageRatingAlbums(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);

        // Create a map to store the average rating per day
        Map<String, Double> averageRatingPerDay = userAlbums.stream()
                .filter(userAlbum -> userAlbum.getRatingTime() != null && !userAlbum.getRatingTime().isEmpty())  // Null check and filter out UserSongs with empty rating times
                .collect(Collectors.groupingBy(
                        userAlbum -> LocalDate.parse(userAlbum.getRatingTime().get(userAlbum.getRatingTime().size() - 1), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                .toString(),
                        HashMap::new, // Explicitly specify HashMap as the map type
                        Collectors.averagingDouble(userAlbum -> {
                            List<Integer> ratings = userAlbum.getRating();
                            if (!ratings.isEmpty()) {
                                // Use the last index of the ratings array
                                return ratings.get(ratings.size() - 1);
                            }
                            return 0; // Default value if ratings array is empty
                        })
                ));

        return averageRatingPerDay;
    }
    
    public List<Integer> analysisAlbumCounts(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);

        int totalAddedCount = userAlbums.size();
        int likedCount = (int) userAlbums.stream().filter(UserAlbum::isLiked).count();
        int ratedCount = (int) userAlbums.stream()
                .filter(userAlbum -> userAlbum.getRating() != null && !userAlbum.getRating().isEmpty())
                .count();

        return List.of(totalAddedCount, likedCount, ratedCount);
    }
    
    public List<Integer> analysisConstrainedAlbumCounts(String userId, String dateConstraint) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);

        // Parse the dateConstraint string to LocalDate
        LocalDate constraintDate = LocalDate.parse(dateConstraint, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        // Filter userAlbums based on the date constraint
        List<UserAlbum> constrainedUserAlbums = userAlbums.stream()
                .filter(userAlbum -> {
                    // Assuming getAddTime returns a string in "yyyy-MM-dd HH:mm:ss" format
                    LocalDate albumDate = LocalDate.parse(userAlbum.getAddTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                    return !albumDate.isBefore(constraintDate);
                })
                .collect(Collectors.toList());

        // Perform count operations on the constrained userAlbums
        int totalAddedCount = constrainedUserAlbums.size();
        int likedCount = (int) constrainedUserAlbums.stream().filter(UserAlbum::isLiked).count();
        int ratedCount = (int) constrainedUserAlbums.stream()
                .filter(userAlbum -> userAlbum.getRating() != null && !userAlbum.getRating().isEmpty())
                .count();

        return List.of(totalAddedCount, likedCount, ratedCount);
    }
    
}
