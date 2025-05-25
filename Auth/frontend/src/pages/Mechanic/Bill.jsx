import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import CryptoJS from 'crypto-js';


const Bill = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const encryptedVeh = searchParams.get('veh');
  
  const {customerId} = useParams()
  const {addBillData , getBillData , user , mechanic , shop , bill , book , error , isLoading} = useAuthStore()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    description: '',
    totalDue: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    fetchData()    
  }, []);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      description : book[0]?.complaintDescription
    }));
  }, [book[0]?.complaintDescription])
  

  const fetchData = async()=>{
    try {
      if (!customerId) {
        toast.error("No customerId provided");
        return;
      }

      const bytes = CryptoJS.AES.decrypt(encryptedVeh, import.meta.env.VITE_SECRETKEY);
      const vehicleRegNumber = bytes.toString(CryptoJS.enc.Utf8);
      // console.log("bookslot id : ",vehicleRegNumber);
      
      await getBillData(customerId,vehicleRegNumber)
    } catch (error) {
      toast.error(error.message || "Error in fetching shop information");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(bill.length !== 0){
        toast.success("Bill already generated for this customer")
        // navigate('/dashboardmechanic')
        return
      }
      if (!book || book.length === 0) {
        toast.error("No booking information available");
        return;
      }
      
      
      await addBillData(customerId, book.registerNumber,formData,book._id);
      toast.success("Bill created successfully");
      navigate('/dashboardmechanic');
    } catch (error) {
      toast.error(error.message || "Error in creating bill");
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (!book || book.length === 0) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">No booking information available</div>;
  }

  const currentBook = book

  return (
    <div className="mx-auto p-8 bg-white rounded-lg shadow-md w-full">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Invoice Form</h1>
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
                value={user?.name || ''}
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
                value={user?.mobileNumber || ''}
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
                value={currentBook?.vehicleType || ''}
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
                value={currentBook?.registerNumber || ''}
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
                value={new Date(currentBook?.bookDate).toLocaleDateString() || ''}
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
                type="text"
                id="shopname"
                name="shopname"
                value={shop[0]?.shopname || ''}
                readOnly
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="mechanicphno" className="block text-sm font-medium text-gray-700 mb-1">Mechanic Number:</label>
              <input
                type="text"
                id="mechanicphno"
                name="mechanicphno"
                value={mechanic?.mobileNumber || ''}
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