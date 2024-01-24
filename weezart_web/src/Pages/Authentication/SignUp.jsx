// import './authStyle.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState} from "react";
import { useNavigate } from 'react-router-dom';
import SignUpApi from '../../API/SignUpApi';

const LOGO = require('../../weezart-removebg-preview.png');

const SignUp = () => {

    const navigate = useNavigate();
  
    //for style
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isVisibleRepeatPassword, setIsVisibleRepeatPassword] = useState(false);
    const [isFocusedUsername, setIsFocusedUsername] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedRepeatPassword, setIsFocusedRepeatPassword] = useState(false);

    //to send backend
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email,setEmail] = useState('');

    //error label
    const [errorlabelHiden, setErrorLabelHiden] = useState(true);
    const[errorMessage, setErrorMessage] = useState("");



 
    
    function isEmailValid(email) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    }
  
  
    function registerCheck(){
  
      //check mail format
      if (!isEmailValid(email)) {
        setErrorLabelHiden(false);
        setErrorMessage("* Invalid email format");
      } 

      //check password and repeat password
      else if (password !== repeatPassword) {
        setErrorLabelHiden(false);
        setErrorMessage("* Passwords do not match");
      }
  
      //check if the username is unique via API
      //bunun yerine -1 dönüyorsa username taken yüzünden diye varsayıp loginFunc içine koyduk

      else{
        loginFunc(); //no problem call login api
      }
  
    }


    const  loginFunc = async () => {

      let newUser = {
          username: username,
          password: password,
          email: email
      }

      console.log(newUser);
      var response = await SignUpApi(newUser);
      
      if(response === -1){
        setErrorLabelHiden(false);
        setErrorMessage("* Username is taken");
      }

      else{
        navigate("/");
      }
  };


  return (
   <div className="authbody">
     <div className="main">
    <div className="title">Sign Up</div>
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

                <div  className={'field '+(isFocusedRepeatPassword?'moved':'')}>
                    <input type={isVisibleRepeatPassword ? "text" : "password"}
                    className='register-input-box'
                    onChange={(e)=>setRepeatPassword(e.target.value)}
                    onBlur={()=>setIsFocusedRepeatPassword(false)}
                    onFocus={()=>setIsFocusedRepeatPassword(true)}
                     ></input>
                    <label  className={'register-input-label '+(isFocusedRepeatPassword||(!isFocusedRepeatPassword&&repeatPassword!=='')?'moved-upside':'')}>Repeat Password</label>
                    <span className="register-see-password" onClick={()=> setIsVisibleRepeatPassword(!isVisibleRepeatPassword)}>
                        {isVisibleRepeatPassword ? (
                          <AiOutlineEye size="32px" />
                        ) : (
                          <AiOutlineEyeInvisible size="32px" />
                        )}
                      </span>
                </div>

                {errorlabelHiden ? null : <p className='login-error-p'>{errorMessage}</p>}

                <div className="register-button" onClick={()=> registerCheck()}><a href="#">Register</a></div>
                
            </form>
            <div className="social-registers">

                <button className="register-with-google-btn">Signup with Google</button>
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

export default SignUp;
