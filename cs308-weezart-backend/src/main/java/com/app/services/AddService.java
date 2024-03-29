package com.app.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.app.models.Album;
import com.app.models.Artist;
import com.app.models.Song;
import com.app.models.UserAlbum;
import com.app.models.UserArtist;
import com.app.models.UserSong;
import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;

@Service
public interface AddService {
	public Song addSong(SongPayload song);

	public UserSong relateUserSong(SongPayload song, String userID);

	public Artist addArtist(ArtistPayload artist);

	public UserArtist relateUserArtist(ArtistPayload artist, String userID);

	public Album addAlbum(AlbumPayload album);

	public UserAlbum relateUserAlbum(AlbumPayload album, String userID);

	public String followUser(String username, String targetUsername);

	public List<UserSong> addedSongs(String userId);

	public List<UserAlbum> addedAlbums(String userId);

	public List<UserArtist> addedArtists(String userId);

	public void relateUserSongDB(SongPayload song, String userID);

}
