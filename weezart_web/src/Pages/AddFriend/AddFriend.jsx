import React, { useState } from "react";
import './AddFriend.css';
import AddFriendApi from "../../API/AddFriendApi";

async function addFriend(username, token,addingUsername) {
    const response = await AddFriendApi(token, username,addingUsername);
    return response;
}


const AddFriend = ({...props}) => {
  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    // Your logic for adding the friend with username goes here
    // For example, you can send a request to your backend API
    console.log(`Adding friend: ${username}`);
    console.log("token122121212121",props.token);
    console.log("usernameadasdsadasdadsada ",props.username);

    let response=addFriend(props.username,props.token,username);


  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Add Friend:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={handleChange}
          required
        />
        <button type="submit">Add</button>
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
