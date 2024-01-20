import SpotifyLogin from "../../API/SpotifyLogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const ConnectSpotify = ({ ...props }) => {

    const navigate = useNavigate();
    const[shouldDisplayButtonConnect, setshouldDisplayButtonConnect]= useState(true);

    useEffect(() => {
        setshouldDisplayButtonConnect(true);
        if(localStorage.getItem('spotifyToken') !== undefined && localStorage.getItem('spotifyToken') !== null) {
            setshouldDisplayButtonConnect(false)
        }
      }, []);
      


    async function connectSpotifyClicked() {
        // Open the Spotify authorization link in the same tab
        const response = await SpotifyLogin(props.token);
        console.log("burdaaaaa response: ", response);
      
        // If the response is a valid URL
        if (response) {
          // Navigate to the Spotify authorization link in the same tab
          window.location.href = response;
      
          // You can still use the same interval logic if needed
          const checkWindowClosed = setInterval(() => {
            // In this case, there is no separate window to check for closure
            // You might want to check for certain conditions if necessary
      
            // For example, if you want to check if the URL has changed
            if (window.location.href !== response) {
              clearInterval(checkWindowClosed);
      
              // Get the authorization code from the new URL
              const urlParams = new URLSearchParams(window.location.search);
              const authCode = urlParams.get("code");
              console.log("auth code is:", authCode);
            }
          }, 1000);
        }
      }
      
          function getSongs() {
            // Open the Spotify authorization link in a new tab
            navigate("/spotify-top-tracks");
          }

          function getRecom() {
            // Open the Spotify authorization link in a new tab
            navigate("/spotify-recom-tracks");
          }

          



  return (
    <div className="container-add" style={styles.container}>
      <div className="friend-add" style={styles.friendAdd}>
        <p style={styles.connectText}>
          Connect your Spotify for personalized song recommendations!
        </p>
        
        <button className="add-friend-button" onClick={connectSpotifyClicked} hidden = {!shouldDisplayButtonConnect}>
          Connect Spotify
        </button>
      

        <button className="add-friend-button" onClick={getSongs} hidden = {shouldDisplayButtonConnect}>
          Spotify Top Tracks
        </button>

        <button className="add-friend-button" onClick={getRecom} hidden = {shouldDisplayButtonConnect}>
            Spotify Recommendations
        </button>


      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  friendAdd: {
    textAlign: "center",
  },
  connectText: {
    fontFamily: "Poppins",
    fontSize: "18px", // You can adjust the font size as needed
    color: "#B9B4C7",
    marginBottom: "10px", // Adjust the margin to your preference
  },
};

export default ConnectSpotify;
