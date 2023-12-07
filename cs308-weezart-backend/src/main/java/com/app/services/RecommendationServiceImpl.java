package com.app.services;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
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
	private AnalysisServiceImpl analysisService;
	
	public List<Song> popularityRec(){
		return songRepo.findTop10ByPopularityIsNotOrderByPopularityDesc(-1);
	}
	
	public List<Artist> genreArtistRec(String userId){
		List<Song> topRatedSongs = analysisService.analysisTop5Manual(userId);
		if(topRatedSongs!=null) {
			Set<String> topRatedGenres = new HashSet<>();
			for (Song song: topRatedSongs) {
				if (song.getPopularity()!=-1) {
					List<String> artistsId = song.getArtistsId();
					for (String artistId : artistsId) {
						Artist givenArtist = artistRepo.findByid(artistId);
						List<String> genresList = givenArtist.getGenres();
						topRatedGenres.addAll(genresList);
					 }
				}
			}

			List<Artist> allArtists = artistRepo.findAll();
			List<UserArtist> artistsAddedByUser = userArtistRepo.findAllByUser(userRepo.findByiduser(Long.parseLong(userId)));

			List<Artist> filteredArtists = allArtists.stream()
			        .filter(artist -> {
			            // Check if the artist is not in the list of artists added by the user
			            return artistsAddedByUser.stream().noneMatch(userArtist -> userArtist.getArtist().getId().equals(artist.getId()));
			        })
			        .filter(artist -> {
			            List<String> artistGenres = Optional.ofNullable(artist.getGenres()).orElse(Collections.emptyList());
			            return !artistGenres.isEmpty() && artistGenres.stream().anyMatch(topRatedGenres::contains);
			        })
			        .collect(Collectors.toList());

			Collections.shuffle(filteredArtists);

			return filteredArtists.stream().limit(5).collect(Collectors.toList());

		}
		
		
		else {
			return null;
		}
	}
}
