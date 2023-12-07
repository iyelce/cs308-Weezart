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


async function LikeSongApi ({...props} ) {

    const url = `http://localhost:8080/add/manual-song-unique/${props.userId}`;  
    const auth = "Bearer " + props.token;

    let newSong = 
    {
        id: "your_id_value",
        name: "your_name_value",
        albumName: "your_album_name_value",
        albumId: "your_album_id_value",
        albumImageURL: "your_album_image_url_value",
        artistsName: ["artist1_name_value", "artist2_name_value"],
        artistsId: ["artist1_id_value", "artist2_id_value"],
        popularity: 80,
        duration_ms: 240000,
        explicit: true,
        albumRelease: "2022-01-01"
    }

    try{        

        console.log("uniwue eklerken yolladığım : ", newSong);


        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSong),
            method: 'POST',
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

export default LikeSongApi;
