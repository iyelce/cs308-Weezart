import React from "react";
import { useState } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MdOutlineNoAdultContent } from "react-icons/md";
import './Import.css';


function AddUniqueSong({...props}) {

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

//   -----------------------------

  const handleSongClickTable = (index) => {
    // Handle song click action
  };



  const handleDelete = (index) => {
    const updatedList = [...artistsList];
    updatedList.splice(index, 1);
    setArtistsList(updatedList);
  };



    return (

        <div className="song-add-page">

            

        <form className="single-song-add" onSubmit={handleSubmit}>        

        <p className="song-add-label">WANT TO ADD YOUR UNIQUE SONG TO{' '}
            <span className="weezart-text">WEEZART</span> DATABASE
        </p>
            
            {/* First row */}
            <div className="form-row">
            <label className="single-song-add-label">Song Name:</label>
            <input
                type="text"
                className="input-text"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
            />
            <label className="single-song-add-label">Album Name:</label>
            <input
                type="text"
                className="input-text"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
            />
            
            </div>
        
            {/* Second row */}
            <div className="form-row">
            <label className="single-song-add-label" >Artist Name:</label>
            <input
                type="text"
                className="input-text"
                value={artistName}
                onChange={(e) => setArtistName(e.target.value)}
            />
            <button type="button" className="add-artist-button" onClick={addArtistToList}>
                Add Artist
            </button>

            </div>

            <div className="form-row">
            <table className="spotify-add-table">
                    <thead>
                        <tr>
                        <th>Artist Name</th>
                        <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {artistsList.map((artist, index) => (
                        <tr key={index}>
                            <td>{artist}</td>
                            <td onClick={() => handleDelete(index)} style={{ cursor: 'pointer' }}>
                            🗑️
                            </td>
                        </tr>
                        ))}
                        {artistsList.length === 0 && (
                        <tr>
                            <td colSpan="6">Add artist</td>
                        </tr>
                        )}
                    </tbody>
                    </table>
            </div>

            {/* Thirth row */}
            <div className="form-row">
                <label className="single-song-add-label">Release Date:</label>
                <DatePicker
                    className="input-text"
                    selected={albumReleaseDate}
                    onChange={(date) => setAlbumReleaseDate(date)}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={250}
                    maxDate={new Date()}  
                    />

            </div>
        
                    <br/>

            {/* Fourth row */}
            <div className="form-row">
            <label className="single-song-add-label" >Time:</label>
            <input
                type="number"
                className="input-text"
                value={timeMinutes}
                onChange={(e) => setTimeMinutes(e.target.value)}
                placeholder="Minutes"
            />
            <span>:</span>
            <input
                type="number"
                className="input-text"
                value={timeSeconds}
                onChange={(e) => setTimeSeconds(e.target.value)}
                placeholder="Seconds"
            />
            <label className="single-song-add-label">
                Is your content explicit?
            <input
                type="checkbox"
                className="explicit-checkbox"
                checked={isExplicit}
                onChange={() => setIsExplicit(!isExplicit)}
            />
            {/* <span><MdOutlineNoAdultContent /></span> */}
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
  
  export default AddUniqueSong;