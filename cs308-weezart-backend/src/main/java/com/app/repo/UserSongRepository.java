package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.Song;
import com.app.models.User;
import com.app.models.UserSong;

@Repository
public interface UserSongRepository extends JpaRepository<UserSong, Long>{
	UserSong findBySongAndUser(Song song, User user);
}
