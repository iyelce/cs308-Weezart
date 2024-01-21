async function UnlikeArtistApi(token, userId, artistInfo) {

    const url = `http://localhost:8080/unlike/artist/${userId}`;  
    const auth = "Bearer " + token;

    let likedArtist = 
    {
        id: artistInfo?.id,
        name: artistInfo?.name,
        genres: artistInfo?.genres,
        imageUrl: artistInfo?.imageUrl,
        followerCount: artistInfo?.followerCount
    }

    try{        

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
        throw "Network response is not ok";
    }
}

export default UnlikeArtistApi;