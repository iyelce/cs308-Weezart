import GetSpotifyToken from "../../API/GetSpotifyToken";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SpotifyLoginPage = ({ ...props }) => {

  const navigate = useNavigate();
  const [code,setCode] = useState("");
  const [state,setState] = useState("");
  const [message, setmessage] = useState("Connecting...")

    useEffect(() => {
        // Get the current URL
        const currentUrl = window.location.href;
    
        // Extract query parameters
        const urlSearchParams = new URLSearchParams(currentUrl);
    
        // Extract code and state parameters
        let code = '';
        let state = '';
    
        for (const [key, value] of urlSearchParams.entries()) {

            console.log("keyvalur: ", key, " --  ", value )
          if (key === 'state') {
            state = value;
          }
          else{
            code = value;
          }
        }
        code = decodeURIComponent(code);

        setCode(code);
        setState(state);
        console.log('Code:', code);
        console.log('State:', state);
    
        getToken();
      }, [props.userId]);
      
    
    async function getToken() {
      console.log("içine girdiii")
        const response = await GetSpotifyToken(props.token,code, state);

        if( response !== undefined  && response !== null) {
          localStorage.setItem('spotifyToken', response);
          console.log("stored response token: ", localStorage.getItem('spotifyToken')); 
          navigate("/connectSpotify");

        }

        else {
          setmessage("Connection Failed");
        }
        

      }
        
  return (
    <div className="container-add" >
      <div className="friend-add" >
        <p >
          {message}
        </p>
      </div>
    </div>
  );
};



export default SpotifyLoginPage;
