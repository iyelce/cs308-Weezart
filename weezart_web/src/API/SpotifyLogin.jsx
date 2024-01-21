// api/spotify/login hiçbi şey almayıp spotify giriş linki döndürüyo buraya götürmeniz lazım kullanıcıyı

async function SpotifyLogin (token) {

    const url = `http://localhost:8080/api/spotify/login`;  
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
        return data;
    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw 'Network response is not ok'
    }
}

export default SpotifyLogin;
