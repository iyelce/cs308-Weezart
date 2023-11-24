import React from "react";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineNoAdultContent } from "react-icons/md";
import { FaMusic } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import './Import.css';


function AddSong() {

    const[spotifySongName, setSpotifySongName] = useState('');
    const [spotifyArtistName, setSpotifyName] = useState('');


    const [songName, setSongName] = useState('');
    const [albumName, setAlbumName] = useState('');
    const [albumReleaseDate, setAlbumReleaseDate] = useState(null);
    const [artistName, setArtistName] = useState('');
    const [artistsList, setArtistsList] = useState([]);
    const [timeMinutes, setTimeMinutes] = useState('');
    const [timeSeconds, setTimeSeconds] = useState('');
    const [isExplicit, setIsExplicit] = useState(false);
  
   // Function to handle adding an artist to the list
   const addArtistToList = () => {
    if (artistName) {
      setArtistsList([...artistsList, artistName]);
      setArtistName('');
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here
    console.log('Form submitted:', {
      songName,
      albumName,
      albumReleaseDate,
      artistsList,
      time: `${timeMinutes}:${timeSeconds}`,
      isExplicit,
    });
  };

  const handleSpotifySearch = () => {
    // You can perform the Spotify search logic here
    console.log(`Searching for ${songName} by ${artistName} on Spotify`);
  };


//   -----------------------------

  const [songInfos, setSongInfos] = useState([]);

  const handleSongClickTable = (index) => {
    // Handle song click action
  };



    return (

        <div className="song-add-page">

        <form className="single-song-add" onSubmit={handleSubmit}>

            <p className="song-add-label">ADD SONG FROM{' '}
                <span className="spotify-text">SPOTIFY</span> 
            </p>

            <div className="column">

                <div className="row">
                    {/* First row */}
                    <div className="form-row">
                        <label className="single-song-add-label" htmlFor="songNameInput">
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

                    {/* Second row */}
                    <div className="form-row">
                        <label className="single-song-add-label" htmlFor="artistNameInput">
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

                    <button className="search-button" onClick={handleSpotifySearch()}>
                        Search in Spotify
                    </button>
                </div>

                <div className="row">
                <table className="spotify-add-table">
                    <thead>
                        <tr>
                        <th scope="col"><FaMusic /></th>
                        <th scope="col"></th>
                        <th scope="col">Song Name</th>
                        <th scope="col">Artists</th>
                        <th scope="col">Album</th>
                        <th scope="col"><LuClock3 /></th>
                        </tr>
                    </thead>
                    <tbody>
                        {songInfos.map((val, index) => (
                        <tr key={index} onClick={() => handleSongClickTable(index)}>
                            <th scope="row">{index + 1}</th>
                            <td>
                            <img
                                src={val.image}
                                alt={`Album cover for ${val.songName}`}
                                style={{ width: '64px', height: '64px' }}
                            />
                            </td>
                            <td>{val.songName}</td>
                            <td>{val.artists}</td>
                            <td>{val.album}</td>
                            <td>{val.duration}</td>
                        </tr>
                        ))}
                        {songInfos.length === 0 && (
                        <tr>
                            <td colSpan="6">No songs available</td>
                        </tr>
                        )}
                    </tbody>
                </table>
                </div>
            </div>


            


            <p className="song-add-label">WANT TO ADD YOUR UNIQUE SONG TO{' '}
                    <span style={{ color: 'purple' }}>WEEZART</span> DATABASE
            </p>
            
            {/* First row */}
            <div className="form-row">
            <label className="single-song-add-label">Song Name:</label>
            <input
                type="text"
                className="single-song-add-input"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
            />
            <label className="single-song-add-label">Album Name:</label>
            <input
                type="text"
                className="single-song-add-input"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
            />
            <label className="single-song-add-label">Release Date:</label>
            <DatePicker
                className="single-song-add-input-date"
                selected={albumReleaseDate}
                onChange={(date) => setAlbumReleaseDate(date)}
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={250}
                maxDate={new Date()}  
                />
            </div>
        
            {/* Second row */}
            <div className="form-row">
            <label className="single-song-add-label" >Artist Name:</label>
            <input
                type="text"
                className="single-song-add-input"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
            />
            <button type="button" className="add-artist-button" onClick={addArtistToList}>
                Add Artist
            </button>
            <ul className="artist-list">
                {artistsList.map((artist, index) => (
                <li key={index}>{artist}</li>
                ))}
            </ul>
            </div>
        
            {/* Third row */}
            <div className="form-row">
            <label className="single-song-add-label" >Time:</label>
            <input
                type="number"
                className="single-song-add-input"
                value={timeMinutes}
                onChange={(e) => setTimeMinutes(e.target.value)}
                placeholder="Minutes"
            />
            <span>:</span>
            <input
                type="number"
                className="single-song-add-input"
                value={timeSeconds}
                onChange={(e) => setTimeSeconds(e.target.value)}
                placeholder="Seconds"
            />
            <label className="single-song-add-label" >
                <input
                type="checkbox"
                className="explicit-checkbox"
                checked={isExplicit}
                onChange={() => setIsExplicit(!isExplicit)}
                />
                <span><MdOutlineNoAdultContent /></span>
            </label>

            </div>
        
            {/* Submit button */}
            <button type="submit" className="submit-button">
            Submit
            </button>
        </form>

    </div>
        
       

    );
  }
  
  export default AddSong;