package com.app.services;

import org.springframework.stereotype.Service;

import com.app.models.UserAlbum;
import com.app.models.UserArtist;
import com.app.models.UserSong;
import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;

@Service
public interface RateService {
	public UserSong relateRateSong(SongPayload song, String userID, int rating);

	public UserArtist relateRateArtist(ArtistPayload artist, String userId, int rating);

	public UserAlbum relateRateAlbum(AlbumPayload album, String userId, int rating);
}
