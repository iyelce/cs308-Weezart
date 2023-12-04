import React, { useState } from 'react';
import { useRef } from 'react';

const SongFileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);
  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
    };
  
    const handleDragOver = (event) => {
      event.preventDefault();
    };
  
    const handleDrop = (event) => {
      event.preventDefault();
  
      const file = event.dataTransfer.files[0];
      setSelectedFile(file);
    };
  
    const handleSearchButtonClick = () => {
      // Trigger file input click
      fileInputRef.current.click();
    };
  
    const handleUpload = () => {
      // You can implement your file upload logic here
      if (selectedFile) {
        // Perform actions with the selected file, e.g., send it to a server
        console.log('Uploading file:', selectedFile);
      } else {
        console.log('No file selected.');
      }
    };
  
    return (
        <div className="song-add-page">

      <div className="file-upload-container-wrapper">
        <div
          className="file-upload-container"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <h1>Upload Your Song File</h1>
          <p>Drag and drop a file here or click to select one</p>
  
          <input
            type="file"
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
          />
  
          
            <button className="submit-button" onClick={handleSearchButtonClick}>Search on this device</button>
            
          
  
          {selectedFile && (
            <div>
              <h2>Selected File:</h2>
              <p>{selectedFile.name}</p>
            </div>
          )}
        </div>

        <button className="submit-button" onClick={handleUpload}>Upload</button>
      </div>

      </div>
    );
  };

export default SongFileUpload;
