import React from 'react';
import { motion } from 'framer-motion';
import './Homepage.css'; // Import your custom CSS file

const Homepage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation Section */}
      <div className="nav">
        <div className="logo">
          <img src="../images/Banner.png" alt="AutoMate Logo" />
          <h2>AUTOMATE</h2>
        </div>
        <div className="navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/mech">Mechanic</a></li>
            <li><a href="/con">Customer</a></li>
            <li><a href="#"><span className="aboutbtn">About US</span></a></li>
          </ul>
        </div>
      </div>

      {/* Front Image Section */}
      <div className="frontPic">
        <img src="../images/BannerBG.png" alt="mustang" />
      </div>

      {/* Welcome Text Section */}
      <div className="text">
        <h1>WELCOME TO AUTOMATE</h1>
        <br />
        <h2>Where Service Meets Simplicity</h2>
        <br />
        <p>A WEB-APPLICATION DESIGNED FOR SIMPLIFIED AND EASILY ACCESSIBLE SERVICE BOOKINGS</p>
      </div>

      {/* Footer Section */}
      <div className="footer">
        <div className="logo-container">
          <img src="../images/Banner.png" alt="AutoMate" />
          <span><b>AutoMate</b></span>
        </div>
        <div className="centered-content">
          <div className="copyright">
            &copy;2024 AutoMate Private Limited
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Homepage;
