async function CreateGroupPlaylist(token, userIds ) {

    const url = `http://localhost:8080/group/post-playlist/30-31-33`;  
    const auth = "Bearer " + token;
    try{        
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
