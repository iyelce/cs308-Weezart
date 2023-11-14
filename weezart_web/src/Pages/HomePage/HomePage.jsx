import React, { useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from "react";
import './HomePage.css';
import Sidebar from '../../Components/Sidebar/Sidebar.jsx'



const HomePage = () => {
  return (
    
    <div className="whole-page">
    <Sidebar/>
    <div className="main-page">main page</div>
    <div className="friend-activity">friends</div>

</div>

  );
}


export default HomePage;
