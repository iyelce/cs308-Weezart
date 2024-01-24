package com.app.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.Song;
import com.app.models.GroupSong;

@Repository
public interface GroupSongRepository extends JpaRepository<GroupSong, String>{
	GroupSong findByid(String id);
}
