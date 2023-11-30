package com.app.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "artists")
public class Artist {
	@Id
	String id;
	String name;
	List<String> genres;
	String imageUrl;
	int followerCount;
	
	
	public Artist(String name, List<String> genres, String imageUrl, int followerCount, String id) {
		super();
		this.name = name;
		this.genres = genres;
		this.imageUrl = imageUrl;
		this.followerCount = followerCount;
		this.id = id;
	}
	
	
	
	public Artist() {
		super();
	}

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
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	
	
}
