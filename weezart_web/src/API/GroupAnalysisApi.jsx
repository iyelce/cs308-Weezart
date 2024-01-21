// •	Get Playlist for a given group → GET /get-playlist/{userIds} 
// o	PathVariable: String userIds, where userIds is a concatenated string of group members' ids 


async function GroupAnalysisApi  (token, id ) {

    const url = `http://localhost:8080/group/analysis-playlist/${id}`;  
    const auth = "Bearer " + token;

    try{        
        console.log("url: ", url);
        console.log("auth: ", auth);
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

        console.log("--------------> ", newResp);

        return newResp;
    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw "Network response is not ok";
    }
}

export default GroupAnalysisApi ;
