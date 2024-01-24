// •	Like Album → POST /album/{userId}
// Request: AlbumPayload and PathVariable: userId
// {
// "id": "your_id_value",
// "name": "your_name_value",
// "imageUrl": "your_image_url_value",
// "releaseDate": "your_release_date_value",
// "numberOfTracks": 10,
// "artistsName": ["artist1_name", "artist2_name"],
// "artistsId": ["artist1_id", "artist2_id"],
// "songsName": ["song1_name", "song2_name"],
// "songsId": ["song1_id", "song2_id"]
// }


async function LikeAlbumApi(token, userId, albumInfo) {

    const url = `http://localhost:8080/like/album/${userId}`;  
    const auth = "Bearer " + token;

    let likedAlbum = 
    {
        id: albumInfo?.id,
        name: albumInfo?.name,
        imageUrl: albumInfo?.imageUrl,
        releaseDate: albumInfo?.releaseDate,
        numberOfTracks: albumInfo?.numberOfTracks,
        artistsName: albumInfo?.artistsName,
        artistsId: albumInfo?.artistsId,
        songsName: albumInfo?.songsName,
        songsId: albumInfo?.songsId
    }

    try{        


        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(likedAlbum),
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

export default LikeAlbumApi;
