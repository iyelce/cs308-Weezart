async function AnalyzeApi (token, userId ,filter,dateFilter ) {

    const url =(dateFilter=='2023-01-01'?`http://localhost:8080/analysis/${filter}/counts/${userId}`:`http://localhost:8080/analysis/${filter}/constrained-counts/${userId}/${dateFilter}`) ;  
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

        
        return newResp;
    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default AnalyzeApi;
