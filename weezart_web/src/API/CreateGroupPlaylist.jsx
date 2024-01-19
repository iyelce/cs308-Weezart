// •	Create Playlist for given group → POST /post-playlist/{userIds}
// o	PathVariable: String userIds (userIds seperated by “-” )


async function CreateGroupPlaylist(token, userIds ) {

    //eski token gelmeye devam ediyor

    const groupIds= "30-31-33"

    const url = `http://localhost:8080/group/post-playlist/${groupIds}`;  
    const auth = "Bearer " + token;
    try{        

        console.log("cerateiçinde auth: ", auth);
        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            credentials: 'include', 
        });
        
        const data = await response.text();
    
        if(!response.ok) {
            throw new Error('Network response is not ok');
        }

        const newResp = JSON.parse(data); 

        console.log("create api dönen : ", newResp);

        return newResp;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default CreateGroupPlaylist;
