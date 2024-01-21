// /like

// Like Song → POST /song/{userId}

// Request: SongPayload and PathVariable: userId
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


async function LikeSongApi(token, userId, songInfo) {

    const url = `http://localhost:8080/like/song/${userId}`;  
    const auth = "Bearer " + token;

    let likedSong = 
    {
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


        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(likedSong),
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

export default LikeSongApi;
