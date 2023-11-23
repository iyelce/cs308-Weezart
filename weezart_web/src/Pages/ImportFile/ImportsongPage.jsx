import React from "react";
import ImportSingleSong from "./ImportSingleSong";
import AddSongSearch from "./AddSongSearch";

function ImportsongPage() {
  
  
    return (
        <div className="importPage">
            <br/> <br/> 
            <p className="song-add-label">ADD SONG FROM{' '}
                <span className="spotify-text">SPOTIFY</span> 
            </p>
            <br/> 
            <AddSongSearch/>
            <br/> <br/> 
            <p className="song-add-label">WANT TO ADD YOUR UNIQUE SONG TO{' '}
                <span style={{ color: 'purple' }}>WEEZART</span> DATABASE
            </p>
            <br/> 
            <ImportSingleSong/>
        </div>


    );
  }
  
  export default ImportsongPage;
  