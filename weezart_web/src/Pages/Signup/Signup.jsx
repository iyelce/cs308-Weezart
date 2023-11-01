import React from "react";
import './Signup.css';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from "react";



const SignUp = () => {

  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleRepeatPassword, setIsVisibleRepeatPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

    return (
      <div className="main">
        <section className="signup">
          <div className="signup-container">
              <div className="title">Sign up</div>

              <div className="signup-content">
                <div className="signup-form">

                  <form className="register-form">

                    <div className="field">
                      <input className="signup-input-box" type="text" required />
                      <label  >Username</label>
                    </div>

                    <div className="field">
                      <input className="signup-input-box" type="text" required />
                      <label className="signup-input-label" >Email Address</label>
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
                        <label className="signup-input-label">Password</label>
                      </div>

                      <button className="eye-button" onClick={()=> setIsVisiblePassword(!isVisiblePassword)}>
                        {isVisiblePassword ? (
                          <AiOutlineEye size='32px' />
                        ) : (
                          <AiOutlineEyeInvisible size='32px' />
                        )}
                      </button>
                    </div>


            <div className="password-input-box">
                  <div className="field">
                    <div style={{ position: 'relative' }}>
                      <input
                        className="signup-input-box"
                        type={isVisibleRepeatPassword ? 'text' : 'password'}
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                      />
                      <span
                        style={{
                          position: 'absolute',
                          right: '8px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                        }}
                      >
                        <button className="eye-button" onClick={()=> setIsVisibleRepeatPassword(!isVisibleRepeatPassword)}>
                          {isVisibleRepeatPassword ? (
                            <AiOutlineEyeInvisible size='32px' />
                          ) : (
                            <AiOutlineEye size='32px' />
                          )}
                        </button>
                      </span>
                    </div>
                    <label className="signup-input-label">Repeat your password</label>
                  </div>
                </div>

                    <div className="field">
                      <button className="register-button">
                        Register
                      </button>
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