async function RateCheckApi (token, userId, songId) {

    const url = `http://localhost:8080/rate/song/get-rate-info/${songId}/${userId}`;  
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
        
        
        if(!response.ok) {
            throw new Error('Network response is not ok');
        }
        const data = await response.json();

        return data;

    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw "Network response is not ok";
    }
}

export default RateCheckApi;


