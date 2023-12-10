async function IsLikedApi (token, userId ,songId ) {

    const url = `http://localhost:8080/like/song/get-like-info/${songId}/${userId}`;  
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
        
        if(data === "false") {
            return false;
        }

        if(data === "true") {
            return true;
        }

        return data;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }


}

export default IsLikedApi;
