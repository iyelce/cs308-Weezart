import React from 'react';

const ExportPage = ({...props}) => {


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
          const data = await response.text();

          let filename = "weezartSongs.json";
            let contentType = "application/json;charset=utf-8;";
            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(data)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
            } else {
            var a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(data));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            }
        }
          
      } catch (error) {
        console.error('Error in fetching data:', error);
      }
    };

  return (
    <div>
      <h1>Export Page</h1>
      <button onClick={handleExport}>Export File</button>
    </div>
  );
};

export default ExportPage;