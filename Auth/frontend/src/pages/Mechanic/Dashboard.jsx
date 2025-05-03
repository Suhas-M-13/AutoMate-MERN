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
  FaHandHolding,
  FaTimes,
  FaRupeeSign,
  FaCheckCircle,
  FaUserCircle,
  FaComment,
  FaMotorcycle,
  FaCar
} from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import HamburgerMenu from '../../components/HamburgerMenu';
import { toast } from 'react-hot-toast';

const MechanicDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [profileImage, setProfileImage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState('');
  const [workingRequests, setWorkingRequests] = useState([]);
  const [groupedRequests, setGroupedRequests] = useState({});
  const [groupedHistory, setGroupedHistory] = useState({});

  const { getServiceHistoryMechanic, getCompletedList, updateCompleteButton, book, user, customerDetail, getPendingList, customerRequests, updateAcceptButton, isLoading, error } = useAuthStore()

  let data, second, third, Name, dashboardname, arr, mechanicnumber, complaint = null

  useEffect(() => {
    // Generate profile image
    const firstCharacter = user.name.charAt(0).toUpperCase();
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 100;
    canvas.height = 100;
    context.fillStyle = '#F2AA4CFF';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = '#101820FF';
    context.font = 'bold 60px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(firstCharacter, canvas.width / 2, canvas.height / 2);
    setProfileImage(canvas.toDataURL());
  }, [user.name]);

  const groupRequestsByDate = (requests) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const grouped = {};
    
    requests.forEach(request => {
      const requestDate = new Date(request.bookDate);
      requestDate.setHours(0, 0, 0, 0);
      
      // Only include current and future dates
      if (requestDate >= today) {
        const dateStr = requestDate.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        
        if (!grouped[dateStr]) {
          grouped[dateStr] = [];
        }
        grouped[dateStr].push(request);
      }
    });
    
    // Sort dates in ascending order
    const sortedDates = Object.keys(grouped).sort((a, b) => {
      return new Date(a) - new Date(b);
    });
    
    const sortedGrouped = {};
    sortedDates.forEach(date => {
      sortedGrouped[date] = grouped[date];
    });
    
    return sortedGrouped;
  };

  const fetchCustomerRequest = async () => {
    try {
      await customerRequests()
      // Filter working requests
      const working = book.filter(request => request.isAccepted && !request.isCompleted);
      setWorkingRequests(working);
      
      // Group requests by date
      const grouped = groupRequestsByDate(book);
      setGroupedRequests(grouped);
      
      console.log(book)
      console.log(customerDetail)
    } catch (error) {
      toast.error(error.message || "Error in fetching shop information");
    }
  }

  useEffect(() => {
    fetchCustomerRequest()
  }, [])

  const groupHistoryByDate = (history) => {
    const grouped = {};
    
    history.forEach(service => {
      const serviceDate = new Date(service.bookDate);
      const dateStr = serviceDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!grouped[dateStr]) {
        grouped[dateStr] = [];
      }
      grouped[dateStr].push(service);
    });
    
    // Sort dates in descending order (most recent first)
    const sortedDates = Object.keys(grouped).sort((a, b) => {
      return new Date(b) - new Date(a);
    });
    
    const sortedGrouped = {};
    sortedDates.forEach(date => {
      sortedGrouped[date] = grouped[date];
    });
    
    return sortedGrouped;
  };

  const handleCards = async (cardName) => {
    try {
      if (cardName === "pending") {
        setActiveTab('pending');
        await fetchCustomerRequest();
      }
      else if (cardName === "working") {
        setActiveTab('working');
        await getPendingList();
      }
      else if (cardName === "completed") {
        setActiveTab('completed');
        await getCompletedList();
      }
      else if (cardName === "history") {
        setActiveTab('history');
        try {
          await getServiceHistoryMechanic();
          if (book && book.length > 0) {
            const grouped = groupHistoryByDate(book);
            setGroupedHistory(grouped);
          } else {
            console.log('No service history data available');
            setGroupedHistory({});
          }
        } catch (error) {
          console.error('Error fetching service history:', error);
          toast.error('Failed to fetch service history');
          setGroupedHistory({});
        }
      }
    } catch (error) {
      console.error('Error handling cards:', error);
      toast.error('Failed to fetch information');
    }
  };

  const handleAccept = async (customerId, registerNumber) => {
    try {
      const response = await updateAcceptButton(customerId, registerNumber)
      if (response && response.message) {
        toast.success(response.message)
        // Refresh the requests list
        await fetchCustomerRequest()
      }
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error(error.message || 'Failed to accept request');
    }
  };
  const handleComplete = async (customerId, registerNumber) => {
    try {
      await updateCompleteButton(customerId, registerNumber)
      toast.success("Service Completed...")

    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error('Failed to accept request');
    }
  };

  const handleGenerateBill = (customerId, registerNumber) => {
    try {
      const encryptedVeh = CryptoJS.AES.encrypt(registerNumber, import.meta.env.VITE_SECRETKEY).toString();
      navigate(`/billmechanic/${customerId}?veh=${encodeURIComponent(encryptedVeh)}`)
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error('Failed to open bill section');
    }
  };

  const handlePaid = async (customerId, mechanicId, registernumber) => {
    // try {
    //   const response = await fetch('/bill-paid', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ customerId, mechanicId, registernumber }),
    //   });

    //   const result = await response.json();
    //   if (result.success) {
    //     window.location.reload();
    //   } else {
    //     alert('Failed to update payment status');
    //   }
    // } catch (error) {
    //   console.error('Error updating payment status:', error);
    //   alert('Failed to update payment status');
    // }
  };

  const handleViewDescription = (complaintDescription) => {
    setSelectedComplaint(complaintDescription);
    setShowDescription(true);
  };

  const handleLogout = () => {
    navigate('/');
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100 w-full">

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
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          <h3 className="text-3xl font-bold text-indigo-900 mb-8">
            Mechanic Dashboard
          </h3>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCards('pending')}>
              <div className="flex items-center space-x-4">
                <FaClipboardList className="text-3xl text-blue-500" />
                <div>
                  <span className="text-gray-600">
                    Requests
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCards('working')}>
              <div className="flex items-center space-x-4">
                <FaClock className="text-3xl text-yellow-500" />
                <div>
                  <span className="text-gray-600">
                    Working
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleCards('completed')}>
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
              onClick={() => handleCards('history')}>
              <div className="flex items-center space-x-4">
                <FaComment className="text-3xl text-green-500" />
                <div>
                  <span className="text-gray-600">
                    History of Services
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tables */}
          <div className="space-y-6">
            {/* Pending Requests Table */}
            {activeTab === 'pending' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {Object.entries(groupedRequests).map(([date, requests]) => (
                  <div key={date} className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 bg-gray-50 p-4 border-b">
                      {date}
                    </h3>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Time
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Vehicle
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Description
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {requests.map((request) => (
                          <tr key={request._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={profileImage}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {request.customerName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{request.bookTime.split("T")[1].split(".")[0]}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 text-center">
                                {request.vehicleType[0] === 'Bike' ? (
                                  <>
                                    <FaMotorcycle className="mr-12" />
                                  </>
                                ) : (
                                  <>
                                    <FaCar className="ml-12" />
                                  </>
                                )}
                                {request.vehicleType}
                              </div>
                              <div className="text-sm text-gray-500 text-center">{request.registerNumber}</div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <button
                                onClick={() => handleViewDescription(request.complaintDescription)}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                View Description
                              </button>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => handleAccept(request.customerId, request.registerNumber)}
                                className="text-green-600 hover:text-green-900 mr-4"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleComplete(request.customerId, request.registerNumber)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Reject
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}

            {/* Completed Services Table */}
            {/* {activeTab === 'completed' && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bill Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {third && third.map((service, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <FaUserCircle className="h-10 w-10 text-gray-400" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{service.customername}</div>
                              <div className="text-sm text-gray-500">{service.mobile}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{service.bookeddate}</div>
                          <div className="text-sm text-gray-500">{service.bookedtime}</div>
                        </td>
                        <td className="px-6 py-4">
                          {service.vehicletype.map((type, idx) => (
                            <div key={idx} className="text-sm text-gray-900 text-center">{type}</div>
                          ))}
                          <div className="text-sm text-gray-500 text-center">{service.registernumber}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            <FaCheckCircle className="inline-block mr-1" />
                            Completed
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleGenerateBill(service)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          >
                            Generate Bill
                          </button>
                          <button
                            onClick={() => handlePaid(service.customeremail, service.mechanicemail, service.registernumber)}
                            className="px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700"
                          >
                            <FaRupeeSign className="inline-block mr-1" />
                            PAID
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )} */}

            {/* Service History Table */}
            {activeTab === 'history' && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {Object.entries(groupedHistory).map(([date, services]) => (
                  <div key={date} className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 bg-gray-50 p-4 border-b">
                      {date}
                    </h3>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Vehicle
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bill Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {services.map((service) => (
                          <tr key={service._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={profileImage}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {service.customerName}
                                  </div>
                  
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{new Date(service.bookDate).toLocaleDateString()}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-900 text-center">
                                {service.vehicleType[0] === 'Bike' ? (
                                  <>
                                    <FaMotorcycle className="mr-12" />
                                  </>
                                ) : (
                                  <>
                                    <FaCar className="ml-12" />
                                  </>
                                )}
                                {service.vehicleType}
                              </div>
                              <div className="text-sm text-gray-500 text-center">{service.registerNumber}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                <FaCheckCircle className="inline-block mr-1" />
                                Completed
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              {service.isPaid ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  <FaRupeeSign className="inline-block mr-1" />
                                  Paid
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleGenerateBill(service.customerId, service.registerNumber)}
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  Generate Bill
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main >

      {/* Complaint Description Modal */}
      {
        showDescription && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 relative">
              <button
                onClick={() => setShowDescription(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="text-xl" />
              </button>
              <h2 className="text-2xl font-bold text-center mb-4">Problem Description</h2>
              <div className="mt-4">
                <p className="border border-gray-300 rounded-lg p-4 font-serif whitespace-pre-wrap">
                  {selectedComplaint}
                </p>
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
};

export default MechanicDashboard;