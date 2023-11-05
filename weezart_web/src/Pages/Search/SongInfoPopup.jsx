import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import './Popup.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineStar, AiFillStar, AiOutlineHeart, AiFillHeart, AiOutlineCheckCircle, AiFillCheckCircle } from 'react-icons/ai'; 
 

// Make sure to set appElement to avoid a11y violations
Modal.setAppElement("#root");

//songInfo-->
// songName : "name1",
// artists : ["artist1.1"],
// genre : ["genre1.1", "genre1.2"],
// image :


function imgsrc(val) {
    if(val === undefined || val==="") {
        return "https://i.pinimg.com/564x/47/99/fd/4799fdb80098968bf6ff4c311eed1110.jpg";
    }
    else {
        return val;
    }
}

function SongInfoPopup(props) {

    const [rating, setRating] = useState(0);
    const stars = [1, 2, 3, 4, 5];
    const [liked, setLiked] = useState(false);
    const [added, setAdded] = useState(false);

    const handleStarClick = (selectedRating) => {
        if (selectedRating === rating) {
            // If the clicked star is the same as the current rating, remove the rating (set it to 0)
            setRating(0);
            setAdded(false);

          } else {
            setRating(selectedRating);
            setAdded(true);
          }
    };


  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      className="song-information-modal"
    >
        <div className="close-page">
            <button onClick={props.onRequestClose}>
                <AiOutlineClose/>
            </button>
        </div>

        <div className="three-column-container">
            <div className="column">
                <img className="cover-img" src= {imgsrc(props.songInfo.image)} alt="cover"/>
            </div>

            <div className="column">
                <div className="song-attributes">
                    <p className="songName">{props.songInfo.songName}</p>
                    <p className="songArtists">{props.songInfo.artists.join(', ')}</p>
                    <p className="songAlbum">{props.songInfo.album}</p>
                    <p className="songGenre">Genre: {props.songInfo.genre.join(', ')}</p>
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

                    <div className="song-like-add">
                            <div className="half-width">
                                <div className={`heart-icon ${liked ? 'liked' : ''}`} onClick={() => { setLiked(!liked); }}>
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

//     <div className={`modal ${props.showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: props.showModal ? 'block' : 'none' }}>

//     <div className="modal-dialog">

//       <div className="modal-content">

//         <div className="modal-header">
//              <button className="close-button" onClick={props.onRequestClose}>
//                  <AiOutlineClose/>
//              </button>
//         </div>

//         <div className="modal-body">
//             <div class="row">

//                 <div class="col-sm">
//                 One of three columns
//                 </div>

//                 <div class="col-sm">
//                     <div className="col-sm">
//                         <label>song name</label>
//                         <label>song name</label>
//                     </div>
//                 </div>

//                 <div class="col-sm">
//                 One of three columns
//                 </div>

//             </div>
//         </div>

//         <div className="modal-footer">
//           <button type="button" className="btn btn-secondary" onClick={props.onRequestClose}>Close</button>
//           <button type="button" className="btn btn-primary" onClick={props.onRequestClose}>Save changes</button>
//         </div>

//       </div>
//     </div>
//   </div>
    
  );
}

export default SongInfoPopup;
