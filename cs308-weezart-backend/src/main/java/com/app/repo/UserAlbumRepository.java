package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.Album;
import com.app.models.User;
import com.app.models.UserAlbum;
import com.app.models.UserSong;

@Repository
public interface UserAlbumRepository extends JpaRepository<UserAlbum, Long>{
	UserAlbum findByAlbumAndUser(Album album, User user);
	List<UserAlbum> findAllByUser(User user);
}
