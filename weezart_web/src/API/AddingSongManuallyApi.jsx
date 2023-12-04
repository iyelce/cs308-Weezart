// Adding a song manually → GET /manual-song-assisted/{songQuery}/{artistQuery}/{userId}

// PathVariable: song name, artist name, userId

// Response: Song object that will be asked to user if this is the song they want to add. If yes, Adding the accepted song endpoint should be called, if not, frontend should guide the user to the main “song add” page.

// ERROR (in the case of song is already added): Body: String(“SONG_ALREADY_EXISTS”) 


async function AddingSongManuallyApi (songQuery, artistQuery, token, userId  ) {

    const url = `http://localhost:8080/manual-song-assisted/${songQuery}/${artistQuery}/${userId}`;
    
    const auth = "Bearer " + token;

    try{        

        console.log("aassssssaaaaaa");

        const response = await fetch(url, {
            headers: {
                accept: '*/*',
                'Authorization': auth,
                'Content-Type': 'application/json',
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

        return newResp;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }

    
}

export default AddingSongManuallyApi;
