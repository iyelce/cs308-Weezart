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

        if (!response?.ok) {
            //console.log("-->" , response.data);
            return (-1); //username dışında farklı errorler varsa bunu handle etmemiz lazım sonradan (page içinde de kod değişikliği lazım bu durumda)
        }

        const data = await response?.json();

        return data;

    } catch (error) {
        console.error('Error in fetching data:', error);
        throw "Network response is not ok"
        //console.log("err--> " , error.body);
    }
}



    



export default SignUpApi;