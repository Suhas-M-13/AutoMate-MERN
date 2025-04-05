import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shopname: '',
    ownername: '',
    address: '',
    email: '',
    name: '',
    phno: '',
    custemail: '',
    vehicle: '',
    regno: '',
    complaint: '',
    regdate: '',
    regtime: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFormData(prev => ({
      ...prev,
      shopname: params.get('shopname') || '',
      ownername: params.get('ownername') || '',
      address: params.get('address') || '',
      email: params.get('email') || '',
      name: params.get('customername') || '',
      phno: params.get('mobile') || '',
      custemail: params.get('custemail') || ''
    }));
  }, [location]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const selectedDate = new Date(formData.regdate);
    const selectedTime = formData.regtime;
    const selectedDateTime = new Date(`${formData.regdate}T${selectedTime}`);

    const today = new Date();
    const todayThreePM = new Date(today);
    todayThreePM.setHours(15, 0, 0, 0);

    if (selectedDate.toISOString().split('T')[0] === today.toISOString().split('T')[0] && 
        selectedDateTime > todayThreePM) {
      alert("Booking time must be before 3 PM on the selected date.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('/bookslot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Success:', data);
        navigate('/booking-confirmation');
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shop Details Section */}
            <fieldset className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <legend className="text-xl font-bold text-gray-800 px-2 mb-4">Slot Booking</legend>
              <div className="space-y-4">
                <div>
                  <label htmlFor="shopname" className="block text-sm font-medium text-gray-700">Shop Name:</label>
                  <input
                    type="text"
                    id="shopname"
                    name="shopname"
                    value={formData.shopname}
                    readOnly
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="ownername" className="block text-sm font-medium text-gray-700">Owner Name:</label>
                  <input
                    type="text"
                    id="ownername"
                    name="ownername"
                    value={formData.ownername}
                    readOnly
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shop Address:</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    readOnly
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    readOnly
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 cursor-not-allowed"
                  />
                </div>
              </div>
            </fieldset>

            {/* Vehicle Details Section */}
            <fieldset className="border border-gray-200 rounded-lg p-6 bg-gray-50">
              <legend className="text-xl font-bold text-gray-800 px-2 mb-4">Vehicle Details</legend>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Customer Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    readOnly
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="phno" className="block text-sm font-medium text-gray-700">Phone Number:</label>
                  <input
                    type="tel"
                    id="phno"
                    name="phno"
                    value={formData.phno}
                    readOnly
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="custemail" className="block text-sm font-medium text-gray-700">Email:</label>
                  <input
                    type="email"
                    id="custemail"
                    name="custemail"
                    value={formData.custemail}
                    readOnly
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type:</label>
                  <div className="flex space-x-6">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="vehicle"
                        value="Bike"
                        checked={formData.vehicle === 'Bike'}
                        onChange={handleInputChange}
                        required
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">Bike</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="vehicle"
                        value="Car"
                        checked={formData.vehicle === 'Car'}
                        onChange={handleInputChange}
                        required
                        className="form-radio h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-gray-700">Car</span>
                    </label>
                  </div>
                </div>
                <div>
                  <label htmlFor="regno" className="block text-sm font-medium text-gray-700">Register Number:</label>
                  <input
                    type="text"
                    id="regno"
                    name="regno"
                    value={formData.regno}
                    onChange={handleInputChange}
                    placeholder="Vehicle Number Plate"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="complaint" className="block text-sm font-medium text-gray-700">Complaints:</label>
                  <textarea
                    id="complaint"
                    name="complaint"
                    value={formData.complaint}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Mention please..."
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="regdate" className="block text-sm font-medium text-gray-700">Select Date:</label>
                  <Flatpickr
                    id="regdate"
                    name="regdate"
                    value={formData.regdate}
                    onChange={(date) => setFormData(prev => ({ ...prev, regdate: date[0] }))}
                    options={{
                      minDate: 'today',
                      dateFormat: 'Y-m-d',
                      disableMobile: true
                    }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="regtime" className="block text-sm font-medium text-gray-700">Select Time:</label>
                  <input
                    type="time"
                    id="regtime"
                    name="regtime"
                    value={formData.regtime}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </fieldset>

            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Book Slot
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;