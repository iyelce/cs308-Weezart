package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.Artist;

@Repository
public interface ArtistRepository extends JpaRepository<Artist, String> {
	Artist findByid(String id);

	Artist findByName(String name);
}
