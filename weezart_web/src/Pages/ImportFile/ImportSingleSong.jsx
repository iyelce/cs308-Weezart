import React from "react";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineNoAdultContent } from "react-icons/md";
import './Import.css';



// {

//     "id": "id_value",
  
//     "name": "name_value",
  
//     "albumName": "album_name_value",
  
//     "albumId": "album_id_value",
  
//     "artistsName": ["artist1_name", "artist2_name"],
  
//     "artistsId": ["artist1_id", "artist2_id"],
  
//     "popularity": 80,
  
//     "duration_ms": 240000,
  
//     "explicit": true,
  
//     "albumRelease": "2022-01-01" 
  
//   }
function ImportSingleSong() {

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


    return (
        
        <form className="single-song-add" onSubmit={handleSubmit}>
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
        </div>
    
        {/* Fourth row */}
        <div className="form-row">
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


    );
  }
  
  export default ImportSingleSong;