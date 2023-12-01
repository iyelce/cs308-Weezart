package com.app.payloads;

public class ExternalDBPayload {
	private String url;
	private String username;
	private String password;
	private String table;

	public ExternalDBPayload() {
		super();
	}

	public ExternalDBPayload(String url, String username, String password, String table) {
		super();
		this.url = url;
		this.username = username;
		this.password = password;
		this.table = table;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getTable() {
		return table;
	}

	public void setTable(String table) {
		this.table = table;
	}

}