// Added songs → GET /added-songs/{userId}

// PathVariable: string userId

// Response: List of user’s added songs as UserSong objects (empty list if the user did not add any song)


async function AddFriendApi (token, username,addingUsername ) {

    const url = `http://localhost:8080/friend/${username}/${addingUsername}`;  
    const auth = "Bearer " + token;

    try{        
        console.log("url", url);
        console.log("auth", auth);
        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors',
            credentials: 'include', 
        });
        
        const data = await response.text();
    
        if(!response.ok) {
            throw new Error('Network response is not ok');
        }

        const newResp = JSON.parse(data); 

        console.log("song orj response: ", newResp);
        

        return newResp;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default AddFriendApi;
