import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaCar, FaCalendarAlt, FaDownload } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import toast from "react-hot-toast"
import {useParams} from "react-router-dom"
import { usePDF } from 'react-to-pdf';
import CryptoJS from 'crypto-js';

const Invoice = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const encryptedVeh = searchParams.get('veh');

  const { invoice, user, mechanic, bill, shop, book, error, isLoading } = useAuthStore();
  const {invoiceId} = useParams()
  const invoiceRef = useRef();
  const { toPDF, targetRef } = usePDF({filename: 'invoice.pdf'});

  const fetchInvoiceInformation = async () => {
    try {
      if (!invoiceId) {
        toast.error("No invoice ID provided");
        return;
      }

      const bytes = CryptoJS.AES.decrypt(encryptedVeh, import.meta.env.VITE_SECRETKEY);
      const bookslotId = bytes.toString(CryptoJS.enc.Utf8);

      await invoice(invoiceId,bookslotId);
    } catch (error) {
      toast.error("Error in fetching invoice information");
    }
  };

  useEffect(() => {
    fetchInvoiceInformation();
  }, [invoiceId]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error : {error}</div>;
  }

  if (!bill || bill.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">No bill data available</div>;
  }

  const currentBill = bill[0];
  const currentShop = shop?.[0];
  const currentBook = book;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-4xl mx-auto">
        {/* Download Button */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => toPDF()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <FaDownload className="mr-2" />
            Download Invoice
          </button>
        </div>

        {/* Invoice Content */}
        <div ref={targetRef} className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Invoice Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">{currentShop?.shopname}</h1>
              </div>
              <div className="text-right">
                <h1 className="text-3xl font-bold text-blue-600">INVOICE</h1>
              </div>
            </div>
          </div>

          {/* Invoice Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoice To</h2>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Customer Name</p>
                    <p className="text-base font-medium text-gray-900">{user?.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Contact Number</p>
                    <p className="text-base font-medium text-gray-900">{user?.mobileNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Vehicle Type</p>
                    <p className="text-base font-medium text-gray-900">{currentBook?.vehicleType}</p>
                  </div>
                </div>
              </div>

              {/* Invoice Details */}
              <div className="text-right">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h2>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Vehicle Register Number</p>
                    <p className="text-base font-medium text-gray-900">{currentBook?.registerNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Booked Date</p>
                    <p className="text-base font-medium text-gray-900">{new Date(currentBook?.bookDate).toDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bill Details */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Bill Details</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{currentBill?.Decription}</p>
            </div>
          </div>

          {/* Payment Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Payment Method */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FaPhone className="text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-600">Mechanic Number</p>
                      <p className="text-base font-medium text-gray-900">{mechanic?.mobileNumber}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Amount */}
              <div className="text-right">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Total Amount</h2>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Amount In INR</p>
                    <p className="text-2xl font-bold text-blue-600">₹{currentBill?.totalAmount}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Terms and Conditions
            </h2>
            <p className="text-gray-600">
              By using Automate, users agree to provide accurate information, use
              the platform respectfully, and follow all guidelines. AI features
              assist but do not guarantee accuracy. Offensive content is
              prohibited, and user data is protected. Automate may update services
              or restrict access for policy violations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;