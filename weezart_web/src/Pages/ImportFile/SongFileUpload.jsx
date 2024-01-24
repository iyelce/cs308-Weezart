// import React, { useState, useRef } from 'react';
// import ImportSongFromFileApi from '../../API/ImportSongFromFileApi';

// const SongFileUpload = ({...props}) => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();

//     const file = event.dataTransfer.files[0];
//     setSelectedFile(file);
//   };

//   const handleSearchButtonClick = () => {
//     // Trigger file input click
//     fileInputRef.current.click();
//   };

//   const handleUpload = async () => {
//     if (selectedFile) {
//       // Check file type by MIME type or file extension
//       const allowedFileTypes = ['application/json'];
//       const allowedFileExtensions = ['.json'];
  
//       const isFileTypeAllowed = allowedFileTypes.includes(selectedFile.type);
//       const isFileExtensionAllowed = allowedFileExtensions.some(extension =>
//         selectedFile.name.endsWith(extension)
//       );
  
//       if (isFileTypeAllowed || isFileExtensionAllowed) {
//         // File type is allowed, you can proceed with the upload
        
//         const uploadResponse = await ImportSongFromFileApi(props.token, props.userId, selectedFile);


//         // You can also read the file content if needed
        
//         const reader = new FileReader();
//         reader.onload = (e) => {
//           const fileContent = e.target.result;
//           console.log('File content:', fileContent);
//         };
//         reader.readAsText(selectedFile);
//       } else {
//         // File type is not allowed
//         alert('Invalid file type. Please select a valid JSON file.');
//       }
//     } else {
//       console.log('No file selected.');
//     }
//   };
//   return (
//     <div className="song-add-page">
//       <div className="file-upload-container-wrapper">
//         <div
//           className="file-upload-container"
//           onDragOver={handleDragOver}
//           onDrop={handleDrop}
//         >
//           <h1>Upload Your Song File</h1>
//           <p>Drag and drop a file here or click to select one</p>

//           <input
//             type="file"
//             onChange={handleFileChange}
//             ref={fileInputRef}
//             style={{ display: 'none' }}
//           />

//           <button className="submit-button" onClick={handleSearchButtonClick}>
//             Search on this device
//           </button>

//           {selectedFile && (
//             <div>
//               <h2>Selected File:</h2>
//               <p>{selectedFile.name}</p>
//             </div>
//           )}
//         </div>

//         <button className="submit-button" onClick={handleUpload}>
//           Upload
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SongFileUpload;




import React, { useState, useRef } from 'react';
import ImportSongFromFileApi from '../../API/ImportSongFromFileApi';

const SongFileUpload = ({ ...props }) => {

  const [responseLabelText, setResponseLabelText] = useState("");
  const [responseLabelShow, setResponseLabelShow] = useState(false);

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

    setResponseLabelText("");
    setResponseLabelShow(false);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      // Check file type by MIME type or file extension
      const allowedFileTypes = ['application/json'];
      const allowedFileExtensions = ['.json'];

      const isFileTypeAllowed = allowedFileTypes.includes(selectedFile.type);
      const isFileExtensionAllowed = allowedFileExtensions.some((extension) =>
        selectedFile.name.endsWith(extension)
      );

      if (isFileTypeAllowed || isFileExtensionAllowed) {
        // File type is allowed, you can proceed with the upload

        console.log("selected file in page: ", selectedFile);

        // Use the complete file path when sending to the backend
        const uploadResponse = await ImportSongFromFileApi(
          props.token,
          props.userId,
          selectedFile
        );

        if (uploadResponse === "Import successful") {
          setResponseLabelText("Import successful");
          setResponseLabelShow(true);
        }

        else{
          setResponseLabelText("Not successful. Try again.");
          setResponseLabelShow(true);
        }
        
      } else {
        // File type is not allowed
        alert('Invalid file type. Please select a valid JSON file.');
      }
    } else {
      console.log('No file selected.');
    }
  };

  return (
    <div className="song-add-page">
      <form
        className="single-song-add"
        onSubmit={(e) => e.preventDefault()} // Prevent form submission
      >
        <h2 className="song-add-label">Upload Your Song File</h2>

        <br />

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

          <button
            className="submit-button"
            onClick={handleSearchButtonClick}
          >
            Search on this device
          </button>

          {selectedFile && (
            <div>
              <h2>Selected File:</h2>
              <p>{selectedFile.name}</p>
            </div>
          )}
        </div>


        {responseLabelShow && (
        <p className="single-song-add-unique-label" >{responseLabelText}</p>
        )}

        <button className="submit-button" onClick={handleUpload}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default SongFileUpload;

