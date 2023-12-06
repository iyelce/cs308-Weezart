// Added artists→ GET /added-artists/{userId}

// PathVariable: string userId

// Response: List of user’s added artists as UserArtist objects (empty list if the user did not add any artist)


async function AddedArtistsApi (token, userId ) {

    const url = `http://localhost:8080/user/added-artists/${userId}`;  
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

        const artistResponse = [];

        for (let i=0; i<newResp.length; i++) {
            artistResponse.push(newResp[i].artist);
        }

        return artistResponse;
    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default AddedArtistsApi;
