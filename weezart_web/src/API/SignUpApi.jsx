async function SignUpApi ( SignUpData) {
    
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
            return (-1); //username dışında farklı errorler varsa bunu handle etmemiz lazım sonradan (page içinde de kod değişikliği lazım bu durumda)
            throw new Error('Network response is not ok');
        }

        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error in fetching data:', error);
    }
}



    



export default SignUpApi;