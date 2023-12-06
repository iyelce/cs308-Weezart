import React from "react";
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';
import { FaMusic } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import './Import.css';
import AddingSongManuallyApi from "../../API/AddingSongManuallyApi";
import { useNavigate } from "react-router-dom";
import AddingAcceptedSong from "../../API/AddingAcceptedSong";


function AddSong({...props}) {

    const navigate = useNavigate();

    const[spotifySongName, setSpotifySongName] = useState('');
    const [spotifyArtistName, setSpotifyName] = useState('');
    const [showLabel, setShowLabel] = useState(false);
    const [songInfos, setSongInfos] = useState([]);
    const [showUniqueLabel, setShowUniqueLabel] = useState(false);
    const [showAddButton, setShowAddButton] = useState(false);

    //0 for not searched yet
    //1 found a song
    //-1 couldnt find a song (return 403 from backend)
    const [foundSong, setFoundSong] = useState(0);



  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };


  const handleSpotifySearch = async () => {
    if(spotifySongName==='' || spotifyArtistName==='') {
        setShowLabel(true);
    }
    else {
        setShowLabel(false);
        console.log(props.token);
        const response = await AddingSongManuallyApi(spotifySongName, spotifyArtistName, props.token, props.userId );
        
        if ( response === "Song not found") {
            setFoundSong(-1); // cant find song -> show it in the table
            setShowUniqueLabel(true);
        }

        else {
            setFoundSong(1); //found sth 

            let foundSong = {
                albumId:response.albumId,
                albumImageURL:response.albumImageURL ,
                albumName:response.albumName ,
                albumRelease: response.albumRelease ,
                artistsId: response.artistsId ,
                artistsName: response.artistsName ,
                duration_ms: response.duration_ms ,
                explicit: response.explicit ,
                id: response.id  ,
                name: response.name ,
                popularity: response.popularity 
            }
    
            setSongInfos([foundSong]);

            setShowUniqueLabel(true); 
            setShowAddButton(true);
        }
    }
  };

  const handleSAddSong  = async () => {

    console.log("--> song info: " , songInfos[0]);


    const result = await AddingAcceptedSong(songInfos[0] , props.token, props.userId);

    console.log("response in page: ", result);

  }



//   -----------------------------

  const handleSongClickTable = (index) => {
    alert("show song popup");
  };



    return (

    <div className="song-add-page" height="100%">

        <form className="single-song-add" onSubmit={handleSubmit}>

            <p className="song-add-label">ADD SONG FROM{' '}
                <span className="spotify-text">SPOTIFY</span> 
            </p>

            <p style={{ display: showLabel ? 'block' : 'none' }} className="single-song-add-label">
                Fill song and artist name
            </p>

            <div className="add_song_row">


            <div className="column_addsong">

                <div className="add-from-spotify-row">
                    {/* First row */}
                    <div className="form-row">
                        <label className="single-song-add-label" htmlFor="songNameInput">
                            Song Name:
                        </label>
                        <input
                            type="text"
                            id="songNameInput"
                            className="input-text"
                            value={spotifySongName}
                            onChange={(e) => setSpotifySongName(e.target.value)}
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
                            value={spotifyArtistName}
                            onChange={(e) => setSpotifyName(e.target.value)}
                        />
                    </div>

                    {/* <button className="search-button" onClick={handleSpotifySearch}>
                        Search in Spotify
                    </button> */}
                    </div>

                </div>


                
                <div className="column_addsong">
                <div className="add-from-spotify-row">
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
                                    src={val.albumImageURL}
                                    alt={`Album cover for ${val.songName}`}
                                    style={{ width: '64px', height: '64px' }}
                                />
                                </td>
                                <td>{val.name}</td>
                                <td>{val.artistsName}</td>
                                <td>{val.albumName}</td>
                                <td>{val.duration}</td>
                            </tr>
                            ))}

                            {foundSong === -1 && (
                            <tr>
                                <td colSpan="6">Can't find the song</td>
                            </tr>
                            )}

                            {foundSong === 0 && (
                            <tr>
                                <td colSpan="6">No songs added</td>
                            </tr>
                            )}
                        </tbody>
                    </table>





                    </div>
                </div>
            </div>

            <div className="add-from-spotify-row">

                <button className="search-button" onClick={handleSpotifySearch}>
                            Search in Spotify
                </button>


                {showAddButton && (
                            <button className="add-song-button" onClick={handleSAddSong}>
                                Add to my list
                            </button>
                )}

            </div>

            
            <p style={{ display: showUniqueLabel ? 'block' : 'none' }} className="single-song-add-unique-label">
                Can't find the song you are looking for : 
                <a href="#/" onClick={()=> {navigate('/importUniqueSong')}}> Add your song to Weezart</a>
            </p>
           
        </form>

    </div>
        
       

    );
  }
  
  export default AddSong;