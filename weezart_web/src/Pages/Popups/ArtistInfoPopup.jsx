import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineStar, AiFillStar, AiOutlineHeart, AiFillHeart, AiOutlineDelete, AiFillDelete } from 'react-icons/ai'; 
import { useEffect } from "react";
import LikeArtistApi from "../../API/LikeArtistApi";
import ArtistRemoveApi from "../../API/ArtistRemoveApi";
import RateArtistApi from "../../API/RateArtistApi";
import UnlikeArtistApi from "../../API/UnlikeArtistApi";

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

function ArtistInfoPopup({...props}) {

    const [liked, setLiked] = useState(props.liked);
    const [rating, setRating] = useState(props.rating ? props.rating[props.rating.length - 1] : 0);
    const [deleted, setDeleted] = useState(false);
    const stars = [1, 2, 3, 4, 5];
  
    useEffect(() => {
      setLiked(props.liked);
      setRating(props.rating ? props.rating[props.rating.length - 1] : 0);
      setDeleted(false);
    }, [props.liked, props.rating]);

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

        const ratingResponse = await RateArtistApi(props.token, props.userId, props.artistInfo, selectedRating);
        setRating(selectedRating);
      };

// followerCount :411109
// genres :(5) ['art pop', 'chamber pop', 'experimental folk', 'experimental pop', 'indie pop']
// id : "3Uqu1mEdkUJxPe7s31n1M9"
// imageUrl : "https://i.scdn.co/image/ab6761610000e5eb92b2757e7003d4f77e5a5d05"
// name : "Weyes Blood"



  const handleLikeClick = async () => {
    if (liked) {
        const likeResp = await UnlikeArtistApi(props.token, props.userId, props.artistInfo);  
        setLiked(false);
    } else {      
      const likeResp = await LikeArtistApi(props.token, props.userId, props.artistInfo);  
      setLiked(true);
    }    
  };

  const handleDeleteClick = async () => {
    setDeleted(!deleted);

    const del = await ArtistRemoveApi(props.token, props.userId, props.artistInfo);

    props.onRequestClose();
}


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
        <div 
            className="column column-try" 
            style={{
                backgroundImage: `url(${props.artistInfo.imageUrl !== "" ? props.artistInfo.imageUrl : 'yourCatPhotoUrl'})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'transparent',
            }}
        >
                <div className="content">
                    <h2 className="title">{props.artistInfo.name}</h2>

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
                
            <form className="rating-artist">
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

                <div className="attributes">
                    <p className="artistsFollower"> Followers: {props.artistInfo.followerCount}</p>
                    <p className="songGenre">Genre: {props.artistInfo.genres===null?"Unknown":props.artistInfo.genres.join(', ')}</p>
                </div>

            </div>

       
      </div>

        <br/>
        <br/>





    </Modal>
    
  );
}

export default ArtistInfoPopup;
