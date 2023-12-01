package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserSong;

@Repository
public interface UserSongRepository extends JpaRepository<UserSong, Long>{
	UserSong findBySongAndUser(Song song, User user);
	List<UserSong> findAllByUser(User user);
	void deleteBySongId(String songId);
}


