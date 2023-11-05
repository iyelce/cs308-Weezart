import React from 'react';
import './template.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from "react";
const Template = () => {

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
    <div className="title">Sign Up</div>
    <div className="register-content">
        <div className="register-form">
            <form action="#" className="register-form-body">
                <div className="field">
                    <input type="text" className="register-input-box"></input>
                    <label for="" className="register-input-label">Username</label>
                </div>
                <div className="field">
                    <input type="text" className="register-input-box"></input>
                    <label className="register-input-label">Email Adress</label>
                </div>
                <div className="field">
                    <input type="text" className="register-input-box"></input>
                    <span className="register-see-password" onClick={()=> setIsVisibleRepeatPassword(!isVisibleRepeatPassword)}>
                        {isVisibleRepeatPassword ? (
                          <AiOutlineEye size="32px" />
                        ) : (
                          <AiOutlineEyeInvisible size="32px" />
                        )}
                      </span>
                    <label  className="register-input-label">Password</label>
                </div>
                <div className="register-button"><a href="">Register</a></div>
                
            </form>
            <div className="social-registers">

                <button className="register-with-google-btn">Sign In with Google</button>
            </div>

        </div>

        <div className="register-logo">
            <img src="https://fastly.picsum.photos/id/781/200/300.jpg?hmac=BPGlXlV8K6X2z4SJCt86Qh1io6ezZBBdynv-QiXwLro" alt=""></img>
        </div>
    </div>



</div>
        
            
  );
}

export default Template;
