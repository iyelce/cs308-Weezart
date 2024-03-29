import React, { useState } from "react";
import Modal from "react-modal";
import ReactModal from 'react-modal';
import { AiOutlineClose } from "react-icons/ai";
import { AiOutlineStar, AiFillStar, AiOutlineHeart, AiFillHeart, AiOutlineDelete, AiFillDelete } from 'react-icons/ai'; 
import { useEffect } from "react";
import LikeAlbumApi from "../../API/LikeAlbumApi";
import AlbumRemoveaApi from "../../API/AlbumRemoveaApi";
import RateAlbumApi from "../../API/RateAlbumApi";
import UnlikeAlbumApi from "../../API/UnlikeAlbumApi";
import albumImage from "../../songImage.jpg"

// Make sure to set appElement to avoid a11y violations
ReactModal.setAppElement('#root'); // Replace '#root' with the ID of your app root element


//if image is empty put a defoult image
function imgsrc(val) {
    if (val === null || val === "" || val === undefined)  {
        return albumImage;
    } else {
      return val;
    }
  }

function AlbumInfoPopup({...props}) {
    

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

        const ratingResponse = await RateAlbumApi(props.token, props.userId, props.albumInfo, selectedRating);
        setRating(selectedRating);
      };

// artistsId:['3Uqu1mEdkUJxPe7s31n1M9']
// artistsName:['Weyes Blood']
// id:"0Cuqhgy8vm96JEkBY3polk"
// imageUrl:"https://i.scdn.co/image/ab67616d0000b2730c64e752dec4c08362cc4a88"
// name:"Titanic Rising"
// songsId:(10) ['6Jy6p1xGv0n4c5hH0CH3VP', '7s9I4aCM8cfe2cSgPaPezg', '1ki6pB2iYh9nSmlG4WPdqf', '6f4itfvWzS59Qu7JWorhxn', '51EMSRpNm9Rg5rGViVCczv', '2ujzo6cl7jAcLCnyKyYWwM', '5qspeKX1xBacLJMm2t3Yc0', '30TCAxiC8zVb5NVdUoUuCS', '2VYqgye3Wf9ySE4qYM3iJn', '5V25JNAs17PQ3dJfmMIqSG']


// songsName:(10) ['Picture Me Better', 'Nearer to Thee', 'Titanic Rising', 'Movies', 'Andromeda', 'Mirror Forever', "A Lot's Gonna Change", 'Something to Believe', 'Everyday', 'Wild Time']

// releaseDate:"2019-04-05"
// numberOfTracks:10


  const handleLikeClick = async () => {
    if (liked) {
        const likeResp = await UnlikeAlbumApi(props.token, props.userId, props.albumInfo);
  
        console.log("page içinde unlike: ", likeResp);
    
        setLiked(false);
    } else {
      
      const likeResp = await LikeAlbumApi(props.token, props.userId, props.albumInfo);
  
      console.log("page içinde like: ", likeResp);
  
      setLiked(true);
  
    }    
  };

  const handleDeleteClick = async () => {
    setDeleted(!deleted);

    const del = await AlbumRemoveaApi(props.token, props.userId, props.albumInfo);
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
                backgroundImage: `url(${imgsrc(props.albumInfo.imageUrl)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'transparent',
            }}
        >
              <div className="content">
                    <h2 className="title">{props.albumInfo.name} <span>{props.albumInfo.year}</span></h2>

                    <p className="copy">{props.albumInfo.artistsName.join(', ')}</p>

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
                        {props.albumInfo.songsName.map((song, index) => (
                        <li key={index} className="songs">{song}</li>
                        ))}
                    </ul>
                </div>


            </div>

            <div className="column">
                
                <form className="rating">

                

                  




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

export default AlbumInfoPopup;
