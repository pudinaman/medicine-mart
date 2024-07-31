import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from '../firebase';
import './CSS/LoginSignup.css';
import hero2 from '../assets/hero2.png';
import pdf from '../assets/website_terms_and_conditions.pdf'

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    password: "",
    email: ""
  });
  const [otp, setOtp] = useState("");
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const otpChangeHandler = (e) => {
    setOtp(e.target.value);
  };

  const saveUserToBackend = async (firebaseUid) => {
    try {
      const response = await fetch('http://localhost:4000/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firebaseUid }),
      });

      if (!response.ok) {
        throw new Error('Failed to save user to backend');
      }

      const data = await response.json();
      localStorage.setItem('auth-token', data.accessToken);
      localStorage.setItem('userId', data.user_id);

      console.log('User saved to backend successfully');
    } catch (error) {
      console.error('Error saving user to backend:', error);
    }
  };

  const login = async () => {
    console.log("Login Function Executed", formData);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await saveUserToBackend(user.uid);
      window.location.replace('/');
      alert("Logged in successfully");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const signup = async () => {
    console.log("Sign Up function executed", formData);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await sendEmailVerification(user);
      setShowOtpVerification(true);
      
      // Save user to backend
      await saveUserToBackend(user.uid);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const verifyOtp = async () => {
    // Firebase handles OTP verification internally, usually via email link.
    // Ensure user clicks the verification link in their email.
    console.log("OTP Verification placeholder");
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      await saveUserToBackend(user.uid);
      window.location.replace('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('auth-token');
      localStorage.removeItem('userId');
      window.location.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  const openPdf = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className='loginsignup'>
      <div className='left-side'>
        <img src={hero2} alt="Left Side" />
      </div>
      {state === "Login" ? (
        <div className="loginsignup-container">
          <h1>Welcome back 👋</h1>
          <p className='loginsignup-subtitle'>Log in to your account</p>
          <div className="loginsignup-fields">
            <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='What is your e-mail?' />
            <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Enter your password' />
            <div className="loginsignup-remember">
              <input type="checkbox" name='remember' id='remember' />
              <label htmlFor='remember'>Remember me</label>
              <a href='#' className='forgot-password'>Forgot password?</a>
            </div>
          </div>
          <button onClick={login} className='Continue-button'>Continue</button>
          <p className='loginsignup-switch'>Don't have an account? <span onClick={() => setState("Sign Up")}>Sign up</span></p>
        </div>
      ) : state === "Sign Up" ? (
        <div className="loginsignup-container">
          <h1>Let's Get Started 🚀</h1>
          <p className='loginsignup-subtitle'>Sign up your account</p>
          <div className="loginsignup-fields">
            <button className="oauth-button email" onClick={() => setState("SignUpWithEmail")}>Sign Up with Email</button>
            <button className="oauth-button google" onClick={handleGoogleSignIn}>Sign up with Google</button>
            <button className="oauth-button facebook">Sign up with Facebook</button>
            <button className="oauth-button apple">Sign up with Apple</button>
          </div>
          <p className='loginsignup-switch'>Already have an account? <span onClick={() => setState("Login")}>Log in</span></p>
          <p className='loginsignup-terms'>
            By continuing you agree to our <a href={pdf}>Terms & Conditions</a> and <a href='#'>Privacy Policy</a>.
          </p>
        </div>
      ) : state === "SignUpWithEmail" ? (
        <div className="loginsignup-container">
          <h1>Let's Get Started 🚀</h1>
          <p className='loginsignup-subtitle'>Sign up your account</p>
          <div className="loginsignup-fields">
            <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='What is your e-mail?' />
            <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Enter your password' />
            <button onClick={signup} className='continue2-button'>Continue</button>
          </div>
          <p className='loginsignup-terms'>
            By continuing you agree to our <a  onClick={() => openPdf(pdf)}href='#'>Terms & Conditions</a> and <a href='#'>Privacy Policy</a>.
          </p>
          <p className='loginsignup-switch'>Already have an account? <span onClick={() => setState("Login")}>Log in</span></p>
        </div>
      ) : showOtpVerification ? (
        <div className="loginsignup-container">
          <h1>Verify OTP 🔑</h1>
          <p className='loginsignup-subtitle'>Check your email for the OTP</p>
          <div className="loginsignup-fields">
            <input name='otp' value={otp} onChange={otpChangeHandler} type="text" placeholder='Enter OTP' />
            <button onClick={verifyOtp} className='continue2-button'>Verify</button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default LoginSignup;
