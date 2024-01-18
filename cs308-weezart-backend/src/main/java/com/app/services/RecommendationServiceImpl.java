package com.app.services;

import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.controllers.AuthenticationController;
import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.FriendNameAndSongs;
import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserAlbum;
import com.app.models.UserArtist;
import com.app.models.UserSong;
import com.app.repo.AlbumRepository;
import com.app.repo.ArtistRepository;
import com.app.repo.SongRepository;
import com.app.repo.UserAlbumRepository;
import com.app.repo.UserArtistRepository;
import com.app.repo.UserRepository;
import com.app.repo.UserSongRepository;

@Service
public class RecommendationServiceImpl implements RecommendationService {
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

	@Autowired
	private SongRepository songRepo;

	@Autowired
	private AlbumRepository albumRepo;

	@Autowired
	private AnalysisServiceImpl analysisService;

	private boolean isYearInRange(String albumYear, String topYear) {
		int albumYearInt = Integer.parseInt(albumYear);
		int topYearInt = Integer.parseInt(topYear);

		// Calculate the start year of the decade
		int startYearOfDecade = (topYearInt / 10) * 10;

		// Check if the album year is within the decade range
		return albumYearInt >= startYearOfDecade && albumYearInt < (startYearOfDecade + 10);
	}

	public List<Song> popularityRec() {
		return songRepo.findTop10ByPopularityIsNotOrderByPopularityDesc(-1);
	}

	public List<Song> latestRec(String userId) {
		User currentUser = userRepo.findByiduser(Long.parseLong(userId));

		// Fetch the last 10 songs added by other users (excluding the current user)
		List<UserSong> userSongs = userSongRepo.findTop10ByUserNotOrderByAddTimeDesc(currentUser);

		// Assuming you have a method to map UserSong to Song, adjust accordingly
		return userSongs.stream().map(UserSong::getSong).collect(Collectors.toList());
	}

	public FriendNameAndSongs friendRec(String userId) {
		User currentUser = userRepo.findByiduser(Long.parseLong(userId));
		List<String> friendIds = currentUser.getFollowing();
		if (friendIds != null && !friendIds.isEmpty()) {

			Random random = new Random();
			int randomIndex = random.nextInt(friendIds.size());
			String randomFriendName = friendIds.get(randomIndex);

			User currentFriend = userRepo.findByUsername(randomFriendName);
			
			log.info("user role: "+ currentFriend.getAuthority().toString());

			List<UserSong> friendSongs = userSongRepo.findAllByUser(currentFriend);

			Integer counter = 0;
			while(friendSongs.isEmpty() || currentFriend.hasRole("ROLE_PRIVATE")) {
				if(counter == 10) {
					break;
				}
				random = new Random();
				randomIndex = random.nextInt(friendIds.size());
				randomFriendName = friendIds.get(randomIndex);

				currentFriend = userRepo.findByUsername(randomFriendName);

				friendSongs = userSongRepo.findAllByUser(currentFriend);
				counter++;

			}
			if (!friendSongs.isEmpty()) {
				Collections.shuffle(friendSongs, random);
				List<UserSong> randomFriendSongs = friendSongs.subList(0, Math.min(5, friendSongs.size()));
				List<Song> songsFromRandomFriendSongs = randomFriendSongs.stream().map(UserSong::getSong)
						.collect(Collectors.toList());
	
				FriendNameAndSongs friendInfo = new FriendNameAndSongs(randomFriendName, songsFromRandomFriendSongs);
				return friendInfo;
			} else return null;
			
		} else {
			return null;
		}
	}

	public List<Album> releaseDateRec(String userId) {
		List<Album> topRatedAlbums = analysisService.analysisTop5Album(userId);
		if (topRatedAlbums != null) {
			Set<String> topRatedDates = new HashSet<>();
			for (Album album : topRatedAlbums) {
				if (album.getImageUrl() != null) {
					String albumDate = album.getReleaseDate();
					topRatedDates.add(albumDate.substring(0, 4));
				}
			}

			List<Album> allAlbums = albumRepo.findAll();
			List<UserAlbum> albumsAddedByUser = userAlbumRepo
					.findAllByUser(userRepo.findByiduser(Long.parseLong(userId)));
			List<Album> filteredAlbums = allAlbums.stream().filter(album -> {
				// Check if the album is not in the list of albums added by the user
				return albumsAddedByUser.stream()
						.noneMatch(userAlbum -> userAlbum.getAlbum().getId().equals(album.getId()));
			}).filter(album -> {
			    if (album.getReleaseDate() != null) {
			    	String albumYear = album.getReleaseDate().substring(0, 4);
				    return topRatedDates.stream().anyMatch(topYear -> isYearInRange(albumYear, topYear));
			    }
			    return true;
			}).collect(Collectors.toList());

			Collections.shuffle(filteredAlbums);

			return filteredAlbums.stream().limit(5).collect(Collectors.toList());
		} else {
			return null;
		}

	}

	public List<Artist> genreArtistRec(String userId) {
		List<Song> topRatedSongs = analysisService.analysisTop5Manual(userId);
		if (topRatedSongs != null) {
			Set<String> topRatedGenres = new HashSet<>();
			for (Song song : topRatedSongs) {
				if (song.getPopularity() != -1) {
					List<String> artistsId = song.getArtistsId();
					for (String artistId : artistsId) {
						Artist givenArtist = artistRepo.findByid(artistId);
						if(givenArtist != null) {
							List<String> genresList = givenArtist.getGenres();
							topRatedGenres.addAll(genresList);
						}
					}
				}
			}

			List<Artist> allArtists = artistRepo.findAll();
			List<UserArtist> artistsAddedByUser = userArtistRepo
					.findAllByUser(userRepo.findByiduser(Long.parseLong(userId)));

			List<Artist> filteredArtists = allArtists.stream().filter(artist -> {
				// Check if the artist is not in the list of artists added by the user
				return artistsAddedByUser.stream()
						.noneMatch(userArtist -> userArtist.getArtist().getId().equals(artist.getId()));
			}).filter(artist -> {
				List<String> artistGenres = Optional.ofNullable(artist.getGenres()).orElse(Collections.emptyList());
				return !artistGenres.isEmpty() && artistGenres.stream().anyMatch(topRatedGenres::contains);
			}).collect(Collectors.toList());

			Collections.shuffle(filteredArtists);

			return filteredArtists.stream().limit(5).collect(Collectors.toList());

		}

		else {
			return null;
		}
	}
}
