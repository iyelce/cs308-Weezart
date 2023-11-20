async function LoginApi ( username, password) {
    console.log("login api fonk içinde");

    let element = {username: username, password: password};
    try{

        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            credentials: 'include', // Add this line
            body: JSON.stringify(element)
        });

        
        const data = await response.text();
    
        if(!response.ok) {
            console.log("aaaaaaaaaaaaaaaaaaaaa")
            throw new Error ('network response is not ok')
            
        }
        console.log("data in api:" , data);

        return data;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default LoginApi;
