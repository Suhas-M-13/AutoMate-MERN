import React, { useState } from 'react';
import { FaBars, FaTimes, FaHome, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const HamburgerMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async() => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg"
      >
        {isOpen ? null : <FaBars className="text-black text-xl left-0" />}
      </button>

      {/* Menu Content */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl transform transition-all duration-300 ease-in-out z-40 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <img src="/images/Banner.png" alt="AutoMate" className="h-10 w-10" />
              <h2 className="text-2xl font-bold text-black">AutoMate</h2>
            </div>
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
            >
              <FaTimes className="text-black text-xl" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 top-20">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-black hover:bg-gray-100 transition-all duration-200"
                >
                  <FaHome className="text-lg" />
                  <span>Dashboard</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/profile')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-black hover:bg-gray-100 transition-all duration-200"
                >
                  <FaUser className="text-lg" />
                  <span>Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/settings')}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-black hover:bg-gray-100 transition-all duration-200"
                >
                  <FaCog className="text-lg" />
                  <span>Settings</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Logout Section */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-all duration-200"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={toggleMenu}
        />
      )}
    </div>
  );
};

export default HamburgerMenu; 