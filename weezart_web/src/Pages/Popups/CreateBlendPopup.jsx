import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";
import CreateGroupPlaylist from "../../API/CreateGroupPlaylist";
import { IoIosAddCircleOutline } from 'react-icons/io';
import { AiFillDelete } from 'react-icons/ai';

// Make sure to set appElement to avoid a11y violations
Modal.setAppElement("#root");

 
  function CreateBlendPopup({ ...props }) {

    const [addedFriends, setAddedFriends] = useState([]);
    const [isCreating, setIsCreating] = useState(false);

    const handleFriendSelect = (friend) => {
      // Check if the friend is already in the addedFriends list
      if (addedFriends.includes(friend)) {
        // If already added, remove from the list
        setAddedFriends(addedFriends.filter((addedFriend) => addedFriend !== friend));
      } else {
        // If not added, add to the list
        setAddedFriends([...addedFriends, friend]);
      }
    };

    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredFriends = props.allFriends.filter((friend) =>
      friend.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCreate = async () => {
      try {
        setIsCreating(true); // Set the loading state
        let resp = await CreateGroupPlaylist(props.token, props.username, addedFriends);
  
        // Handle the response here, e.g., close the popup or perform other actions
  
        console.log("page içinde resp create : ", resp);
  
      } catch (error) {
        // Handle error if needed
      } finally {
        setIsCreating(false); 
        props.onRequestClose();
      }
    };

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

        <div>
      <div className="friend-selector">


      <div class="friend-search-navigation">
        <input
          type="search"
          placeholder="search"
          className="friend-search-navigation__input"
          value={searchTerm}
          onChange={handleSearch}
        />
       
      </div>


      <div className="table-friend-container">
  <table className="list_friend_table">
    <tbody>
      {searchTerm === '' ? (
        props.allFriends.length === 0 ? (
          <tr>
            <td colSpan="2">No friend found</td>
          </tr>
        ) : (
          props.allFriends.map((friend) => (
            <tr key={friend}>
              <td>{friend}</td>
              <td>
                {addedFriends.includes(friend) ? (
                  <AiFillDelete onClick={() => handleFriendSelect(friend)} />
                ) : (
                  <IoIosAddCircleOutline onClick={() => handleFriendSelect(friend)} />
                )}
              </td>
            </tr>
          ))
        )
      ) : (
        filteredFriends.length === 0 ? (
          <tr>
            <td colSpan="2">No friend found</td>
          </tr>
        ) : (
          filteredFriends.map((friend) => (
            <tr key={friend}>
              <td>{friend}</td>
              <td>
                {addedFriends.includes(friend) ? (
                  <AiFillDelete onClick={() => handleFriendSelect(friend)} />
                ) : (
                  <IoIosAddCircleOutline onClick={() => handleFriendSelect(friend)} />
                )}
              </td>
            </tr>
          ))
        )
      )}
    </tbody>
  </table>
</div>



      </div>

      
      <div className="selected-friends">
        <h2>Selected Friends</h2>
        <div className="selected-friends-list">
          {addedFriends.map((friend) => (
            <span key={friend} className="selected-friend">
              {friend}{' '}
            </span>
          ))}
        </div>
      </div>


      <button
          className="create-group-list-button"
          onClick={handleCreate}
          disabled={addedFriends.length === 0 || isCreating}
        >
          {isCreating ? 'Creating...' : 'Create'}
      </button>

    </div>



    </Modal>
    
  );
}

export default CreateBlendPopup;
