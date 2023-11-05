import React from 'react';
import './template.css';

function Template() {
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
                    <span className="register-see-password"></span>
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
