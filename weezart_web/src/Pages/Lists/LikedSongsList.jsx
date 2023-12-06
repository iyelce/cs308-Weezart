import React, { useState, useEffect } from "react";
import { LuClock3 } from "react-icons/lu";
import { FaMusic } from "react-icons/fa";
import './List.css';
import AddedSongsApi from "../../API/AddedSongsApi";

function LikedSongsList({ ...props }) {
  const [songInfos, setSongInfos] = useState({ song: [] });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const songList = await AddedSongsApi(props.token, props.userId);
        console.log("songs in page are : ", songList);

        // Assuming the API response has a 'song' property containing the array of songs
        setSongInfos({ song: songList.song });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, [props.token, props.userId]);

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
          {songInfos.song && songInfos.song.map((val, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>
                <img
                  src={val.albumImageURL}
                  alt={`Album cover for ${val.name}`}
                  style={{ width: '64px', height: '64px' }}
                />
              </td>
              <td>{val.name}</td>
              <td>{val.artistsName}</td>
              <td>{val.albumName}</td>
              <td>{val.popularity}</td>
              <td>{val.duration_ms}</td>
            </tr>
          ))}

          {songInfos.song && songInfos.song.length === 0 && (
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
