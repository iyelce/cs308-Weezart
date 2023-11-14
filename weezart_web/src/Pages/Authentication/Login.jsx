// import './authStyle.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const LOGO = require('../../weezart-removebg-preview.png');
const Login = () => {

    const navigate = useNavigate();
  
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isFocusedUsername, setIsFocusedUsername] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email,setEmail] = useState('');
 
    const handleSignupClick = () => {
        // Navigate to the signup page
        navigate('/signup');
      };
    
    const handleRegisterClick = () => {
        // Navigate to the home page
        navigate('/');
      };
   
  
    function isEmailValid(email) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    }
  
    

  return (
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
                <div  className={'field '+(isFocusedEmail?'moved':'')}>
                    <input type="text" 
                    className='register-input-box'
                    onChange={(e)=>setEmail(e.target.value)}
                    onBlur={()=>setIsFocusedEmail(false)}
                    onFocus={()=>setIsFocusedEmail(true)}
                ></input>
                    <label className={'register-input-label '+(isFocusedEmail||(!isFocusedEmail&&email!=='')?'moved-upside':'')}>Email Adress</label>
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

                <div className="register-button" onClick={handleRegisterClick} ><a href="">Register</a></div>
                
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
        
            
  );
}

export default Login;
