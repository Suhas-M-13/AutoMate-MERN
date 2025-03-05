import crypto from "crypto"

import { sendPasswordResetEmail, sendResetSuccessfulEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js"

import {User} from "../models/user.model.js"

import {comparePassword, hashPassword } from "../services/bcrypt.js"
import { generateVerificationCode } from "../services/verificationCode.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"

export const signup = async (req,res)=>{
    const {email,password,name,role,mobileNumber} = req.body

    try {
        if(!email || !password || !name || !role || !mobileNumber){
            throw new Error("All Fields are required")
        }

        const userExist = await User.findOne({
            email
        })

        if(userExist){
            return res.status(400).json({
                success : false,
                message : "User already exist"
            })
        }

        const hashedPassword = await hashPassword(password)

        const verificationToken = generateVerificationCode()

        const user = new User({
            email,
            password : hashedPassword,
            name,
            verificationToken,
            role,
            mobileNumber,
            verificationTokenExpiresAt : Date.now() + 24*60*60*1000
        })

        await user.save()

        generateTokenAndSetCookie(res,user._id)

        await sendVerificationEmail(user.email,verificationToken)

        res.status(201).json({
            success : true,
            message : "User Added to Database",
            user : {
                ...user._doc,
                password : undefined
            }
        })


    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body

    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not Found"
            })
        }

        const isPasswordValid = await comparePassword(password,user.password)

        if(!isPasswordValid){
            return res.status(400).json({
                success : false,
                message : "Invalid password"
            })
        }

        generateTokenAndSetCookie(res,user._id)

        user.lastlogin = new Date()
        await user.save()

        // console.log("logged in");
        

        res.status(200).json({
            success : true,
            message : "Logged In successfully",
            user : {
                ...user._doc,
                password : undefined
            }
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export const logout = async (req,res)=>{
    res.clearCookie("token")
    res.status(200).json({
        success : true,
        message : "Logged out successfully"
    })
}

export const verifyEmail = async(req,res)=>{
    const {code} = req.body
    // console.log(code);
    

    try {
        const user = await User.findOne({
            verificationToken:code,
            verificationTokenExpiresAt : {$gt : Date.now()},
        })
        // console.log(user);
        
        if(!user){
            return res.status(404).json({
                success : false,
                message : "Invalid Code"
            })
        }

        user.isverified = true
        user.verificationToken = undefined
        user.verificationTokenExpiresAt = undefined
        await user.save()

        await sendWelcomeEmail(user.email,user.name)

        res.status(200).json({
            success : true,
            message : "Welcome email sent successfully",
            user : {
                ...user._doc,
                password : undefined, 
            }
        })


    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export const forgotPassword = async(req,res) => {
    const {email} = req.body

    try {
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }

        const resetToken = crypto.randomBytes(20).toString("hex")
        const resetTokenExpiresAt = Date.now() + 60*60*1000

        user.resetPasswordToken = resetToken
        user.resetPasswordExpiresAt = resetTokenExpiresAt

        await user.save()
        
        if(process.env.NODE_ENV === "production"){

            await sendPasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`)
            
        }
        else{
            await sendPasswordResetEmail(user.email,`${process.env.Frontend_URL}/reset-password/${resetToken}`)
        }
        res.status(200).json({
            success : true,
            message : "Reset email sent successfully",
        })


    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export const resetPassword = async(req,res) => {
    try {
        const {token} = req.params
        const {password} = req.body

        const user = await User.findOne({
            resetPasswordToken : token,
            resetPasswordExpiresAt : { $gt : Date.now()},
        })

        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found or innvalid reset token or token expired"
            })
        }

        const hashedPassword = await hashPassword(password)

        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpiresAt = undefined

        await user.save()

        await sendResetSuccessfulEmail(user.email);

        res.status(200).json({
            success : true,
            message : "Password Reset successfully",
        })


    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}

export const checkAuth = async(req,res)=>{
    try {
        const user = await User.findById(req.userId).select("-password")
        
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }

        res.status(200).json({
            success : true,
            user
        })

    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        })
    }
}