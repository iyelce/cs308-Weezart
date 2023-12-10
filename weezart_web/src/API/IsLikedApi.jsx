async function IsLikedApi (token, userId ,songId ) {

    const url = `http://localhost:8080/song/get-like-info/${songId}/${userId}`;  
    const auth = "Bearer " + token;

    try{        

        console.log("------------song id: ", songId);
        console.log("------------user id: ", userId);

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
        console.log("like api: ", data, " - ", typeof(data))
    
    
        if(!response.ok) {
            throw new Error('Network response is not ok');
        }

        if (data === "true") {
            return true;
        }

        else if(data ==="false") {
            return false;
        }

        return data;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default IsLikedApi;
