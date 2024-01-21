async function LoginApi ( username, password) {

    let element = {username: username, password: password}; //formats input to api
    
    try{

        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: 'include', 
            body: JSON.stringify(element)
        });

        
        const data = await response.text();
    
        if(!response.ok) {
            return (-1)
            //throw new Error ('network response is not ok')
        }

        const newResp = JSON.parse(data); //to parse it into json so that we can do .token and .userId

        return newResp;

    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw "Network response is not ok"
    }
}

export default LoginApi;
