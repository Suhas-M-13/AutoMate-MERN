import { User } from '../models/user.model.js';
import { Shop } from '../models/shop.model.js';
import { book } from '../models/bookSlot.model.js';
import { bill } from '../models/bill.model.js';

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.status(200).json({
            message : "successfully fetched all users",
            users : users
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user statistics
export const getUserStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const customers = await User.countDocuments({ role: 'customer' });
        const mechanics = await User.countDocuments({ role: 'mechanic' });
        
        res.status(200).json({
            totalUsers,
            customers,
            mechanics
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all shops for verification
export const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find();
        // console.log(shops)
        res.status(200).json({shopDetails : shops});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Verify a shop
export const verifyShop = async (req, res) => {
    try {
        const { shopId } = req.params;
        const shop = await Shop.findByIdAndUpdate(
            shopId,
            { isShopVerified: true },
            // { new: true }
        );
        
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }
        
        res.status(200).json({
            message : "shop verified successfully",
            updatedShop : shop
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get website activity statistics
export const getActivityStats = async (req, res) => {
    try {
        const totalBookings = await book.countDocuments();
        const completedBookings = await book.countDocuments({ isCompleted: true });
        const totalBills = await bill.countDocuments();
        const paidBills = await book.countDocuments({isPaid : true});
        
        res.status(200).json({
            totalBookings,
            completedBookings,
            totalBills,
            paidBills
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 