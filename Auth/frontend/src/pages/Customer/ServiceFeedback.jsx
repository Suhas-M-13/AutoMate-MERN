import React, { useState } from 'react';
import { FaStar, FaTools, FaUser, FaCalendarAlt, FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ServiceFeedback = () => {
  // This would come from your API/database
  const [service] = useState({
    id: 1,
    shopName: "AutoCare Plus",
    mechanicName: "John Doe",
    serviceType: "Car Repair",
    serviceDate: "2024-03-15",
    completionTime: "2 hours",
    vehicleDetails: {
      make: "Toyota",
      model: "Camry",
      year: "2020",
      registrationNumber: "ABC123"
    },
    serviceDetails: {
      description: "Oil change and brake pad replacement",
      cost: 250,
      status: "completed"
    }
  });

  const [feedback, setFeedback] = useState({
    overallRating: 5,
    serviceQuality: 5,
    mechanicRating: 5,
    cleanliness: 5,
    communication: 5,
    valueForMoney: 5,
    comment: "",
    wouldRecommend: true,
    issues: []
  });

  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (category, value) => {
    setFeedback(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleIssueToggle = (issue) => {
    setFeedback(prev => ({
      ...prev,
      issues: prev.issues.includes(issue)
        ? prev.issues.filter(i => i !== issue)
        : [...prev.issues, issue]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle feedback submission to your backend
      console.log("Feedback submitted:", feedback);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <FaCheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-8">
              Your feedback has been submitted successfully. We appreciate your time and input.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Another Feedback
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Service Details Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <FaTools className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Service Type</p>
                  <p className="font-medium">{service.serviceType}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaUser className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Mechanic</p>
                  <p className="font-medium">{service.mechanicName}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Service Date</p>
                  <p className="font-medium">{service.serviceDate}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaClock className="text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Completion Time</p>
                  <p className="font-medium">{service.completionTime}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500">Vehicle Details</p>
                <p className="font-medium">
                  {service.vehicleDetails.year} {service.vehicleDetails.make} {service.vehicleDetails.model}
                </p>
                <p className="text-sm text-gray-500">Reg: {service.vehicleDetails.registrationNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Feedback</h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Overall Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall Service Rating
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange('overallRating', star)}
                    className={`text-2xl ${
                      star <= feedback.overallRating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Detailed Ratings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: 'Service Quality', key: 'serviceQuality' },
                { label: 'Mechanic Rating', key: 'mechanicRating' },
                { label: 'Cleanliness', key: 'cleanliness' },
                { label: 'Communication', key: 'communication' },
                { label: 'Value for Money', key: 'valueForMoney' }
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                  </label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(key, star)}
                        className={`text-xl ${
                          star <= feedback[key] ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Issues Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Did you experience any issues?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Long waiting time',
                  'Poor communication',
                  'Incomplete service',
                  'High cost',
                  'Unprofessional behavior',
                  'Dirty workspace'
                ].map((issue) => (
                  <button
                    key={issue}
                    type="button"
                    onClick={() => handleIssueToggle(issue)}
                    className={`flex items-center justify-center p-3 rounded-lg border ${
                      feedback.issues.includes(issue)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {issue}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Comments
              </label>
              <textarea
                value={feedback.comment}
                onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows="4"
                placeholder="Share your experience in detail..."
              />
            </div>

            {/* Recommendation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Would you recommend this service to others?
              </label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: true }))}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    feedback.wouldRecommend
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
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
                    !feedback.wouldRecommend
                      ? 'bg-red-100 text-red-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <FaTimesCircle />
                  <span>No</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
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