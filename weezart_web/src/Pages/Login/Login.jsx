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
                    <div className="content">
                        <div className="checkbox">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <div className="pass-link">
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>
                    <div className="field">
                        <input type="submit" value="Login" />
                    </div>
                    <div className="signup-link">
                        Not a member? <a href="#">Signup now</a>
                    </div>
                </form>
            </div>
            <div className="login-logo"><img src="https://fastly.picsum.photos/id/637/200/300.jpg?hmac=_aCsxiL_H35K1JVhdKAxp9akei2mXbQ7N5N2zfAtCiE" alt="" /></div>
        </div>
    
    
    </div>
    
  );
}

export default Login;
