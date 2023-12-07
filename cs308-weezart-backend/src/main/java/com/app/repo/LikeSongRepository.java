package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.LikeSong;
import com.app.models.Song;
import com.app.models.User;

@Repository
public interface LikeSongRepository extends JpaRepository<LikeSong, Long>{
	LikeSong findBySongAndUser(Song song, User user);
}
