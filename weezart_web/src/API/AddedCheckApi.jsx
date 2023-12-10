async function AddedCheckApi (token, userId ) {

    const url = `http://localhost:8080/add/get-added-info/${userId}`;  
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

        console.log("is added api içinde return: ", data);

        return data;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default AddedCheckApi;
