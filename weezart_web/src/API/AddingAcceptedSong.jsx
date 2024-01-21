async function AddingAcceptedSong (songInfo, token, userId ) {

    const url = `http://localhost:8080/add/manual-song-accepted/${userId}`;  
    const auth = "Bearer " + token;

    let newSong = {
        id : songInfo.id,
        name : songInfo.name,
        albumName : songInfo.albumName,
        albumId : songInfo.albumId,
        artistsName : songInfo.artistsName,
        artistsId : songInfo.artistsId,
        popularity : songInfo.popularity,
        duration_ms :  songInfo.duration_ms  ,
        explicit : songInfo.explicit,
        albumRelease : songInfo.albumRelease,
        albumImageURL : songInfo.albumImageURL
    }    


    try{        

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
            if (response.status === 403) {
                return('Song is already added');
            } else {
                throw new Error('Network response is not ok');
            }
        }

        console.log("api response accepted :", data)

        //SONG_SAVED

        return data;

    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw 'Network response is not ok';
    }
}

export default AddingAcceptedSong;
