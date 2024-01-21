async function AnalyzeTableTop5Api (token, userId ,filter ) {

    const result=[];
    const url=`http://localhost:8080/analysis/${filter}/top-5/${userId}`;
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

   
    



    return result;
}


export default AnalyzeTableTop5Api;
