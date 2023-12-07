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

    const url = `http://localhost:8080/like/album/${userId}`;  
    const auth = "Bearer " + token;

    let likedArtist = 
    {
        id: artistInfo.id,
        name: artistInfo.name,
        genres: artistInfo.genres,
        imageUrl: artistInfo.imageUrl,
        followerCount: artistInfo.followerCount
    }

    try{        

        console.log("gelen artist info : ", artistInfo);

        console.log(userId, "   +++   ", token);


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
        
        const data = await response.text();
    
        if(!response.ok) {
            throw new Error('Network response is not ok');
        }

        const newResp = JSON.parse(data); 

        console.log("like api dönen : ", newResp);

        return newResp;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default LikeArtistApi;
