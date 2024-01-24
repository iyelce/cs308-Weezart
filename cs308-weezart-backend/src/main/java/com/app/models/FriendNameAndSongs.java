package com.app.models;

import java.util.List;

public class FriendNameAndSongs {
	String friendName;
	List<Song> friendSongs;
	public String getFriendName() {
		return friendName;
	}
	public void setFriendName(String friendName) {
		this.friendName = friendName;
	}
	public List<Song> getFriendSongs() {
		return friendSongs;
	}
	public void setFriendSongs(List<Song> friendSongs) {
		this.friendSongs = friendSongs;
	}
	public FriendNameAndSongs(String friendName, List<Song> friendSongs) {
		super();
		this.friendName = friendName;
		this.friendSongs = friendSongs;
	}
	
	
	
}
