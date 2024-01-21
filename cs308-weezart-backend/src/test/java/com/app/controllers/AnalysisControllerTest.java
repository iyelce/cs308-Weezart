package com.app.controllers;

import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.DateRange;
import com.app.models.Song;
import com.app.services.AnalysisService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import static org.junit.jupiter.api.Assertions.assertEquals;

//...

import static org.junit.jupiter.api.Assertions.assertEquals;

//...

@SpringBootTest
@AutoConfigureMockMvc(addFilters = false)
class AnalysisControllerTest {

 @Autowired
 private MockMvc mockMvc;

 @Autowired
 private ObjectMapper objectMapper;

 @Test
 void dailySongsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Long> expectedDailyAddedSongs = createTestDailyAddedSongs();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/song/daily-added/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Long> resultDailyAddedSongs = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Long.class)
     );

     // Assertions
     assertEquals(expectedDailyAddedSongs.size(), resultDailyAddedSongs.size());
 }

 private Map<String, Long> createTestDailyAddedSongs() {
     Map<String, Long> testData = new HashMap<>();
     testData.put("2023-12-30", 3L);
     return testData;
 }

 @Test
 void dailyLikedSongsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Long> expectedDailyLikedSongs = createTestDailyLikedSongs();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/song/daily-liked/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Long> resultDailyLikedSongs = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Long.class)
     );

     // Assertions
     assertEquals(expectedDailyLikedSongs.size(), resultDailyLikedSongs.size());
 }

 private Map<String, Long> createTestDailyLikedSongs() {
     Map<String, Long> testData = new HashMap<>();
     testData.put("2024-01-21", 1L);
     return testData;
 }

 @Test
 void dailyAverageRatingAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Double> expectedDailyAverageRating = createTestDailyAverageRating();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/song/daily-rating/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Double> resultDailyAverageRating = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Double.class)
     );

     // Assertions
     assertEquals(expectedDailyAverageRating.size(), resultDailyAverageRating.size());
 }

 private Map<String, Double> createTestDailyAverageRating() {
     Map<String, Double> testData = new HashMap<>();
     testData.put("2024-01-21", 5.0D);
     return testData;
 }
 
 
 //-------------------------------------------------------------
 
 @Test
 void dailyAlbumsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Long> expectedDailyAddedAlbums = createTestDailyAddedAlbums();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/album/daily-added/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Long> resultDailyAddedAlbums = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Long.class)
     );

     // Assertions
     assertEquals(expectedDailyAddedAlbums.size(), resultDailyAddedAlbums.size());

 }

 private Map<String, Long> createTestDailyAddedAlbums() {
     Map<String, Long> testData = new HashMap<>();
     testData.put("2023-12-30", 3L);
     return testData;
 }

 @Test
 void dailyLikedAlbumsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Long> expectedDailyLikedAlbums = createTestDailyLikedAlbums();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/album/daily-liked/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Long> resultDailyLikedAlbums = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Long.class)
     );

     // Assertions
     assertEquals(expectedDailyLikedAlbums.size(), resultDailyLikedAlbums.size());
 }

 private Map<String, Long> createTestDailyLikedAlbums() {
     Map<String, Long> testData = new HashMap<>();
     //testData.put("2024-01-21", 1L);
     return testData;
 }

 @Test
 void dailyAverageRatingAlbumsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Double> expectedDailyAverageRating = createTestDailyAverageRatingAlbum();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/album/daily-rating/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Double> resultDailyAverageRating = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Double.class)
     );

     // Assertions
     assertEquals(expectedDailyAverageRating.size(), resultDailyAverageRating.size());
 }

 private Map<String, Double> createTestDailyAverageRatingAlbum() {
     Map<String, Double> testData = new HashMap<>();
     //testData.put("2024-01-21", 5.0D);
     return testData;
 }
 
 //-------------------------------------------------

 @Test
 void dailyArtistsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Long> expectedDailyAddedArtists = createTestDailyAddedArtists();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/artist/daily-added/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Long> resultDailyAddedArtists = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Long.class)
     );

     // Assertions
     assertEquals(expectedDailyAddedArtists.size(), resultDailyAddedArtists.size());
 }

 private Map<String, Long> createTestDailyAddedArtists() {
     Map<String, Long> testData = new HashMap<>();
     testData.put("2023-12-30", 2L);
     return testData;
 }

 @Test
 void dailyLikedArtistsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Long> expectedDailyLikedArtists = createTestDailyLikedArtists();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/artist/daily-liked/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Long> resultDailyLikedArtists = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Long.class)
     );

     // Assertions
     assertEquals(expectedDailyLikedArtists.size(), resultDailyLikedArtists.size());
 }

 private Map<String, Long> createTestDailyLikedArtists() {
     Map<String, Long> testData = new HashMap<>();
     //testData.put("2024-01-21", 1L);
     return testData;
 }

 @Test
 void dailyAverageRatingArtistsAnalysisController() throws Exception {
     // Given
     String userId = "50";
     Map<String, Double> expectedDailyAverageRatingArtists = createTestDailyAverageRatingArtists();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/artist/daily-rating/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     Map<String, Double> resultDailyAverageRatingArtists = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructMapType(Map.class, String.class, Double.class)
     );

     // Assertions
     assertEquals(expectedDailyAverageRatingArtists.size(), resultDailyAverageRatingArtists.size());
 }

 private Map<String, Double> createTestDailyAverageRatingArtists() {
     Map<String, Double> testData = new HashMap<>();
     //testData.put("2024-01-21", 4.5D);
     return testData;
 }
 
 //-------------------------------------------
 
 @Test
 void latest5AnalysisController() throws Exception {
     // Given
     String userId = "56";
     List<Song> expectedLatest5Songs = createTestLatest5Songs(); 

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/song/last-5/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     List<Song> resultLatest5Songs = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructCollectionType(List.class, Song.class)
     );

     // Assertions
     assertEquals(expectedLatest5Songs.size(), resultLatest5Songs.size());
     
 }

 private List<Song> createTestLatest5Songs() {

     return new ArrayList<>();
 }

 @Test
 void top5AnalysisController() throws Exception {
     // Given
     String userId = "56";
     List<Song> expectedTop5Songs = createTestTop5Songs();

     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/song/top-5/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     List<Song> resultTop5Songs = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructCollectionType(List.class, Song.class)
     );

     // Assertions
     assertEquals(expectedTop5Songs.size(), resultTop5Songs.size());
 }

 private List<Song> createTestTop5Songs() {
     return new ArrayList<>();
 }

 @Test
 void genreAnalysisController() throws Exception {
     // Given
     String userId = "56";
     String genre = "Pop";
     List<Song> expectedGenreSongs = createTestGenreSongs(); 



     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/song/genre/{genre}/{userId}", genre, userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     List<Song> resultGenreSongs = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructCollectionType(List.class, Song.class)
     );

     // Assertions
     assertEquals(expectedGenreSongs.size(), resultGenreSongs.size());
 }

 private List<Song> createTestGenreSongs() {

     return new ArrayList<>();
 }

 @Test
 void releaseDateAnalysisController() throws Exception {
     // Given
     String userId = "56";
     int startDate = 20220101;
     int endDate = 20220131;
     List<Song> expectedReleaseDateSongs = createTestReleaseDateSongs(); 


     // When
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/song/release-date/{startDate}/{endDate}/{userId}", startDate, endDate, userId))
             .andExpect(status().isOk())
             .andReturn();

     // Then
     List<Song> resultReleaseDateSongs = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructCollectionType(List.class, Song.class)
     );

     // Assertions
     assertEquals(expectedReleaseDateSongs.size(), resultReleaseDateSongs.size());
 }

 private List<Song> createTestReleaseDateSongs() {

     return new ArrayList<>();
 }
 //---------------------------------------------------
 @Test
 void latest5AlbumAnalysisController() throws Exception {
     String userId = "56";
     List<Album> expectedLatest5Albums = createTestLatest5Albums();
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/album/last-5/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();
     List<Album> resultLatest5Albums = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructCollectionType(List.class, Album.class)
     );
     assertEquals(expectedLatest5Albums.size(), resultLatest5Albums.size());
 }


 private List<Album> createTestLatest5Albums() {
     return new ArrayList<>();
 }

 @Test
 void top5AlbumAnalysisController() throws Exception {
     String userId = "56";
     List<Album> expectedTop5Albums = createTestTop5Albums();
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/album/top-5/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();
     List<Album> resultTop5Albums = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructCollectionType(List.class, Album.class)
     );
     assertEquals(expectedTop5Albums.size(), resultTop5Albums.size());
 }


 private List<Album> createTestTop5Albums() {
     return new ArrayList<>();
 }

 @Test
 void genreAlbumAnalysisController() throws Exception {
     String userId = "56";
     String genre = "Pop";
     List<Album> expectedGenreAlbums = createTestGenreAlbums();
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/album/genre/{genre}/{userId}", genre, userId))
             .andExpect(status().isOk())
             .andReturn();
     List<Album> resultGenreAlbums = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructCollectionType(List.class, Album.class)
     );
     assertEquals(expectedGenreAlbums.size(), resultGenreAlbums.size());
 }


 private List<Album> createTestGenreAlbums() {
     return new ArrayList<>();
 }



 @Test
 void latest5ArtistAnalysisController() throws Exception {
     String userId = "56";
     List<Artist> expectedLatest5Artists = createTestLatest5Artists();
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/artist/last-5/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();
     List<Artist> resultLatest5Artists = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructCollectionType(List.class, Artist.class)
     );
     assertEquals(expectedLatest5Artists.size(), resultLatest5Artists.size());
 }


 private List<Artist> createTestLatest5Artists() {
     return new ArrayList<>();
 }

 @Test
 void top5ArtistAnalysisController() throws Exception {
     String userId = "56";
     List<Artist> expectedTop5Artists = createTestTop5Artists();
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/artist/top-5/{userId}", userId))
             .andExpect(status().isOk())
             .andReturn();
     List<Artist> resultTop5Artists = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructCollectionType(List.class, Artist.class)
     );
     assertEquals(expectedTop5Artists.size(), resultTop5Artists.size());
 }


 private List<Artist> createTestTop5Artists() {
     return new ArrayList<>();
 }

 @Test
 void genreArtistAnalysisController() throws Exception {
     String userId = "56";
     String genre = "Pop";
     List<Artist> expectedGenreArtists = createTestGenreArtists();
     MvcResult mvcResult = mockMvc.perform(MockMvcRequestBuilders
             .get("/analysis/artist/genre/{genre}/{userId}", genre, userId))
             .andExpect(status().isOk())
             .andReturn();
     List<Artist> resultGenreArtists = objectMapper.readValue(
             mvcResult.getResponse().getContentAsString(),
             objectMapper.getTypeFactory().constructCollectionType(List.class, Artist.class)
     );
     assertEquals(expectedGenreArtists.size(), resultGenreArtists.size());
 }


 private List<Artist> createTestGenreArtists() {
     return new ArrayList<>();
 }

//--------------------------------------------
 
 
 
}
