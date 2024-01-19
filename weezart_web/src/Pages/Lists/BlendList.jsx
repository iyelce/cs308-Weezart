import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LuClock3 } from "react-icons/lu";
import { FaMusic } from "react-icons/fa";
import './List.css';
import SongInfoPopup from "../Popups/SongInfoPopup";
import GetPlaylistGivenGroup from "../../API/GetPlaylistGivenGroup ";

function BlendList({ ...props }) {


    const { id } = useParams();
    const [listName, setListName] = useState("");
    

  //to map to table -> only song info
  const [songs, setSongs] = useState([]); 
  const [selectedSongIndex, setSelectedSongIndex] = useState(-1);
  const [showSongPopups, setShowSongPopups] = useState(new Map());

  //if sth is clicked from tables sets index and calls open popup functions
  const handleSongClickTable = (index) => {
    handleSongButtonClick(index);
    setSelectedSongIndex(index);
  };

  //to opens popup and maps the information
  const handleSongButtonClick = (index) => {
    const newShowSongPopups = new Map(showSongPopups);
    newShowSongPopups.set(index, true);
    setShowSongPopups(newShowSongPopups);
  };

  //to close popups and set selected index to -1
  const handleSongClosePopup = (index) => {
    const newShowSongPopups = new Map(showSongPopups);
    newShowSongPopups.set(index, false);
    setShowSongPopups(newShowSongPopups);

    setSelectedSongIndex(-1);
    fetchData();

  };

  const fetchData = async () => {
    try {
    const response = await GetPlaylistGivenGroup(props.token, id);
    console.log("response in page: ", response);
    
    setSongs(response[0].songList);
    setListName(response[0].userSong.groupSongNames.join(", "));

    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [props.token, props.userId]);


  function imgsrc(val) {
    if(val === null || val==="") {
        return "https://i.pinimg.com/564x/47/99/fd/4799fdb80098968bf6ff4c311eed1110.jpg";
    }
    else {
        return val;
    }
  }

  const formatDuration = (duration_ms) => {
    const totalSeconds = Math.floor(duration_ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };



  return (

    <div>

        <h1 style={{ textAlign: 'center', fontFamily: 'Poppins', color: '#B9B4C7' }}>
            {listName}
        </h1>

<div>
    <button className="blend-anl-button">Blend Analysis</button>
</div>





<div className="table-container">
      <table className="list_song_table">
        <thead>
          <tr>
            <th scope="col"><FaMusic /></th>
            <th scope="col"></th>
            <th scope="col">Song Name</th>
            <th scope="col">Artists</th>
            <th scope="col">Album</th>
            <th scope="col">Popularity</th>
            <th scope="col"><LuClock3 /></th>
          </tr>
        </thead>
        <tbody>
          {songs && songs.map((val, index) => (            
            <tr key={index} onClick={() => handleSongClickTable(index)} >
              <th scope="row">{index + 1}</th>
              <td>
                <img
                  src={imgsrc(val.albumImageURL)}
                  alt={`Album cover for ${val.name}`}
                  style={{ width: '64px', height: '64px' }}
                />
              </td>
              <td>{val.name}</td>
              <td>{val.artistsName.join(', ')}</td>
              <td>{val.albumName}</td>
              <td>{val.popularity === -1 ? "NaN" : val.popularity}</td>
              <td>{formatDuration(val.duration_ms)}</td>
            </tr>
          ))}

          {songs && songs.length === 0 && (
            <tr>
              <td colSpan="6">No songs added</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedSongIndex !== -1 && (
            <SongInfoPopup
              isOpen={true}
              onRequestClose={handleSongClosePopup}
              songInfo = {songs[selectedSongIndex]}
              liked={"check with api"}
              rating={"check with api"}
              token = {props.token}
              userId = {props.userId}      
      />
      )}
    </div>
    </div>
    
  );
}

export default BlendList;
