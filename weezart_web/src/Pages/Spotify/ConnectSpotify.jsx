import SpotifyLogin from "../../API/SpotifyLogin";
import SpotifyGetToptracks from "../../API/SpotifyGetToptracks";


const ConnectSpotify = ({ ...props }) => {


          
        async function connectSpotifyClicked() {
            // Open the Spotify authorization link in a new tab
            const response = await SpotifyLogin(props.token);
            console.log("burdaaaaa response: ", response);
        
            // If the response is a valid URL
            if (response) {
              const spotifyAuthWindow = window.open(response, "_blank");
        
              // Polling interval to check if the Spotify auth window has closed
              const checkWindowClosed = setInterval(() => {
                if (spotifyAuthWindow.closed) {
                  clearInterval(checkWindowClosed);
        
                  // Get the authorization code from the URL
                  const urlParams = new URLSearchParams(window.location.search);
                  const authCode = urlParams.get("code");
                  console.log("auth code is:", urlParams);
        
                  // Make API call to your backend with the authorization code
                //   if (authCode) {
                //     // Replace the placeholder API call with your actual API call
                //     fetch(`YOUR_BACKEND_API_ENDPOINT?code=${authCode}`, {
                //       method: "POST",
                //       headers: {
                //         "Content-Type": "application/json",
                //       },
                //       // Add any necessary body or additional headers
                //     })
                //       .then((response) => response.json())
                //       .then((data) => console.log("API Response:", data))
                //       .catch((error) => console.error("API Error:", error));
                //   }
                }
              }, 1000); // Adjust the polling interval as needed
            }
          }

          async function getSongs() {
            // Open the Spotify authorization link in a new tab
            const response = await SpotifyGetToptracks(props.token, "asf");
            console.log("burdaaaaa response track: ", response);
        
           
          }


  return (
    <div className="container-add" style={styles.container}>
      <div className="friend-add" style={styles.friendAdd}>
        <p style={styles.connectText}>
          Connect your Spotify for personalized song recommendations!
        </p>
        <button className="add-friend-button" onClick={connectSpotifyClicked}>
          Connect Spotify
        </button>

        <button className="add-friend-button" onClick={getSongs}>
          Song Spotify
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
