import React from "react";
import './ProfilePage.css'; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserProfileApi from "../../API/UserProfileApi";


const MyProfile = ({...props}) => {

  // useEffect(() => {
  //   setUserInfo({});

  //   const fetchUserProfile = async () => {
  //     try {
  //       const userProfileData = await UserProfileApi(props.token, props.userId);
  //       setUserInfo(userProfileData);
  //     } 
  //     catch (error) {
  //       console.error('Error fetching user profile:', error);
  //     }
  //   };

  //   // Invoke the fetchUserProfile function
  //   fetchUserProfile();

  //   // Cleanup function (optional)
  //   return () => {
  //     // Perform cleanup tasks if needed
  //   };
  // }, [props.token, props.userId]); // Add dependencies if needed


    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({});


    const user = {
      username: 'JohnDoe',
      followersCount: 150,
      followingCount: 100,
      email: 'john.doe@example.com',
      // Add other user details as needed
    };
  
    const handleEditProfile = () => {
      // Add logic to handle edit profile
      console.log('Edit Profile clicked');
    };
  

  
    return (
        <div className="profile_page">

            <br/>
            <br/>

            <p>{userInfo}</p>

       <div className="profile-container">
        <div className="profile-header">
          {/* User Image */}
          <img
            className="profile-image"
            src="https://placekitten.com/200/200" // Replace with the actual user image URL
            alt="User"
          />
  
          {/* User Details */}
          <div className="user-details">
            <h2>{user.username}</h2>
            <p >
                <span className="profile_followers" onClick={()=>{navigate("/followers")}}>Followers: {user.followersCount} </span>
                | 
                <span className="profile_following" onClick={()=>{navigate("/following")}}>Following: {user.followingCount} </span>
            </p>
          </div>
  
          {/* Edit Profile Button */}
          <button className="add-artist-button" onClick={handleEditProfile}>
            Edit Profile
          </button>
        </div>
      </div>

        <br/>
        <br/>

      <div className="profile-container">
        
  
        {/* Clickable Items */}

        <div className="list-rectangle" onClick={() => navigate('/likedSongs')} >
          <img
            className="rectangle-image"
            src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg" // Replace with the actual image URL
            alt="Liked Songs"
          />
          <p className="rectangle-label">Liked Songs</p>
        </div>

        <div className="list-rectangle" onClick={() => navigate('/likedArtists')} >
          <img
            className="rectangle-image"
            src="https://placekitten.com/100/100" // Replace with the actual image URL
            alt="Liked Songs"
          />
          <p className="rectangle-label">Liked Artists</p>
        </div>

        <div className="list-rectangle" onClick={() => navigate('/likedAlbums')} >
          <img
            className="rectangle-image"
            src="https://i.pinimg.com/564x/f0/4b/80/f04b805f0edeadc935fac72d22ce76eb.jpg" // Replace with the actual image URL
            alt="Liked Songs"
          />
          <p className="rectangle-label">Liked Albums</p>
        </div>

      </div>

      



        </div>
     
    );
  };

export default MyProfile;
