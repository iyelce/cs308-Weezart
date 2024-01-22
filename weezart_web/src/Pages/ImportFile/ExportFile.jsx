import React from 'react';
import { useState } from 'react';

const ExportPage = ({...props}) => {

//api is here
  const handleExport = async () => {
    const url = `http://localhost:8080/file/export/${props.userId}`;  
    const auth = "Bearer " + props.token;

    try {
        const response = await fetch(url, {
          headers: {
            accept: 'application/json',
            'Authorization': auth,
            'Content-Type': 'application/json'
          },
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
        });
    
        if (response.ok) {
        
            console.log("response itself: ",response)
          const data = await response.text();

          console.log("value -> text hali : ", data)

          let filename = "weezartSongs.json";
            let contentType = "application/json;charset=utf-8;";
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([decodeURIComponent(encodeURI(data))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
            } else {
            var a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(data);
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            }
        }

        else {
            setShowerrorLabel(true);
        }
          
      } catch (error) {
        console.error('Error in fetching data:', error);
      }
    };


    const [showErrorLabel, setShowerrorLabel] = useState(false);

      // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="song-add-page" height="100%">

        <form className="single-song-add" onSubmit={handleSubmit}>

            <p className="song-add-label"> Click to Export Your Song List </p>

            <button className="export-button" onClick={handleExport} data-testid="buttons">Export File</button>

            <p style={{ display: showErrorLabel ? 'block' : 'none' }} className="single-song-add-unique-label">
                Something went wrong. Try again.
            </p>

        </form>


    </div>
  );
};

export default ExportPage;