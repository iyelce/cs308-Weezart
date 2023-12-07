package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.Album;
import com.app.models.LikeAlbum;
import com.app.models.User;

@Repository
public interface LikeAlbumRepository extends JpaRepository<LikeAlbum, Long> {
	LikeAlbum findByAlbumAndUser(Album album, User user);
}
