import React from "react";
import { LuClock3 } from "react-icons/lu";
import { FaMusic } from "react-icons/fa";
import './List.css';

function LikedSongsList() {

    const songInfos = [
        {
          songName: "name1",
          artists: ["artist1.1"],
          genre: ["genre1.1", "genre1.2"],
          album: "album1",
          duration: "2.20",
          popularity: 20,
          image: "https://www.normanrecords.com/artwork/medium/213/175963-aurora-a-different-kind-of-human.jpg",
        },
        {
          songName: "name2",
          artists: ["artist2.1", "artist2.2", "artist2.3"],
          genre: ["genre2.1", "genre2.2", "genre2.3"],
          album: "album2",
          duration: "3.20",
          popularity: 1500,
          image: "https://www.normanrecords.com/artwork/medium/213/175963-aurora-a-different-kind-of-human.jpg",
        },
        {
          songName: "name3",
          artists: ["artist2.1", "artist2.2", "artist2.3"],
          album: "album3",
          genre: ["genre2.1", "genre2.2", "genre2.3"],
          duration: "4.20",
          popularity: 506,
          image: "https://www.normanrecords.com/artwork/medium/213/175963-aurora-a-different-kind-of-human.jpg",
        }
      ];


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
                <th scope="col"><LuClock3 /></th>
              </tr>
            </thead>
            <tbody>
              {songInfos.map((val, index) => (
                <tr key={index} >
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
            </tbody>
          </table>
        </div>
      );
    
}

export default LikedSongsList;