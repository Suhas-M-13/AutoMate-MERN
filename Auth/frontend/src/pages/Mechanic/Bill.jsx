import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Bill = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    customerRole: '',
    vehicletype: '',
    registerNumber: '',
    bookeddate: '',
    description: '',
    shopname: '',
    mechanicphno: '',
    totalDue: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFormData(prev => ({
      ...prev,
      customerName: params.get('customerId') || '',
      registerNumber: params.get('registernumber') || '',
      customerRole: params.get('customernumber') || '',
      vehicletype: params.get('vehicletype') || '',
      bookeddate: params.get('bookeddate') || '',
      mechanicphno: params.get('mechanicnumber') || '',
      shopname: params.get('shopname') || ''
    }));
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/storebill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        navigate('/invoice-confirmation');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Invoice Input Form</h1>
      <form onSubmit={handleSubmit}>
        <fieldset className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
          <legend className="text-xl font-semibold text-gray-700 px-2 mb-4">Invoice To</legend>
          <div className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Customer Name:</label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                readOnly
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="customerRole" className="block text-sm font-medium text-gray-700 mb-1">Customer Number:</label>
              <input
                type="text"
                id="customerRole"
                name="customerRole"
                value={formData.customerRole}
                readOnly
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="vehicletype" className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type:</label>
              <input
                type="text"
                id="vehicletype"
                name="vehicletype"
                value={formData.vehicletype}
                readOnly
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
          <legend className="text-xl font-semibold text-gray-700 px-2 mb-4">Booking Details</legend>
          <div className="space-y-4">
            <div>
              <label htmlFor="registerNumber" className="block text-sm font-medium text-gray-700 mb-1">Register Number:</label>
              <input
                type="text"
                id="registerNumber"
                name="registerNumber"
                value={formData.registerNumber}
                readOnly
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="bookeddate" className="block text-sm font-medium text-gray-700 mb-1">Booked Date:</label>
              <input
                type="text"
                id="bookeddate"
                name="bookeddate"
                value={formData.bookeddate}
                readOnly
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
          <legend className="text-xl font-semibold text-gray-700 px-2 mb-4">Items</legend>
          <p className="text-gray-600 mb-4">Enter what new part added to vehicle and provide price for each</p>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="5"
              placeholder="Type Here"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </fieldset>

        <fieldset className="border border-gray-200 rounded-lg p-6 mb-6 bg-gray-50">
          <legend className="text-xl font-semibold text-gray-700 px-2 mb-4">Payment Details</legend>
          <div className="space-y-4">
            <div>
              <label htmlFor="shopname" className="block text-sm font-medium text-gray-700 mb-1">Mechanic Shop:</label>
              <input
                type="email"
                id="shopname"
                name="shopname"
                value={formData.shopname}
                readOnly
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="mechanicphno" className="block text-sm font-medium text-gray-700 mb-1">Mechanic Number:</label>
              <input
                type="email"
                id="mechanicphno"
                name="mechanicphno"
                value={formData.mechanicphno}
                readOnly
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="totalDue" className="block text-sm font-medium text-gray-700 mb-1">Total Amount (With Tax):</label>
              <input
                type="number"
                id="totalDue"
                name="totalDue"
                value={formData.totalDue}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </fieldset>

        <button 
          type="submit" 
          className="w-full py-4 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Generate Invoice
        </button>
      </form>
    </div>
  );
};

export default Bill; 