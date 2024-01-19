import React from "react";
import './ProfilePage.css'; 
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import CreateBlendPopup from "../Popups/CreateBlendPopup";
import GetAllGroupPlaylists from "../../API/GetAllGroupPlaylists";
import DeleteBlend from "../../API/DeleteBlend";
import { AiOutlineDelete, AiFillDelete } from 'react-icons/ai'; 




const MyBlends = ({...props}) => {

  const location = useLocation();
  const { followingInfo } = location.state;

  const [blendList, setBlendList] = useState("boş");

  const fetchData = async () => {
    try {
      console.log("fetchnggggg")
      const blends = await GetAllGroupPlaylists(props.token, props.userId);

      // Update the state with the fetched data
      setBlendList(blends);

      console.log("blend info in page is : ", blendList);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [props.token, props.userId]);


    
    const navigate = useNavigate();  

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
      };

    const handleDelete = async (userIds) => {
      const del = await DeleteBlend(props.token, userIds, props.userId);
      console.log("return del is: ", del);
      fetchData();
    };
 
    return (
        <div className="profile_page">

            <br/>
            <br/>

       <div className="profile-container">
        <div className="profile-header">
          {/* User Image */}
          <img
            className="profile-image"
            src="https://i.pinimg.com/564x/84/c2/af/84c2aff38526671371b2fd051ca782aa.jpg" 
            alt="User"
          />
  
          {/* User Details */}
          <div className="user-details">

          <div className="icon-container" 
                onClick={() => {
                    console.log('Icon clicked!');
                    openModal();
                }}>
                <AddCircleIcon className="addBlendIcon" />
                <Typography variant="body1" style={{ marginLeft: '5px' }}>
                Create a new blend
                </Typography>
            </div>

            <CreateBlendPopup
              isOpen={isModalOpen}
              onRequestClose={closeModal}
              allFriends = {followingInfo}
              token = {props.token}
              userId = {props.userId}
            /> 
            </div>

        </div>
      </div>

        <br/>
        <br/>

      <div className="profile-container">

        {blendList !== "boş" ? (
          <div className="list-container">
            {blendList.map((blend, index) => (
              <div key={index} className="blend-item-container">
                {console.log("BlendId before Link:", blend.userSong.id)}

                <div className="list-rectangle">
                  <img
                    className="rectangle-image"
                    src="https://placekitten.com/100/100"
                    alt={blend.groupSongNames}
                  />
                  <p className="rectangle-label">
                    {blend.userSong.groupSongNames ? blend.userSong.groupSongNames.join(', ') : ''}
                  </p>
                  <div className="delete-icon-blend" onClick={() => handleDelete(blend.userSong.id)}>
                    <AiOutlineDelete />
                  </div>
                </div>

                <Link
                  key={index}
                  to={`/blends/${blend.userSong.id}`}
                  className="list-link" 
                >
                  <div className="link-content">
                  </div>
                </Link>

              </div>
            ))}
          </div>
        ) : (
          <p>No blend found</p>
        )}

      </div>

      </div>
     
    );
  };

export default MyBlends;
