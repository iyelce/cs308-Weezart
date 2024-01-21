async function AnalyzeApi (token, userId ,filter,dateFilter ) {

    const url =(dateFilter=='2023-01-01'?`http://localhost:8080/analysis/${filter}/counts/${userId}`:`http://localhost:8080/analysis/${filter}/constrained-counts/${userId}/${dateFilter}`) ;  
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
        console.log(newResp);

        
        return newResp;
    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw "Network response is not ok";
    }
}

export default AnalyzeApi;
