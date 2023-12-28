import React from "react";
import './ProfilePage.css'; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserProfileApi from "../../API/UserProfileApi";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import UserPublicDataApi from "../../API/UserPublicDataApi";




const MyProfile = ({...props}) => {
  const [publicData, setPublicData] = useState();
  function handleChange(event) {
    setPublicData(!publicData);
    publicDatas();
   
    
  }

async function publicDatas() {
    try {
      if(publicData===false){
        const response= await UserPublicDataApi(props.token,props.userId,"allow-recommendation");

        console.log("ALLOWED")
      }
      else{
        const response=await UserPublicDataApi(props.token,props.userId,"restrict-recommendation");
        console.log("RESTRICTED");
      }
        
    }
    catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await UserProfileApi(props.token, props.userId);

        console.log("user info in page is : ", user);

        setEmail(user.email);
        setUsername(user.username);

        setFollowerCount(user.followers === null ? 0 : user.followers.length);
        setFollowers(user.followers === null ? [] : user.followers);
        setAuthority(user.authority[0].authority);
        const authority1=user.authority[0].authority;
        console.log(authority1,"BBBBB");
        if(authority1==="ROLE_PRIVATE"){
          setPublicData(false);}
        else{
          setPublicData(true);
        }

        setFollowing(user.following === null ? 0 : user.following.length);
        setFollowingInfo(user.following);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, [props.token, props.userId]);
    
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [followers, setFollowers] = useState([]);
    const [followerCount, setFollowerCount] = useState(0);
    const [following, setFollowing] = useState(0);
    const [followingInfo, setFollowingInfo] = useState([]);
    const [username, setUsername] = useState('');
    const[authority,setAuthority]=useState('');
  


    const handleEditProfile = () => {
      // Add logic to handle edit profile
      alert('Edit Profile clicked');
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
            <h2>{username}</h2>
            <p >
                {/* <span className="profile_followers" onClick={()=>{navigate(`/followers/${followers}`)}}>Followers: {followerCount} </span> */}

                <span className="profile_followers" onClick={()=>{
                    navigate('/followers', { state: { followers } })
                  }}>Followers: {followerCount} </span>
                | 
                <span className="profile_following" onClick={()=>{
                    navigate('/following', { state: { followingInfo } })
                  }}>Following: {following} </span>
            </p>
          <FormControlLabel control={<Checkbox checked={publicData===undefined?false:publicData} color="secondary" onChange={handleChange} />} label="Public" />
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
        <div className="list-container">
          <div className="list-rectangle" onClick={() => navigate('/likedSongs')} >
            <img
              className="rectangle-image"
              src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg" // Replace with the actual image URL
              alt="Added Songs"
            />
            <p className="rectangle-label">Added Songs</p>
          </div>

          <div className="list-rectangle" onClick={() => navigate('/likedArtists')} >
            <img
              className="rectangle-image"
              src="https://placekitten.com/100/100" // Replace with the actual image URL
              alt="Added Artists"
            />
            <p className="rectangle-label">Added Artists</p>
          </div>

          <div className="list-rectangle" onClick={() => navigate('/likedAlbums')} >
            <img
              className="rectangle-image"
              src="https://i.pinimg.com/564x/f0/4b/80/f04b805f0edeadc935fac72d22ce76eb.jpg" // Replace with the actual image URL
              alt="Added Albums"
            />
            <p className="rectangle-label">Added Albums</p>
          </div>
        </div>

        <div className="list-container">
          <div className="list-rectangle" onClick={() => navigate('/myBlends')} >
            <img
              className="rectangle-image"
              src="https://i1.sndcdn.com/artworks-y6qitUuZoS6y8LQo-5s2pPA-t500x500.jpg" // Replace with the actual image URL
              alt="Added Songs"
            />
            <p className="rectangle-label">Blend Songs</p>
          </div>

          
        </div>

        

      </div>

      </div>
     
    );
  };

export default MyProfile;
