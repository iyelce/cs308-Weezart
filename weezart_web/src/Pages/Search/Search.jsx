import React, { useState } from "react";
import SongInfoPopup from "../Popups/SongInfoPopup";


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

  const [showPopups, setShowPopups] = useState(new Map());

  const handleButtonClick = (index) => {
    const newShowPopups = new Map(showPopups);
    newShowPopups.set(index, true);
    setShowPopups(newShowPopups);
  };

  const handleClosePopup = (index) => {
    const newShowPopups = new Map(showPopups);
    newShowPopups.set(index, false);
    setShowPopups(newShowPopups);
  };

  

  return (
    <div>
      {songInfos.map((songInfo, index) => (
        <div key={index}>
          <button onClick={() => handleButtonClick(index)}>Song {index + 1}</button>
          <SongInfoPopup
            isOpen={showPopups.get(index) || false}
            onRequestClose={() => handleClosePopup(index)}
            songInfo={songInfo}
            showModal={showPopups}
          />
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}

export default Search;
