import express from 'express';
import { 
    getAllUsers, 
    getUserStats, 
    getAllShops, 
    verifyShop, 
    getActivityStats 
} from '../controllers/admin.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
    try {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Apply verifyToken and isAdmin middleware to all routes
router.use(verifyToken, isAdmin);

// Get all users
router.get('/users', getAllUsers);

// Get user statistics
router.get('/stats/users', getUserStats);

// Get all shops
router.get('/shops', getAllShops);

// Verify a shop
router.patch('/shops/verify/:shopId', verifyShop);

// Get activity statistics
router.get('/stats/activity', getActivityStats);

export default router; 