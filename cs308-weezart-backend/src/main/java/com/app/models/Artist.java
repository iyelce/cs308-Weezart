package com.app.models;

import java.util.ArrayList;
import java.util.List;

public class Artist {
	
	public Artist(String name, List<String> genres, String imageUrl, int followerCount) {
		super();
		this.name = name;
		this.genres = genres;
		this.imageUrl = imageUrl;
		this.followerCount = followerCount;
	}
	
	String name;
	List<String> genres;
	String imageUrl;
	int followerCount;
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<String> getGenres() {
		return genres;
	}
	public void setGenres(List<String> genres) {
		this.genres = genres;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public int getFollowerCount() {
		return followerCount;
	}
	public void setFollowerCount(int followerCount) {
		this.followerCount = followerCount;
	}
	
	
}
