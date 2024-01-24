async function RecomReleaseDateApi (token, userId ) {
  
    const url =`http://localhost:8080/recommendation/release-date/${userId}`
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

        const newResp = JSON.parse(data); 
        
        
        if (newResp.length === 0) {
            return "no-song";
        }

        
        return newResp;
    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw "Network response is not ok";
    }
}

export default RecomReleaseDateApi;
