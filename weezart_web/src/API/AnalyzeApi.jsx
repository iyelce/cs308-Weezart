async function AnalyzeApi (token, userId  ) {

    const url = `http://localhost:8080/analysis/song/counts/${userId}`;  
    const auth = "Bearer " + token;


  

    try{        
        console.log("url", url);
        console.log("auth", auth);
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

        const artistResponse = [];

        for (let i=0; i<newResp.length; i++) {
            artistResponse.push(newResp[i].artist);
        }
        console.log(artistResponse);
        return artistResponse;
    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default AnalyzeApi;