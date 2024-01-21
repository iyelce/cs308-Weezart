// Adding a song manually → GET /manual-song-assisted/{songQuery}/{artistQuery}/{userId}

// PathVariable: song name, artist name, userId

// Response: Song object that will be asked to user if this is the song they want to add. 
//If yes, Adding the accepted song endpoint should be called, 
//if not, frontend should guide the user to the main “song add” page.

// ERROR (in the case of song is already added): Body: String(“SONG_ALREADY_EXISTS”) 





// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpZGlseWVsY2UiLCJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sImV4cCI6MTcwMTcwMjc4OCwiaWF0IjoxNzAxNjk5MTg4fQ.0YEZGLgaHieVPYjrEQIL6dL1L-MIuW4CNJc5YWrQ6ns");

// var raw = JSON.stringify({
//   "id": "",
//   "name": "14 Mayıs 2023",
//   "albumName": "Anakronizmalar",
//   "albumId": "",
//   "albumRelease": "2023-05-15",
//   "artistsName": [
//     "Recep Tayyip Erdoğan",
//     "Kemal Kılıçdaroğlu",
//     "Sinan Oğan"
//   ],
//   "artistsId": [
//     "",
//     "",
//     ""
//   ],
//   "popularity": -1,
//   "duration_ms": 221306,
//   "explicit": true
// });

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   body: raw,
//   redirect: 'follow'
// };

// fetch("http://localhost:8080/add/manual-song-assisted/donence/baris manco/9", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));


async function AddingSongManuallyApi (songQuery, artistQuery, token, userId  ) {

    const url = `http://localhost:8080/add/manual-song-assisted/${songQuery}/${artistQuery}/${userId}`;
    
    const auth = "Bearer " + token;

    try{        

        console.log("casdasdsad");

        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Authorization': auth,
                'Content-Type': 'application/json',
            },
            
            method: 'GET',
            mode: 'cors',
            //credentials: 'include', 
        });
        
        const data = await response.text();
    
        if(!response.ok) {
            if (response.status === 403) {
                return('Song not found');
            } else {
                throw new Error('Network response is not ok');
            }
        }

        const newResp = JSON.parse(data);

        console.log("--> search api response: ", newResp);

        return newResp;

    }
    catch (error) {
        console.error('error in fetching data:', error);
        throw "Network response is not ok";
    }

    
}

export default AddingSongManuallyApi;
