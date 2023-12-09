import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
// import './Popup.css';
import { AiOutlineStar, AiFillStar, AiOutlineHeart, AiFillHeart, AiFillCrown, AiOutlineDelete, AiFillDelete } from 'react-icons/ai'; 
import LikeSongApi from "../../API/LikeSongApi";
import { useEffect } from "react";
import RateSongApi from "../../API/RateSongApi";
import SongRemoveApi from "../../API/SongRemoveApi";

// Make sure to set appElement to avoid a11y violations
Modal.setAppElement("#root");


function imgsrc(val) {
    if(val === undefined || val==="") {
        return "https://i.pinimg.com/564x/47/99/fd/4799fdb80098968bf6ff4c311eed1110.jpg";
    }
    else {
        return val;
    }
}

function SongInfoPopup({...props}) {
    useEffect(() => {
        setLiked(props.liked);
        setRating(props.rating[props.rating.length -1 ]);
      }, [props.liked, props.rating]);

    const [rating, setRating] = useState(props.rating[props.rating.length -1 ]);
    const stars = [1, 2, 3, 4, 5];
    const [deleted, setDeleted] = useState(false);

    const handleStarClick = async (selectedRating) => {
        // if (selectedRating === rating) {
        //   // If the clicked star is the same as the current rating, remove the rating (set it to 0)
        //   setRating(0);
        // } else {
        //     setRating(selectedRating);
        //     setAdded(true);
        //     // Call your rating API with the selected rating
        //     onRatingChange(selectedRating);
        // }

        const ratingResponse = await RateSongApi(props.token, props.userId, props.songInfo, selectedRating);
        setRating(selectedRating);
      };

// albumId : "4Qy0SOU9Jg7Td10K68SanP"
// albumImageURL :"https://i.scdn.co/image/ab67616d0000b27358816b5b546bdc2c0e7f6416"
// albumName:"Buddy Holly"
// albumRelease:"1958"
// artistsId:(2) ['3wYyutjgII8LJVVOLrGI0D', '4r7JUeiYy24L7BuzCq9EjR']
// artistsName:(2) ['Buddy Holly', 'The Crickets']
// duration_ms:129120
// id:"39lnzOIUCSNaQmgBHoz7rt"
// name:"Everyday"
// popularity:68
// explicit:false

const [liked, setLiked] = useState(props.liked);

const handleLikeClick = async () => {
  if (liked) {
    // Call unlike API if the heart is already filled
    alert("unlike api");

    setLiked(false);
  } else {
    
    const likeResp = await LikeSongApi(props.token, props.userId, props.songInfo);
    setLiked(true);
  }  
};

const handleDeleteClick = async () => {
    setDeleted(!deleted);

    const del = await SongRemoveApi(props.token, props.userId, props.songInfo);

    props.onRequestClose();

}

const formatDuration = (durationInMilliseconds) => {
    // Convert milliseconds to seconds
    let seconds = Math.floor(durationInMilliseconds / 1000);

    // Calculate minutes and remaining seconds
    let minutes = Math.floor(seconds / 60);
    seconds %= 60;

    // Format the result as mm:ss
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};


  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      className="information-modal"
    >
        <div className="close-page">
            <div className="songPopularity">
                <AiFillCrown className="crown-icon" />
                <p className="songPopularity-label">Popularity: {props.songInfo.popularity} / 100 </p>
            </div>
            
            <button onClick={props.onRequestClose}>
                <AiOutlineClose/>
            </button>
        </div>

        <div className="three-column-container">
            <div className="column">
                <img className="cover-img" src= {imgsrc(props.songInfo.albumImageURL)} alt="cover"/>
                {/* <p className="duration"> {props.songInfo.duration_ms}</p> */}
                <p className="duration">
                    {formatDuration(props.songInfo.duration_ms)}
                </p>
            </div>

            <div className="column">
                <div className="attributes">
                    <p className="songName">{props.songInfo.name}</p>
                    <p className="songArtists">{props.songInfo.artistsName.join(', ')}</p>
                    <p className="songAlbum">{props.songInfo.albumName}</p>
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
                            <div className={`heart-icon ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
                                {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                            </div>
                                <p>{liked ? 'Liked' : 'Like'}</p>
                            </div>
                            <div className="half-width">
                                <div className={`delete-icon ${deleted ? 'deleted' : ''}`} onClick={ handleDeleteClick }>
                                    {deleted ? <AiFillDelete /> : <AiOutlineDelete/>}
                                    </div>
                                <p>{deleted ? 'Deleted' : 'Delete'}</p>
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

export default SongInfoPopup;
