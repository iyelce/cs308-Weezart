import React, { useState } from "react";
import SongInfoPopup from "../Popups/SongInfoPopup";
import ArtistInfoPopup from "../Popups/ArtistInfoPopup";
import AlbumInfoPopup from "../Popups/AlbumInfoPopup";
import './Search.css'


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

  const [showSongPopups, setShowSongPopups] = useState(new Map());
  const [showArtistPopups, setShowArtistPopups] = useState(new Map());
  const [showAlbumPopups, setShowAlbumPopups] = useState(new Map());

  const handleSongButtonClick = (index) => {
    const newShowSongPopups = new Map(showSongPopups);
    newShowSongPopups.set(index, true);
    setShowSongPopups(newShowSongPopups);
  };

  const handleSongClosePopup = (index) => {
    const newShowSongPopups = new Map(showSongPopups);
    newShowSongPopups.set(index, false);
    setShowSongPopups(newShowSongPopups);
  };

  const handleArtistButtonClick = (index) => {
    const newShowArtistPopups = new Map(showArtistPopups);
    newShowArtistPopups.set(index, true);
    setShowArtistPopups(newShowArtistPopups);
  };

  const handleArtistClosePopup = (index) => {
    const newShowArtistPopups = new Map(showArtistPopups);
    newShowArtistPopups.set(index, false);
    setShowArtistPopups(newShowArtistPopups);
  };

  const handleAlbumButtonClick = (index) => {
    const newShowAlbumPopups = new Map(showAlbumPopups);
    newShowAlbumPopups.set(index, true);
    setShowAlbumPopups(newShowAlbumPopups);
  };

  const handleAlbumClosePopup = (index) => {
    const newShowAlbumPopups = new Map(showAlbumPopups);
    newShowAlbumPopups.set(index, false);
    setShowAlbumPopups(newShowAlbumPopups);
  };

// --------------------------------

  const [activeButton, setActiveButton] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    // Set active category based on the clicked button
    switch (buttonName) {
      case 'songs':
        setActiveCategory('songs');
        break;
      case 'artists':
        setActiveCategory('artists');
        break;
      case 'albums':
        setActiveCategory('albums');
        break;
      case 'profiles':
        setActiveCategory('profiles');
        break;
      default:
        setActiveCategory(null);
        break;
    }
  };


  const renderSearchItems = () => {
    switch (activeCategory) {
      case 'songs':


      // return songInfos.map((songInfo, index) => (
      //   <div key={index}>
      //     <button onClick={() => handleSongButtonClick(index)}>Song {index + 1}</button>
      //     <SongInfoPopup
      //       isOpen={showSongPopups.get(index) || false}
      //       onRequestClose={() => handleSongClosePopup(index)}
      //       songInfo={songInfo}
      //       showModal={showSongPopups}
      //     />
      //     <br />
      //     <br />
      //   </div>
      // ));


      return songInfos.map((song, index) => (
        <div className="search-items-container"> 
           <div key={index} className="search-item" onClick={() => handleSongButtonClick(index)}>
           <div className="searchbar-song-number">
                  <span>{index + 1}</span>
                </div>
        
                <img
                  aria-hidden="false"
                  draggable="false"
                  loading="eager"
                  src={song.image || "default-image-url"}
                  alt={`Song ${index + 1}`}
                  className="searchbar-song-img"
                />
        
                <div className="searchbar-songname-artist">
                  <p className="searchbar-songname-artist-songname">{song.songName}</p>
                  <p className="searchbar-songname-artist-artist">{song.artists.join(", ")}</p>
                </div>
        
                <p className="searchbar-song-album">{song.album}</p>
        
                <p className="seachbar-song-duration">{song.duration}</p>
           
           </div>
        
        </div>

      ));
             

      case 'artists':
        return artistInfos.map((artistInfo, index) => (
          <div key={index}>
            <button onClick={() => handleArtistButtonClick(index)}>Artist {index + 1}</button>
            <ArtistInfoPopup
              isOpen={showArtistPopups.get(index) || false}
              onRequestClose={() => handleArtistClosePopup(index)}
              artistInfo={artistInfo}
              showModal={showSongPopups}
            />
            <br />
            <br />
          </div>
        ));

      case 'albums':
        return albumInfos.map((albumInfo, index) => (
          <div key={index}>
            <button onClick={() => handleAlbumButtonClick(index)}>Album {index + 1}</button>
            <AlbumInfoPopup
              isOpen={showAlbumPopups.get(index) || false}
              onRequestClose={() => handleAlbumClosePopup(index)}
              albumInfo={albumInfo}
              showModal={showAlbumPopups}
            />
            <br />
            <br />
          </div>
        ));

      case 'profiles':
        return <div>Profiles</div>;

      default:
        return null;
    }
  };










  return (
    
     <div>


      <div class="navigation-search">
        <input type="search" placeholder="search" class="navigation-search__input" />
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="navigation-search__icon">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>


      <div className="search-buttons">
        <button
          className={`search-button ${activeButton === 'songs' ? 'active' : ''}`}
          onClick={() => handleButtonClick('songs')}
        >
          <span>Songs</span>
        </button>

        <button
          className={`search-button ${activeButton === 'albums' ? 'active' : ''}`}
          onClick={() => handleButtonClick('albums')}
        >
          <span>Albums</span>
        </button>

        <button
          className={`search-button ${activeButton === 'artists' ? 'active' : ''}`}
          onClick={() => handleButtonClick('artists')}
        >
          <span>Artists</span>
        </button>

        <button
          className={`search-button ${activeButton === 'profiles' ? 'active' : ''}`}
          onClick={() => handleButtonClick('profiles')}
        >
          <span>Profiles</span>
        </button>
      </div>



      <div className="search-items-container">
        {renderSearchItems()}
      </div>







    </div> 

  );
}

export default Search;
