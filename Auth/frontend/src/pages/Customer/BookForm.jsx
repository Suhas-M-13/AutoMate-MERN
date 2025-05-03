import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from "framer-motion";
import { FaCalendarAlt, FaCar, FaBiking, FaClipboardList, FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaStore, FaClock } from "react-icons/fa";
import Input from '../../components/Input';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';

const BookingForm = () => {
  const location = useLocation();
  const { mechanicId } = useParams()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicle: '',
    regno: '',
    complaint: '',
    regdate: '',
    regtime: ''
  });


  const { bookFormDetail, addBookFormDetail, user, shop, mechanic, isLoading, error, message } = useAuthStore()


  const fetchBookingDetail = async () => {
    try {
      await bookFormDetail(mechanicId);
    } catch (error) {
      toast.error("Couldn't fetch detail");
      navigate('/dashboardcustomer');
    }
  };

  useEffect(() => {
    fetchBookingDetail();
  }, [mechanicId]);

  const isDateDisabled = (date) => {
    const dayOfWeek = date.getDay();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayName = days[dayOfWeek];
    
    // Check if the day is marked as not available in the mechanic's working hours
    return shop[0]?.timings?.[dayName]?.notavailable === true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.regdate || !formData.regtime) {
      toast.error("Please select both date and time");
      return false;
    }


    
    const selectedDate = new Date(formData.regdate);
    const selectedTime = new Date(formData.regtime);
    
    const selectedHours = selectedTime.getHours();
    const selectedMinutes = selectedTime.getMinutes();
  
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(selectedHours, selectedMinutes, 0, 0);
    
    console.log(selectedDateTime)
    const now = new Date();
    const todayThreePM = new Date(selectedDateTime);
    todayThreePM.setHours(15, 0, 0, 0);
    
    const shopOpeningTime = new Date(selectedDate);
    shopOpeningTime.setHours(9, 0, 0, 0);
    
    console.log(todayThreePM)
    if (selectedDateTime > todayThreePM) {
      toast.error("Booking time must be before 3 PM");
      return false;
    }

    if (selectedDateTime < shopOpeningTime) {
      toast.error("Booking time must be after 9 AM");
      return false;
    }

    if (selectedDate.toDateString() === now.toDateString() && selectedDateTime < now) {
      toast.error("Cannot book a slot in the past");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await addBookFormDetail(mechanicId,user.name,formData);
      toast.success("Slot booked successfully!");
      navigate('/dashboardcustomer');
    } catch (error) {
      toast.error("Error in booking slot");
      navigate('/dashboardcustomer')
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-full flex items-center justify-center bg-white bg-opacity-50 w-full"
    >
      <div className="max-w-4xl w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden p-8">
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Book Your Service Slot
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Shop Details Section */}
          <div className="space-y-4">
            <h2 className="font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Shop Detail</h2>
            <Input
              icon={FaStore}
              type="text"
              placeholder="Shop Name"
              value={shop[0].shopname}
              readOnly
              className="bg-gray-700"
            />
            <Input
              icon={FaUser}
              type="text"
              placeholder="Owner Name"
              value={shop[0].ownerName}
              readOnly
              className="bg-gray-700"
            />
            <Input
              icon={FaMapMarkerAlt}
              type="text"
              placeholder="Shop Address"
              value={shop[0].address}
              readOnly
              className="bg-gray-700"
            />
            <Input
              icon={FaEnvelope}
              type="email"
              placeholder="Shop Email"
              value={mechanic.email}
              readOnly
              className="bg-gray-700"
            />
          </div>

          <h2 className="font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Customer Detail</h2>
          <Input
              icon={FaUser}
              type="text"
              placeholder="Customer Name"
              value={user.name}
              readOnly
              className="bg-gray-700"
            />

          {/* Vehicle Details Section */}
          <h2 className="font-bold mb-8 bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Vehicle Detail</h2>
          <div className="space-y-4">
            <div className="flex space-x-4">
              {shop[0].serviceAvailable.includes('Bike') && (
                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="radio"
                    name="vehicle"
                    value="Bike"
                    checked={formData.vehicle === 'Bike'}
                    onChange={handleInputChange}
                    className="form-radio h-4 w-4 text-green-500"
                  />
                  <FaBiking className="text-green-500" />
                  <span>Bike</span>
                </label>
              )}

              {shop[0].serviceAvailable.includes('Car') && (
                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="radio"
                    name="vehicle"
                    value="Car"
                    checked={formData.vehicle === 'Car'}
                    onChange={handleInputChange}
                    className="form-radio h-4 w-4 text-green-500"
                  />
                  <FaCar className="text-green-500" />
                  <span>Car</span>
                </label>
              )}
            </div>
          </div>

          <Input
            icon={FaClipboardList}
            type="text"
            name="regno"
            placeholder="Vehicle Registration Number"
            value={formData.regno}
            onChange={handleInputChange}
            required
          />

          <div className="relative">
            <FaClipboardList className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <textarea
              name="complaint"
              value={formData.complaint}
              onChange={handleInputChange}
              placeholder="Describe your vehicle issues"
              rows="4"
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <Flatpickr
              name="regdate"
              value={formData.regdate}
              onChange={(date) => setFormData(prev => ({ ...prev, regdate: date[0] }))}
              options={{
                minDate: 'today',
                dateFormat: 'Y-m-d',
                disableMobile: true,
                disable: [
                  function(date) {
                    return isDateDisabled(date);
                  }
                ]
              }}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Select Date"
              required
            />
          </div>

          <div className="relative">
            <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <Flatpickr
              name="regtime"
              value={formData.regtime}
              onChange={(time) => setFormData(prev => ({ ...prev, regtime: time[0] }))}
              options={{
                enableTime: true,
                noCalendar: true,
                dateFormat: "h:i K",
                minTime: "9:00 AM",
                maxTime: "3:00 PM",
                minuteIncrement: 30,
                time_24hr: false
              }}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Select Time"
              required
            />
          </div>
      <motion.button
        className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white 
            font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
            focus:ring-offset-gray-900 transition duration-200"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
      >
        Book Slot
      </motion.button>
    </form>
      </div >
    </motion.div >
  );
};

export default BookingForm;