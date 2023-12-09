async function AnalyzeTableApi (token, userId ,filter ) {

    const result=[];
    const urls=[`http://localhost:8080/analysis/${filter}/daily-added/29`,`http://localhost:8080/analysis/${filter}/daily-liked/29`,`http://localhost:8080/analysis/${filter}/daily-rating/29`];
    const auth = "Bearer " + token;



  

    try{        
        let cnt=0;
        while(cnt<3){
            const response = await fetch(urls[cnt], {
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
    
            result[cnt]=newResp;
            cnt++;
        }
    }
    catch (error) {
        console.error('error in fetching data:', error);
    }

   
    



    return result;
}


export default AnalyzeTableApi;
