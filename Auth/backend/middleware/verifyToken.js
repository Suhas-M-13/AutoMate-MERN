import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

export const verifyToken = async (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "not authorised - no token found"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "not authorised - invalid token found"
            })
        }

        const user = await User.findById(decoded.userId).select('-password')
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            })
        }

        req.userId = decoded.userId
        req.user = user
        next()

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `Server error + ${error.message}`
        })
    }
}