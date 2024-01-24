// •	Get All Playlists for a User → GET/get-all-playlists/{id}
// o	PathVariable: String id (the user to display all songs they are in)
// o	Response: List<BigGroupSong> (properties of BigGroupSong explained above)




async function GetAllGroupPlaylists (token, userId ) {

    const url = `http://localhost:8080/group/get-all-playlists/${userId}`;  
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

        console.log("group listlerei-> ", newResp);

        return newResp;
    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw "Network response is not ok";
    }
}

export default GetAllGroupPlaylists;
