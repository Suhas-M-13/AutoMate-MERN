import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next)=>{
    // Check for token in cookies first
    let token = req.cookies.token

    // If not in cookies, check Authorization header
    if(!token && req.headers.authorization){
        const authHeader = req.headers.authorization
        if(authHeader.startsWith('Bearer ')){
            token = authHeader.split(' ')[1]
        }
    }

    if(!token){
        return res.status(401).json({
            success : false,
            message : "not authorised - no token found"
        })
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({
                success : false,
                message : "not authorised - invalid token found"
            })
        }

        req.userId = decoded.userId
        next()

    } catch (error) {
        res.status(500).json({
            success : false,
            message : `Server error + ${error.message}`
        })
    }
}