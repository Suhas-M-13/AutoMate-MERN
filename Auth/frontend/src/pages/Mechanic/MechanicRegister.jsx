import React, { useState } from 'react';
import { FaStore, FaUser, FaEnvelope, FaInfoCircle, FaCar, FaMapMarkerAlt, FaClock, FaPhone, FaCalendarAlt } from 'react-icons/fa';

const MechanicRegistration = ({ ownername, email, mobile }) => {
  const [formData, setFormData] = useState({
    shopname: '',
    ownername: ownername || '',
    email: email || '',
    descaboutshop: '',
    bike: false,
    car: false,
    addr: '',
    phnum: mobile || '',
    workingHours: {
      startTime: '09:00',
      endTime: '18:00',
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      isOpenOnSunday: false
    }
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleWorkingHoursChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [name]: value
      }
    }));
  };

  const handleWorkingDaysChange = (day) => {
    setFormData(prev => {
      const currentDays = [...prev.workingHours.workingDays];
      
      if (day === 'Sunday') {
        return {
          ...prev,
          workingHours: {
            ...prev.workingHours,
            isOpenOnSunday: !prev.workingHours.isOpenOnSunday
          }
        };
      }

      const dayIndex = currentDays.indexOf(day);
      if (dayIndex === -1) {
        currentDays.push(day);
      } else {
        currentDays.splice(dayIndex, 1);
      }

      const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      currentDays.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));

      return {
        ...prev,
        workingHours: {
          ...prev.workingHours,
          workingDays: currentDays
        }
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/mechreg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        console.log('Registration successful');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Enter Details For Shop Registration through online
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shop Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaStore className="mr-2" />
                  Shop Name
                </label>
                <input
                  type="text"
                  name="shopname"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.shopname}
                  onChange={handleInputChange}
                />
              </div>

              {/* Owner Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaUser className="mr-2" />
                  Owner Name
                </label>
                <input
                  type="text"
                  name="ownername"
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  value={formData.ownername}
                />
              </div>

              {/* Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaEnvelope className="mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  value={formData.email}
                />
              </div>

              {/* Shop Description */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaInfoCircle className="mr-2" />
                  Description About Shop
                </label>
                <textarea
                  name="descaboutshop"
                  rows="5"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Type Here"
                  value={formData.descaboutshop}
                  onChange={handleInputChange}
                />
              </div>

              {/* Service Available */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaCar className="mr-2" />
                  Service Available for
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="bike"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      checked={formData.bike}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">Bike</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="car"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      checked={formData.car}
                      onChange={handleInputChange}
                    />
                    <span className="ml-2">Car</span>
                  </label>
                </div>
              </div>

              {/* Shop Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  Address of Shop
                </label>
                <textarea
                  name="addr"
                  rows="5"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Type Address"
                  value={formData.addr}
                  onChange={handleInputChange}
                />
              </div>

              {/* Shop Timings Section */}
              <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center">
                  <FaClock className="mr-2 text-gray-700" />
                  <h3 className="text-lg font-medium text-gray-900">Shop Operating Hours</h3>
                </div>

                {/* Working Hours */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Opening Time
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.workingHours.startTime}
                      onChange={handleWorkingHoursChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Closing Time
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={formData.workingHours.endTime}
                      onChange={handleWorkingHoursChange}
                    />
                  </div>
                </div>

                {/* Working Days */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Working Days
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {days.map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={`inline-flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                          (day === 'Sunday' 
                            ? formData.workingHours.isOpenOnSunday 
                            : formData.workingHours.workingDays.includes(day))
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => handleWorkingDaysChange(day)}
                      >
                        <span className="text-sm">{day}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="mt-4 p-4 bg-white rounded-md border border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Operating Hours Preview</h4>
                  <p className="text-sm text-gray-600">
                    {formData.workingHours.workingDays.join(', ')}
                    {formData.workingHours.isOpenOnSunday ? ', Sunday' : ''}
                    <br />
                    {formData.workingHours.startTime} - {formData.workingHours.endTime}
                  </p>
                </div>
              </div>

              {/* Phone Number */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaPhone className="mr-2" />
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phnum"
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  value={formData.phnum}
                />
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
                  name="register"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MechanicRegistration;