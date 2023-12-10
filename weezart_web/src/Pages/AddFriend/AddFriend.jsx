import React, { useState } from "react";
import './AddFriend.css';
import AddFriendApi from "../../API/AddFriendApi";




const AddFriend = ({...props}) => {

  async function addFriend(username, token,addingUsername) {
    const response = await AddFriendApi(token, username,addingUsername);

    if (response==="ALREADY_FRIEND_ERROR") {
      setResponseLabel("Already Following")
      setResponseShow(true);
    }
    else if(response==="USER_NOT_FOUND_ERROR"){
      setResponseLabel("User Not Found")
      setResponseShow(true);
    }
    else if (response==="ADD_FRIEND_SUCCESS"){
      setResponseLabel("Followed")
      setResponseShow(true);
    }

    return response;
}

    const [responseShow, setResponseShow] = useState(false);
    const [responseLabel, setResponseLabel] = useState("");

    const [username, setUsername] = useState("");
    const [isFocusedUsername, setIsFocusedUsername] = useState(false);
    
    const handleChange = (event) => {
        setUsername(event.target.value);

        setResponseShow(false);
        setResponseLabel("");
    };
    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        // Your logic for adding the friend with username goes here
        // For example, you can send a request to your backend API
        

    let response=addFriend(props.username,props.token,username);
  };

  return (
    <div className="container-add">
      <form className = "friend-add" onSubmit={handleSubmit}>
        <div className={'field '+(isFocusedUsername?'moved':'')} >
                    <input type="text" 
                    className="register-input-box"
                    onChange={handleChange}
                    onBlur={()=>setIsFocusedUsername(false)}
                    onFocus={()=>setIsFocusedUsername(true)}
                    ></input>
                    <label for="" className={'register-input-label '+(isFocusedUsername||(!isFocusedUsername&&username!=='')?'moved-upside':'')}>Username</label>
                </div>

                <p style={{ display: responseShow ? 'block' : 'none' }} className="single-song-add-unique-label">
                  {responseLabel}
                </p>

        <button className="add-friend-button" type="submit">Follow</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "4px",
  },
};

export default AddFriend;
