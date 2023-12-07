import React, { useState } from 'react';

const NewImportFileTry = ({...props}) => {


  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {

    const url = `http://localhost:8080/file/import/${props.userId}`;  
    const auth = "Bearer " + props.token;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(url, {
        headers: {
            accept: 'application/json',
            'Authorization': auth,
            'Content-Type':'multipart/form-data',
        },
        method: 'POST',
        mode: 'cors',
        credentials: 'include', 
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('Error uploading file:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <label>
        User ID:
        <input type="text" value={props.userId} />
      </label>
      <br />
      <label>
        Select File:
        <input type="file" onChange={handleFileChange} />
      </label>
      <br />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default NewImportFileTry;
