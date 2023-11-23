import React, { useState } from 'react';

const AddSongSearch = () => {
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');

  const handleSearch = () => {
    // You can perform the Spotify search logic here
    console.log(`Searching for ${songName} by ${artistName} on Spotify`);
  };

  return (
    <div className="spotify-search-container">
      <div className="input-row">
        <label className="input-label" htmlFor="songNameInput">
          Song Name:
        </label>
        <input
          type="text"
          id="songNameInput"
          className="input-text"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
        />
      </div>

      <div className="input-row">
        <label className="input-label" htmlFor="artistNameInput">
          Artist Name:
        </label>
        <input
          type="text"
          id="artistNameInput"
          className="input-text"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
        />
      </div>

      <button className="search-button" onClick={handleSearch}>
        Search in Spotify
      </button>
    </div>
  );
};

export default AddSongSearch;


  