import React, { useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from "react";
import './HomePage.css';



const HomePage = () => {
  return (
    
    <div className="whole-page">
        <div className="sidebar">
            <div className="profile">
                profile
            </div>
            <div className="home">
                home
            </div>
            <div className="analyse">
                analyse
            </div>
            <div className="add-song">
                add-song
            </div>
            <div className="logo">
                logo

            </div>
        </div>
    <div className="main-page">main page</div>
    <div className="friend-activity">friends</div>

</div>

  );
}


export default HomePage;
