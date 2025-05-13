import React, { useEffect, useState } from 'react';
import {
  FaStar,
  FaSearch,
  FaCalendarAlt,
  FaCar,
  FaMotorcycle,
  FaSmile,
  FaFrown,
  FaMeh
} from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';

const MechanicFeedback = () => {
  const {getFeedbacksForMechanic , comments , isLoading , error} = useAuthStore()
  const [sentimentFilter, setSentimentFilter] = useState("all");
  const [starSortOrder, setStarSortOrder] = useState("none");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchMechanicFeedbacks = async()=>{
    try {
      await getFeedbacksForMechanic()
    } catch (error) {
      
    }
  }

  useEffect(() => {
    fetchMechanicFeedbacks()
  }, [])
  


  const averageRating =
    comments.reduce((acc, curr) => acc + parseFloat(curr.Rating), 0) / comments.length;

  const filteredComments = comments
    .filter(comment => {
      const matchesSearch =
        comment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        comment.registerNumber.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSentiment =
        sentimentFilter === "all" || comment.sentiment === sentimentFilter;

      return matchesSearch && matchesSentiment;
    })
    .sort((a, b) => {
      if (starSortOrder === "highToLow") {
        return parseFloat(b.Rating) - parseFloat(a.Rating);
      } else if (starSortOrder === "lowToHigh") {
        return parseFloat(a.Rating) - parseFloat(b.Rating);
      }
      return new Date(b.createdAt) - new Date(a.createdAt); // Default: newest first
    });


  const renderSentiment = (sentiment) => {
    if (sentiment === 'positive') return <FaSmile className="text-green-500" />;
    if (sentiment === 'negative') return <FaFrown className="text-red-500" />;
    return <FaMeh className="text-yellow-500" />;
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Customer Comments</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Total Comments</p>
              <p className="text-2xl font-bold text-blue-700">{comments.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600">Average Rating</p>
              <p className="text-2xl font-bold text-green-700">{averageRating.toFixed(1)} ★</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-600">Recommendation Rate</p>
              <p className="text-2xl font-bold text-purple-700">
                {Math.round((averageRating / 5) * 100)}%
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by customer or register number..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 mt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sentiment Filter */}
            <div>
              <label htmlFor="sentimentFilter" className="block text-sm font-medium text-gray-700 mb-2">
                Sentiment
              </label>
              <select
                id="sentimentFilter"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sentimentFilter}
                onChange={(e) => setSentimentFilter(e.target.value)}
              >
                <option value="all">All Sentiments</option>
                <option value="positive">Positive</option>
                <option value="neutral">Neutral</option>
                <option value="negative">Negative</option>
              </select>
            </div>

            {/* Star Rating Sort */}
            <div>
              <label htmlFor="starSortOrder" className="block text-sm font-medium text-gray-700 mb-2">
                Sort by Star Rating
              </label>
              <select
                id="starSortOrder"
                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={starSortOrder}
                onChange={(e) => setStarSortOrder(e.target.value)}
              >
                <option value="none">No Sorting</option>
                <option value="highToLow">High to Low</option>
                <option value="lowToHigh">Low to High</option>
              </select>
            </div>

            {/* Reset Button (Optional but useful UX) */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSentimentFilter("all");
                  setStarSortOrder("none");
                  setSearchQuery("");
                }}
                className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>


        {/* Comments List */}
        <div className="space-y-6">
          {filteredComments.map((comment) => (
            <div key={comment._id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{comment.customerName}</h3>
                  <div className="flex items-center text-gray-600 mt-1">
                    {comment.vehicleType.includes("Car") ? (
                      <FaCar className="mr-2" />
                    ) : (
                      <FaMotorcycle className="mr-2" />
                    )}
                    <span>{comment.vehicleType.join(", ")}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Reg No: {comment.registerNumber}</p>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-2">
                  <FaCalendarAlt />
                  {new Date(comment.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mb-2">
                <strong className="text-lg font-medium text-gray-800">{comment.title}</strong>
                <p className="text-gray-700 mt-1">{comment.description}</p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${i < parseInt(comment.Rating) ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({comment.Rating}/5)</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  {renderSentiment(comment.sentiment)}
                  <span className="capitalize">{comment.sentiment}</span>
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
