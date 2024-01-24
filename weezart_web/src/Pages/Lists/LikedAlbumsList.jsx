import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import AddedAlbumsApi from "../../API/AddedAlbumsApi";
import { IoIosAlbums } from "react-icons/io";
import AlbumInfoPopup from '../Popups/AlbumInfoPopup';
import albumImage from "../../songImage.jpg"

function LikedAlbumsList({...props}) {

//to check which itm is clicked in the tables
const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(-1);

//to open and close popups
const [showAlbumPopups, setShowAlbumPopups] = useState(new Map());

//if sth is clicked from tables sets index and calls open popup functions
const handleAlbumClickTable = (index) => {
  handleAlbumButtonClick(index);
  setSelectedAlbumIndex(index);
};

//to opens popup and maps the information
const handleAlbumButtonClick = (index) => {
  const newShowAlbumPopups = new Map(showAlbumPopups);
  newShowAlbumPopups.set(index, true);
  setShowAlbumPopups(newShowAlbumPopups);
};

//to close popups and set selected index to -1
const handleAlbumClosePopup = (index) => {
  const newShowAlbumPopups = new Map(showAlbumPopups);
  newShowAlbumPopups.set(index, false);
  setShowAlbumPopups(newShowAlbumPopups);

  setSelectedAlbumIndex(-1);
  fetchData();
};


  const[albumList, setAlbumList] = useState([]);
  const [wholeAlbumList, setWholeAlbumList] = useState([]);

  const fetchData = async () => {
    try {
      const albums = await AddedAlbumsApi(props.token, props.userId);
      console.log("+++ albums return in page: ", albums)
      setWholeAlbumList(albums);
      const albumResponse = [];

      for (let i=0; i<albums.length; i++) {
          albumResponse.push(albums[i].album);
      }

      setAlbumList(albumResponse);        
      
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, [props.token, props.userId]);


function imgsrc(val) {
  if(val === null || val==="") {
      return  albumImage;
  }
  else {
      return val;
  }
}

  return (
    <div className="table-container">
    <table className="list_song_table">
            <thead>
              <tr>
                <th scope="col"><IoIosAlbums /></th>
                <th scope="col"></th>
                <th scope="col">Album Name</th>
                <th scope="col">Artists</th>
                <th scope="col">Track Number</th>
                <th scope="col">Year</th>
              </tr>
            </thead>
            <tbody>
            {albumList && albumList.map((val, index) => (
                <tr key={index} onClick={() => handleAlbumClickTable(index)}>
                  <th scope="row">{index + 1}</th>
                  <td>
                  <img
                    src={imgsrc(val.imageUrl)}
                    alt={`Artist cover for ${val.name}`}
                    style={{ width: '64px', height: '64px' }}
                  />
                  </td>
                  <td>{val.name}</td>
                  <td>{val.artistsName.join(', ')}</td>
                  <td>{val.numberOfTracks}</td>
                  <td>{val.releaseDate === undefined ? "Unknown" : val.releaseDate.substring(0, 4)}</td>
                  
                </tr>
              ))}
            </tbody>
          </table>
    
          {selectedAlbumIndex !== -1 && (
            <AlbumInfoPopup
              isOpen={true}
              onRequestClose={handleAlbumClosePopup}
              albumInfo={albumList[selectedAlbumIndex]}
              liked = {wholeAlbumList[selectedAlbumIndex].liked}
              rating = {wholeAlbumList[selectedAlbumIndex].rating}
              token = {props.token}
              userId = {props.userId}
            />
          )}
        </div>



  
  );
}

export default LikedAlbumsList;