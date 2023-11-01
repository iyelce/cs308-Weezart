import React from "react";
import './Signup.css';

const SignUp = () => {
    return (
      <div className="main">

{/* deneme */}
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

          <div className="field">
            <input className="signup-input-box" type="password" required />
            <label className="signup-input-label" >Password</label>
          </div>

          <div className="field">
            <input className="signup-input-box" type="password" required />
            <label className="signup-input-label">Repeat your password</label>
          </div>

          
          <div className="field">
            <button className="register-button">
              Register
            </button>
          </div>

          

        </form>
        <div className="login-link"> Already a member? 
            <a href="#">  Login now</a>
          </div>

          

        <div className="social-login">
                  <span className="social-label">Or log in with</span>
                  <ul className="socials">
                    <li><a href="#"><i className="display-flex-center zmdi zmdi-facebook"></i></a></li>
                    <li><a href="#"><i className="display-flex-center zmdi zmdi-twitter"></i></a></li>
                    <li><a href="#"><i className="display-flex-center zmdi zmdi-google"></i></a></li>
                  </ul>
                </div>

      </div>

      <div className="signup-image">
        <figure>
          <img src="weezart_web\public\Images\WizardWithGuitar.png" alt="signup" />
        </figure>
      </div>
    </div>
  </div>
</section>





        {/* Sign-in form */}
        <section className="signup">
          <div className="signup-container">
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