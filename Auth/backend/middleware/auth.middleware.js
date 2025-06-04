const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admin role required." });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error checking admin role" });
    }
};

const isMechanic = async (req, res, next) => {
    try {
        if (req.user.role !== 'mechanic') {
            return res.status(403).json({ message: "Access denied. Mechanic role required." });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error checking mechanic role" });
    }
};

const isCustomer = async (req, res, next) => {
    try {
        if (req.user.role !== 'customer') {
            return res.status(403).json({ message: "Access denied. Customer role required." });
        }
        next();
    } catch (error) {
        return res.status(500).json({ message: "Error checking customer role" });
    }
};

module.exports = {
    verifyToken,
    isAdmin,
    isMechanic,
    isCustomer
}; 