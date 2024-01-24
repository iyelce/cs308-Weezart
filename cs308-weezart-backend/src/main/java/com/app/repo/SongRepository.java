package com.app.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.app.models.Song;

@Repository
public interface SongRepository extends JpaRepository<Song, String>{

	Song findByid(String id);
	List<Song> findTop10ByPopularityIsNotOrderByPopularityDesc(Integer key);
	
}
