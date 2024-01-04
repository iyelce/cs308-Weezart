import React from "react";
import './ProfilePage.css'; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';
import CreateBlendPopup from "../Popups/CreateBlendPopup";
import GetAllGroupPlaylists from "../../API/GetAllGroupPlaylists";



const MyBlends = ({...props}) => {


  useEffect(() => {
    const fetchData = async () => {
      try {
        const blends = await GetAllGroupPlaylists(props.token, props.userId);

        console.log("blend info in page is : ", blends);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, [props.token, props.userId]);



    let mockFriendList = [ "cans", "sczxc", "aaa"]
    
    const navigate = useNavigate();  

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
      };
    
      const closeModal = () => {
        setIsModalOpen(false);
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
            src="https://i.pinimg.com/564x/84/c2/af/84c2aff38526671371b2fd051ca782aa.jpg" // Replace with the actual user image URL
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
              allFriends = {mockFriendList}
            />
              
            </div>

        </div>
      </div>

        <br/>
        <br/>

      <div className="profile-container">
        
  
        {/* Clickable Items */}
        <div className="list-container">
          <div className="list-rectangle" onClick={() => navigate('/likedSongs')} >
            <img
              className="rectangle-image"
              src="https://placekitten.com/100/100" 
              alt="Added Songs"
            />
            <p className="rectangle-label">Blend 1</p>
          </div>

          <div className="list-rectangle" onClick={() => navigate('/likedSongs')} >
            <img
              className="rectangle-image"
              src="https://placekitten.com/100/100" 
              alt="Added Artists"
            />
            <p className="rectangle-label">Blend 2</p>
          </div>

          <div className="list-rectangle" onClick={() => navigate('/likedSongs')} >
            <img
              className="rectangle-image"
              src="https://placekitten.com/100/100" 
              alt="Added Albums"
            />
            <p className="rectangle-label">Blend 3</p>
          </div>
        </div>    

      </div>

      </div>
     
    );
  };

export default MyBlends;
