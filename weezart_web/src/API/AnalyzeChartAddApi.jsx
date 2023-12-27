async function AnalyzeChartAddApi (token, userId ,filter ) {

    const url=`http://localhost:8080/analysis/${filter}/daily-added/${userId}`;
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
    
            return newResp;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }

   
    



}

export default AnalyzeChartAddApi;
