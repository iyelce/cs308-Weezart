package com.app.services;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.app.models.Album;
import com.app.models.AnalysisObjectGroupSong;
import com.app.models.Artist;
import com.app.models.BigGroupSong;
import com.app.models.FriendNameAndSongs;
import com.app.models.GroupSong;
import com.app.models.Song;
import com.app.models.UserSong;

@Service
public interface GroupSongService {
	
	public GroupSong createPlaylist(String userIds);
	public BigGroupSong returnPlaylist(String userIds);
	public void deleteGroup(String userIds, String deletedId);
	public List<BigGroupSong> getAll(String id);
	public AnalysisObjectGroupSong analysisPlaylist(String userIds);
	

}
