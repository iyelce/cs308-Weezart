// File Controller → /file
// •	Import songs from file → POST /import/{userId}
// RequestParam("file"): MultipartFile file (any file which contains JSON in it) and PathVariable: String userId
// // please check how to send a file to backend
// Response: “Import successful” message as string. 
//Even if all the songs in the file already exist in the user’s list, it still says successful, 
//but does not add duplicates to the database.


async function ImportSongFromFileApi(token, userId, selectedFile ) {

    const url = `http://localhost:8080/file/import/${userId}`;  
    const auth = "Bearer " + token;

    //---------------------

    var formdata = new FormData();
    //formdata.append("file", selectedFile.files[0], completeFilePath );
    //formdata.append("file", selectedFile.files[0] );
    formdata.append("file", selectedFile );

    try{      

                  



        // const response = await fetch(url, {
        //     headers: {
        //         accept: 'application/json',
        //         'Authorization': auth,
        //         //'Content-Type': 'application/json'
        //         'Content-Type':'multipart/form-data'
        //     },
        //     body: JSON.stringify(file),
        //     method: 'POST',
        //     mode: 'cors',
        //     credentials: 'include', 
        // });
        
        // const data = await response.text();
    
        // if(!response.ok) {
        //     throw new Error('Network response is not ok');
        // }

        // const newResp = JSON.parse(data); 

        // console.log("like api dönen : ", newResp);

        // return newResp;

        //----------------------------
        

        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                //'Content-Type':'multipart/form-data'
            },
            body: formdata,
            method: 'POST',
            mode: 'cors',
            credentials: 'include', 
        });
        
        const data = await response.text();
    
        if(!response.ok) {
            throw new Error('Network response is not ok');
        }

        console.log("like api dönen : ", data);

        return data;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default ImportSongFromFileApi;
