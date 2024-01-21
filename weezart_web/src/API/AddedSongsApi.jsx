// Added songs → GET /added-songs/{userId}

// PathVariable: string userId

// Response: List of user’s added songs as UserSong objects (empty list if the user did not add any song)


async function AddedSongsApi (token, userId ) {

    const url = `http://localhost:8080/user/added-songs/${userId}`;  
    const auth = "Bearer " + token;

    try{        

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
        throw 'Network response is not ok';
    }
}

export default AddedSongsApi;
