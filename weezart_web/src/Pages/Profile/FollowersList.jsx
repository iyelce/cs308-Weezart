import React from "react";
import './ProfilePage.css'; 
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FollowersList = ({...props}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { followers } = location.state;
  
    return (
        <div className="profile_page">

            <br/>
            <br/>



        <div className="profile-container">
            
            Followers
            
            {followers.map((item, index) => (
                <span key={index} className="profile_following">
                
                <Link to={{ pathname: "/friendProfile/"+item, state: { followingItem: item } }}>
                    Following: {item}
                    
                </Link>
                <br />
                </span>
            ))}
            

        </div>

      



        </div>
     
    );
  };

export default FollowersList;
