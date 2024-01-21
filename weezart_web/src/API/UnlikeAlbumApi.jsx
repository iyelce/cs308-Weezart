async function UnlikeAlbumApi(token, userId, albumInfo) {

    const url = `http://localhost:8080/unlike/album/${userId}`;  
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

        console.log("like için yolladığım : ", likedAlbum);

        console.log(userId, "   +++   ", token)


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
        
        const data = await response?.text();
    
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

export default UnlikeAlbumApi;
