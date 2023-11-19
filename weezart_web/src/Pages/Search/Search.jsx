import React, { useState } from "react";
import SongInfoPopup from "../Popups/SongInfoPopup";
import ArtistInfoPopup from "../Popups/ArtistInfoPopup";
import AlbumInfoPopup from "../Popups/AlbumInfoPopup";
import './Search.css'
import { LuClock3 } from "react-icons/lu";
import { FaMusic, FaHatWizard } from "react-icons/fa";
import { IoIosAlbums } from "react-icons/io";
import { FaUser } from "react-icons/fa6";


function Search() {
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


  const artistInfos = [
    {
        artistName: "artist1",
        artistsFollower: 25350,
        genre: ["genre2.1", "genre2.2", "genre2.3"],
        image: "",
      },

      {
        artistName: "AURORA",
        artistsFollower: "12.482.490",
        genre: ["Art pop", "Nordic folk", "synth-pop", "electropop"], 
        image: "https://www.normanrecords.com/artwork/medium/213/175963-aurora-a-different-kind-of-human.jpg",
      },
  ];

  const albumInfos = [ 
    {
      albumName: "album1",
      artists: ["artist1.1"],
      genre: ["genre1.1", "genre1.2"],
      image: "https://images.theconversation.com/files/512871/original/file-20230301-26-ryosag.jpg?ixlib=rb-1.1.0&rect=97%2C79%2C5799%2C5817&q=45&auto=format&w=926&fit=clip",
      year:2022,
      songs: ["song1.1", "song1.2", "song1.3"]

    }

  ];

  const profiles = [ 
    {
      profileName: "person1",
      image: "https://images.theconversation.com/files/512871/original/file-20230301-26-ryosag.jpg?ixlib=rb-1.1.0&rect=97%2C79%2C5799%2C5817&q=45&auto=format&w=926&fit=clip",
    },
    {
      profileName: "person1",
      image: "https://images.theconversation.com/files/512871/original/file-20230301-26-ryosag.jpg?ixlib=rb-1.1.0&rect=97%2C79%2C5799%2C5817&q=45&auto=format&w=926&fit=clip",
    },
    {
      profileName: "person1",
      image: "https://images.theconversation.com/files/512871/original/file-20230301-26-ryosag.jpg?ixlib=rb-1.1.0&rect=97%2C79%2C5799%2C5817&q=45&auto=format&w=926&fit=clip",
    },
    {
      profileName: "person1",
      image: "https://images.theconversation.com/files/512871/original/file-20230301-26-ryosag.jpg?ixlib=rb-1.1.0&rect=97%2C79%2C5799%2C5817&q=45&auto=format&w=926&fit=clip",
    },
    {
      profileName: "person1",
      image: "https://images.theconversation.com/files/512871/original/file-20230301-26-ryosag.jpg?ixlib=rb-1.1.0&rect=97%2C79%2C5799%2C5817&q=45&auto=format&w=926&fit=clip",
    },
  ];



//to check which itm is clicked in the tables
  const [selectedSongIndex, setSelectedSongIndex] = useState(-1);
  const [selectedArtistIndex, setSelectedArtistIndex] = useState(-1);
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState(-1);

//to open and close popups
  const [showSongPopups, setShowSongPopups] = useState(new Map());
  const [showArtistPopups, setShowArtistPopups] = useState(new Map());
  const [showAlbumPopups, setShowAlbumPopups] = useState(new Map());

  //sets active buttons and category to load correct tables
  const [activeButton, setActiveButton] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

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
          <div className="list_box">
          <table className="custom-table">
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
          
          {selectedSongIndex !== -1 && (
            <SongInfoPopup
              isOpen={true}
              onRequestClose={handleSongClosePopup}
              songInfo={songInfos[selectedSongIndex]}
            />
      )}
        </div>
        );

      case 'artists':
      return (
        <div className="list_box">
        <table className="custom-table">
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
                    src={val.image}
                    alt={`Artist cover for ${val.artistName}`}
                    style={{ width: '64px', height: '64px' }}
                  />
                </td>
                <td>{val.artistName}</td>
                <td>{val.artistsFollower}</td>
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
          <div className="list_box">
          <table className="custom-table">
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
                      src={val.image}
                      alt={`Album cover for ${val.albumName}`}
                      style={{ width: '64px', height: '64px' }}
                    />
                  </td>
                  <td>{val.albumName}</td>
                  <td>{val.artists}</td>                  
                  <td>{val.year}</td>
                  <td>{val.songs.length}</td>
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
        <input type="search" placeholder="search" class="navigation-search__input" />
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
          onClick={() => setActiveCategory('songs')}
        >
          <span>Songs</span>
        </button>

        <button
          className={`search-button ${activeButton === 'albums' ? 'active' : ''}`}
          onClick={() => setActiveCategory('albums')}
        >
          <span>Albums</span>
        </button>

        <button
          className={`search-button ${activeButton === 'artists' ? 'active' : ''}`}
          onClick={() => setActiveCategory('artists')}
        >
          <span>Artists</span>
        </button>

        <button
          className={`search-button ${activeButton === 'profiles' ? 'active' : ''}`}
          onClick={() => setActiveCategory('profiles')}
        >
          <span>Profiles</span>
        </button>
      </div>



    {/* opens the table in function */}
      <div className="search-items-container">
        {renderSearchItems()}
      </div>

    </div> 

  );
}

export default Search;
