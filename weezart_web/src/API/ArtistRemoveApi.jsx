// •	Artist remove → DELETE /artist/{userId}
// RequestBody: ArtistPayload - PathVariable: String userId
// {
// "id": "your_id_value",
// "name": "your_name_value",
// "genres": ["genre1", "genre2", "genre3"],
// "imageUrl": "your_image_url_value",
// "followerCount": 1000
// }
// Response: none



async function ArtistRemoveApi(token, userId, artistInfo) {

    const url = `http://localhost:8080/remove/artist/${userId}`;  
    const auth = "Bearer " + token;

    let deletedArtist = 
    {
        id: artistInfo.id,
        name: artistInfo.name,
        genres: artistInfo.genres,
        imageUrl: artistInfo.imageUrl,
        followerCount: artistInfo.followerCount
    }

    try{        

        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deletedArtist),
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include', 
        });
        
        const data = await response.text();
    
        if(!response.ok) {
            throw new Error('Network response is not ok');
        }

        return data;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default ArtistRemoveApi;
