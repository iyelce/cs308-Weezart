import React, { useEffect, useState } from "react";
import SongInfoPopup from "../Popups/SongInfoPopup";
import ArtistInfoPopup from "../Popups/ArtistInfoPopup";
import AlbumInfoPopup from "../Popups/AlbumInfoPopup";
import './Search.css'
import { LuClock3 } from "react-icons/lu";
import { FaMusic, FaHatWizard } from "react-icons/fa";
import { IoIosAlbums } from "react-icons/io";
import { FaUser } from "react-icons/fa6";
import SearchSongApi from "../../API/SearchSongApi";
import SearchAlbumApi from "../../API/SearchAlbumApi";
import SearchArtistApi from "../../API/SearchArtistApi";


function Search({...props}) {
  const [songInfos, setSongInfos] = useState([]);
  const [artistInfos, setArtistInfos] = useState([]);
  const [albumInfos, setAlbumInfos] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [showTable, setShowTable] = useState(false);

    //sets active buttons (css color) and category to load correct tables
    const [activeButton, setActiveButton] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);

  //to check which itm is clicked in the tables
  const [selectedSongIndex, setSelectedSongIndex] = useState(-1);
  const [selectedArtistIndex, setSelectedArtistIndex] = useState(-1);
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(-1);

//to open and close popups
  const [showSongPopups, setShowSongPopups] = useState(new Map());
  const [showArtistPopups, setShowArtistPopups] = useState(new Map());
  const [showAlbumPopups, setShowAlbumPopups] = useState(new Map());


  const [searchValue,setSearchValue] = useState("");

  const handleSearch = async() => {
    
    if(activeCategory === null) {
      //alert("select sth")
    }
    else if (activeCategory === 'songs') {
      console.log("song: ", searchValue);
      const response = await SearchSongApi(props.token,searchValue );
      console.log("in page songs: ", response);
      setSongInfos(response);
      setShowTable(true);
    }
    else if (activeCategory === 'albums') {
      console.log("album: ", searchValue);
      const response = await SearchAlbumApi(props.token,searchValue );
      console.log("in page album: ", response);
      setAlbumInfos(response);
      setShowTable(true);
    }
    else if (activeCategory === 'artists') {
      console.log("artist: ", searchValue);
      const response = await SearchArtistApi(props.token,searchValue );
      console.log("in page artist: ", response);
      setArtistInfos(response);
      setShowTable(true);
    }
    
  }


//if sth is clicked from tables sets index and calls open popup functions
  const handleSongClickTable = (index) => {
    handleSongButtonClick(index);
    setSelectedSongIndex(index);
  };

  const handleArtistClickTable = (index) => {
    handleArtistButtonClick(index);
    setSelectedArtistIndex(index);
  };

  const handleAlbumClickTable = (index) => {
    handleAlbumButtonClick(index);
    setSelectedAlbumIndex(index);
  };
//----------------------------------

//to opens popup and maps the information
  const handleSongButtonClick = (index) => {
    const newShowSongPopups = new Map(showSongPopups);
    newShowSongPopups.set(index, true);
    setShowSongPopups(newShowSongPopups);
  };

  const handleArtistButtonClick = (index) => {
    const newShowArtistPopups = new Map(showArtistPopups);
    newShowArtistPopups.set(index, true);
    setShowArtistPopups(newShowArtistPopups);
  };

  const handleAlbumButtonClick = (index) => {
    const newShowAlbumPopups = new Map(showAlbumPopups);
    newShowAlbumPopups.set(index, true);
    setShowAlbumPopups(newShowAlbumPopups);
  };
//----------------------------------

//to close popups and set selected index to -1
  const handleSongClosePopup = (index) => {
    const newShowSongPopups = new Map(showSongPopups);
    newShowSongPopups.set(index, false);
    setShowSongPopups(newShowSongPopups);

    setSelectedSongIndex(-1);
  };

  const handleArtistClosePopup = (index) => {
    const newShowArtistPopups = new Map(showArtistPopups);
    newShowArtistPopups.set(index, false);
    setShowArtistPopups(newShowArtistPopups);

    setSelectedArtistIndex(-1);
  };

  const handleAlbumClosePopup = (index) => {
    const newShowAlbumPopups = new Map(showAlbumPopups);
    newShowAlbumPopups.set(index, false);
    setShowAlbumPopups(newShowAlbumPopups);

    setSelectedAlbumIndex(-1);
  };
  //----------------------------------


// loads tables according to clicked button
  const renderSearchItems = () => {
    switch (activeCategory) {

      case 'songs':
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
                  <td>{val.artistsName.join(", ")}</td>
                  <td>{val.albumName}</td>
                  <td>{val.duration_ms}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {selectedSongIndex !== -1 && (
            <SongInfoPopup
            isOpen={true}
            onRequestClose={handleSongClosePopup}
            songInfo={songInfos[selectedSongIndex]}
            liked={"check with api"}
            rating={"check with api"}
            token={props.token}
            userId={props.userId}
          />
      )}
        </div>
        );

      case 'artists':
      return (
        <div className="table-container">
          <table className="list_song_table">
          <thead>
            <tr>
              <th scope="col"><FaUser /></th>
              <th scope="col"></th>
              <th scope="col">Artist Name</th>
              <th scope="col">Followers</th>
            </tr>
          </thead>
          <tbody>
            {artistInfos.map((val, index) => (
              <tr key={index} onClick={() => handleArtistClickTable(index)}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={val.imageUrl}
                    alt={`Artist cover for ${val.name}`}
                    style={{ width: '64px', height: '64px' }}
                  />
                </td>
                <td>{val.name}</td>
                <td>{val.followerCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {selectedArtistIndex !== -1 && (
          <ArtistInfoPopup
            isOpen={true}
            onRequestClose={handleArtistClosePopup}
            artistInfo={artistInfos[selectedArtistIndex]}
          />
        )}
      </div>
      );
      
      case 'albums':
        return (
          <div className="table-container">
          <table className="list_song_table">
            <thead>
              <tr>
                <th scope="col"><IoIosAlbums /></th>
                <th scope="col"></th>
                <th scope="col">Album Name</th>
                <th scope="col">Artists</th>
                <th scope="col">Year</th>
                <th scope="col">Songs</th>
              </tr>
            </thead>
            <tbody>
              {albumInfos.map((val, index) => (
                <tr key={index} onClick={() => handleAlbumClickTable(index)}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      src={val.imageUrl}
                      alt={`Album cover for ${val.albumName}`}
                      style={{ width: '64px', height: '64px' }}
                    />
                  </td>
                  <td>{val.name}</td>
                  <td>{val.artistsName.join(", ")}</td>                  
                  <td>{val.releaseDate}</td>
                  <td>{val.songsName.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {selectedAlbumIndex !== -1 && (
            <AlbumInfoPopup
              isOpen={true}
              onRequestClose={handleAlbumClosePopup}
              albumInfo={albumInfos[selectedAlbumIndex]}
            />
          )}
        </div>
        );

      case 'profiles':
        return (
          <div className="list_box">
          <table className="custom-table">
            <thead>
              <tr>
                <th scope="col"><FaHatWizard /></th>
                <th scope="col"></th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {profiles.map((val, index) => (
                <tr key={index} onClick={() => alert("clicked on user")}>
                  <th scope="row"></th>
                  <td>
                    <img
                      src={val.image}
                      alt={`User image for ${val.profileName}`}
                      style={{ width: '64px', height: '64px' }}
                    />
                  </td>
                  <td>{val.profileName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        );

      default:
        return null;
    }
  };


  return (
    
     <div className="search-page">

      {/* searchbar */}
      <div class="navigation-search">
        <input
          type="search"
          placeholder="search"
          className="navigation-search__input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {handleSearch()};
          }}
        />
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="navigation-search__icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      {/* sets the selected variables when buttons are clicked 
      so that it opens the correct table in renderSearchItems() function */}
      <div className="search-buttons">
        <button
          className={`search-button ${activeButton === 'songs' ? 'active' : ''}`}
          onClick={() => {
            setActiveCategory('songs');
            setActiveButton('songs');


            //--------------------
            if(searchValue !== "") {
              handleSearch();
            }
          }}
        >
          <span>Songs</span>
        </button>

        <button
          className={`search-button ${activeButton === 'albums' ? 'active' : ''}`}
          onClick={() => {
            setActiveCategory('albums');
            setActiveButton('albums');

            //--------------------
            if(searchValue !== "") {
              console.log("search value in albums: ", searchValue)
              handleSearch();
            }
          }}
        
        >
          <span>Albums</span>
        </button>

        <button
          className={`search-button ${activeButton === 'artists' ? 'active' : ''}`}
          onClick={() => {
            setActiveCategory('artists');
            setActiveButton('artists');

            //--------------------
            if(searchValue !== "") {
              handleSearch();
            }
        }}
        >
          <span>Artists</span>
        </button>

        <button
          className={`search-button ${activeButton === 'profiles' ? 'active' : ''}`}
          onClick={() => {
            setActiveCategory('profiles');
            setActiveButton('profiles');
        }}
        >
          <span>Profiles</span>
        </button>
      </div>



    {/* opens the table in function */}
      <div className="search-items-container">
        {showTable && (
          <div className="search-items-container">
            {renderSearchItems()}
          </div>
        )}
      </div>

    </div> 

  );
}

export default Search;
