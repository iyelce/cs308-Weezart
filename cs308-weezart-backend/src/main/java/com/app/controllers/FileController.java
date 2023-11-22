package com.app.controllers;

import java.io.File;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.services.FileService;
import com.app.services.SpotifyService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/file")
public class FileController {

	@Autowired
	private FileService fileService;

	private static final Logger log = LoggerFactory.getLogger(SpotifyService.class);

	@PostMapping("/export/{userId}")
	public ResponseEntity<FileSystemResource> exportSongList(@PathVariable String userId) throws IOException {

		File exportedFile = fileService.exportUserSongs(userId);
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		headers.setContentDispositionFormData("attachment", exportedFile.getName());

		FileSystemResource fileSystemResource = new FileSystemResource(exportedFile);

		// exportedFile.delete();

		return new ResponseEntity<>(fileSystemResource, headers, HttpStatus.OK);

	}

	@PostMapping("/import/{userId}")
	public ResponseEntity<?> importSongList(@RequestParam("file") MultipartFile file, @PathVariable String userId)
			throws IOException {

		fileService.importUserSongs(userId, file);
		return ResponseEntity.ok("Import successful");

	}

}
