import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LuClock3 } from "react-icons/lu";
import { FaMusic } from "react-icons/fa";
import './List.css';
import AddedSongsApi from "../../API/AddedSongsApi";
import SongInfoPopup from "../Popups/SongInfoPopup";

function BlendList({ ...props }) {

    const location = useLocation();
    const { blend } = location.state;



  //to map to table -> only song info
  const [songs, setSongs] = useState([]); 
  //whole response from liked songs api
  const [wholeSongResp, setWholeSongResp] = useState([]);

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
      const songList = await AddedSongsApi(props.token, props.userId);
      setSongs(songList);

      const songResponse = [];

      for (let i=0; i<songList.length; i++) {
          songResponse.push(songList[i].song);
      }

      setSongs(songResponse);

      setWholeSongResp(songList);        

    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };



  useEffect(() => {
    fetchData();
    console.log("blend data:  ", blend);
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

<div>
    <button>aaaaaaaaaaaaa</button>
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
              liked = {wholeSongResp[selectedSongIndex].liked}
              rating = {wholeSongResp[selectedSongIndex].rating}
              token = {props.token}
              userId = {props.userId}
            />
      )}
    </div>
    </div>
    
  );
}

export default BlendList;
