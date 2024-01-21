async function RecommendationFriendApi (token, userId ) {
  
    const url =`http://localhost:8080/recommendation/friend/${userId}`
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
        console.log("friend api içinde --> ", data, " - ", typeof(data));
    
        if(!response.ok) {
            throw new Error('Network response is not ok');
        }

        if (data === "") {
            return "no-song";
        }

    
        const newResp = JSON.parse(data); 

        return newResp;
    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw "Network response is not ok";
    }
}

export default RecommendationFriendApi;
