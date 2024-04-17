import React from "react";
import "./About.css";
const About = () => {
  const currentYear = new Date().getFullYear();
  return (
    <section className="container about-container">
      <div className="about-wrapper">
        <div className="about-header-wrapper">
          <img src="/logo.png" alt="LOGO" />
        </div>
        <div className="about-content-wrapper">
          <p>
          TRAILBLAZER was crafted by <b>Sean Waller</b> as a university project. This innovative music app is built with React.js and integrates the YouTube API to elevate its features and user experience.
          </p>
        </div>

        <div className="about-footer">
          <small>
            Copyright © 2023-{currentYear} TRAILBLAZER. All Rights Reserved.
          </small>
        
        </div>
      </div>
    </section>
  );
};

export default About;
