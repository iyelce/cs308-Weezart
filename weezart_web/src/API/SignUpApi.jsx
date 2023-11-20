async function SignUpApi ( SignUpData) {
    console.log("signup api fonk işçinde");
    try {
        const response = await fetch('http://localhost:8080/auth/register', {
            headers: {
                accept: '*/*',
                'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors', 
            body: JSON.stringify(SignUpData),
        });

        if (!response.ok) {
            throw new Error('Network response is not ok');
        }

        const data = await response.json();
        console.log("response in api: ", data);
        return data;
    } catch (error) {
        console.error('Error in fetching data:', error);
    }
}



    



export default SignUpApi;