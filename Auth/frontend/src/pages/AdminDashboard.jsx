import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const AdminDashboard = () => {
    const { getAllUsers, getAllUsersStats, getAllShopsDeatils, getAllActivityStats, customerDetail, totalUsers, customersCount, mechanicsCount, shop, totalBookings, completedBookings, totalBills, paidBills, isLoading, error , logout , verfiyShopLocation } = useAuthStore()
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [userStats, setUserStats] = useState({ customers: 0, mechanics: 0 });
    const [shops, setShops] = useState([]);
    const [activityStats, setActivityStats] = useState({});
    const [selectedLocation, setSelectedLocation] = useState(null);


    const fetchData = async () => {
        try {
            await getAllUsers()
            await getAllUsersStats()
            await getAllShopsDeatils()
            await getAllActivityStats()

        } catch (error) {
            console.error('Error fetching data:', error);
            if (error.response?.status === 403) {
                navigate('/');
            }
        }
    };


    useEffect(() => {
        fetchData()
        
    }, [])

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };


    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const token = localStorage.getItem('token');
    //             if (!token) {
    //                 navigate('/login');
    //                 return;
    //             }

    //             const headers = { Authorization: `Bearer ${token}` };

    //             // Fetch all data
    //             const [usersRes, statsRes, shopsRes, activityRes] = await Promise.all([
    //                 axios.get('/api/admin/users', { headers }),
    //                 axios.get('/api/admin/stats/users', { headers }),
    //                 axios.get('/api/admin/shops', { headers }),
    //                 axios.get('/api/admin/stats/activity', { headers })
    //             ]);

    //             setUsers(usersRes.data);
    //             setUserStats(statsRes.data);
    //             setShops(shopsRes.data);
    //             setActivityStats(activityRes.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //             if (error.response?.status === 403) {
    //                 navigate('/');
    //             }
    //         }
    //     };

    //     fetchData();
    // }, [navigate]);

    const handleVerifyShop = async (shopId) => {
        try {
            await verfiyShopLocation(shopId)

            toast.success("Shop Verified successfully")

            fetchData()
        } catch (error) {
            console.error('Error verifying shop:', error);
        }
    };

    const pieChartData = [
        { name: 'Customers', value: customersCount },
        { name: 'Mechanics', value: mechanicsCount }
    ];

    const COLORS = ['#0088FE', '#00C49F'];

    

    return (
        <div className="min-h-screen bg-gray-100 p-6 w-full">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                        <p className="text-3xl font-bold">{totalUsers - 1}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Total Bookings</h3>
                        <p className="text-3xl font-bold">{totalBookings}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Completed Bookings</h3>
                        <p className="text-3xl font-bold">{completedBookings}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Total Bills Generated</h3>
                        <p className="text-3xl font-bold">{totalBills || 0}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h3 className="text-lg font-semibold mb-2">Total Bills Paid</h3>
                        <p className="text-3xl font-bold">{paidBills || 0}</p>
                    </div>
                </div>

                {/* User Distribution Chart */}
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold mb-4">User Distribution</h2>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-semibold mb-4">Users List</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {customerDetail && customerDetail.map((user) => (
                                    <tr key={user._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.mobileNumber}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.isverified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {user.isverified ? 'Verified' : 'Unverified'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Shop Verification Section */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Shop Verification</h2>

                    {/* Map */}
                    <div className="h-96 mb-6">
                        <MapContainer
                            center={[20.5937, 78.9629]} // Center of India
                            zoom={5}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            {shop && shop.map((shop) => (
                                <Marker
                                    key={shop._id}
                                    position={[shop.location.coordinates[1], shop.location.coordinates[0]]}
                                >
                                    <Popup>
                                        <div>
                                            <h3 className="font-semibold">{shop.shopname}</h3>
                                            <p>{shop.address}</p>
                                            <p>Status: {shop.isShopVerified ? 'Verified' : 'Unverified'}</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>

                    {/* Shops List */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Shop Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {shop && shop.map((shop) => (
                                    <tr key={shop._id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{shop.shopname}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{shop.ownerName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{shop.address}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${shop.isShopVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {shop.isShopVerified ? 'Verified' : 'Unverified'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button
                                                onClick={() => handleVerifyShop(shop._id)}
                                                disabled={shop.isShopVerified}
                                                className={`px-4 py-2 rounded ${shop.isShopVerified
                                                        ? 'bg-gray-300 cursor-not-allowed'
                                                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                                                    }`}
                                            >
                                                {shop.isShopVerified ? 'Verified' : 'Verify Shop'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 