import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Homepage.css';
import HamburgerMenu from '../components/HamburgerMenu';
import { Link } from 'react-router-dom';
import Banner from '../images/Banner.png';

const Homepage = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    // TODO: Implement subscription functionality
    console.log('Subscribing email:', email);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Navigation Section */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <img src={Banner} alt="AutoMate Logo" className="w-12 h-12" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-900 to-purple-900 text-transparent bg-clip-text">AUTOMATE</h2>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-indigo-900 hover:text-indigo-600 transition-all duration-300 font-medium">
                Home
              </Link>
              <Link to="/login" className="text-indigo-900 hover:text-indigo-600 transition-all duration-300 font-medium">
                Mechanic
              </Link>
              <Link to="/login" className="text-indigo-900 hover:text-indigo-600 transition-all duration-300 font-medium">
                Customer
              </Link>
              <Link to="#" className="text-indigo-900 hover:text-indigo-600 transition-all duration-300">
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl px-6 py-2 rounded-full text-white">
                  About US
                </span>
              </Link>
            </div>
            <div className="md:hidden">
              <HamburgerMenu>
                <nav className="mt-8">
                  <ul className="space-y-2">
                    <li className="px-4 py-3 hover:bg-indigo-700 cursor-pointer transition-all duration-300 rounded-lg group">
                      <Link to="/" className="text-white text-lg group-hover:scale-105 transition-transform duration-300">Home</Link>
                    </li>
                    <li className="px-4 py-3 hover:bg-indigo-700 cursor-pointer transition-all duration-300 rounded-lg group">
                      <Link to="/login?type=mechanic" className="text-white text-lg group-hover:scale-105 transition-transform duration-300">Mechanic</Link>
                    </li>
                    <li className="px-4 py-3 hover:bg-indigo-700 cursor-pointer transition-all duration-300 rounded-lg group">
                      <Link to="/login?type=customer" className="text-white text-lg group-hover:scale-105 transition-transform duration-300">Customer</Link>
                    </li>
                    <li className="px-4 py-3 hover:bg-indigo-700 cursor-pointer transition-all duration-300 rounded-lg group">
                      <Link to="#" className="text-white text-lg group-hover:scale-105 transition-transform duration-300">About US</Link>
                    </li>
                  </ul>
                </nav>
              </HamburgerMenu>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Banner Section */}
      <div className="banner">
        <div className="text">
          <h2>WELCOME TO AUTOMATE</h2>
          <h1>Where Service Meets Simplicity</h1>
          <p>A WEB-APPLICATION DESIGNED FOR SIMPLIFIED AND EASILY ACCESSIBLE SERVICE BOOKINGS</p>
          <form className="email" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Your Email Here"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-white text-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <img src={Banner} alt="AutoMate" className="footer-logo" />
              <span className="text-2xl font-bold text-gray-800">AutoMate</span>
            </div>
            <div className="text-center md:text-right">
              <div className="text-lg text-gray-600">
                &copy;2025 AutoMate Private Limited
              </div>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default Homepage;
