import React from "react";
import './ProfilePage.css'; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';




const MyBlends = ({...props}) => {
    
    const navigate = useNavigate();  

 
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
           asdasd
              
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
