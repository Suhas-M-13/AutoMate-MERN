import React, { useState, useEffect } from 'react';
import { FaUser, FaTools, FaCalendarAlt, FaCar, FaTimesCircle, FaCheckCircle, FaStore } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../../components/Input';
import CryptoJS from 'crypto-js';
import { useLocation } from 'react-router-dom';


const ServiceFeedback = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const encryptedVeh = searchParams.get('veh');

  const { serviceFeedback, addServiceFeedback, user, shop, book, isLoading, error } = useAuthStore();
  const { mechanicId } = useParams();
  const [feedback, setFeedback] = useState({
    title: '',
    description: ''
  });
  const navigate = useNavigate()

  const fetchServiceDetails = async () => {
    try {
      const bytes = CryptoJS.AES.decrypt(encryptedVeh, import.meta.env.SECRETKEY);
      const vehicleRegNumber = bytes.toString(CryptoJS.enc.Utf8);

      console.log(vehicleRegNumber)

      await serviceFeedback(mechanicId,vehicleRegNumber);
    } catch (error) {
      toast.error("Error fetching service details");
    }
  };

  useEffect(() => {
    fetchServiceDetails();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addServiceFeedback(mechanicId, user.name, feedback)
      toast.success("Feedback submitted successfully");
      navigate("/dashboardCustomer")
    } catch (error) {
      toast.error("Error submitting feedback");
    }
  };

  if (!shop || !book) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  const currentShop = shop[0];
  const currentBook = book[0];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-3xl mx-auto">
        {/* Service Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <FaUser className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Mechanic Name</p>
                  <p className="font-medium">{currentShop?.ownerName}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaTools className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Shop Name</p>
                  <p className="font-medium">{currentShop?.shopname}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaUser className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Customer Name</p>
                  <p className="font-medium">{user?.name}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaCar className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Vehicle Registration Number</p>
                  <p className="font-medium">{currentBook?.registerNumber}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Service Date</p>
                  <p className="font-medium">{currentBook?.bookDate.split("T")[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={feedback.title}
                onChange={(e) => setFeedback({ ...feedback, title: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                placeholder="Enter feedback title"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={feedback.description}
                onChange={(e) => setFeedback({ ...feedback, description: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                rows="4"
                placeholder="Share your experience in detail..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Would you recommend this service to others?
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: true }))}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${feedback.wouldRecommend
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  <FaCheckCircle />
                  <span>Yes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: false }))}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${!feedback.wouldRecommend
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  <FaTimesCircle />
                  <span>No</span>
                </button>
              </div>
            </div>


            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceFeedback;