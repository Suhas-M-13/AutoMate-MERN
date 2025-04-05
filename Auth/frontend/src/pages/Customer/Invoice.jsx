import React from "react";
import { useLocation } from "react-router-dom";
import {
	FaPhone,
	FaEnvelope,
	FaMapMarkerAlt,
	FaCar,
	FaCalendarAlt,
} from "react-icons/fa";

const Invoice = () => {
	const location = useLocation();
	const data = location.state?.data || {};

	return (
		<div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
				{/* Invoice Header */}
				<div className="p-6 border-b border-gray-200">
					<div className="flex justify-between items-start">
						<div className="flex-1">
							<h1 className="text-3xl font-bold text-gray-900">
								{data.shopname}
							</h1>
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
							<h2 className="text-lg font-semibold text-gray-900 mb-4">
								Invoice To
							</h2>
							<div className="space-y-2">
								<div>
									<p className="text-sm text-gray-600">Customer Name</p>
									<p className="text-base font-medium text-gray-900">
										{data.customername}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">Contact Number</p>
									<p className="text-base font-medium text-gray-900">
										{data.customernumber}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">Vehicle Type</p>
									<p className="text-base font-medium text-gray-900">
										{data.vehicletype}
									</p>
								</div>
							</div>
						</div>

						{/* Invoice Details */}
						<div className="text-right">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">
								Invoice Details
							</h2>
							<div className="space-y-2">
								<div>
									<p className="text-sm text-gray-600">
										Vehicle Register Number
									</p>
									<p className="text-base font-medium text-gray-900">
										{data.registernumber}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">Booked Date</p>
									<p className="text-base font-medium text-gray-900">
										{data.bookeddate}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Bill Details */}
				<div className="p-6 border-b border-gray-200">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Bill Details
					</h2>
					<div className="bg-gray-50 p-4 rounded-lg">
						<p className="text-gray-700 whitespace-pre-line">{data.itemdesc}</p>
					</div>
				</div>

				{/* Payment Info */}
				<div className="p-6 border-b border-gray-200">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* Payment Method */}
						<div>
							<h2 className="text-lg font-semibold text-gray-900 mb-4">
								Payment Method
							</h2>
							<div className="space-y-2">
								<div className="flex items-center">
									<FaPhone className="text-gray-400 mr-2" />
									<div>
										<p className="text-sm text-gray-600">Mechanic Number</p>
										<p className="text-base font-medium text-gray-900">
											{data.mechanicnumber}
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Total Amount */}
						<div className="text-right">
							<h2 className="text-lg font-semibold text-gray-900 mb-4">
								Total Amount
							</h2>
							<div className="space-y-2">
								<div>
									<p className="text-sm text-gray-600">Amount In INR</p>
									<p className="text-2xl font-bold text-blue-600">
										₹{data.totalamount}
									</p>
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
	);
};

export default Invoice;
