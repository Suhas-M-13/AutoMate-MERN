import { book } from "../models/bookSlot.model.js"
import { User } from "../models/user.model.js"
import {Shop} from "../models/shop.model.js"

import {comment} from "../models/comments.model.js"
import { bill } from "../models/bill.model.js"

import mongoose from "mongoose"




export const mechanicDeatil = async(req,res)=>{
    
    try {
        const mechanicId = req.userId

        if(!mechanicId){
            throw new Error("No mechanic found")
        }

        const mechanic = await User.findById(mechanicId).select("-password")

        if(!mechanic){
            throw new Error("mechanic not found")
        }

        return res.status(200).json({
            success : true,
            message: "Details fetched successfully",
            mechanic
        })
        
    } catch (error) {
        console.log('Error creating shop: ', error);
        return res.status(500).json({
          success: false,
          message: error.message || "Server error"
        });
    }
}
export const AddShop = async(req,res)=>{
    try {
        const ownerId = req.userId
        const { shopname, ownerName, mobileNumber, description, serviceAvailable, address, timings } = req.body;
    
        // Validate the request data
        // if (!shopname || !ownerName || !mobileNumber || !ownerId || !serviceAvailable) {
        //   return res.status(400).json({ success: false, message: "All fields are required" });
        // }

        if (!shopname) {
            return res.status(400).json({
              success: false,
              message: "Shop name is required"
            });
          }
          
          if (!ownerName) {
            return res.status(400).json({
              success: false,
              message: "Owner name is required"
            });
          }
          
          if (!mobileNumber) {
            return res.status(400).json({
              success: false,
              message: "Mobile number is required"
            });
          }
          
          if (!ownerId) {
            return res.status(400).json({
              success: false,
              message: "Owner ID is required"
            });
          }
          
          if (!serviceAvailable) {
            return res.status(400).json({
              success: false,
              message: "Service availability is required"
            });
          }
          
    
        // Check if owner exists (optional, but good practice to check)
        const owner = await User.findById(ownerId);
        if (!owner) {
          return res.status(404).json({ success: false, message: "Owner not found" });
        }
    
        // Create new Shop
        const newShop = new Shop({
          shopname,
          ownerName,
          mobileNumber,
          ownerId,
          description,
          serviceAvailable,
          address,
          timings
        });
    
        // Save the shop to the database
        await newShop.save();
    
        return res.status(201).json({
          success: true,
          message: "Shop created successfully",
          shop: newShop
        });
      } catch (error) {
        console.log('Error creating shop: ', error);
        return res.status(500).json({
          success: false,
          message: error.message || "Server error"
        });
      }
    
}

export const getAllCustomerRequest = async(req,res)=>{
    try {
        const mechanicId = req.userId

        const customerRequest = await book.find({
            mechanicId : new mongoose.Types.ObjectId(mechanicId),
            isAccepted : false
        })

        console.log(customerRequest)

        const customerDetail = []
        
        for(let i = 0;i<customerRequest.length;i++){
            const fetchData = await User.find({
                _id : customerRequest[i].customerId
            }).select("-password")
            customerDetail.push(fetchData)
        }

        // console.log(customerDetail[0][0].name);
        

        return res.status(200).json({
            success : true,
            message : "Successfully fetched data",
            customerRequest,
            customerDetail
        })
    } catch (error) {
        console.log('Error in fetching details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        })
    }
}

export const updateAcceptRequest = async(req,res)=>{
    try {
        const mechanicId = req.userId
        const customerId = req.params.id
        
        if(!customerId){
            throw new Error("invalid Customer...")
        }

        const bookSlot = await book.findOne({
            mechanicId,
            customerId
        })

        if(!bookSlot){
            throw new Error("no slot booked...")
        }

        bookSlot.isAccepted = true

        bookSlot.save()

        return res.status(200).json({
            success : true,
            message : "Successfully updated the accept button"
        })


    } catch (error) {
        console.log('Error in fetching details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        })
    }
}

export const getPendingList = async(req,res)=>{
    try {
        const mechanicId = req.userId

        const bookSlot = await book.find({
            mechanicId,
            isAccepted : true,
            isCompleted : false
        })

        const customerDetail = []
        
        for(let i = 0;i<bookSlot.length;i++){
            const fetchData = await User.find({
                _id : bookSlot[i].customerId
            }).select("-password")
            customerDetail.push(fetchData)
        }

        // console.log(customerDetail[0][0].name);
        

        return res.status(200).json({
            success : true,
            message : "Successfully fetched data",
            bookSlot,
            customerDetail
        })

        
    } catch (error) {
        console.log('Error in fetching details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        })
    }
}

export const getCompletedList = async(req,res)=>{
    try {
        const mechanicId = req.userId

        const bookSlot = await book.find({
            mechanicId,
            isCompleted : true
        })

        const customerDetail = []
        
        for(let i = 0;i<bookSlot.length;i++){
            const fetchData = await User.find({
                _id : bookSlot[i].customerId
            }).select("-password")
            customerDetail.push(fetchData)
        }

        // console.log(customerDetail[0][0].name);
        

        return res.status(200).json({
            success : true,
            message : "Successfully fetched data",
            bookSlot,
            customerDetail
        })

        
    } catch (error) {
        console.log('Error in fetching details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        })
    }
}

export const updateCompleteCustomerRequest = async(req,res)=>{
    try {
        const mechanicId = req.userId
        const customerId = req.params.id
        
        if(!customerId){
            throw new Error("invalid Customer...")
        }

        const bookSlot = await book.findOne({
            mechanicId,
            customerId
        })

        if(!bookSlot){
            throw new Error("no slot booked...")
        }

        bookSlot.isCompleted = true

        bookSlot.save()

        return res.status(200).json({
            success : true,
            message : "Successfully updated the complete button"
        })


    } catch (error) {
        console.log('Error in fetching details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        })
    }
}

export const getComments = async(req,res)=>{
    try {
        const mechanicId = req.userId

        const comments = await comment.find({
            mechanicId
        })

        return res.status(200).json({
            success : true,
            message : "successfully fetched",
            comments
        })
    } catch (error) {
        console.log('Error in fetching details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        })
    }
}

export const getBillForm = async(req,res)=>{
    try {
        const mechanicId = req.userId
        const customerId = req.params.id

        console.log("customer id : ",customerId);
        console.log("mechanicId id : ",mechanicId);
        

        if(!customerId || !mechanicId){
            throw new Error("no mechanic id or customer id")
        }

        const billForm = await bill.find({
            mechanicId,
            customerId
        })

        const shopDetail = await Shop.find({
            ownerId : mechanicId
        })
        const bookSlot = await book.find({
            mechanicId,
            customerId
        })
        const customerDetail = await User.findById(customerId).select("-password")
        const mechanicDetail = await User.findById(mechanicId).select("-password")

        return res.status(200).json({
            success : true,
            message : "Successfully fetched the information",
            shopDetail,
            bookSlot,
            customerDetail,
            mechanicDetail,
            billForm
        })
    } catch (error) {
        console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        }) 
    }
}

export const AddBillForm = async(req,res)=>{
    try {
        const {
            customerId,
            Decription,
            totalAmount,
            registerNumber
        } = req.body


        const mechanicId = req.userId


        console.log(customerId,
            Decription,
            totalAmount,
            registerNumber,mechanicId);
        


        if(!mechanicId || !customerId || !Decription || !totalAmount){
            throw new Error("All fields are required!!")
        }

        const newBill = new bill({
            mechanicId,
            customerId,
            registerNumber,
            Decription,
            totalAmount
        })

        await newBill.save()

        return res.status(201).json({
            success : true,
            message : "Bill data added to db"
        })
    } catch (error) {
        console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        })
    }
}

export const updateBillForm = async(req,res)=>{
    try {
        const {
            Decription,
            totalAmount
        } = req.body
        const mechanicId = req.userId
        const customerId = req.params.id

        if(!mechanicId || !customerId){
            throw new Error("customer id or mechanic id is undefined...")
        }

        const billForm = await bill.findOne({
            mechanicId,
            customerId
        })

        if(!billForm){
            throw new Error("no bill found")
        }

        console.log('desc : '+Decription+" amt : "+totalAmount);

        billForm.Decription = Decription
        billForm.totalAmount = totalAmount
        

        await billForm.save()

        return res.status(200).json({
            success : true,
            message : "Bill form Updated successfully",
            billForm
        })
    } catch (error) {
        console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        })
    }
}