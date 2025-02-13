import React from "react";

export const Header = () => {
  return (
    <header id="header">
      <div className="intro">
        <div className="overlay">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-2 intro-text">
                <h1>
                  Their second innings starts with you
                  <span></span>
                </h1>
                <p>Open your heart and give yourself a chance to feel a hurricane of emotions with this four-pawed friend. </p>
                <a
                  href="/signin"
                  className="btn btn-custom btn-lg"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
