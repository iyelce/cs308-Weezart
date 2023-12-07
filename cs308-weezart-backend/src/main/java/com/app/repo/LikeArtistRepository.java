package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.Artist;
import com.app.models.LikeArtist;
import com.app.models.User;

@Repository
public interface LikeArtistRepository extends JpaRepository<LikeArtist, Long> {
	LikeArtist findByArtistAndUser(Artist  artist, User  user);
}
