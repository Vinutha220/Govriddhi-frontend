import React, { useRef } from 'react';
import './Signin.css';
// import cow from '/images/cow1.png'

export default function Signin() {
    // Create a reference to the container div
    const containerRef = useRef(null);

    // Function to add the right-panel-active class
    const handleSignUpClick = () => {
        if (containerRef.current) {
            containerRef.current.classList.add("right-panel-active");
        }
    };

    // Function to remove the right-panel-active class
    const handleSignInClick = () => {
        if (containerRef.current) {
            containerRef.current.classList.remove("right-panel-active");
        }
    };

    return (
        <>
            <h2>"Supporting Goshalas, Enriching Traditions"</h2>
            <div className="container" id="container" ref={containerRef}>
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <img src="/images/cow2.png" width="150" height="150"clasaName="social"/>
                        </div>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <img src="/images/cow1.png" width="200" clasaName="social"/>

                        </div>
                        
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#">Forgot your password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Govriddhi</h1>
                            <p>To keep connected with us, please log in with your personal info</p>
                            <button className="ghost" onClick={handleSignInClick}>Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                    <h1>Govriddhi</h1>
                            <h3>Enter your personal details to adopt</h3>
                            <button className="ghost" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>

            
        </>
    );
}
