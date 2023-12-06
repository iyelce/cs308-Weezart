// Added albums→ GET /added-albums/{userId}

// PathVariable: string userId

// Response: List of user’s added albums as UserAlbum objects (empty list if the user did not add any album)


async function AddedAlbumsApi (token, userId ) {

    const url = `http://localhost:8080/user/added-albums/${userId}`;  
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

        const albumResponse = [];

        for (let i=0; i<newResp.length; i++) {
            albumResponse.push(newResp[i].album);
        }

        return albumResponse;
    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default AddedAlbumsApi;
