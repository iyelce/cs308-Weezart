import React from 'react';
import './style.css';

function Login() {
  return (
   
        
            
                <div className="wrapper">
                    


                    <div className="title">
                    Login Form
                    </div>
                    <div className="container">
                        <div className="login-form">
                            <form action="#">
                                <div className="field">
                                <input type="text" required />
                                <label>Email Address</label>
                                </div>
                                <div className="field">
                                    <input type="password" required />
                                    <label>Password</label>
                                </div>
                                
                               
                                    

                                <div className="container-1">
                                    <div class="btn"><a href="#">Login</a></div>
                                </div>
                                <div className="pass-link">
                                        <a href="#">Forgot password?</a>
                                </div>
                                <div className="signup-link">
                                    Not a member? <a href="#">Signup </a>
                                </div>
                                <div className="sign-up-socials">
                                    <button type="button" class="login-with-google-btn block glow" >
                                    Sign in with Google
                                    </button>
                                </div>
                                
                                
                            </form>
                        </div>
                        <div className="login-logo"><img src="weezart_web/src/Pages/Login/weezart-removebg-preview.png" alt="" /></div>

                    </div>
                
                
            </div>


            

    
  );
}

export default Login;
