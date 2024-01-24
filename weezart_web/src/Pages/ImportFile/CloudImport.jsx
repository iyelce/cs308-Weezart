import React, { useState } from 'react';
import CloudApi from '../../API/CloudApi';


const CloudImport = ({ ...props }) => {
  const [url, setUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [table, setTable] = useState('');

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleTableChange = (e) => {
    setTable(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //alert({ url, username, password, table });

    const response = await CloudApi(props.token, props.userId, url, username, password, table);

    console.log("sayfa içinde response cloud: ", response);

  };

  return (
    <div className="song-add-page">
      <form className="single-song-add" onSubmit={handleSubmit} style={{ width: '40%', margin: '0 auto' }}>
        <h2 className="song-add-label">Cloud Import Page</h2>

        <br />

        <label className="single-song-add-label">
          URL:
          <input className="input-text" type="text" value={url} onChange={handleUrlChange} style={{ width: '100%' }} />
        </label>
        <br />
        <label className="single-song-add-label">
          Username:
          <input className="input-text" type="text" value={username} onChange={handleUsernameChange} style={{ width: '100%' }} />
        </label>
        <br />
        <label className="single-song-add-label">
          Password:
          <input className="input-text" type="password" value={password} onChange={handlePasswordChange} style={{ width: '100%' }} />
        </label>
        <br />
        <label className="single-song-add-label">
          Table:
          <input className="input-text" type="text" value={table} onChange={handleTableChange} style={{ width: '100%' }} />
        </label>
        <br />
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CloudImport;
