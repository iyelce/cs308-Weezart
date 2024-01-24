import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
// import './Popup.css';
import { AiOutlineStar, AiFillStar, AiOutlineHeart, AiFillHeart, AiFillCrown, AiOutlineDelete, AiFillDelete } from 'react-icons/ai'; 
import LikeSongApi from "../../API/LikeSongApi";
import { useEffect } from "react";
import RateSongApi from "../../API/RateSongApi";
import SongRemoveApi from "../../API/SongRemoveApi";
import UnlikeSongApi from "../../API/UnlikeSongApi";
import songImage from "../../songImage.jpg"
import { IoIosAddCircle,  IoIosAddCircleOutline } from "react-icons/io";
import AddedCheckApi from "../../API/AddedCheckApi";
import AddingAcceptedSong from "../../API/AddingAcceptedSong";
import IsLikedApi from "../../API/IsLikedApi";
import RateCheckApi from "../../API/RateCheckApi";

// Make sure to set appElement to avoid a11y violations
Modal.setAppElement("#root");



function imgsrc(val) {
    if (val === null || val === "" || val === undefined)  {
        return songImage;
    } else {
      return val;
    }
  }
  
  function SongInfoPopup({ ...props }) {
    const [rating, setRating] = useState(props.rating[props.rating.length - 1]);
    const stars = [1, 2, 3, 4, 5];
    const [deleted, setDeleted] = useState(false);
    const [liked, setLiked] = useState(props.liked);
    const [isAdded, setIsAdded] = useState(false); //to check from api
    const [added, setAdded] =useState(false);
    const [addFirstErrorLabel, setAddFirstErrorLabel] = useState(false);
  
    const IsAddedCheck = async () => {
            try {
              const response = await AddedCheckApi(props.token, props.userId, props.songInfo.id);
              console.log("is added :" , response, "  -  ", typeof(isAdded))
              setIsAdded(response);
            } catch (error) {
            }
    }

    const IsLikeCheck = async () =>{
        if (props.liked === "check with api") {
            //come from recom
            const likeResponse = await IsLikedApi(props.token, props.userId ,props.songInfo.id );
            setLiked(likeResponse);
        }
        else {
            setLiked(props.liked);
        }
    }

    const RatingCheck = async () => {
        if (props.rating === "check with api") {
            //comming from recom
            
            const rateResponse = await RateCheckApi(props.token, props.userId, props.songInfo.id);
            setRating(rateResponse);
        }
        else{
            setRating(props.rating[props.rating.length - 1]);
        }
    }


    useEffect(() => {
        IsAddedCheck();
      }, []); // Run once when component mounts to check isAdded
    
      useEffect(() => {
        // This effect will run whenever isAdded changes
        if (isAdded === "true") {
          RatingCheck();
          IsLikeCheck();
        }
        else{
            setRating(0);
            setLiked(false);
        }
      }, [isAdded]);
  

    const handleStarClick = async (selectedRating) => {
        if(isAdded ===  "true") {
            const ratingResponse = await RateSongApi(props.token, props.userId, props.songInfo, selectedRating);
            setRating(selectedRating);
        }
        else {
            setAddFirstErrorLabel(true);
        }

    };
  
    const handleLikeClick = async () => {
        
        if(isAdded === "true") {
            if (liked) {
                const unlikeReps = await UnlikeSongApi(props.token, props.userId, props.songInfo);
                setLiked(false);
              } else {
                const likeResp = await LikeSongApi(props.token, props.userId, props.songInfo);
                setLiked(true);
              }
        }
        else {
            setAddFirstErrorLabel(true);
        }

    };
  
    const handleDeleteClick = async () => {
      setDeleted(!deleted);
      const del = await SongRemoveApi(props.token, props.userId, props.songInfo);
      props.onRequestClose();
    };

    const handleAddClick = async () => {
        setAddFirstErrorLabel(false);
        setAdded(true);
        const addResponse = await AddingAcceptedSong(props.songInfo, props.token, props.userId );
        console.log("adding song from popup: ", addResponse);
        //if sucessfull
        IsAddedCheck();
    }
  
    const formatDuration = (durationInMilliseconds) => {
      let seconds = Math.floor(durationInMilliseconds / 1000);
      let minutes = Math.floor(seconds / 60);
      seconds %= 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
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
                <p className="songPopularity-label">
                    Popularity: {props.songInfo?.popularity !== -1 ? props.songInfo?.popularity + " / 100" : "unknown"}
                </p>
            </div>
            
            <button onClick={props.onRequestClose}>
                <AiOutlineClose/>
            </button>
        </div>

        <div className="three-column-container">
        <div 
            className="column column-try" 
            style={{
                backgroundImage: `url(${imgsrc(props.songInfo.albumImageURL)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'transparent',
            }}
        >
                <div className="content">
                    <h2 className="title">{props.songInfo.name}</h2>

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
                <div className="attributes">
                    <p className="songName">{props.songInfo?.name}</p>
                    <p className="songArtists">{props.songInfo?.artistsName.join(', ')}</p>
                    <p className="songAlbum">{props.songInfo?.albumName}</p>
                </div>
            </div>

            <div className="column">
                
                <form className="rating">

                    <div className="like-add">
                            <div className="half-width">
                            <div className={`heart-icon ${liked ? 'liked' : ''}`} onClick={handleLikeClick}>
                                {liked ? <AiFillHeart /> : <AiOutlineHeart />}
                            </div>
                                <p className="songAlbum" >{liked ? 'Liked' : 'Like'}</p>
                            </div>
                            
                            {isAdded === "true" ? (
                                <div className="half-width">
                                    <div className={`delete-icon ${deleted ? 'deleted' : ''}`} onClick={handleDeleteClick}>
                                    {deleted ? <AiFillDelete /> : <AiOutlineDelete />}
                                    </div>
                                    <p className="songAlbum">{deleted ? 'Deleting...' : 'Delete'}</p>
                                </div>
                                ): (
                                <div className="half-width">
                                    <div className={`delete-icon ${added ? 'added' : ''}`} onClick={handleAddClick}>
                                    {added ? <IoIosAddCircle /> : < IoIosAddCircleOutline />}
                                    </div>
                                    <p className="songAlbum">{added ? 'Adding...' : 'Add'}</p>
                                </div>
                            )}                       
                    </div>

                    <p style={{ display: addFirstErrorLabel ? 'block' : 'none' }} className="single-song-add-unique-label">
                    {'First Add the Song :)'}
                    </p>

                    
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
