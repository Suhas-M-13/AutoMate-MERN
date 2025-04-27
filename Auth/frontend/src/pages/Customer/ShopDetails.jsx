import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope, FaStar, FaComment, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import ShopMap from '../../components/ShopMap';

const ShopDetails = () => {
  const navigate = useNavigate();
  const { mechanicId } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const { shop, comments, error, isLoading, shopDetailById } = useAuthStore();

  const images = [
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  ];

  const services = ["Car Repair", "Bike Repair", "Oil Change", "Brake Service", "Engine Tune-up"];

  const fetchShopDetail = async () => {
    try {
      await shopDetailById(mechanicId);
      console.log(comments)
    } catch (error) {
      toast.error("Couldn't fetch shop detail");
      navigate('/dashboardcustomer');
    }
  };

  useEffect(() => {
    fetchShopDetail();
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          toast.error('Unable to get your location');
          console.error('Error getting location:', error);
        }
      );
    } else {
      toast.error('Geolocation is not supported by your browser');
    }
  }, [mechanicId]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!shop || !shop[0]) {
    return <div className="min-h-screen flex items-center justify-center">No shop data available</div>;
  }

  const currentShop = shop[0];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Shop Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={images[activeImage]}
              className="w-full h-full object-cover"
              alt="Shop"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h1 className="text-3xl font-bold text-white">{currentShop.shopname}</h1>
              <p className="text-white text-lg">{currentShop.ownerName}</p>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="p-4 flex space-x-2 overflow-x-auto">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${activeImage === index ? 'ring-2 ring-blue-500' : ''
                  }`}
              >
                <img
                  src={image}
                  alt={`Shop view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Shop</h2>
              <p className="text-gray-600">{currentShop.description}</p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Offered</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              {currentShop.location && (
                <ShopMap
                  shopLocation={currentShop.location}
                  shopName={currentShop.shopname}
                  userLocation={userLocation}
                />
              )}
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Reviews
                  <br/>
                  {/* {currentShop.createdAt.substring(0,10)} */}
                </h2>
                {/* <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Write a Review
                </button> */}
              </div>

              {/* Review Form */}
              {/* {showReviewForm && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  {/* <h3 className="text-lg font-semibold mb-4">Write Your Review</h3> */}
              {/* <form onSubmit={handleReviewSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rating
                      </label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className={`text-2xl ${
                              star <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comment
                      </label>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        rows="4"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setShowReviewForm(false)}
                        className="px-4 py-2 text-gray-700 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                      {/* <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Submit Review
                      </button> */}
              {/* </div> */}
              {/* </form> */}
              {/* </div> */}
              {/* )} */}

              {/* Reviews List */}
              <div className="space-y-6">
                {comments && comments.map((review) => (
                  <div key={review.customerId} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.customerName}</h4>
                        <div className="flex items-center text-black">
                          {/* {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                            />
                          ))} */}
                          {
                            review.Rating
                          }
                        </div>
                      </div>
                        <span className="text-sm text-gray-500">
                          {/* {comments.createdAt.split(":")[0].split("-")[2].split("T")[0]}
                          {comments.createdAt.split(":")[0].split("-")[1]}
                          {comments.createdAt.split(":")[0].split("-")[0]} */}
                        </span>
                      </div>
                    <p className="text-gray-600 mb-4">{review.description}</p>
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center text-gray-500 hover:text-green-600">
                        <FaThumbsUp className="mr-1" />
                        <span>{review.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-red-600">
                        <FaThumbsDown className="mr-1" />
                        <span>{review.dislikes}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-gray-400 mr-3" />
                  <span className="text-gray-600">{currentShop.address}</span>
                </div>
                {currentShop.location && currentShop.location.coordinates && (
                  <div className="flex items-center">
                    <span className="text-xs text-gray-600">Lat: {currentShop.location.coordinates[1]}, Lng: {currentShop.location.coordinates[0]}</span>
                  </div>
                )}
                <div className="flex items-center">
                  <FaPhone className="text-gray-400 mr-3" />
                  <span className="text-gray-600">{currentShop.mobileNumber}</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  {/* <span className="text-gray-600">{shop.email}</span> */}
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Working Hours</h2>
              <div className="space-y-2">
                {Object.keys(currentShop.timings).map((day) => {
                  const { from, to, notavailable } = currentShop.timings[day];
                  return (
                    <div key={day} className="flex justify-between items-center">
                      <span className="text-gray-600">{day}</span>
                      <span className="text-gray-900">
                        {notavailable ? 'Closed' : `${from} - ${to}`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Overall Rating */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{currentShop.rating}</div>
                <div className="flex justify-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.floor(currentShop.rating) ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <div className="text-gray-600">
                  Based on {currentShop.totalReviews} reviews
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDetails;