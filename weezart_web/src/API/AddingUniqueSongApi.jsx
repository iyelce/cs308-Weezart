async function AddingUniqueSongApi ({...props} ) {

    const url = `http://localhost:8080/add/manual-song-unique/${props.userId}`;  
    const auth = "Bearer " + props.token;

    let newSong = {
        id : "",
        name : props.name,
        albumName : props.albumName,
        albumId : "",
        artistsName : props.artistsName,
        artistsId : [],
        popularity : -1,
        duration_ms :  (props.minutes * 60000) + (props.seconds * 1000)   ,
        explicit : props.explicit,
        albumRelease : props.albumRelease 
    }

    try{        

        console.log("uniwue eklerken yolladığım : ", newSong);

        console.log (props.minutes ,"--",props.seconds)


        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newSong),
            method: 'POST',
            mode: 'cors',
            credentials: 'include', 
        });
        
        const data = await response.text();
    
        if(!response.ok) {
            return -1;
            throw new Error('Network response is not ok');
        }

        if(data !== null || data !== "") {
            //did not do any check here
            //assume backend returns the correct message

            return 1;
        }

        return -1;

    }
    catch (error) {
        console.error('error in fetching data:', error);
    }
}

export default AddingUniqueSongApi;