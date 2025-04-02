import React, { useState } from 'react';
import { FaMapMarkerAlt, FaClock, FaPhone, FaEnvelope, FaStar, FaComment, FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

const ShopDetails = () => {
  // This would come from your API/database
  const [shop] = useState({
    id: 1,
    name: "AutoCare Plus",
    owner: "John Doe",
    description: "Professional auto repair and maintenance services with over 15 years of experience. Specializing in both car and bike repairs.",
    address: "123 Auto Street, City, State 12345",
    phone: "+1 234 567 8900",
    email: "contact@autocareplus.com",
    rating: 4.5,
    totalReviews: 128,
    workingHours: {
      startTime: "09:00",
      endTime: "18:00",
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      isOpenOnSunday: false
    },
    services: ["Car Repair", "Bike Repair", "Oil Change", "Brake Service", "Engine Tune-up"],
    images: [
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    ],
    reviews: [
      {
        id: 1,
        user: "Alice Johnson",
        rating: 5,
        comment: "Excellent service! The mechanic was very professional and explained everything clearly.",
        date: "2024-03-15",
        likes: 12,
        dislikes: 0
      },
      {
        id: 2,
        user: "Bob Smith",
        rating: 4,
        comment: "Good service overall. The waiting time was a bit long but the work was done well.",
        date: "2024-03-14",
        likes: 8,
        dislikes: 2
      }
    ]
  });

  const [activeImage, setActiveImage] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ""
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Handle review submission to your backend
    console.log("New review:", newReview);
    setShowReviewForm(false);
    setNewReview({ rating: 5, comment: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Shop Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={shop.images[activeImage]}
              alt={shop.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h1 className="text-3xl font-bold text-white">{shop.name}</h1>
              <p className="text-white text-lg">{shop.owner}</p>
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="p-4 flex space-x-2 overflow-x-auto">
            {shop.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                  activeImage === index ? 'ring-2 ring-blue-500' : ''
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
              <p className="text-gray-600">{shop.description}</p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Offered</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {shop.services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors"
                  >
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Write a Review
                </button>
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>
                  <form onSubmit={handleReviewSubmit}>
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
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-6">
                {shop.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.user}</h4>
                        <div className="flex items-center text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <FaStar
                              key={i}
                              className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{review.comment}</p>
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
                  <span className="text-gray-600">{shop.address}</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-gray-400 mr-3" />
                  <span className="text-gray-600">{shop.phone}</span>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-gray-400 mr-3" />
                  <span className="text-gray-600">{shop.email}</span>
                </div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Working Hours</h2>
              <div className="space-y-2">
                {shop.workingHours.workingDays.map((day) => (
                  <div key={day} className="flex justify-between items-center">
                    <span className="text-gray-600">{day}</span>
                    <span className="text-gray-900">
                      {shop.workingHours.startTime} - {shop.workingHours.endTime}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-900">
                    {shop.workingHours.isOpenOnSunday
                      ? `${shop.workingHours.startTime} - ${shop.workingHours.endTime}`
                      : 'Closed'}
                  </span>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Location</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30591910525!2d-74.25986532962815!3d40.69714941980809!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1647891234567!5m2!1sen!2s"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                />
              </div>
            </div>

            {/* Overall Rating */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">{shop.rating}</div>
                <div className="flex justify-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={i < Math.floor(shop.rating) ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <div className="text-gray-600">
                  Based on {shop.totalReviews} reviews
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