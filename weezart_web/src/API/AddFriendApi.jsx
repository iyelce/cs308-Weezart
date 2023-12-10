// Added songs → GET /added-songs/{userId}

// PathVariable: string userId

// Response: List of user’s added songs as UserSong objects (empty list if the user did not add any song)


async function AddFriendApi (token, username, addingUsername ) {

    const url = `http://localhost:8080/add/friend/${username}/${addingUsername}`;  
    const auth = "Bearer " + token;

    try{        
    
        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            credentials: 'include', 
        });
        
        const data = await response.text();
    
        if(!response.ok) {
            if(response.status===403){
                return "USER_ALREADY_FRIEND";
            }
            throw new Error('Network response is not ok');
        }

        console.log("add friend response: ", data);
        
        return data;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default AddFriendApi;
