import React, { useState } from "react";
import Modal from "react-modal";
import ReactModal from 'react-modal';
import { AiOutlineClose } from "react-icons/ai";
// import './Popup.css';
import { AiOutlineStar, AiFillStar, AiOutlineHeart, AiFillHeart, AiOutlineCheckCircle, AiFillCheckCircle, AiFillCrown } from 'react-icons/ai'; 
 

// Make sure to set appElement to avoid a11y violations
ReactModal.setAppElement('#root'); // Replace '#root' with the ID of your app root element


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
                    <h2 className="title">{props.albumInfo.albumName} <span>{props.albumInfo.year}</span></h2>

                    <p className="copy">{props.albumInfo.artists.join(', ')}</p>
                    <p className="copy">Genre: {props.albumInfo.genre.join(', ')}</p>

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
                {/* informations  */}

                <div className="top5songlist">
                    <ul>
                    <li className="songs">Rhythm of the Rain</li>
                    <li className="songs">Moonlight Sonata</li>
                    <li className="songs">Dreamcatcher</li>
                    <li className="songs">Eternal Echo</li>
                    <li className="songs">Whispers in the Wind</li>
                    <li className="songs">Serenade of Stars</li>
                    <li className="songs">Lost in Harmony</li>
                    <li className="songs">Mystic Melodies</li>
                    <li className="songs">Sunset Serenade</li>
                    <li className="songs">Aurora Lullaby</li>
                    <li className="songs">Echoes of Eternity</li>
                    <li className="songs">Silent Symphony</li>
                    <li className="songs">Enchanted Dreams</li>
                    <li className="songs">Dancing Shadows</li>
                    <li className="songs">Midnight Sonata</li>
                    <li className="songs">Crimson Crescendo</li>
                    <li className="songs">Infinite Melody</li>
                    <li className="songs">Stardust Serenade</li>
                    <li className="songs">Emerald Elegy</li>
                    <li className="songs">Waves of Whispers</li>
                    <li className="songs">Celestial Cadence</li>
                    <li className="songs">Lullaby for the Soul</li>
                    <li className="songs">Ephemeral Echos</li>
                    <li className="songs">Chasing Rainbows</li>
                    <li className="songs">Astral Aria</li>

                    </ul>
                
                </div>


            </div>

            <div className="column">
                
                <form className="rating">

                    <p>{rating > 0 ? 'Rated' : 'Rate'}</p>

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

                    <hr/>

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
