async function SpotifyRecom (token, acsToken ) {

    const url = `http://localhost:8080/api/spotify/top-track-based-recommendations?token=${acsToken}`;
    const auth = "Bearer " + token;

    try{        

        console.log("gelen tokenn: ", acsToken);
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

        console.log("return apiii: ", newResp);

        return newResp;
    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw 'Network response is not ok'
    }
}

export default SpotifyRecom;
