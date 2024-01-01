package com.app.models;

import java.util.List;

public class BigGroupSong {
	private List<Song> songList;
	private GroupSong userSong;
	public BigGroupSong() {
		super();
		
	}
	public List<Song> getSongList() {
		return songList;
	}
	public void setSongList(List<Song> songList) {
		this.songList = songList;
	}
	public GroupSong getUserSong() {
		return userSong;
	}
	public void setUserSong(GroupSong userSong) {
		this.userSong = userSong;
	}
	
	

}
