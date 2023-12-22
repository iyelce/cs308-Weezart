package com.app.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
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
import com.app.models.UserArtist;
import com.app.repo.AlbumRepository;
import com.app.repo.ArtistRepository;
import com.app.repo.UserAlbumRepository;
import com.app.repo.UserArtistRepository;
import com.app.repo.UserRepository;
import com.app.repo.UserSongRepository;

@Service
public class AnalysisServiceImpl implements AnalysisService{
	private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);
	
	@Autowired
	private UserSongRepository userSongRepo;
	
	@Autowired
	private UserAlbumRepository userAlbumRepo;
	
	@Autowired
	private UserArtistRepository userArtistRepo;
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired 
	private ArtistRepository artistRepo;
	
	// --------------------------------------------SONG ANALYSIS --------------------------------------------
	// these are the table analysis for songs
	
	// returns the last 5 liked song for user
    public List<Song> analysisLatest5Manual(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserSong> userSongs = userSongRepo.findAllByUser(user);

        List<UserSong> sortedUserSongs = userSongs.stream()
        		.filter(UserSong::isLiked)
                .sorted(Comparator.comparing(UserSong::getLikeTime, Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());

        List<Song> top5Songs = sortedUserSongs.stream()
                .limit(5)
                .map(UserSong::getSong)
                .collect(Collectors.toList());

        return top5Songs;
    }
    
    
    // returns the top 5 rated songs for user
    public List<Song> analysisTop5Manual(String userId) {
    	LocalDateTime currentTime = LocalDateTime.now();
    	System.out.println("1 start: " + currentTime);
    	
    	
        User user = userRepo.findByiduser(Long.parseLong(userId));
        
        currentTime = LocalDateTime.now();
    	System.out.println("2: " + currentTime);
    	
        List<UserSong> userSongs = userSongRepo.findAllByUser(user);
        
        currentTime = LocalDateTime.now();
    	System.out.println("3: " + currentTime);
    	
    	
        List<UserSong> filteredSongs = new ArrayList<>();
        

//        for (UserSong userSong : userSongs) {
//            Song song = userSong.getSong();
//            filteredSongs.add(song);
//        }
        
        currentTime = LocalDateTime.now();
    	System.out.println("4: " + currentTime);

        filteredSongs.sort((song1, song2) -> {
            List<Integer> ratings1 = song1.getRating();
            List<Integer> ratings2 = song2.getRating();

            int lastRating1 = ratings1 == null || ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
            int lastRating2 = ratings2 == null || ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);

            return Integer.compare(lastRating2, lastRating1);
        });
        currentTime = LocalDateTime.now();
    	System.out.println("5: " + currentTime);

    	List<Song> resultSong = new ArrayList<Song>();
      for (UserSong songs : userSongs) {
	      Song song = songs.getSong();
	      resultSong.add(song);
      }
    	
        List<Song> top5Songs = filteredSongs.size() > 5 ? resultSong.subList(0, 5) : resultSong;
        
        
        
        currentTime = LocalDateTime.now();
    	System.out.println("6 Final: " + currentTime);
        return top5Songs;
    }
    
    // returns the top 5 rated songs for a given genre
    public List<Song> analysisGenreManual(String userId, String genre){
    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserSong> userSongs = userSongRepo.findAllByUser(user);
    	List<UserSong> filteredSongs = new ArrayList<>();
    	
    	for (UserSong userSong : userSongs) {
    		if(userSong.getSong().getPopularity()!=-1) {
	    		boolean genreFound = false;
	    		Song song = userSong.getSong();
	    		List<String> artistsId = song.getArtistsId();
	    		
	    		for (String artistId : artistsId) {
	    			Artist givenArtist = artistRepo.findByid(artistId);
	    			List<String> genresList = givenArtist.getGenres();
	    			if (genresList.contains(genre)) {
	    				genreFound = true;
	    				break;
	    			}
	    		}
	    		
	    		if (genreFound == true) {
	    			filteredSongs.add(userSong);
	    		}
    		}
    	}
    	
    	filteredSongs.sort((song1, song2) -> {
    	    List<Integer> ratings1 = song1.getRating();
    	    List<Integer> ratings2 = song2.getRating();

    	    int lastRating1 = ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
    	    int lastRating2 = ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);

    	    return Integer.compare(lastRating2, lastRating1);
    	});

        List<UserSong> top5Songs = filteredSongs.size() > 5 ? filteredSongs.subList(0, 5) : filteredSongs;
        List<Song> topFiveSongs = new ArrayList<Song>();
        for (UserSong songs : top5Songs) {
  	      Song song = songs.getSong();
  	    topFiveSongs.add(song);
        }
        
    	return topFiveSongs;
    }
    
    // returns top rated 5 songs for a given range - range determined by frontend in request body
    public List<Song> analysisReleaseDateManual(String userId, int StartYear, int FinishYear) {
    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserSong> userSongs = userSongRepo.findAllByUser(user);
    	List<UserSong> filteredSongs = new ArrayList<>();
    	
    	for (UserSong userSong : userSongs) {
    		Song song = userSong.getSong();
    		String albumReleaseYear = song.getAlbumRelease();
    		int year = Integer.parseInt(albumReleaseYear.substring(0,4));
    		if (year >= StartYear && year <= FinishYear) {
    			filteredSongs.add(userSong);
    		}
    	}
    	
    	filteredSongs.sort((song1, song2) -> {
    	    List<Integer> ratings1 = song1.getRating();
    	    List<Integer> ratings2 = song2.getRating();

    	    int lastRating1 = ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
    	    int lastRating2 = ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);

    	    return Integer.compare(lastRating2, lastRating1);
    	});
    	
    	
        List<UserSong> top5Songs = filteredSongs.size() > 5 ? filteredSongs.subList(0, 5) : filteredSongs;
        List<Song> topFiveSongs = new ArrayList<Song>();
        for (UserSong songs : top5Songs) {
  	      Song song = songs.getSong();
  	    topFiveSongs.add(song);
        }
        
    	return topFiveSongs;
    }
    
    // these are the chart analysis for songs
    
    // returns map of date and how many songs added
    public Map<String, Long> analysisDailyAddedSongs(String userId) {
            User user = userRepo.findByiduser(Long.parseLong(userId));
            List<UserSong> userSongs = userSongRepo.findAllByUser(user);
            Map<String, Long> songsAddedPerDay = new HashMap<>();
            
            songsAddedPerDay = userSongs.stream()
                    .collect(Collectors.groupingBy(
                            userSong -> LocalDate.parse(userSong.getAddTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                    .toString(),
                            Collectors.counting()
                    ));

            return songsAddedPerDay;
        }
    
    // returns map of date and how many songs liked
    public Map<String, Long> analysisDailyLikedSongs(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserSong> userSongs = userSongRepo.findAllByUser(user);
        Map<String, Long> songsAddedPerDay = new HashMap<>();

        songsAddedPerDay = userSongs.stream()
        		.filter(userSong->userSong.getLikeTime()!= null)
                .collect(Collectors.groupingBy(
                        userSong -> LocalDate.parse(userSong.getLikeTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                .toString(),
                        Collectors.counting()
                ));

        return songsAddedPerDay;
    }
    
    // returns map of date and average rating given that day
    public Map<String, Double> analysisDailyAverageRating(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserSong> userSongs = userSongRepo.findAllByUser(user);

        Map<String, Double> averageRatingPerDay = userSongs.stream()
                .filter(userSong -> userSong.getRatingTime() != null && !userSong.getRatingTime().isEmpty())  
                .collect(Collectors.groupingBy(
                        userSong -> LocalDate.parse(userSong.getRatingTime().get(userSong.getRatingTime().size() - 1), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                .toString(),
                        HashMap::new, 
                        Collectors.averagingDouble(userSong -> {
                            List<Integer> ratings = userSong.getRating();
                            if (!ratings.isEmpty()) {
                                return ratings.get(ratings.size() - 1);
                            }
                            return 0; 
                        })
                ));
        
        return averageRatingPerDay;
    }
    
    // these are the numerical analysis for songs, one for total one for date constrained
    // returns a list of integers, first index add count second like count third rate count
    public List<Integer> analysisSongCounts(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserSong> userSongs = userSongRepo.findAllByUser(user);

        int totalAddedCount = userSongs.size();
        int likedCount = (int) userSongs.stream().filter(UserSong::isLiked).count();
        int ratedCount = (int) userSongs.stream()
                .filter(userSong -> userSong.getRating() != null && !userSong.getRating().isEmpty() && userSong.getRating().stream().anyMatch(rating -> rating != 0))
                .count();

        return List.of(totalAddedCount, likedCount, ratedCount);
    }

    // returns a list of integers, first index add count second like count third rate count for a given date slot
    public List<Integer> analysisConstrainedSongCounts(String userId, String dateConstraint) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserSong> userSongs = userSongRepo.findAllByUser(user);

        LocalDate constraintDate = LocalDate.parse(dateConstraint, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        List<UserSong> constrainedUserSongs = userSongs.stream()
                .filter(userSong -> {
                  
                    LocalDate songDate = LocalDate.parse(userSong.getAddTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                    return !songDate.isBefore(constraintDate);
                })
                .collect(Collectors.toList());

        int totalAddedCount = constrainedUserSongs.size();
        int likedCount = (int) constrainedUserSongs.stream().filter(UserSong::isLiked).count();
        int ratedCount = (int) constrainedUserSongs.stream()
                .filter(userSong -> userSong.getRating() != null && !userSong.getRating().isEmpty() && userSong.getRating().stream().anyMatch(rating -> rating != 0))
                .count();

        return List.of(totalAddedCount, likedCount, ratedCount);
    }

    //------------------------------------------------------- ALBUM ANALYSIS ---------------------------------
    
    public List<Album> analysisLatest5Album(String userId){
    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);
    	
        List<UserAlbum> sortedUserAlbums = userAlbums.stream()
        		.filter(UserAlbum::isLiked)
                .sorted(Comparator.comparing(UserAlbum::getLikeTime, Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());

        List<Album> top5Albums = sortedUserAlbums.stream()
                .limit(5)
                .map(UserAlbum::getAlbum)
                .collect(Collectors.toList());

        return top5Albums;
   
    }
    
    public List<Album> analysisTop5Album(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);
        List<UserAlbum> filteredAlbums = new ArrayList<>();

        for (UserAlbum userAlbum : userAlbums) {
            Album album = userAlbum.getAlbum();
            filteredAlbums.add(userAlbum);
        }

        filteredAlbums.sort((album1, album2) -> {
            List<Integer> ratings1 = album1.getRating();
            List<Integer> ratings2 = album2.getRating();

            int lastRating1 = ratings1 == null || ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
            int lastRating2 = ratings2 == null || ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);
            // Sort in descending order
            return Integer.compare(lastRating2, lastRating1);
        });

        List<UserAlbum> top5Albums = filteredAlbums.size() > 5 ? filteredAlbums.subList(0, 5) : filteredAlbums;
        List<Album> topFiveAlbum = new ArrayList<Album>();
        for (UserAlbum userAlbum : top5Albums) {
            Album album = userAlbum.getAlbum();
            topFiveAlbum.add(album);
        }
        
        return topFiveAlbum;
    }
    
    public List<Album> analysisGenreAlbum(String userId, String genre){
    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);
    	List<UserAlbum> filteredAlbums = new ArrayList<>();
    	for (UserAlbum userAlbum : userAlbums) {
    		if(userAlbum.getAlbum().getImageUrl() != null) {
	    		boolean genreFound = false;
	    		Album album = userAlbum.getAlbum();
	    		List<String> artistsId = album.getArtistsId();
	    		
	    		for (String artistId : artistsId) {
	    			if (artistRepo.findByid(artistId)!=null) {
	    				Artist givenArtist = artistRepo.findByid(artistId);	    			
		    			List<String> genresList = givenArtist.getGenres();
		    			if (genresList.contains(genre)) {
		    				genreFound = true;
		    				break;
		    			}
	    			}
	    		}
	    		
	    		if (genreFound == true) {
	    			filteredAlbums.add(userAlbum);
	    		}
    		}
    	}

    	filteredAlbums.sort((album1, album2) -> {
    	    List<Integer> ratings1 = album1.getRating();
    	    List<Integer> ratings2 = album2.getRating();

            int lastRating1 = ratings1 == null || ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
            int lastRating2 = ratings2 == null || ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);

    	    return Integer.compare(lastRating2, lastRating1);
    	});

        List<UserAlbum> top5Albums = filteredAlbums.size() > 5 ? filteredAlbums.subList(0, 5) : filteredAlbums;
        List<Album> topFiveAlbum = new ArrayList<Album>();
        for (UserAlbum userAlbum : top5Albums) {
            Album album = userAlbum.getAlbum();
            topFiveAlbum.add(album);
        }
        
        return topFiveAlbum;
        
    }
    
   
    public List<Album> analysisReleaseDateAlbum(String userId, int StartYear, int FinishYear){
    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);
    	List<UserAlbum> filteredAlbums = new ArrayList<>();    	
    
    
		for (UserAlbum userAlbum : userAlbums) {
			Album album = userAlbum.getAlbum();
			String albumReleaseYear = album.getReleaseDate();
			int year = Integer.parseInt(albumReleaseYear.substring(0,4));
			if (year >= StartYear && year <= FinishYear) {
				filteredAlbums.add(userAlbum);
			}
		}
		
    	filteredAlbums.sort((album1, album2) -> {
    	    List<Integer> ratings1 = album1.getRating();
    	    List<Integer> ratings2 = album2.getRating();

            int lastRating1 = ratings1 == null || ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
            int lastRating2 = ratings2 == null || ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);

    	    return Integer.compare(lastRating2, lastRating1);
    	});

        List<UserAlbum> top5Albums = filteredAlbums.size() > 2 ? filteredAlbums.subList(0, 2) : filteredAlbums;
        List<Album> topFiveAlbum = new ArrayList<Album>();
        for (UserAlbum userAlbum : top5Albums) {
            Album album = userAlbum.getAlbum();
            topFiveAlbum.add(album);
        }
        
        return topFiveAlbum;
    }
    
    
    public Map<String, Long> analysisDailyAddedAlbums(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);
        Map<String, Long> albumsAddedPerDay = new HashMap<>();

        albumsAddedPerDay = userAlbums.stream()
                .collect(Collectors.groupingBy(
                        userAlbum -> LocalDate.parse(userAlbum.getAddTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                .toString(),
                        Collectors.counting()
                ));

        return albumsAddedPerDay;
    }
    
    public Map<String, Long> analysisDailyLikedAlbums(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);
        Map<String, Long> albumsAddedPerDay = new HashMap<>();

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
        Map<String, Double> averageRatingPerDay = userAlbums.stream()
                .filter(userAlbum -> userAlbum.getRatingTime() != null && !userAlbum.getRatingTime().isEmpty())  
                .collect(Collectors.groupingBy(
                        userAlbum -> LocalDate.parse(userAlbum.getRatingTime().get(userAlbum.getRatingTime().size() - 1), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                .toString(),
                        HashMap::new, 
                        Collectors.averagingDouble(userAlbum -> {
                            List<Integer> ratings = userAlbum.getRating();
                            if (!ratings.isEmpty()) {                        
                                return ratings.get(ratings.size() - 1);
                            }
                            return 0; 
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
                .filter(userAlbum -> userAlbum.getRating() != null && !userAlbum.getRating().isEmpty() && userAlbum.getRating().stream().anyMatch(rating -> rating != 0))
                .count();

        return List.of(totalAddedCount, likedCount, ratedCount);
    }
    
    public List<Integer> analysisConstrainedAlbumCounts(String userId, String dateConstraint) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);
        LocalDate constraintDate = LocalDate.parse(dateConstraint, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        List<UserAlbum> constrainedUserAlbums = userAlbums.stream()
                .filter(userAlbum -> {
                    
                    LocalDate albumDate = LocalDate.parse(userAlbum.getAddTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                    return !albumDate.isBefore(constraintDate);
                })
                .collect(Collectors.toList());

        int totalAddedCount = constrainedUserAlbums.size();
        int likedCount = (int) constrainedUserAlbums.stream().filter(UserAlbum::isLiked).count();
        int ratedCount = (int) constrainedUserAlbums.stream()
                .filter(userAlbum -> userAlbum.getRating() != null && !userAlbum.getRating().isEmpty() && userAlbum.getRating().stream().anyMatch(rating -> rating != 0))
                .count();

        return List.of(totalAddedCount, likedCount, ratedCount);
    }
    
    
    
    
    //------------------------------------------------- ARTIST ANALYSIS -----------------------------------
    
    
    public List<Artist> analysisLatest5Artist(String userId){

    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserArtist> userArtists = userArtistRepo.findAllByUser(user);    	
        List<UserArtist> sortedUserArtists = userArtists.stream()
        		.filter(UserArtist::isLiked)
                .sorted(Comparator.comparing(UserArtist::getLikeTime, Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());

        List<Artist> top5Artists = sortedUserArtists.stream()
                .limit(5)
                .map(UserArtist::getArtist)
                .collect(Collectors.toList());

        return top5Artists;
    
    	
    }
    
    public List<Artist> analysisTop5Artist(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserArtist> userArtists = userArtistRepo.findAllByUser(user);
        List<UserArtist> filteredArtists = new ArrayList<>();

        for (UserArtist userArtist : userArtists) {
        	Artist artist = userArtist.getArtist();
            filteredArtists.add(userArtist);
        }

        filteredArtists.sort((artist1, artist2) -> {
            List<Integer> ratings1 = artist1.getRating();
            List<Integer> ratings2 = artist2.getRating();

            int lastRating1 = ratings1 == null || ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
            int lastRating2 = ratings2 == null || ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);
            log.info(String.valueOf(lastRating1));
            log.info(String.valueOf(lastRating2));

            return Integer.compare(lastRating2, lastRating1);
        });

        List<UserArtist> top5Artists = filteredArtists.size() > 5 ? filteredArtists.subList(0, 5) : filteredArtists;
        List<Artist> topFiveArtists = new ArrayList<Artist>();
        for (UserArtist userArtist : top5Artists) {
        	Artist artist = userArtist.getArtist();
        	topFiveArtists.add(artist);
        }
        return topFiveArtists;
    }
    
    public List<Artist> analysisGenreArtist(String userId, String genre){
    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserArtist> userArtists = userArtistRepo.findAllByUser(user);
    	List<UserArtist> filteredArtists = new ArrayList<>();
    	for (UserArtist userArtist : userArtists) {
    		if(userArtist.getArtist().getFollowerCount()!=-1) {
	    		boolean genreFound = false;
	    		Artist givenArtist = userArtist.getArtist();
	    		List<String> genresList = givenArtist.getGenres();
	    		if (genresList.contains(genre)) {
    				genreFound = true;
    			}	    		
	    		if (genreFound == true) {
	    			filteredArtists.add(userArtist);
	    		}
    		}
    	}
    	
    	
    	filteredArtists.sort((artist1, artist2) -> {
    	    List<Integer> ratings1 = artist1.getRating();
    	    List<Integer> ratings2 = artist2.getRating();

            int lastRating1 = ratings1 == null || ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
            int lastRating2 = ratings2 == null || ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);

    	    return Integer.compare(lastRating2, lastRating1);
    	});


        List<UserArtist> top5Artists = filteredArtists.size() > 5 ? filteredArtists.subList(0, 5) : filteredArtists;
        List<Artist> topFiveArtists = new ArrayList<Artist>();
        for (UserArtist userArtist : top5Artists) {
        	Artist artist = userArtist.getArtist();
        	topFiveArtists.add(artist);
        }
        return topFiveArtists;

    }
       
    public List<Artist> analysisReleaseDateArtist(String userId, int StartYear, int FinishYear){
    	User user = userRepo.findByiduser(Long.parseLong(userId));
    	List<UserAlbum> userAlbums = userAlbumRepo.findAllByUser(user);
    	Set<String> filteredArtistsId = new HashSet<>(); 
    	List<UserArtist> filteredArtists = new ArrayList<>();    	
    
		for (UserAlbum userAlbum : userAlbums) {
			Album album = userAlbum.getAlbum();
			String albumReleaseYear = album.getReleaseDate();
			int year = Integer.parseInt(albumReleaseYear.substring(0,4));
			if (year >= StartYear && year <= FinishYear) {
				filteredArtistsId.addAll(album.getArtistsId());
			}
		}
		
		for (String artistId : filteredArtistsId) {
			Artist artist = artistRepo.findByid(artistId);
			
		    UserArtist userArtist = userArtistRepo.findByArtistAndUser(artist, user);

		    if (artist != null) {
		        filteredArtists.add(userArtist);
		    }
		}
		
    	filteredArtists.sort((artist1, artist2) -> {
    	    List<Integer> ratings1 = artist1.getRating();
    	    List<Integer> ratings2 = artist2.getRating();

            int lastRating1 = ratings1 == null || ratings1.isEmpty() ? 0 : ratings1.get(ratings1.size() - 1);
            int lastRating2 = ratings2 == null || ratings2.isEmpty() ? 0 : ratings2.get(ratings2.size() - 1);

    	    return Integer.compare(lastRating2, lastRating1);
    	});


        List<UserArtist> top5Artists = filteredArtists.size() > 5 ? filteredArtists.subList(0, 5) : filteredArtists;
        List<Artist> topFiveArtists = new ArrayList<Artist>();
        for (UserArtist userArtist : top5Artists) {
        	Artist artist = userArtist.getArtist();
        	topFiveArtists.add(artist);
        }
        return topFiveArtists;
	
    }
    
    
    public Map<String, Long> analysisDailyAddedArtists(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserArtist> userArtists = userArtistRepo.findAllByUser(user);
        Map<String, Long> artistsAddedPerDay = new HashMap<>();

        artistsAddedPerDay = userArtists.stream()
                .collect(Collectors.groupingBy(
                        userArtist -> LocalDate.parse(userArtist.getAddTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                .toString(),
                        Collectors.counting()
                ));

        return artistsAddedPerDay;
    }
    
    public Map<String, Long> analysisDailyLikedArtists(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserArtist> userArtists = userArtistRepo.findAllByUser(user);
        Map<String, Long> artistsAddedPerDay = new HashMap<>();

        artistsAddedPerDay = userArtists.stream()
        		.filter(userArtist->userArtist.getLikeTime()!= null)
                .collect(Collectors.groupingBy(
                        userArtist -> LocalDate.parse(userArtist.getLikeTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                .toString(),
                        Collectors.counting()
                ));

        return artistsAddedPerDay;
    }
    
    public Map<String, Double> analysisDailyAverageRatingArtists(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserArtist> userArtists = userArtistRepo.findAllByUser(user);

        Map<String, Double> averageRatingPerDay = userArtists.stream()
                .filter(userArtist -> userArtist.getRatingTime() != null && !userArtist.getRatingTime().isEmpty())  
                .collect(Collectors.groupingBy(
                        userArtist -> LocalDate.parse(userArtist.getRatingTime().get(userArtist.getRatingTime().size() - 1), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
                                .toString(),
                        HashMap::new, 
                        Collectors.averagingDouble(userArtist -> {
                            List<Integer> ratings = userArtist.getRating();
                            if (!ratings.isEmpty()) {
                                return ratings.get(ratings.size() - 1);
                            }
                            return 0; 
                        })
                ));

        return averageRatingPerDay;
    }
    
    public List<Integer> analysisArtistCounts(String userId) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserArtist> userArtists = userArtistRepo.findAllByUser(user);

        int totalAddedCount = userArtists.size();
        int likedCount = (int) userArtists.stream().filter(UserArtist::isLiked).count();
        int ratedCount = (int) userArtists.stream()
                .filter(userArtist -> userArtist.getRating() != null && !userArtist.getRating().isEmpty() && userArtist.getRating().stream().anyMatch(rating -> rating != 0))
                .count();

        return List.of(totalAddedCount, likedCount, ratedCount);
    }
    
    public List<Integer> analysisConstrainedArtistCounts(String userId, String dateConstraint) {
        User user = userRepo.findByiduser(Long.parseLong(userId));
        List<UserArtist> userArtists = userArtistRepo.findAllByUser(user);

        LocalDate constraintDate = LocalDate.parse(dateConstraint, DateTimeFormatter.ofPattern("yyyy-MM-dd"));

        List<UserArtist> constrainedUserArtists = userArtists.stream()
                .filter(userArtist -> {

                    LocalDate artistDate = LocalDate.parse(userArtist.getAddTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
                    return !artistDate.isBefore(constraintDate);
                })
                .collect(Collectors.toList());

        int totalAddedCount = constrainedUserArtists.size();
        int likedCount = (int) constrainedUserArtists.stream().filter(UserArtist::isLiked).count();
        int ratedCount = (int) constrainedUserArtists.stream()
                .filter(userArtist -> userArtist.getRating() != null && !userArtist.getRating().isEmpty() && userArtist.getRating().stream().anyMatch(rating -> rating != 0))
                .count();

        return List.of(totalAddedCount, likedCount, ratedCount);
    }
    
}
