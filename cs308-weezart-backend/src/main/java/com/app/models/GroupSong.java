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
@Table(name = "groupsong")
public class GroupSong {
	
	@Id
	String id; // id, concatenated string of user ids with - between
	
	List<String> groupSongIds; // list of string with song ids
	List<String> groupSongNames; // list of string with name of users

	public GroupSong() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<String> getGroupSongIds() {
		return groupSongIds;
	}

	public void setGroupSongIds(List<String> groupSongIds) {
		this.groupSongIds = groupSongIds;
	}

	public List<String> getGroupSongNames() {
		return groupSongNames;
	}

	public void setGroupSongNames(List<String> groupSongNames) {
		this.groupSongNames = groupSongNames;
	}
	
}
