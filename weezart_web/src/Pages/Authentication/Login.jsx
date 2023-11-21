// import './authStyle.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import LoginApi from '../../API/LoginApi';


const LOGO = require('../../weezart-removebg-preview.png');
const Login = (props) => {

    const navigate = useNavigate();
  
    //for css proporties
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isFocusedUsername, setIsFocusedUsername] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [errorlabelHiden, setErrorLabelHiden] = useState(true);

    // they came from props now
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    //to catch and print errors
    const [error, setError] = useState(null);
 
    const handleSignupClick = () => {
        // Navigate to the signup page
        navigate('/signup');
      };
    
    const handleRegisterClick = async () => {

      //id gelince response string yerine array olmalı o zaman indexini al
      const response = await LoginApi(username, password);
    
      //unsuccessful login
      if (response === -1) {
          setErrorLabelHiden(false);
      }

      else {
        props.changeUserInfo(username, 1); //userId şu an 1 -> sonradan değiştir
        props.storeToken(response); //id geldikten sonra arrayin indexini al
      }
         
    };
   
 

  return (
    
    <div className="authbody">
      <div className="main">
    <div className="title">Login</div>
    <div className="register-content">
        <div className="register-form">
            <form action="#" className="register-form-body">

                <div className={'field '+(isFocusedUsername?'moved':'')} >
                    <input type="text" 
                    className="register-input-box"
                    onChange={(e)=>setUsername(e.target.value)}
                    onBlur={()=>setIsFocusedUsername(false)}
                    onFocus={()=>setIsFocusedUsername(true)}
                    ></input>
                    <label for="" className={'register-input-label '+(isFocusedUsername||(!isFocusedUsername&&username!=='')?'moved-upside':'')}>Username</label>
                </div>


                <div  className={'field '+(isFocusedPassword?'moved':'')}>
                    <input type={isVisiblePassword ? "text" : "password"}
                    className='register-input-box'
                    onChange={(e)=>setPassword(e.target.value)}
                    onBlur={()=>setIsFocusedPassword(false)}
                    onFocus={()=>setIsFocusedPassword(true)}
                     ></input>
                    <label  className={'register-input-label '+(isFocusedPassword||(!isFocusedPassword&&password!=='')?'moved-upside':'')}>Password</label>
                    <span className="register-see-password" onClick={()=> setIsVisiblePassword(!isVisiblePassword)}>
                        {isVisiblePassword ? (
                          <AiOutlineEye size="32px" />
                        ) : (
                          <AiOutlineEyeInvisible size="32px" />
                        )}
                      </span>
                </div>

                {errorlabelHiden ? null : <p className='login-error-p'>* Invalid username or password.</p>}

                <div className="register-button" onClick={handleRegisterClick} ><a href="#">Login</a></div>
                
            </form>
            <div className="social-registers">

                <button className="register-with-google-btn">Login with Google</button>
            </div>

            <div>
                <p>
                Don't have an account? <span onClick={handleSignupClick} style={{ cursor: 'pointer', color: 'blue' }}>Signup</span>.
                </p>
            </div>

        </div>

        <div className="register-logo">
            <img src={LOGO} alt=""></img>
        </div>
    </div>



</div>
    </div>
        
            
  );
}

export default Login;
