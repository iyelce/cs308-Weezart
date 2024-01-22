// User Controller → /user
// User Profile → GET /profile/{userId}

// RequestParam: string userId

// Response: User object


async function UserPublicDataApi (token, userId ,filter) {

    const url = `http://localhost:8080/user/${filter}/${userId}`;  
    const auth = "Bearer " + token;

    try{        

        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            method: 'POST',
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
        throw "Network response is not ok";
    }
}

export default UserPublicDataApi;
