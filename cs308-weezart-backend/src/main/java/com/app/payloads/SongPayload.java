package com.app.payloads;

import java.util.List;

import com.app.models.*;

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

	
	public SongPayload(String songname, List<String> artist) {
		this.name=songname;
		this.artistsName=artist;
	}
	
	public SongPayload(Song songPayload) {
        this.id = songPayload.getId();
        this.albumImageURL = songPayload.getAlbumImageURL();
        this.name = songPayload.getName();
        this.albumName = songPayload.getAlbumName();
        this.albumId = songPayload.getAlbumId();
        this.albumRelease = songPayload.getAlbumRelease();
        this.artistsName = songPayload.getArtistsName();
        this.artistsId = songPayload.getArtistsId();
        this.popularity = songPayload.getPopularity();
        this.duration_ms = songPayload.getDuration_ms();
        this.explicit = songPayload.isExplicit();
    }
	
	public SongPayload(String id, String name, String albumName, String albumId, String albumImageURL,
			List<String> artistsName, List<String> artistsId, int popularity, int duration_ms, boolean explicit,
			String albumRelease) {
		super();
		this.id = id;
		this.name = name;
		this.albumName = albumName;
		this.albumId = albumId;
		this.albumImageURL = albumImageURL;
		this.artistsName = artistsName;
		this.artistsId = artistsId;
		this.popularity = popularity;
		this.duration_ms = duration_ms;
		this.explicit = explicit;
		this.albumRelease = albumRelease;
	}
	@Override
	public String toString() {
		return "SongPayload [id=" + id + ", name=" + name + ", albumName=" + albumName + ", albumId=" + albumId
				+ ", albumImageURL=" + albumImageURL + ", artistsName=" + artistsName + ", artistsId=" + artistsId
				+ ", popularity=" + popularity + ", duration_ms=" + duration_ms + ", explicit=" + explicit
				+ ", albumRelease=" + albumRelease + "]";
	}
	public String getAlbumImageURL() {
		return albumImageURL;
	}
	public void setAlbumImageURL(String albumImage) {
		this.albumImageURL = albumImage;
	}

	public SongPayload() {
		super();
	}

	
	public SongPayload(External e) {
		this.id = e.getId();
		this.name = e.getName();
		this.albumName = e.getAlbumName();
		this.albumId = e.getAlbumId();
		this.artistsName = e.getArtistsName();
		this.artistsId = e.getArtistsId();
		this.popularity = e.getPopularity();
		this.duration_ms = e.getDuration_ms();
		this.explicit = e.isExplicit();
		this.albumRelease = e.getAlbumRelease();
		this.albumImageURL = e.getAlbumImageURL();
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
