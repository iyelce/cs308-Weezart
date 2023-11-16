package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.Artist;
import com.app.models.User;
import com.app.models.UserArtist;


@Repository
public interface UserArtistRepository extends JpaRepository<UserArtist, Long>{
	UserArtist findByArtistAndUser(Artist artist, User user);
}
