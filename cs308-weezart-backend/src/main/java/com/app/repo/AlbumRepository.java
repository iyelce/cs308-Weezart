package com.app.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.Album;

@Repository
public interface AlbumRepository extends JpaRepository<Album, String>{
	Album findByid(String id);
	Album findByName(String name);
}
