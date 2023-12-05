// User Controller → /user
// User Profile → GET /profile/{userId}

// RequestParam: string userId

// Response: User object


async function UserProfileApi ({...props} ) {

    const url = `http://localhost:8080/user/profile/${props.userId}`;  
    const auth = "Bearer " + props.token;

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

        console.log("api response accepted :", data)

        const newResp = JSON.parse(data); 

        console.log("--> user in api : ", newResp);

        return newResp;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default UserProfileApi;
