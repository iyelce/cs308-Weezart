async function AnalyzeTableGenreApi (token, userId ,filter ) {

    const url=`http://localhost:8080/analysis/${filter}/genre/pop/${userId}`;
    const auth = "Bearer " + token;

    try{        
        let cnt=0;
        const response = await fetch(url, {
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
    console.log(newResp);
    
    return newResp;

    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw "Network response is not ok";
    }

   
    



   
}


export default AnalyzeTableGenreApi;
