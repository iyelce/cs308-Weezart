import React from "react";
import './Signup.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from "react";



const SignUp = () => {

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleRepeatPassword, setIsVisibleRepeatPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email,setEmail] = useState('');


  function isEmailValid(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  }

  function registerCheck(){

    console.log("--------render--------");

    //check mail format
    if (isEmailValid(email)) {
      console.log("Email is valid");
    } 
    else {
      console.log("Email is not valid");
    }

    //check password and repeat password
    if (password === repeatPassword) {
      console.log("Passwords are same");;
    }
    else {
      console.log("Passwords do not match")
    }

    //check if the username is unique via API

  }

  return (
    <div className="main">

      <section className="signup">

        <div className="signup-container">

          <div className="title">Sign up</div>

          <div className="signup-content">

            <div className="signup-form">

              <form className="register-form">

                <div className="field">
                  <input className="signup-input-box" type="text"  
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    required
                  />
                  <label  >Username</label>
                </div>

                <div className="field">
                  <input className="signup-input-box" type="text" 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                  />
                  <label >Email Address</label>
                </div>

                <div className="password-input-box">
                  <div className="field">
                    <input
                      className="signup-input-box"
                      type={isVisiblePassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="eye-icon-container" onClick={()=> setIsVisiblePassword(!isVisiblePassword)}>
                      {isVisiblePassword ? (<AiOutlineEye size="32px" />) : (<AiOutlineEyeInvisible size="32px" />)}
                    </span>
                    <label >Password</label>
                  </div>
                </div>
            

                <div className="password-input-box">
                  <div className="field">
                      <input
                        className="signup-input-box"
                        type={isVisibleRepeatPassword ? 'text' : 'password'}
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                      />
                      <span className="eye-icon-container" onClick={()=> setIsVisibleRepeatPassword(!isVisibleRepeatPassword)}>
                        {isVisibleRepeatPassword ? (
                          <AiOutlineEye size="32px" />
                        ) : (
                          <AiOutlineEyeInvisible size="32px" />
                        )}
                      </span>
                    <label >Repeat your password</label>
                  </div>
                </div>

                <div className="field">
                  <button className="register-button"
                    onClick={registerCheck()}
                  > Register </button>
                </div>          

              </form>

              <div className="social-login">
                <hr className="horizontal-line" />
                <button type="button" class="google-sign-button" onClick={() => alert('Button clicked!')} >
                  Sign in with Google
                </button>
              </div>

            </div>

            <div className="signup-image">
              <figure>
                <img src='https://i.pinimg.com/736x/7b/cf/3f/7bcf3f3ddebf6526e491a142b7e1ddad.jpg' alt="signup" />
              </figure>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
};
  
  export default SignUp;