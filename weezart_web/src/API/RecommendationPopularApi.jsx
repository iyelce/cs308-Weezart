async function RecommendationPopularApi (token ) {
  
    const url =`http://localhost:8080/recommendation/popular`
    const auth = "Bearer " + token;


  

    try{        
        console.log("url RECOMMENDATION", url);
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

        
        return newResp;
    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default RecommendationPopularApi;
