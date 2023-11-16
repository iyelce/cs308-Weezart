package com.app.services;

import org.springframework.stereotype.Service;

import com.app.models.Song;
import com.app.models.UserSong;
import com.app.payloads.SongPayload;

@Service
public interface AddService {
	public Song addSong(SongPayload song);
	public UserSong relateUserSong(SongPayload song, String userID); 
}
