// /remove
// •	Song remove → DELETE /song/{userId}
// RequestBody: SongPayload - PathVariable: String userId
// {
// "id": "your_id_value",
// "name": "your_name_value",
// "albumName": "your_album_name_value",
// "albumId": "your_album_id_value",
// "albumImageURL": "your_album_image_url_value",
// "artistsName": ["artist1_name_value", "artist2_name_value"],
// "artistsId": ["artist1_id_value", "artist2_id_value"],
// "popularity": 80,
// "duration_ms": 240000,
// "explicit": true,
// "albumRelease": "2022-01-01"
// }
// Response: none





async function SongRemoveApi (token, userId ,songInfo ) {

    const url = `http://localhost:8080/remove/song/${userId}`;  
    const auth = "Bearer " + token;

    let deletedSong =     {
        id: songInfo?.id,
        name: songInfo?.name,
        albumName: songInfo?.albumName,
        albumId: songInfo?.albumId,
        albumImageURL: songInfo?.albumImageURL,
        artistsName: songInfo?.artistsName,
        artistsId: songInfo?.artistsId,
        popularity: songInfo?.popularity,
        duration_ms: songInfo?.duration_ms,
        explicit: songInfo?.explicit,
        albumRelease: songInfo?.albumRelease
    }

    try{        

        console.log("apiye girdi");

        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            body: JSON.stringify(deletedSong),
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
        throw "Network response is not ok";
    }
}

export default SongRemoveApi;






