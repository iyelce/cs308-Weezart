async function SpotifyGetToptracks (token, acsToken ) {

    let acsToken1= "AQDJeM2fAHzUY_9EHNeRRvbgVquCnYXeYjtMF6agHEf8q9JQl8BaazIF30h3OW2aLMBy8KFs446E_2N5Co3Yj3XtHIDjWSWd2TCnx323KeaUm4AXK1uBzv_YdXBPAMOu64IYX1jJ3dSSQ_efbwsoQxlBnca-L2Qde8X9ZySeMt39NU6a5nang_s7IlUdGOwR0AByKCJa2-dRQ2v5Og"

    //const url = `http://localhost:8080/api/spotify/get-users-top-tracks/`;  
    const url = `http://localhost:8080/api/spotify/get-users-top-tracks?token=${acsToken1}`;
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

        console.log("return apiii: ", newResp);

        return newResp;
    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default SpotifyGetToptracks;
