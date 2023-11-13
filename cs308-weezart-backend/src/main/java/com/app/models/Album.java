package com.app.models;

import java.util.List;

public class Album {
	String id;
	String name;
	String imageUrl;
	String releaseDate;
	int numberOfTracks;
	
	List<String> artistsName;
	List<String> artistsId;
	
	List<String> songsName;
	List<String> songsId;
	
	public Album(String id, String name, String imageUrl, String releaseDate, int numberOfTracks,
			List<String> artistsName, List<String> artistsId, List<String> songsName, List<String> songsId) {
		super();
		this.id = id;
		this.name = name;
		this.imageUrl = imageUrl;
		this.releaseDate = releaseDate;
		this.numberOfTracks = numberOfTracks;
		this.artistsName = artistsName;
		this.artistsId = artistsId;
		this.songsName = songsName;
		this.songsId = songsId;
	}
	public List<String> getSongsName() {
		return songsName;
	}
	public void setSongsName(List<String> songsName) {
		this.songsName = songsName;
	}
	public List<String> getSongsId() {
		return songsId;
	}
	public void setSongsId(List<String> songsId) {
		this.songsId = songsId;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getReleaseDate() {
		return releaseDate;
	}
	public void setReleaseDate(String releaseDate) {
		this.releaseDate = releaseDate;
	}
	public int getNumberOfTracks() {
		return numberOfTracks;
	}
	public void setNumberOfTracks(int numberOfTracks) {
		this.numberOfTracks = numberOfTracks;
	}
	public List<String> getArtistsName() {
		return artistsName;
	}
	public void setArtistsName(List<String> artistsName) {
		this.artistsName = artistsName;
	}
	public List<String> getArtistsId() {
		return artistsId;
	}
	public void setArtistsId(List<String> artistsId) {
		this.artistsId = artistsId;
	}
	
	
}
