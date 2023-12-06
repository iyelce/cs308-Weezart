import React, { useState, useEffect } from "react";
import { LuClock3 } from "react-icons/lu";
import { FaMusic } from "react-icons/fa";
import './List.css';
import AddedSongsApi from "../../API/AddedSongsApi";

function LikedSongsList({ ...props }) {
  const [songs, setSongs] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songList = await AddedSongsApi(props.token, props.userId);
        setSongs(songList);
        console.log("songs in page are : ", songs);

      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

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

            
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                <img
                  src={imgsrc(val.albumImageURL)}
                  alt={`Album cover for ${val.name}`}
                  style={{ width: '64px', height: '64px' }}
                />
              </td>
              <td>{val.name}</td>
              <td>{val.artistsName}</td>
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
    </div>
  );
}

export default LikedSongsList;
