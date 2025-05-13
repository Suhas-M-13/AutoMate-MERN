import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaTools, FaPhone, FaMoneyBillWave, FaCreditCard, FaAddressCard } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore';
import CryptoJS from 'crypto-js';
import toast from 'react-hot-toast';
import axios from 'axios';

const PaymentPage = () => {
    const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PK_TEST}`);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const encryptedVeh = searchParams.get('veh');
    const { mechanicId } = useParams();
    const navigate = useNavigate();
    const { invoice, shop, book, bill, isLoading, error } = useAuthStore();
    const [amount, setAmount] = useState(0);

    const fetchServiceDetails = async () => {
        try {
            const bytes = CryptoJS.AES.decrypt(encryptedVeh, import.meta.env.VITE_SECRETKEY);
            const vehicleRegNumber = bytes.toString(CryptoJS.enc.Utf8);
            // await serviceFeedback(mechanicId, vehicleRegNumber);
            await invoice(mechanicId, vehicleRegNumber);
        } catch (error) {
            toast.error("Error fetching service details");
        }
    };

    useEffect(() => {
        fetchServiceDetails();
    }, [mechanicId]);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
    }

    const currentShop = shop?.[0];
    const currentBook = book?.[0];

    return (
        <div className="w-full min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Service Details Card */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FaUser className="text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Mechanic Name</p>
                                    <p className="font-medium">{currentShop?.ownerName}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaTools className="text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Shop Name</p>
                                    <p className="font-medium">{currentShop?.shopname}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaPhone className="text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Phone Number</p>
                                    <p className="font-medium">{currentShop?.mobileNumber}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <FaAddressCard className="text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Bill Detail</p>
                                    <p className="whitespace-pre-line font-light text-sm text-black">{bill[0]?.Decription}</p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <FaMoneyBillWave className="text-gray-400 mr-3" />
                                <div>
                                    <p className="text-sm text-gray-500">Total Amount</p>
                                    <p className="font-medium text-xl text-green-600">₹ {bill[0]?.totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Form */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
                    <Elements stripe={stripePromise}>
                        <PaymentForm amount={bill[0]?.totalAmount} mechanicId={mechanicId} vehicleRegNumber={currentBook?.registerNumber} billId={bill[0]?._id} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

const PaymentForm = ({ amount, mechanicId, vehicleRegNumber, billId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { updatePay } = useAuthStore();
    const [processing, setProcessing] = useState(false);


    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        if (!stripe || !elements) {
            return;
        }

        try {
            const response = await axios.post('http://localhost:1972/api/consumer/payment', {
                billId,
            });

            const data = response.data

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                toast.error("Unsuccessfull Payment.Could Proceed with Payment")
            } else if (result.paymentIntent.status === 'succeeded') {
                toast.success("Payment successful!");
                await updatePay(mechanicId, vehicleRegNumber);
                const encryptedVeh = CryptoJS.AES.encrypt(vehicleRegNumber, import.meta.env.VITE_SECRETKEY).toString();
                navigate(`/servicefeedback/${mechanicId}?veh=${encodeURIComponent(encryptedVeh)}`)
            }
        } catch (error) {
            toast.error("Payment failed. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                    Card Details
                </label>
                <div className="p-4 border rounded-lg bg-gray-50">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">
                    Total: <span className="text-green-600">₹{amount}</span>
                </div>
                <button
                    type="submit"
                    disabled={!stripe || processing}
                    className={`px-6 py-3 rounded-lg text-white font-medium flex items-center space-x-2
                        ${!stripe || processing
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    <FaCreditCard className="mr-2" />
                    <span>{processing ? 'Processing...' : 'Pay Now'}</span>
                </button>
            </div>
        </form>
    );
};

export default PaymentPage;
