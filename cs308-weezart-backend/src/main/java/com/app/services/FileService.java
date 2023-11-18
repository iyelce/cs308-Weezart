package com.app.services;

import java.io.File;
import java.io.IOException;

import org.springframework.stereotype.Service;

@Service
public interface FileService {
	public File exportUserSongs(String userId) throws IOException;
}
