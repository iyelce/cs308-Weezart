package com.app.models;

import java.util.ArrayList;
import java.util.List;

public class AnalysisObjectGroupSong {
    List<User> userList;
    List<Integer> addList;
    List<Integer> likeList;
    List<Integer> avgList;
    String decade;
	public AnalysisObjectGroupSong() {
		super();
		// TODO Auto-generated constructor stub
	}
	public List<User> getUserList() {
		return userList;
	}
	public void setUserList(List<User> userList) {
		this.userList = userList;
	}
	public List<Integer> getAddList() {
		return addList;
	}
	public void setAddList(List<Integer> addList) {
		this.addList = addList;
	}
	public List<Integer> getLikeList() {
		return likeList;
	}
	public void setLikeList(List<Integer> likeList) {
		this.likeList = likeList;
	}
	public List<Integer> getAvgList() {
		return avgList;
	}
	public void setAvgList(List<Integer> avgList) {
		this.avgList = avgList;
	}
	public String getDecade() {
		return decade;
	}
	public void setDecade(String decade) {
		this.decade = decade;
	}
    
    
}
