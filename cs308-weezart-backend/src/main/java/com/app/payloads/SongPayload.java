package com.app.payloads;

import java.util.List;

public class SongPayload {
	String id; 
	String name; 
	String albumName; 
	String albumId;
	String albumImageURL;
	List<String> artistsName;
	List<String> artistsId;
	int popularity; 
	int duration_ms;
	boolean explicit;
	String albumRelease;
	
	
	
	@Override
	public String toString() {
		return "SongPayload [id=" + id + ", name=" + name + ", albumName=" + albumName + ", albumId=" + albumId
				+ ", albumImageURL=" + albumImageURL + ", artistsName=" + artistsName + ", artistsId=" + artistsId
				+ ", popularity=" + popularity + ", duration_ms=" + duration_ms + ", explicit=" + explicit
				+ ", albumRelease=" + albumRelease + "]";
	}
	public String getAlbumImage() {
		return albumImageURL;
	}
	public void setAlbumImage(String albumImage) {
		this.albumImageURL = albumImage;
	}
	public String getAlbumRelease() {
		return albumRelease;
	}
	public void setAlbumRelease(String albumRelease) {
		this.albumRelease = albumRelease;
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
	public String getAlbumName() {
		return albumName;
	}
	public void setAlbumName(String albumName) {
		this.albumName = albumName;
	}
	public String getAlbumId() {
		return albumId;
	}
	public void setAlbumId(String albumId) {
		this.albumId = albumId;
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
	public int getPopularity() {
		return popularity;
	}
	public void setPopularity(int popularity) {
		this.popularity = popularity;
	}
	public int getDuration_ms() {
		return duration_ms;
	}
	public void setDuration_ms(int duration_ms) {
		this.duration_ms = duration_ms;
	}
	public boolean isExplicit() {
		return explicit;
	}
	public void setExplicit(boolean explicit) {
		this.explicit = explicit;
	}
}
