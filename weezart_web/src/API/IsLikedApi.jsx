async function IsLikedApi (token, userId ,songId ) {

    const url = `http://localhost:8080/song/get-like-info/${songId}/${userId}`;  
    const auth = "Bearer " + token;

    try{        

        console.log("song Id in api -> ", songId);
        console.log("user Id in api -> ", userId);

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

        console.log("is added api içinde return: ", data);

        return data;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default IsLikedApi;
