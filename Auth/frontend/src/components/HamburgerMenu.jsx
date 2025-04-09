import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const HamburgerMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="text-indigo-600 hover:text-indigo-800 focus:outline-none transition-all duration-300 p-2 rounded-full hover:bg-indigo-50"
      >
        {isOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      {/* Menu Content */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 shadow-2xl transform transition-transform duration-500 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <img src="/images/Banner.png" alt="AutoMate" className="h-10 w-10" />
              <h2 className="text-2xl font-bold text-white">AutoMate</h2>
            </div>
            <button
              onClick={toggleMenu}
              className="text-white hover:text-indigo-200 transition-all duration-300 p-2 rounded-full hover:bg-indigo-800"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          <div className="space-y-1">
            {children}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default HamburgerMenu; 