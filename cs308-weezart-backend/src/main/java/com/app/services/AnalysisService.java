package com.app.services;
import java.util.List;

import org.springframework.stereotype.Service;

import com.app.models.Song;
import com.app.models.UserSong;

@Service
public interface AnalysisService {
	//List<Song> analysisReleaseDate(String userId, String StartYear, String FinishYear);
	List<Song> analysisReleaseDateManual(String userId, int StartYear, int FinishYear);
}
