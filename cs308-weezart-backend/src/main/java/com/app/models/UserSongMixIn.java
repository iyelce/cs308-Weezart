package com.app.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

public interface UserSongMixIn {
    @JsonIgnore Long getId();
    @JsonIgnore User getUser();
}
