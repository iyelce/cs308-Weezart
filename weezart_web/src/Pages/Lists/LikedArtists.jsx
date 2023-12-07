import React, { useState } from "react";
import { FaUser } from "react-icons/fa6";
import { useEffect } from "react";
import AddedArtistsApi from "../../API/AddedArtistsApi";
import './List.css';
import ArtistInfoPopup from "../Popups/ArtistInfoPopup";

function LikedArtistsList({...props}) {

  //to check which itm is clicked in the tables
  const [selectedArtistIndex, setSelectedArtistIndex] = useState(-1);

  //to open and close popups
  const [showArtistPopups, setShowArtistPopups] = useState(new Map());

  //if sth is clicked from tables sets index and calls open popup functions
  const handleArtistClickTable = (index) => {
    handleArtistButtonClick(index);
    setSelectedArtistIndex(index);
  };

  //to opens popup and maps the information
  const handleArtistButtonClick = (index) => {
    const newShowArtistPopups = new Map(showArtistPopups);
    newShowArtistPopups.set(index, true);
    setShowArtistPopups(newShowArtistPopups);
  };

  //to close popups and set selected index to -1
  const handleArtistClosePopup = (index) => {
    const newShowArtistPopups = new Map(showArtistPopups);
    newShowArtistPopups.set(index, false);
    setShowArtistPopups(newShowArtistPopups);

    setSelectedArtistIndex(-1);
    fetchData();
  };



  const[artistList, setArtistList] = useState([]);
  const [wholeArtistList, setWholeArtistList] = useState([]);

  const fetchData = async () => {
    try {
      const artists = await AddedArtistsApi(props.token, props.userId);      
      setWholeArtistList(artists);    

      const artistResponse = [];

      for (let i=0; i<artists.length; i++) {
          artistResponse.push(artists[i].artist);
      }
      setArtistList(artistResponse);

    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.token, props.userId]);


function imgsrc(val) {
  if(val === null || val==="") {
      return "https://placekitten.com/100/100";
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
              <th scope="col"><FaUser /></th>
              <th scope="col"></th>
              <th scope="col">Artist Name</th>
              <th scope="col">Genre</th>
              <th scope="col">Followers</th>
            </tr>
          </thead>
          <tbody>
          {artistList && artistList.map((val, index) => (
              <tr key={index} onClick={() => handleArtistClickTable(index)}>
              {/* </tr><tr key={index} > */}
                <th scope="row">{index + 1}</th>
                <td>
                <img
                  src={imgsrc(val.imageUrl)}
                  alt={`Artist cover for ${val.name}`}
                  style={{ width: '64px', height: '64px' }}
                />
                </td>
                <td>{val.name}</td>
                <td>
                  {val.genres === null
                  ? "Unknown"
                  : Array.isArray(val.genres)
                  ? val.genres.join(", ")
                  : val.genres}
              </td>
                <td>{val.followerCount === -1 ? "NaN" : val.followerCount}</td>
              </tr>
            ))}

            {artistList && artistList.length === 0 && (
            <tr>
              <td colSpan="6">No artist added</td>
            </tr>
          )}

          </tbody>
        </table>
  
        {selectedArtistIndex !== -1 && (
          <ArtistInfoPopup
            isOpen={true}
            onRequestClose={handleArtistClosePopup}
            artistInfo={artistList[selectedArtistIndex]}
            liked = {wholeArtistList[selectedArtistIndex].liked}
            rating = {wholeArtistList[selectedArtistIndex].rating}
            token = {props.token}
            userId = {props.userId}
          />
        )}
      </div>
  );
}

export default LikedArtistsList;