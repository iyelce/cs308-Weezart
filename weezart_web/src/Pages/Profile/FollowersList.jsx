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
     
            <div className="profile-container" style={{display:"flex", flexDirection:'column'}}>
            
            
            Followers
        
            <ul>
            {followers.map((item, index) => (
                <li style={{listStyleType:'none',display:'block', paddingTop:'10px', margin:'20px'}}>
                    <div>
                <span key={index} className="profile_following">
                
                <Link to={{ pathname: "/friendProfile/"+item, state: { followingItem: item } }} style={{color:'white', textDecoration:'none'}}>
                     {item}
                    
                </Link>
                <br />
                </span>
                </div>
                </li>
            
            
            ))}
            </ul>
            

        </div>

      



        </div>
     
    );
  };

export default FollowersList;
