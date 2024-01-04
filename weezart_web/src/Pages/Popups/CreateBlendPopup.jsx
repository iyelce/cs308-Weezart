import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
// import './Popup.css';
import { AiOutlineStar, AiFillStar, AiOutlineHeart, AiFillHeart, AiFillCrown, AiOutlineDelete, AiFillDelete } from 'react-icons/ai'; 
import CreateGroupPlaylist from "../../API/CreateGroupPlaylist";

// Make sure to set appElement to avoid a11y violations
Modal.setAppElement("#root");

 
  function CreateBlendPopup({ ...props }) {

    const [selectedFriends, setSelectedFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleFriendSelect = (friend) => {
      setSelectedFriends([...selectedFriends, friend]);
    };
  
    const handleFriendRemove = (friend) => {
      const updatedFriends = selectedFriends.filter(
        (selectedFriend) => selectedFriend !== friend
      );
      setSelectedFriends(updatedFriends);
    };
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredFriends = props.allFriends.filter((friend) =>
      friend.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = async () => {
      let resp = await CreateGroupPlaylist(
        "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXJhaGluIiwicm9sZSI6W3siYXV0aG9yaXR5IjoiUk9MRV9VU0VSIn1dLCJleHAiOjE3MDQzNzQzNzksImlhdCI6MTcwNDM3MDc3OX0.-slzEEOh1t26D6AbjkGkohUo_peQZgvl-7WL6GEsq_U"
        ,31);
        console.log("page içinde resp create : ", resp);
    }

  return (

    
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      className="information-modal"
    >
        <div className="close-page">            
            <button onClick={props.onRequestClose}>
                <AiOutlineClose/>
            </button>
        </div>



        <br/>
        <br/>

        <div>
      <div className="friend-selector">
        <input
          type="text"
          placeholder="Search friends"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="friend-list">
          <table>
            <tbody>
              {searchTerm === '' ? (
                props.allFriends.map((friend) => (
                  <tr key={friend}>
                    <td>{friend}</td>
                    <td>
                      <button onClick={() => handleFriendSelect(friend)}>
                        Select
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                filteredFriends.map((friend) => (
                  <tr key={friend}>
                    <td>{friend}</td>
                    <td>
                      <button onClick={() => handleFriendSelect(friend)}>
                        Select
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="selected-friends">
        <h2>Selected Friends</h2>
        <div className="selected-friends-list">
          {selectedFriends.map((friend) => (
            <span key={friend} className="selected-friend">
              {friend}{' '}
              <button onClick={() => handleFriendRemove(friend)}>Remove</button>
            </span>
          ))}
        </div>
      </div>
      <button onClick={handleCreate}>create</button>
    </div>



    </Modal>
    
  );
}

export default CreateBlendPopup;
