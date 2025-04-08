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
        className="text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        {isOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaBars className="text-xl" />
        )}
      </button>

      {/* Menu Content */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <img src="/images/Banner.png" alt="AutoMate" className="h-8 w-8" />
              <h2 className="text-xl font-bold">AutoMate</h2>
            </div>
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>
          {children}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default HamburgerMenu; 