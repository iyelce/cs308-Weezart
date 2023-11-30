package com.app.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "table")
public class External {

	@Id
	String id;
	String name;
	String albumName;
	String albumId;
	String albumRelease;
	List<String> artistsName;
	List<String> artistsId;
	int popularity;
	int duration_ms;
	boolean explicit;

	public External() {
		super();
	}

	public External(String id, String name, String albumName, String albumId, String albumRelease,
			List<String> artistsName, List<String> artistsId, int popularity, int duration_ms, boolean explicit) {
		super();
		this.id = id;
		this.name = name;
		this.albumName = albumName;
		this.albumId = albumId;
		this.albumRelease = albumRelease;
		this.artistsName = artistsName;
		this.artistsId = artistsId;
		this.popularity = popularity;
		this.duration_ms = duration_ms;
		this.explicit = explicit;
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

	public String getAlbumRelease() {
		return albumRelease;
	}

	public void setAlbumRelease(String albumRelease) {
		this.albumRelease = albumRelease;
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
