// •	Album remove → DELETE /album/{userId}
// RequestBody: AlbumPayload - PathVariable: String userId
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
// Response: none


async function AlbumRemoveaApi(token, userId, albumInfo) {

    const url = `http://localhost:8080/remove/album/${userId}`;  
    const auth = "Bearer " + token;

    let deletedAlbum = 
    {
        id: albumInfo.id,
        name: albumInfo.name,
        imageUrl: albumInfo.imageUrl,
        releaseDate: albumInfo.releaseDate,
        numberOfTracks: albumInfo.numberOfTracks,
        artistsName: albumInfo.artistsName,
        artistsId: albumInfo.artistsId,
        songsName: albumInfo.songsName,
        songsId: albumInfo.songsId
    }

    try{      

        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(deletedAlbum),
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

export default AlbumRemoveaApi;
