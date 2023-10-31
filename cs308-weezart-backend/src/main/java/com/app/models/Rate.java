package com.app.models;

public class Rate {
	private long userID;
	private long songID;
	private int rating;
	
	public long getUserID() {
		return userID;
	}
	public void setUserID(long userID) {
		this.userID = userID;
	}
	public long getSongID() {
		return songID;
	}
	public void setSongID(long songID) {
		this.songID = songID;
	}
	public int getRating() {
		return rating;
	}
	public void setRating(int rating) {
		this.rating = rating;
	}
	
	
}
