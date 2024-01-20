async function ConvertNameToId ( token, nameList) {

    const url = `http://localhost:8080/user/convert-name-to-id`;
    
    const auth = "Bearer " + token;

    try{        

        console.log("convert içinde name list: ", nameList);

        
        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nameList),
            method: 'POST',
            mode: 'cors',
            credentials: 'include', 
        });
        
        const data = await response.text();
    
        if(!response.ok) {
             throw new Error('Network response is not ok');
        }

        const newResp = JSON.parse(data);

        console.log("--> convert api response: ", newResp);

        return newResp;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default ConvertNameToId;
