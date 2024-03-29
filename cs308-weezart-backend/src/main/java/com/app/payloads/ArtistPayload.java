package com.app.payloads;

import java.util.List;

import com.app.models.Artist;

public class ArtistPayload {

	public ArtistPayload() {
		super();
	}

	public ArtistPayload(String name, List<String> genres, String imageUrl, int followerCount, String id) {
		super();
		this.name = name;
		this.genres = genres;
		this.imageUrl = imageUrl;
		this.followerCount = followerCount;
		this.id = id;
	}
	
	String id;
	String name;
	List<String> genres;
	String imageUrl;
	int followerCount;
	
	public ArtistPayload(Artist artist) {
        this.id = artist.getId();
        this.name = artist.getName();
        this.genres = artist.getGenres();
        this.imageUrl = artist.getImageUrl();
        this.followerCount = artist.getFollowerCount();
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
