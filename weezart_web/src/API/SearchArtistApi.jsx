async function SearchArtistApi (token, songName) {

    const url = `http://localhost:8080/api/spotify/search-artist?query=${songName}`;  
    const auth = "Bearer " + token;

    try{        

        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors',
            credentials: 'include', 
        });
        
        const data = await response.text();
    
        if(!response.ok) {
            throw new Error('Network response is not ok');
        }

        const newResp = JSON.parse(data); 

        console.log("song search return api:  ", newResp);
        
        return newResp;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }


}

export default SearchArtistApi;
