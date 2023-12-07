// •	Rate Artist →/artist/{userId}/{rating}
// Request: ArtistPayload and PathVariable: String userId and int rating
// {
// "id": "your_id_value",
// "name": "your_name_value",
// "genres": ["genre1", "genre2", "genre3"],
// "imageUrl": "your_image_url_value",
// "followerCount": 1000
// }


async function RateArtistApi(token, userId, artistInfo, rating) {

    const url = `http://localhost:8080/rate/artist/${userId}/${rating}`;  
    const auth = "Bearer " + token;

    let ratedArtist = 
    {
        id: artistInfo.id,
        name: artistInfo.name,
        genres: artistInfo.genres,
        imageUrl: artistInfo.imageUrl,
        followerCount: artistInfo.followerCount
    }

    try{        
        console.log("rate api içine gelen: ", artistInfo)

        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ratedArtist),
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

export default RateArtistApi;