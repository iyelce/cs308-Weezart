
//jdbc:mysql://hostname:port/database_name

//jdbc:mysql://localhost:3306/weezart_songs

//login name: root
//password: Cnsn161N306
//table: songs


// public ExternalDBPayload(String url, String username, String password, String table) {
//     super();
//     this.url = url;
//     this.username = username;
//     this.password = password;
//     this.table = table;
// }

//token, userId, url, username, password, table

async function CloudApi (token, userId, url, username, password, table) {

    const apiURL = `http://localhost:8080/add-from-db/db/${userId}`;  
    const auth = "Bearer " + token;

    let cloudInfo = 
    {
        url: url,
        username: username,
        password: password,
        table: table
    }

    try{        
    

        const response = await fetch(apiURL, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cloudInfo),
            method: 'POST',
            mode: 'cors',
            credentials: 'include', 
        });
        
        const data = await response.text();
    
        if(!response.ok) {
            throw new Error('Network response is not ok');
        }

        console.log("cloud api dönen : ", data);

        return data;

    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw "Network response is not ok";
    }
}

export default CloudApi;
