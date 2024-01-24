package com.app.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.payloads.ExternalDBPayload;
import com.app.services.ExternalDBService;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RequestMapping("/add-from-db")
public class ExternalDBController {

	@Autowired
	private ExternalDBService externalDBService;

	@PostMapping("/db/{userId}")
	public ResponseEntity<?> addFromDB(@RequestBody ExternalDBPayload dbPayload, @PathVariable String userId) {
		return ResponseEntity.ok(externalDBService.relateSongsFromDB(dbPayload, userId));
	}
}
