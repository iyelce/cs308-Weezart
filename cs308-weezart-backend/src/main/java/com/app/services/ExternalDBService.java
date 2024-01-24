package com.app.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.app.payloads.ExternalDBPayload;

@Service
public interface ExternalDBService {
	public ResponseEntity<?> relateSongsFromDB(ExternalDBPayload dbDetails, String userId);
}
