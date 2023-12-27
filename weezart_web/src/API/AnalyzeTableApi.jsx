async function AnalyzeTableApi (token, userId ,filter ) {

    const result=[];
    const urls=[`http://localhost:8080/analysis/${filter}/top-5/${userId}`,
                `http://localhost:8080/analysis/${filter}/last-5/${userId}`,
                `http://localhost:8080/analysis/${filter}/genre/pop/${userId}`,
                `http://localhost:8080/analysis/${filter}/release-date/2010/2020/${userId}`];
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
                credentials: 'include'
            });
            
            const data = await response.text();
        
            if(!response.ok) {
                throw new Error('Network response is not ok');
            }
    
            const newResp = JSON.parse(data); 
            console.log("asdkfasdjkjaskdbajkd filter ",filter);
    
            result[cnt]=newResp;
            cnt++;
        }

        const response = await fetch(urls[3], {
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
            result[3]=newResp;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }

    return result;
}


export default AnalyzeTableApi;
