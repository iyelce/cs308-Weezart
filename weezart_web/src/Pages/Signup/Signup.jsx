import React from "react";
import './Signup.css';

const SignUp = () => {
    return (
      <div className="main">
        {/* Sign-up form */}
        <section className="signup">
          <div className="container">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title">Sign up</h2>
                <form method="POST" className="register-form" id="register-form">
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input type="text" name="name" id="name" placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email"></i>
                    </label>
                    <input type="email" name="email" id="email" placeholder="Your Email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass">
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <input type="password" name="pass" id="pass" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="re-pass">
                      <i className="zmdi zmdi-lock-outline"></i>
                    </label>
                    <input type="password" name="re_pass" id="re_pass" placeholder="Repeat your password" />
                  </div>
                  <div className="form-group">
                    <input type="checkbox" name="agree-term" id="agree-term" className="agree-term" />
                    <label htmlFor="agree-term" className="label-agree-term">
                      <span><span></span></span>I agree to all statements in <a href="#" className="term-service">Terms of service</a>
                    </label>
                  </div>
                  <div className="form-group form-button">
                    <input type="submit" name="signup" id="signup" className="form-submit" value="Register" />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure><img src="/public/Images/WizardWithGuitar.png" alt="signup" /></figure>
                <a href="#" className="signup-image-link">I am already a member</a>
              </div>
            </div>
          </div>
        </section>
  
        {/* Sign-in form */}
        <section className="sign-in">
          <div className="container">
            <div className="signin-content">
              <div className="signin-image">
                <figure><img src="images/signin-image.jpg" alt="sign up image" /></figure>
                <a href="#" className="signup-image-link">Create an account</a>
              </div>
              <div className="signin-form">
                <h2 className="form-title">Sign in</h2>
                <form method="POST" className="register-form" id="login-form">
                  <div className="form-group">
                    <label htmlFor="your_name">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input type="text" name="your_name" id="your_name" placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="your_pass">
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <input type="password" name="your_pass" id="your_pass" placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <input type="checkbox" name="remember-me" id="remember-me" className="agree-term" />
                    <label htmlFor="remember-me" className="label-agree-term">
                      <span><span></span></span>Remember me
                    </label>
                  </div>
                  <div className="form-group form-button">
                    <input type="submit" name="signin" id="signin" className="form-submit" value="Log in" />
                  </div>
                </form>
                <div className="social-login">
                  <span className="social-label">Or log in with</span>
                  <ul className="socials">
                    <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                    <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                    <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };
  
  export default SignUp;