// •	Delete Playlist for a given user and group → DELETE/delete-playlist/{userIds}/{deletedId}
// o	PathVariables: String userIds and String deletedId (the user that wants to remove themselves from a given group)


async function DeleteBlend(token, userIds, deletedId ) {

    const url = `http://localhost:8080/group/delete-playlist/${userIds}/${deletedId}`;
    const auth = "Bearer " + token;

    try{        

        console.log("idler: ",userIds,"     enim id:",deletedId )
        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include', 
        });
        
        const data = await response.text();
    
        if(!response.ok) {
            throw new Error('Network response is not ok');
        }
        console.log("data in api: ", data)

        return data;
    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw "Network response is not ok";
    }
}

export default DeleteBlend;
