import React, { useState } from "react";
import SongInfoPopup from "../Popups/SongInfoPopup";
import ArtistInfoPopup from "../Popups/ArtistInfoPopup";


function Search() {
  const songInfos = [
    {
      songName: "name1",
      artists: ["artist1.1"],
      genre: ["genre1.1", "genre1.2"],
      album: "album1",
      duration: "2.20",
      popularity: 20,
      image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fsteamuserimages-a.akamaihd.net%2Fugc%2F93850193080369520%2F61C4021F25F147CAC23590E08DEC803545FB94F0%2F%3Fimw%3D512%26%26ima%3Dfit%26impolicy%3DLetterbox%26imcolor%3D%2523000000%26letterbox%3Dfalse&tbnid=_u_AJRNjmlW2_M&vet=12ahUKEwihhJLJ6q2CAxVfkP0HHc2UBacQMygZegUIARCJAQ..i&imgrefurl=https%3A%2F%2Fsteamcommunity.com%2Fsharedfiles%2Ffiledetails%2F%3Fl%3Dturkish%26id%3D859710736&docid=7ER6m7GdPHcaNM&w=512&h=512&q=adventure%20time%20finn&ved=2ahUKEwihhJLJ6q2CAxVfkP0HHc2UBacQMygZegUIARCJAQ",
    },
    {
      songName: "name2",
      artists: ["artist2.1", "artist2.2", "artist2.3"],
      genre: ["genre2.1", "genre2.2", "genre2.3"],
      album: "album2",
      duration: "3.20",
      popularity: 1500,
      image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fmilanote.com%2Fthe-work%2Fthe-designer-of-nirvanas-nevermind-album-cover&psig=AOvVaw1o6Vv_XwKhI9pAgteYfj6a&ust=1699307205010000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCJiZhOTqrYIDFQAAAAAdAAAAABAE",
    },
    {
      songName: "name3",
      artists: ["artist2.1", "artist2.2", "artist2.3"],
      album: "album3",
      genre: ["genre2.1", "genre2.2", "genre2.3"],
      duration: "4.20",
      popularity: 506,
      image: "",
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

  const [showSongPopups, setShowSongPopups] = useState(new Map());
  const [showArtistPopups, setShowArtistPopups] = useState(new Map());

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

  

  return (
    <div>
      {songInfos.map((songInfo, index) => (
        <div key={index}>
          <button onClick={() => handleSongButtonClick(index)}>Song {index + 1}</button>
          <SongInfoPopup
            isOpen={showSongPopups.get(index) || false}
            onRequestClose={() => handleSongClosePopup(index)}
            songInfo={songInfo}
            showModal={showSongPopups}
          />
          <br />
          <br />
        </div>
      ))}

    {artistInfos.map((artistInfo, index) => (
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
      ))}

    </div>
  );
}

export default Search;
