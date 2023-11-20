package com.app.services;

import org.springframework.stereotype.Service;

import com.app.payloads.AlbumPayload;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;

@Service
public interface RemoveService {
	public void removeSong(SongPayload song, String userId);
	public void removeArtist(ArtistPayload artist, String userId);
	public void removeAlbum(AlbumPayload album, String userId);
}
