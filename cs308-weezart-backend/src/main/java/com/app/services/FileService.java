package com.app.services;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface FileService {
	public File exportUserSongs(String userId) throws IOException;

	public void importUserSongs(String userId, MultipartFile file) throws IOException;
}
