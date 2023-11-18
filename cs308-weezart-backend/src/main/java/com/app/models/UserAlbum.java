package com.app.models;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "useralbum")
public class UserAlbum {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "album_id")
    private Album album;
    
    private String addTime;
    
    private boolean liked;
    
    private String likeTime;
    
    private List<Integer> rating;
    
    private List<String> ratingTime;

	public UserAlbum() {
		super();
	}

	public UserAlbum(Long id, User user, Album album, String addTime) {
		super();
		this.id = id;
		this.user = user;
		this.album = album;
		this.addTime = addTime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Album getAlbum() {
		return album;
	}

	public void setAlbum(Album album) {
		this.album = album;
	}

	public String getAddTime() {
		return addTime;
	}

	public void setAddTime(String addTime) {
		this.addTime = addTime;
	}

	public boolean isLiked() {
		return liked;
	}

	public void setLiked(boolean liked) {
		this.liked = liked;
	}

	public String getLikeTime() {
		return likeTime;
	}

	public void setLikeTime(String likeTime) {
		this.likeTime = likeTime;
	}

	public List<Integer> getRating() {
		return rating;
	}

	public void setRating(List<Integer> rating) {
		this.rating = rating;
	}

	public List<String> getRatingTime() {
		return ratingTime;
	}

	public void setRatingTime(List<String> ratingTime) {
		this.ratingTime = ratingTime;
	}
	
}
