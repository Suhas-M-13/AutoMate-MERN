import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaWrench,
  FaUsers,
  FaBars,
  FaSearch,
  FaClipboardList,
  FaClock,
  FaCheckCircle,
  FaTimes,
  FaUserCircle,
  FaCalendarAlt,
  FaCar,
  FaTools,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaBook,
  FaFileInvoiceDollar,
  FaCog
} from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  // const [activeTab, setActiveTab] = useState('pending');
  const [profileImage, setProfileImage] = useState('');
  const [cardStatus, setcardStatus] = useState('shoplist')
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout, shopDetail, shop, isLoading, error, pendingShopList , book , completedShopList} = useAuthStore();

  const fetchShopDetail = async () => {
    try {
      await shopDetail();
    } catch (error) {
      toast.error(error.message || "Error in fetching shop information");
    }
  };

  useEffect(() => {
    fetchShopDetail();
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await logout();
      toast.success(response.message);
      navigate('/login')
    } catch (error) {
      toast.error("Error in logging out");
    }
  };

  const handleBookSlot = (mechanicId) => {
    // console.log(mechanicId)

    try {
      navigate(`/bookform/${mechanicId}`)
    } catch (error) {
      toast.error("Error in loading bookform ");
    }
  };

  const handleViewShopDetails = (mechanicId) => {
    console.log("Viewing shop details for mechanic:", mechanicId);
    try {
      navigate(`/shopdetails/${mechanicId}`)
    } catch (error) {
      toast.error("No mechanic id found");
    }
  };

  const handleViewBill = (mechanicId) => {
    try {
      navigate(`/invoice/${mechanicId}`)
    } catch (error) {
      toast.error("No mechanic id found");
    }
  };

  const handleCards = async (cardName) => {
    if (cardName === "shoplist") {
      setcardStatus('shoplist')
      await fetchShopDetail();
    }
    else if (cardName === "pending") {
      setcardStatus('pending')
      await pendingShopList()
    }
    else if (cardName === "completed") {
      setcardStatus('completed')
      await completedShopList()
    }
  }

  const filteredData = null;

  // Move loading and error states after all hooks
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <img src="/images/Banner.png" alt="AutoMate" className="h-8 w-8" />
            <h2 className="text-xl font-bold">AutoMate</h2>
          </div>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2">
            <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer">
              <FaHome className="inline-block mr-2" />
              <a href="/">Home</a>
            </li>
            <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer border-l-4 border-white">
              <FaWrench className="inline-block mr-2" />
              <a href="#">Contact Us</a>
            </li>
            <li className="px-4 py-2 hover:bg-blue-700 cursor-pointer">
              <FaUsers className="inline-block mr-2" />
              <a href="#">About Us</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <FaBars className="text-xl" />
              </button>
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mechanics..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <div className="flex items-center space-x-2">
                <span className="text-gray-700">{user.name}</span>
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setShowPopup(!showPopup)}
                />
              </div>
              {showPopup && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Customer Dashboard
          </h3>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCards("shoplist")}
            >
              <div className="flex items-center space-x-4">
                <FaClipboardList className="text-3xl text-blue-500" />
                <div>
                  <span className="text-gray-600">Shop List</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCards("pending")}
            >
              <div className="flex items-center space-x-4">
                <FaClock className="text-3xl text-yellow-500" />
                <div>
                  <span className="text-gray-600">Pending</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCards("completed")}
            >
              <div className="flex items-center space-x-4">
                <FaCheckCircle className="text-3xl text-green-500" />
                <div>
                  <span className="text-gray-600">Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tables */}
          <div className="space-y-6">
            {/* Available Mechanics Table */}
            {shop && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mechanic Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop Details</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shop Info</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {shop.map((mechanic, index) =>{
                      const foundbook = book.find(item => item.mechanicId === mechanic.ownerId)
                      const status = foundbook ? (foundbook.isAccepted ? "Working" : "Request Pending") : "Not Booked";
                     return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <FaUserCircle className="h-10 w-10 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{mechanic.ownerName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{mechanic.shopname}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <FaMapMarkerAlt className="mr-1" />
                            {mechanic.address}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 flex items-center">
                            <FaPhone className="mr-1" />
                            {mechanic.mobileNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleViewShopDetails(mechanic.ownerId)}
                            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center group"
                          >
                            <FaTools className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
                            Explore Shop
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          {cardStatus === 'shoplist' ? (
                            <button
                              onClick={() => handleBookSlot(mechanic.ownerId)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                            >
                              <FaBook className="mr-2" />
                              Book Slot
                            </button>
                          ) : cardStatus === 'pending' ? (
                            <button
                              disabled
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center opacity-75"
                            >
                              <FaCog className="mr-2 animate-spin" />
                              {status}
                            </button>
                          ) : (
                            <button
                              onClick={() => handleViewBill(mechanic.ownerId)}
                              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                            >
                              <FaFileInvoiceDollar className="mr-2" />
                              View Bill
                            </button>
                          )}
                        </td>
                      </tr>
                    )})}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerDashboard;