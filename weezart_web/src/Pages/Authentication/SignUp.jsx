import React, { useEffect } from 'react';
import './authStyle.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from "react";
const SignUp = () => {
  
    const [isVisiblePassword, setIsVisiblePassword] = useState(false);
    const [isVisibleRepeatPassword, setIsVisibleRepeatPassword] = useState(false);
    const [isFocusedUsername, setIsFocusedUsername] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedRepeatPassword, setIsFocusedRepeatPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [username, setUsername] = useState('');
    const [email,setEmail] = useState('');
 
    
   
  
    function isEmailValid(email) {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      return emailRegex.test(email);
    }
    // function labelVisibility(){
    //     let whole_inputs=document.querySelectorAll(".field");
    //     whole_inputs.forEach((input)=>{
    //         input.addEventListener("click",()=>{
    //             input.classList.add("moved");
    //             input.children[1].classList.add("moved-upside");
            
    //         });
            
    //     });
    
    // }

    // function labelUnvisibility(){
    //     let dom =window.addEventListener("click",(e)=>{
    //         let whole_inputs=document.querySelectorAll(".field");
    //         whole_inputs.forEach((input)=>{
    //             input.classList.remove("moved");
    //             if(input.children[0].value==""){
    //                 input.children[1].classList.remove("moved-upside");
    //             }

    //           });
    //     })
    // }
   
  
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

export default SignUp;
