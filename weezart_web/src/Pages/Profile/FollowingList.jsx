import React from "react";
import './ProfilePage.css'; 
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const FollowingList = ({...props}) => {
    const location = useLocation();
    const { followingInfo } = location.state;
    return (
        <div className="profile_page">

            <br/>
            <br/>



        <div className="profile-container">
            
            Following

            <p>Following Info: {JSON.stringify(followingInfo)}</p>
            
            {followingInfo.map((item, index) => (
                <span key={index} className="profile_following">
                <Link to={{ pathname: "/following", state: { followingItem: item } }}>
                    Following: {item}
                </Link>
                <br />
                </span>
            ))}
            

        </div>

      



        </div>
     
    );
  };

export default FollowingList;
