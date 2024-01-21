// /like

// •	Like Artist → POST /album/{userId}
// Request: AritstPayload and PathVariable: userId
// {
// "id": "your_id_value",
// "name": "your_name_value",
// "genres": ["genre1", "genre2", "genre3"],
// "imageUrl": "your_image_url_value",
// "followerCount": 1000
// }



async function LikeArtistApi(token, userId, artistInfo) {

    const url = `http://localhost:8080/like/artist/${userId}`;  
    const auth = "Bearer " + token;

    let likedArtist = 
    {
        id: artistInfo?.id,
        name: artistInfo?.name,
        genres: artistInfo?.genres,
        imageUrl: artistInfo?.imageUrl,
        followerCount: artistInfo?.followerCount
    }

    try{        

    
        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(likedArtist),
            method: 'POST',
            mode: 'cors',
            credentials: 'include', 
        });
        
        
        if(!response.ok) {
            throw new Error('Network response is not ok');
        }
        const data = await response?.text();

        const newResp = JSON.parse(data); 

        console.log(newResp);

        return newResp;

    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw "Network response is not ok";
    }
}

export default LikeArtistApi;
