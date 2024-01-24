package com.app.services;

import org.springframework.stereotype.Service;

import com.app.models.UserAlbum;
import com.app.models.UserArtist;
import com.app.models.UserSong;
import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;

@Service
public interface LikeService {
	public UserSong relateLikeSong(SongPayload song, String userID);

	public UserArtist relateLikeArtist(ArtistPayload artist, String userId);

	public UserAlbum relateLikeAlbum(AlbumPayload album, String userId);

	
	public UserSong relateUnlikeSong(SongPayload song, String userID);

	public UserArtist relateUnlikeArtist(ArtistPayload artist, String userId);

	public UserAlbum relateUnlikeAlbum(AlbumPayload album, String userId);
}
