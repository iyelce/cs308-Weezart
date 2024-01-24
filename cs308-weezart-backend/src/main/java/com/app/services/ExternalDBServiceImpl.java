package com.app.services;

import java.util.List;

import javax.sql.DataSource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.stereotype.Service;

import com.app.models.External;
import com.app.payloads.ExternalDBPayload;
import com.app.payloads.SongPayload;

@Service
public class ExternalDBServiceImpl implements ExternalDBService {
	@Autowired
	private AddService addService;

	private static final Logger log = LoggerFactory.getLogger(FileService.class);

	public ResponseEntity<?> relateSongsFromDB(ExternalDBPayload dbDetails, String userId) {
		DataSource dataSource = configureExternalDataSource(dbDetails.getUrl(), dbDetails.getUsername(),
				dbDetails.getPassword());
		JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);

		for (External e : fetchAllFromExternalDatabase(jdbcTemplate, dbDetails.getTable())) {
			log.info("gelen e:" + e.toString());
			SongPayload song = new SongPayload(e);
			addService.addSong(song);
			addService.relateUserSongDB(song, userId);
		}

		return ResponseEntity.ok("added from db");
	}

	private List<External> fetchAllFromExternalDatabase(JdbcTemplate jdbcTemplate, String table) {
		String sql = "SELECT * FROM " + table;
		return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(External.class));
	}

	private DataSource configureExternalDataSource(String url, String username, String password) {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName("com.mysql.cj.jdbc.Driver");
		dataSource.setUrl(url);
		dataSource.setUsername(username);
		dataSource.setPassword(password);
		return dataSource;
	}
}
