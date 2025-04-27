import React, { useEffect, useState } from 'react';
import { FaStore, FaUser, FaEnvelope, FaInfoCircle, FaCar, FaMapMarkerAlt, FaClock, FaPhone, FaCalendarAlt } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MechanicRegistration = () => {

  const { addshopRegistration, shopRegistration, isLoading, error, mechanic } = useAuthStore()

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    shopname: '',
    email: '',
    descaboutshop: '',
    bike: false,
    car: false,
    addr: '',
    workingHours: {
      Monday: { from: '09:00', to: '18:00', notavailable: false },
      Tuesday: { from: '09:00', to: '18:00', notavailable: false },
      Wednesday: { from: '09:00', to: '18:00', notavailable: false },
      Thursday: { from: '09:00', to: '18:00', notavailable: false },
      Friday: { from: '09:00', to: '18:00', notavailable: false },
      Saturday: { from: '09:00', to: '18:00', notavailable: false },
      Sunday: { from: '09:00', to: '18:00', notavailable: true }
    }
  });

  const [activeField, setActiveField] = useState(null);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const fetchMechanicData = async () => {
    try {
      await shopRegistration()
      console.log("successfull fetched")
    } catch (error) {
      toast.error("No mechanic id found");
    }
  }


  useEffect(() => {
    fetchMechanicData()
  }, [])


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleWorkingHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value
        }
      }
    }));
  };

  const toggleWorkingDay = (day) => {
    setFormData(prev => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          notavailable: !prev.workingHours[day].notavailable
        }
      }
    }));
  };

  const getWorkingDays = () => {
    return days.filter(day => !formData.workingHours[day].notavailable);
  };

  const getNonWorkingDays = () => {
    return days.filter(day => formData.workingHours[day].notavailable);
  };


  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addshopRegistration(mechanic.name, mechanic.mobileNumber, formData)
      toast.success("Shop registered successfully")
      navigate("/verify-email")
    }
    catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Shop registered successfully")
    }
  };



  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Enter Details For Shop Registration through online
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shop Name */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 rounded-lg transition-all duration-200 ${activeField === 'shopname' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white'
                  }`}
                onClick={() => setActiveField('shopname')}
              >
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaStore className="mr-2" />
                  Shop Name
                </label>
                <input
                  type="text"
                  name="shopname"
                  required
                  className="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  value={formData.shopname}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('shopname')}
                />
              </div>

              {/* Owner Name */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 rounded-lg transition-all duration-200 ${activeField === 'ownername' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white'
                  }`}
                onClick={() => setActiveField('ownername')}
              >
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaUser className="mr-2" />
                  Owner Name
                </label>
                <input
                  type="text"
                  name="ownername"
                  readOnly
                  className="p-3 mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  value={mechanic.name}
                  onFocus={() => setActiveField('ownername')}
                />
              </div>

              {/* Email */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 rounded-lg transition-all duration-200 ${activeField === 'email' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white'
                  }`}
                onClick={() => setActiveField('email')}
              >
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaEnvelope className="mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  readOnly
                  className="p-3 mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  value={mechanic.email}
                  onFocus={() => setActiveField('email')}
                />
              </div>

              {/* Shop Description */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 rounded-lg transition-all duration-200 ${activeField === 'descaboutshop' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white'
                  }`}
                onClick={() => setActiveField('descaboutshop')}
              >
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaInfoCircle className="mr-2" />
                  Description About Shop
                </label>
                <textarea
                  name="descaboutshop"
                  rows="5"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200 p-3"
                  placeholder="Type Here"
                  value={formData.descaboutshop}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('descaboutshop')}
                />
              </div>

              {/* Service Available */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 rounded-lg transition-all duration-200 ${activeField === 'service' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white'
                  }`}
                onClick={() => setActiveField('service')}
              >
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaCar className="mr-2" />
                  Service Available for
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="bike"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      checked={formData.bike}
                      onChange={handleInputChange}
                      onFocus={() => setActiveField('service')}
                    />
                    <span className="ml-2">Bike</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="car"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                      checked={formData.car}
                      onChange={handleInputChange}
                      onFocus={() => setActiveField('service')}
                    />
                    <span className="ml-2">Car</span>
                  </label>
                </div>
              </div>


              {/* Live Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 rounded-lg transition-all duration-200 bg-white">
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  Live Location
                </label>
                <div className="flex flex-col space-y-2">
                  <button
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={async () => {
                      if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                          async (position) => {
                            setFormData((prev) => ({
                              ...prev,
                              location: {
                                type: 'Point',
                                coordinates: [position.coords.longitude, position.coords.latitude]
                              }
                            }))
                            toast.success('Location fetched successfully')

                            const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`;
                            try {
                              const response = await fetch(url);
                              const data = await response.json();
                              const address =  data.display_name || "Address not found";
                              setFormData(prev => ({
                                ...prev,
                                addr : address
                              }));
                              console.log("fetched address : ",data.display_name)
                            } catch (error) {
                              console.error("Error fetching address:", error);
                              toast.error("Error fetching address")
                            }

                          },
                          (error) => {
                            toast.error('Unable to fetch location')
                          }
                        )
                      } else {
                        toast.error('Geolocation is not supported by this browser')
                      }
                    }}
                  >
                    Fetch Live Location
                  </button>
                  {formData.location && (
                    <span className="text-xs text-gray-600">Lat: {formData.location.coordinates[1]}, Lng: {formData.location.coordinates[0]}</span>
                  )}
                </div>
              </div>

              <p className='font-light text-xs text-red-400 text-center'>Once the location is fetched the address is automatically displayed.If you want to change your address you can change</p>

              {/* Shop Address */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 rounded-lg transition-all duration-200 ${activeField === 'addr' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white'
                  }`}
                onClick={() => setActiveField('addr')}
              >
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaMapMarkerAlt className="mr-2" />
                  Address of Shop
                </label>
                <textarea
                  name="addr"
                  rows="5"
                  className="p-3 mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                  placeholder="Type Address"
                  value={formData.addr}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('addr')}
                />
              </div>



              {/* Shop Timings Section */}
              <div
                className={`space-y-6 bg-gray-50 p-6 rounded-lg transition-all duration-200 ${activeField === 'timings' ? 'border-2 border-blue-500' : ''
                  }`}
                onClick={() => setActiveField('timings')}
              >
                <div className="flex items-center">
                  <FaClock className="mr-2 text-gray-700" />
                  <h3 className="text-lg font-medium text-gray-900">Shop Operating Hours</h3>
                </div>

                {/* Days Selection */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleWorkingDay(day)}
                      className={`p-2 rounded-md transition-all duration-200 ${formData.workingHours[day].notavailable
                        ? 'bg-white text-gray-700 hover:bg-gray-50'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>

                {/* Working Hours for Each Day */}
                <div className="space-y-4">
                  {days.map((day) => (
                    <div
                      key={day}
                      className={`p-4 rounded-lg transition-all duration-200 ${formData.workingHours[day].notavailable
                        ? 'bg-gray-100'
                        : 'bg-white hover:bg-blue-50'
                        }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{day}</h4>
                        <div className="flex items-center space-x-2">
                          <input
                            type="time"
                            value={formData.workingHours[day].from}
                            onChange={(e) => handleWorkingHoursChange(day, 'from', e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            disabled={formData.workingHours[day].notavailable}
                          />
                          <span>to</span>
                          <input
                            type="time"
                            value={formData.workingHours[day].to}
                            onChange={(e) => handleWorkingHoursChange(day, 'to', e.target.value)}
                            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                            disabled={formData.workingHours[day].notavailable}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Preview Section */}
                <div className="mt-4 space-y-4">
                  <div className="p-4 bg-white rounded-md border border-gray-200 hover:border-blue-500 transition-all duration-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Working Days Preview</h4>
                    <p className="text-sm text-gray-600">
                      {getWorkingDays().join(', ')}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-md border border-gray-200 hover:border-blue-500 transition-all duration-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Non-Working Days Preview</h4>
                    <p className="text-sm text-gray-600">
                      {getNonWorkingDays().join(', ')}
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-md border border-gray-200 hover:border-blue-500 transition-all duration-200">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Working Hours Preview</h4>
                    {getWorkingDays().map((day) => (
                      <p key={day} className="text-sm text-gray-600">
                        {day}: {formData.workingHours[day].from} - {formData.workingHours[day].to}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Phone Number */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-4 rounded-lg transition-all duration-200 ${activeField === 'phnum' ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white'
                  }`}
                onClick={() => setActiveField('phnum')}
              >
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaPhone className="mr-2" />
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phnum"
                  readOnly
                  className="p-3 mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
                  value={mechanic.mobileNumber}
                  onFocus={() => setActiveField('phnum')}
                />
              </div>

              {/* Submit Button */}
              <div className="mt-8">
                <button
                  type="submit"
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