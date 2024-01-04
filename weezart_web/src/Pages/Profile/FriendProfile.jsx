import React from "react";
import './ProfilePage.css'; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import UserProfileApi from "../../API/UserProfileApi";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import UserPublicDataApi from "../../API/UserPublicDataApi";
import { useParams } from "react-router-dom";



const FriendProfile = ({...props}) => {

    const {friendName} = useParams();
  

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
        const user = await UserProfileApi(props.token, friendName);
        console.log("friendName is : ", friendName);
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

          <p>{friendName}</p>

      </div>
     
    );
  };

export default FriendProfile;
