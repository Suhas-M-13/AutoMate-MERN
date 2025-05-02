import React, { useState } from 'react';
import { FaStar, FaFilter, FaSearch, FaSort, FaChartBar, FaUser, FaCalendarAlt, FaCar } from 'react-icons/fa';

const MechanicFeedback = () => {
  // This would come from your API/database
  const [feedback] = useState([
    {
      id: 1,
      customerName: "Alice Johnson",
      vehicleDetails: {
        make: "Toyota",
        model: "Camry",
        year: "2020",
        registrationNumber: "ABC123"
      },
      serviceDate: "2024-03-15",
      serviceType: "Oil Change",
      overallRating: 5,
      serviceQuality: 5,
      mechanicRating: 5,
      cleanliness: 4,
      communication: 5,
      valueForMoney: 4,
      comment: "Excellent service! The mechanic was very professional and explained everything clearly.",
      wouldRecommend: true,
      issues: [],
      date: "2024-03-15"
    },
    {
      id: 2,
      customerName: "Bob Smith",
      vehicleDetails: {
        make: "Honda",
        model: "Civic",
        year: "2019",
        registrationNumber: "XYZ789"
      },
      serviceDate: "2024-03-14",
      serviceType: "Brake Service",
      overallRating: 4,
      serviceQuality: 4,
      mechanicRating: 4,
      cleanliness: 5,
      communication: 4,
      valueForMoney: 3,
      comment: "Good service overall. The waiting time was a bit long but the work was done well.",
      wouldRecommend: true,
      issues: ["Long waiting time"],
      date: "2024-03-14"
    }
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterRating, setFilterRating] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  // Calculate average ratings
  const averageRatings = {
    overall: feedback.reduce((acc, curr) => acc + curr.overallRating, 0) / feedback.length,
    serviceQuality: feedback.reduce((acc, curr) => acc + curr.serviceQuality, 0) / feedback.length,
    mechanicRating: feedback.reduce((acc, curr) => acc + curr.mechanicRating, 0) / feedback.length,
    cleanliness: feedback.reduce((acc, curr) => acc + curr.cleanliness, 0) / feedback.length,
    communication: feedback.reduce((acc, curr) => acc + curr.communication, 0) / feedback.length,
    valueForMoney: feedback.reduce((acc, curr) => acc + curr.valueForMoney, 0) / feedback.length
  };

  // Filter and sort feedback
  const filteredFeedback = feedback
    .filter(item => {
      const matchesSearch = 
        item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vehicleDetails.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vehicleDetails.model.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesRating = 
        filterRating === "all" || 
        (filterRating === "positive" && item.overallRating >= 5) ||
        (filterRating === "negative" && item.overallRating < 5);
      
      return matchesSearch && matchesRating;
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(a.date) - new Date(b.date);
      if (sortBy === "rating") return b.overallRating - a.overallRating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Customer Feedback</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Total Reviews</p>
              <p className="text-2xl font-bold text-blue-700">{feedback.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600">Average Rating</p>
              <p className="text-2xl font-bold text-green-700">
                {averageRatings.overall.toFixed(1)} ★
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600">Recommendation Rate</p>
              <p className="text-2xl font-bold text-purple-700">
                {((feedback.filter(f => f.wouldRecommend).length / feedback.length) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer or vehicle..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="positive">Positive (4+ stars)</option>
                <option value="negative">Negative (&lt; 4 stars)</option>
              </select>
            </div>
            <div>
              <select
                className="w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date">Sort by Date</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-6">
          {filteredFeedback.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <div className="flex items-center mb-2">
                    <FaUser className="text-gray-400 mr-2" />
                    <h3 className="text-lg font-semibold text-gray-900">{item.customerName}</h3>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <FaCar className="mr-2" />
                    <span>
                      {item.vehicleDetails.year} {item.vehicleDetails.make} {item.vehicleDetails.model}
                    </span>
                  </div>
                </div>
                <div className="mt-2 md:mt-0">
                  <div className="flex items-center text-gray-600">
                    <FaCalendarAlt className="mr-2" />
                    <span>{item.serviceDate}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Overall Rating</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < item.overallRating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Service Quality</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < item.serviceQuality ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Mechanic Rating</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`${
                          i < item.mechanicRating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600">{item.comment}</p>
              </div>

              {item.issues.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Reported Issues:</p>
                  <div className="flex flex-wrap gap-2">
                    {item.issues.map((issue, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                      >
                        {issue}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    item.wouldRecommend
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {item.wouldRecommend ? 'Would Recommend' : 'Would Not Recommend'}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Service: {item.serviceType}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MechanicFeedback;