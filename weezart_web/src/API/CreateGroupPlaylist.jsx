// •	Create Playlist for given group → POST /post-playlist/{userIds}
// o	PathVariable: String userIds (userIds seperated by “-” )


import ConvertNameToId from "./ConvertNameToId";

async function CreateGroupPlaylist(token, username, userNames ) {

    try {
        userNames.push(username);

        const groupIds = await ConvertNameToId(token, userNames); 

        const sortedGroupIds = groupIds.sort((a, b) => a - b);

        const groupIdsString = sortedGroupIds.join('-');

        const url = `http://localhost:8080/group/post-playlist/${groupIdsString}`;  
        const auth = "Bearer " + token;

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
    
        if (!response.ok) {
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
