import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import './Popup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineStar, AiFillStar, AiOutlineHeart, AiFillHeart, AiOutlineCheckCircle, AiFillCheckCircle, AiFillCrown } from 'react-icons/ai'; 
 

// Make sure to set appElement to avoid a11y violations
Modal.setAppElement("#root");


//if image is empty put a defoult image
function imgsrc(val) {
    if(val === undefined || val==="") {
        return "https://i.pinimg.com/564x/e3/c9/a9/e3c9a9e5934d65cff25d83a2ac655230.jpg";
    }
    else {
        return val;
    }
}

function ArtistInfoPopup(props) {

    const [rating, setRating] = useState(0);
    const stars = [1, 2, 3, 4, 5];
    const [liked, setLiked] = useState(false);
    const [added, setAdded] = useState(false);

    const [songs, setSongs] = useState([
        { songName: 'Rhythm of the Rain', duration: '3:20' },
        { songName: 'Moonlight Sonata', duration: '4:45' },
        { songName: 'Dreamcatcher', duration: '2:58' },
        { songName: 'Eternal Echo', duration: '3:30' },
        { songName: 'Whispers in the Wind', duration: '2:45' },
        { songName: 'Serenade of Stars', duration: '4:10' },
        { songName: 'Lost in Harmony', duration: '3:15' },
        { songName: 'Mystic Melodies', duration: '3:05' },
        { songName: 'Sunset Serenade', duration: '2:30' },
        { songName: 'Aurora Lullaby', duration: '4:00' },
        { songName: 'Echoes of Eternity', duration: '3:50' },
        { songName: 'Silent Symphony', duration: '2:55' },
        { songName: 'Enchanted Dreams', duration: '3:40' },
        { songName: 'Dancing Shadows', duration: '2:48' },
        { songName: 'Midnight Sonata', duration: '3:25' },
        { songName: 'Crimson Crescendo', duration: '3:12' },
        { songName: 'Infinite Melody', duration: '2:38' },
        { songName: 'Stardust Serenade', duration: '3:18' },
        { songName: 'Emerald Elegy', duration: '3:08' },
        { songName: 'Waves of Whispers', duration: '2:52' },
        { songName: 'Celestial Cadence', duration: '3:22' },
        { songName: 'Lullaby for the Soul', duration: '3:35' },
        { songName: 'Ephemeral Echos', duration: '2:42' },
        { songName: 'Chasing Rainbows', duration: '3:15' },
        { songName: 'Astral Aria', duration: '3:55' }
      ]);



    const handleStarClick = (selectedRating) => {
        if (selectedRating === rating) {
            // If the clicked star is the same as the current rating, remove the rating (set it to 0)
            setRating(0);

          } else {
            setRating(selectedRating);
            setAdded(true); 
          }
    };


  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      className="information-modal"
    >
        {/* close button */}
        <div className="close-page"> 

            <button onClick={props.onRequestClose}>
                <AiOutlineClose/>
            </button>

        </div>

        <div className="three-column-container">
            <div className="column column-try ">
                <div className="content">
                    <h2 className="title">{props.artistInfo.artistName}</h2>

                    <div className="stars">
                        {stars.map((star) => (
                        <span
                            key={star}
                            className={`star ${star <= rating ? 'selected' : ''}`}
                            onClick={() => handleStarClick(star)}
                        >
                            {star <= rating ? <AiFillStar className="star-icon" /> : <AiOutlineStar className="star-icon" />}
                        </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="column">               



            <div className="top5songlist" >
                <ul>
                    {/* Map over the songs array and render each song */}
                    {songs.map((song, index) => (
                    <li key={index} className="songs">
                        {`${song.songName} - ${song.duration}`}
                    </li>
                    ))}
                </ul>
            </div>


            </div>

            <div className="column">
                
            <form className="rating-artist">
                    <div className="like-add">
                            <div className="half-width">
                                <div className={`heart-icon ${liked ? 'liked' : ''}`} onClick={() => { setLiked(!liked); setAdded(true);}}>
                                    {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                                </div>
                                <p>{liked ? 'Liked' : 'Like'}</p>
                            </div>
                           
                            <div className="half-width">
                                <div className={`add-icon ${added ? 'added' : ''}`} onClick={() => { setAdded(!added); }}>
                                    {added ? <AiFillCheckCircle /> : <AiOutlineCheckCircle/>}
                                    </div>
                                <p>{added ? 'Added' : 'Add'}</p>
                            </div>
                    </div>
                </form>

                <div className="attributes">
                    <p className="artistsFollower"> Followers: {props.artistInfo.artistsFollower}</p>
                    <p className="songGenre">Genre: {props.artistInfo.genre.join(', ')}</p>
                </div>

            </div>

       
      </div>

        <div className="friend-for-this-song">
            {/* maybe add later */}
        </div>

        <br/>
        <br/>





    </Modal>
    
  );
}

export default ArtistInfoPopup;
