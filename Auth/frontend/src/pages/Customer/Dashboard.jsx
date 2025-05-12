import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import {
  FaHome,
  FaWrench,
  FaUsers,
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
  FaCog,
  FaMotorcycle,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaHandHolding
} from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';
import HamburgerMenu from '../../components/HamburgerMenu';
import UserIcon from '../../components/UserIcon';
import { useLocation } from '../../context/LocationContext';
import ShopMap from '../../components/ShopMap';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  // const [activeTab, setActiveTab] = useState('pending');
  const [cardStatus, setcardStatus] = useState('shoplist')
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredShops, setFilteredShops] = useState([]);
  const { user, shopDetail, shop, isLoading, error, pendingShopList, nearShop, book, completedShopList, updatePay, getServiceHistoryCustomer, fetchNearByShops } = useAuthStore();
  const { location, fetchUserLocation } = useLocation();
  const [showMap, setShowMap] = useState(false);
  const [nearbyShops, setNearbyShops] = useState([]);
  const [paymentBox, setpaymentBox] = useState(false)

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

  useEffect(() => {
    fetchUserLocation();
  }, [shop]);

  // useEffect(() => {
  //   fetchNearByShops(location);
  // }, [location]);

  useEffect(() => {
    if (shop) {
      const filtered = shop.filter((mechanic) => {
        if (Array.isArray(mechanic.vehicleType) && mechanic.vehicleType.length > 0)
          console.log(mechanic.vehicleType[0]);

        const searchLower = searchQuery.toLowerCase();
        return (
          mechanic.shopname.toLowerCase().includes(searchLower) ||
          mechanic.ownerName.toLowerCase().includes(searchLower) ||
          mechanic.address.toLowerCase().includes(searchLower) ||
          mechanic.registerNumber?.replace("-", "").toLowerCase().includes(searchLower.replace("-", ""))
        );
      });
      setFilteredShops(filtered);
    }
  }, [searchQuery, shop]);

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

  const handleViewBill = (mechanicId, registerNumber) => {
    try {
      console.log(mechanicId, registerNumber)
      console.log(import.meta.env.VITE_SECRETKEY)
      const encryptedVeh = CryptoJS.AES.encrypt(registerNumber, import.meta.env.VITE_SECRETKEY).toString();
      navigate(`/invoice/${mechanicId}?veh=${encodeURIComponent(encryptedVeh)}`)
    } catch (error) {
      toast.error("No mechanic id found");
    }
  };

  const handlePayBill = async (mechanicId, registerNumber) => {
    try {
      const encryptedVeh = CryptoJS.AES.encrypt(registerNumber, import.meta.env.VITE_SECRETKEY).toString();
      navigate(`/paymentPage/${mechanicId}?veh=${encodeURIComponent(encryptedVeh)}`)
    } catch (error) {
      toast.error("No mechanic id found");
    }
  };


  // const handlePayBill = async (mechanicId, registerNumber) => {
  //   try {
  //     await updatePay(mechanicId, registerNumber)
  //     const encryptedVeh = CryptoJS.AES.encrypt(registerNumber, import.meta.env.VITE_SECRETKEY).toString();
  //     navigate(`/servicefeedback/${mechanicId}?veh=${encodeURIComponent(encryptedVeh)}`)
  //   } catch (error) {
  //     toast.error("No mechanic id found");
  //   }
  // };

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
    else if (cardName === 'serviceHistory') {
      setcardStatus('serviceHistory')
      // console.log("clicked serviceHistory")
      await getServiceHistoryCustomer()
      // console.log(shop)
    }
  }

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


  const handleFetchNearbyShops = async (e) => {
    try {
      e.preventDefault();
      console.log("Location:", location); // should print lat/lng
      if (location) {
        toast.success("Location fetched")
        await fetchNearByShops(location.lng, location.lat);
        console.log(nearShop)
        setNearbyShops(nearShop);
        setShowMap(true);
      } else {
        toast.error("Location not available.");
        setShowMap(false)
      }
    } catch (error) {
      toast.error("Could not fetch nearby shops.");
      console.error(error);
    }
  };



  // Move loading and error states after all hooks
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-gray-100 w-full">
      {/* Sidebar */}
      {/* <aside className="hidden md:block w-64 bg-blue-800 text-white">
        <div className="p-4">
          <div className="flex items-center space-x-2">
            <img src="/images/Banner.png" alt="AutoMate" className="h-8 w-8" />
            <h2 className="text-xl font-bold">AutoMate</h2>
          </div>
        </div>
        <nav className="mt-8 px-4">
          <ul className="space-y-2">
            <li className="px-4 py-3 hover:bg-indigo-700 cursor-pointer transition-all duration-300 rounded-lg group">
              <FaHome className="inline-block mr-3 text-lg group-hover:scale-110 transition-transform duration-300" />
              <a href="/" className="text-lg">Home</a>
            </li>
            <li className="px-4 py-3 hover:bg-indigo-700 cursor-pointer border-l-4 border-indigo-400 transition-all duration-300 rounded-lg group">
              <FaWrench className="inline-block mr-3 text-lg group-hover:scale-110 transition-transform duration-300" />
              <a href="#">Contact Us</a>
            </li>
            <li className="px-4 py-3 hover:bg-indigo-700 cursor-pointer transition-all duration-300 rounded-lg group">
              <FaUsers className="inline-block mr-3 text-lg group-hover:scale-110 transition-transform duration-300" />
              <a href="#">About Us</a>
            </li>
          </ul>
        </nav>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Navigation */}
        <div className="bg-white shadow-md p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-12">
              <HamburgerMenu />
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by shop name, owner name, or address..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <UserIcon username={user.name} />
          </div>
        </div>

        {/* Toggle Nearby Shops Map */}
        <div className="p-4">
          <button
            onClick={(e) => handleFetchNearbyShops(e)}
            // disabled={!location}
            className={`px-4 py-2 text-white rounded-md transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center  bg-blue-600 hover:bg-blue-700'
            }`}
          >
            Fetch Nearby Shops
          </button>

          {location && (
            <div className="mt-4">
              <div
                onClick={() => setShowMap(prev => !prev)}
                className="flex items-center justify-between cursor-pointer px-4 py-2 bg-indigo-100 text-indigo-800 rounded-md font-semibold hover:bg-indigo-200 transition"
              >
                <span>Nearby Shops Map</span>
                <span className="text-xl">{showMap ? '▲' : '▼'}</span>
              </div>
              {showMap && (<div className="mt-4 flex justify-center align-middle">
                <div className="w-full md:w-3/4 h-[400px]">
                  <ShopMap shopDetail={nearbyShops} userLoc={location} />
                </div>
              </div>)}
            </div>
          )}
        </div>


        {/* Dashboard Content */}
        <div className="p-8">
          <h3 className="text-3xl font-bold text-indigo-900 mb-8">
            Customer Dashboard
          </h3>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCards("shoplist")}>
              <div className="flex items-center space-x-4">
                <FaClipboardList className="text-3xl text-blue-500" />
                <div>
                  <span className="text-gray-600">
                    Shop List
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCards("pending")}>
              <div className="flex items-center space-x-4">
                <FaClock className="text-3xl text-yellow-500" />
                <div>
                  <span className="text-gray-600">
                    Pending
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCards("completed")}>
              <div className="flex items-center space-x-4">
                <FaHandHolding className="text-3xl text-green-500" />
                <div>
                  <span className="text-gray-600">
                    Completed
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCards("serviceHistory")}>
              <div className="flex items-center space-x-4">
                <FaClock className="text-3xl text-yellow-500" />
                <div>
                  <span className="text-gray-600">
                    Get Service History
                  </span>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{(cardStatus === 'shoplist') ? "Contact" : "Vehicle Type"}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{(cardStatus === 'pending' || cardStatus === 'completed') ? "Vehicle Register Number" : (cardStatus === 'serviceHistory') ? "Booked Date" : "Shop Info"}</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {(filteredShops.length > 0 ? filteredShops : shop).map((mechanic, index) => {
                      return (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {/* <div className="h-5 w-15 rounded-full"> */}
                              {/* <FaUserCircle className="h-10 w-10 text-gray-400" /> */}
                              <UserIcon username={mechanic?.ownerName} />
                              {/* </div> */}
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {/* {mechanic.ownerName} */}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900">{mechanic?.shopname}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <FaMapMarkerAlt className="mr-1" />
                              {mechanic?.address}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 flex items-center">
                              {
                                (cardStatus === 'pending' || cardStatus === 'completed' || cardStatus === 'serviceHistory') ? (
                                  <>
                                    {
                                      mechanic?.vehicleType && Array.isArray(mechanic.vehicleType) && mechanic.vehicleType.length > 0 ? (
                                        <>
                                          {mechanic.vehicleType[0] === 'Bike' ? (
                                            <FaMotorcycle className="mr-1" />
                                          ) : (
                                            <FaCar className="mr-1" />
                                          )}
                                          {mechanic.vehicleType}
                                        </>
                                      ) : (
                                        <span>No vehicle type available</span>
                                      )
                                    }
                                  </>
                                ) : (
                                  <>
                                    <FaPhone className="mr-1" />
                                    {mechanic?.mobileNumber}
                                  </>
                                )
                              }
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            {
                              (cardStatus === 'pending' || cardStatus === 'completed') ? (
                                <>
                                  {mechanic?.registerNumber}<br />
                                  Booking Date : {new Date(mechanic?.BookDate).toDateString()}
                                </>
                              ) : (cardStatus === 'serviceHistory') ? (
                                <>
                                  {new Date(mechanic?.BookDate).toLocaleDateString()}
                                </>
                              )
                                :
                                (
                                  <>
                                    <button
                                      onClick={() => handleViewShopDetails(mechanic?.ownerId)}
                                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center group"
                                    >
                                      <FaTools className="mr-2 group-hover:rotate-12 transition-transform duration-200" />
                                      Explore Shop
                                    </button>
                                  </>
                                )
                            }

                          </td>
                          <td className="px-6 py-4">
                            {cardStatus === 'shoplist' ? (
                              <button
                                onClick={() => handleBookSlot(mechanic?.ownerId)}
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
                                {
                                  mechanic?.isAccepted === false ? (
                                    <>
                                      <FaHourglassHalf className="mr-2 animate-spin" />
                                      Pending
                                    </>
                                  ) : (
                                    <>
                                      <FaCog className="mr-2 animate-spin" />
                                      Working
                                    </>
                                  )
                                }
                              </button>
                            ) : (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleViewBill(mechanic?.ownerId, mechanic?.registerNumber)}
                                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center"
                                >
                                  <FaFileInvoiceDollar className="mr-2" />
                                  View Bill
                                </button>
                                <button
                                  onClick={() => handlePayBill(mechanic?.ownerId, mechanic?.registerNumber)}
                                  disabled={mechanic?.isPaid}
                                  className={`px-4 py-2 rounded-md transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center ${mechanic?.isPaid
                                    ? 'bg-gray-400 text-white cursor-not-allowed opacity-75'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                                >
                                  <FaMoneyBillWave className="mr-2" />
                                  {mechanic?.isPaid ? 'Paid' : 'Pay'}
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      )
                    })}
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