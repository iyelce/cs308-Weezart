package com.app.services;

import org.springframework.stereotype.Service;

import com.app.models.LikeArtist;
import com.app.models.LikeSong;
import com.app.payloads.ArtistPayload;
import com.app.payloads.SongPayload;

@Service
public interface LikeService {
	public LikeSong relateLikeSong(SongPayload song, String userID);

	public LikeArtist relateLikeArtist(ArtistPayload artist, String userId);
}
