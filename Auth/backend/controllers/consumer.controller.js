import {Shop} from "../models/shop.model.js"
import { User } from "../models/user.model.js"
import { book } from "../models/bookSlot.model.js"
import { bill } from "../models/bill.model.js"
import { comment } from "../models/comments.model.js"
import mongoose from "mongoose"
import { analyzeReviewWithHuggingFace } from "../services/analyzeReviewWithHuggingFace.js"


export const getAllShopList = async(req,res)=>{
    try {
        const allShop = await Shop.find({})

        if(!allShop){
            throw new Error("Error in fetching...")
        }

        return res.status(200).json({
            shopList : allShop,
            success : true,
            message : "fetched All shop details"
        })
    } catch (error) {
        console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success : false,
            message : "Failed to fetched shop details"
        })     
    }
}

export const getShopById = async(req,res)=>{
    const {id} = req.params

    try {
        const reqShop = await Shop.find({
            ownerId : id
        })
        const comments = await comment.find({
            mechanicId : id
        })

        if(!reqShop){
            throw new Error("Error in fetching...")
        }
        if(!comments){
            throw new Error("Error in fetching comments...")
        }

        return res.status(200).json({
            shopList : reqShop,
            reviews : comments,
            success : true,
            message : "fetched required shop details"
        })
    } catch (error) {
        console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success : false,
            message : "Failed to fetched shop details"
        })     
    }


}

export const getBookFormDetails = async(req,res)=>{
    
    
    try {
        const mechanicId = req.params.id
        const customerId = req.userId;

        const shopDetail = await Shop.find({
            ownerId : mechanicId
        })
        const customerDetail = await User.findById(customerId).select("-password");
        const mechanicDetail = await User.findById(mechanicId).select("-password");

        if(!shopDetail || !customerDetail || !mechanicDetail){
            throw new Error("Error in fetching shop , customer , mechanic detail")
        }

        return res.status(200).json({
            success : true,
            message : "All details fetched",
            shopDetail,
            customerDetail,
            mechanicDetail
        })
    } catch (error) {
        console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        }) 
    }
}

export const addBookSlot = async(req,res)=>{
    try {
        
        const {
            mechanicId,
            customerName,
            vehicleType,
            registerNumber,
            complaintDescription,
            bookDate,
            bookTime,
        } = req.body

        const customerId = req.userId

        if(!mechanicId || !customerName || !vehicleType || !registerNumber || !complaintDescription || !bookDate || !bookTime){
            throw new Error("All fields are required!!!")
        }

        if(!customerId){
            throw new Error("customer id not found")
        }

        const checkSlot = await book.find({
            registerNumber
        })

        if(checkSlot && checkSlot.isAccepted){
            throw new Error("For one vehicle only one booking can be done until the current status of the vehicle service is completed")
        }

        const newBookSlot = new book({
            mechanicId,
            customerId,
            customerName,
            vehicleType,
            registerNumber,
            complaintDescription,
            bookDate,
            bookTime,
            isAccepted : false,
            isCompleted : false,
            isPaid : false
        })

        await newBookSlot.save()

        return res.status(201).json({
            success : true,
            message : "Slot details added successfully"
        })
    } catch (error) {
        console.log('Error in book'+error);
        return res.status(400).json({
            success : false,
            message : error
        }) 
    }
}

export const getShopListPendingById = async(req,res)=>{
    try {
        const customerId = req.userId

        if(!customerId){
            throw new Error("Not Authenticated..")
        }
        console.log('id : '+customerId);
        
        const bookSlot = await book.find({
            customerId,
            isCompleted : false
        })

        if(!bookSlot){
            return res.status(200).json({
                success : true,
                message : "No list of shops",
                bookSlot
            })
        }

        const shopDetail = []

        for(let i = 0;i<bookSlot.length;i++){   
            const fetchData = await Shop.find({
                ownerId : bookSlot[i].mechanicId
            })
            
            const shopWithBooking = {
                ...fetchData[0].toObject(), 
                isAccepted: bookSlot[i].isAccepted,
                registerNumber: bookSlot[i].registerNumber,
                vehicleType: bookSlot[i].vehicleType
            }
            
            shopDetail.push(shopWithBooking)
        }

        if(!shopDetail){
            throw new Error("Couldn't fetch shop details")
        }

        return res.status(200).json({
            success : true,
            message : "Data fetched successfully",
            bookSlot,
            shopDetail
        })
    } catch (error) {
        console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success : false,
            message : error.message
        }) 
    }
}

export const getShopListCompletedById = async(req,res)=>{
    try {
        const customerId = req.userId

        if(!customerId){
            throw new Error("Not Authenticated..")
        }

        const bookSlot = await book.find({
            customerId,
            isCompleted : true
        })

        if(!bookSlot){
            return res.status(200).json({
                success : true,
                message : "No list of shops",
                bookSlot
            })
        }

        const shopDetail = []

        for(let i = 0;i<bookSlot.length;i++){   
            const fetchData = await Shop.find({
                ownerId : bookSlot[i].mechanicId
            })
            const shopWithBooking = {
                ...fetchData[0].toObject(), 
                isPaid: bookSlot[i].isPaid,
                registerNumber: bookSlot[i].registerNumber,
                vehicleType: bookSlot[i].vehicleType
            }
            
            shopDetail.push(shopWithBooking)
        }

        if(!shopDetail){
            throw new Error("Couldn't fetch shop details")
        }

        return res.status(200).json({
            success : true,
            message : "Data fetched successfully",
            bookSlot,
            shopDetail
        })
    } catch (error) {
        console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        }) 
    }
}

export const getGeneratedBill = async(req,res)=>{
    try {
        const mechanicId = req.params.id
        const customerId = req.userId

        if(!customerId || !mechanicId){
            throw new Error("no mechanic id or customer id")
        }

        console.log("mechanic ; ",mechanicId);
        console.log("customer ; ",customerId);
        
        // Convert string IDs to ObjectId using new syntax
        const billDetail = await bill.find({
            mechanicId: new mongoose.Types.ObjectId(mechanicId),
            customerId: new mongoose.Types.ObjectId(customerId)
        })

        console.log("bill found", billDetail)

        if(!billDetail || billDetail.length === 0){
            throw new Error("No bill found")
        }

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
            billDetail,
            shopDetail,
            bookSlot,
            customerDetail,
            mechanicDetail
        })
    } catch (error) {
        console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success : false,
            message : error.message
        }) 
    }
}

export const getDeatilsForFeedBackForm = async(req,res)=>{
    try {
        const mechanicId = req.params.id
        const customerId = req.userId

        if(!customerId || !mechanicId){
            throw new Error("no mechanic id or customer id")
        }

        const shopDetail = await Shop.find({
            ownerId : mechanicId
        })
        const customerDetail = await User.findById(customerId).select("-password")
        const bookFormDetail = await book.find({
            mechanicId: new mongoose.Types.ObjectId(mechanicId),
            customerId: new mongoose.Types.ObjectId(customerId)
        })

        return res.status(200).json({
            success : true,
            message : "Successfully fetched the information",
            shopDetail,
            customerDetail,
            bookFormDetail,
        })
    } catch (error) {
        console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        }) 
    }
}

export const updatePayment = async(req,res)=>{
    try {
        const customerId = req.userId;
        const { mechanicId,registerNumber } = req.body;

        if(!mechanicId || !customerId){
            throw new Error("Mechanic ID and Customer ID are required!");
        }

        const updatedBooking = await book.findOneAndUpdate(
            {
                mechanicId: new mongoose.Types.ObjectId(mechanicId),
                customerId: new mongoose.Types.ObjectId(customerId),
                isCompleted: true,
                registerNumber : registerNumber
            },
            { $set: { isPaid: true } },
            { new: true } 
        );

        if (!updatedBooking) {
            // Handle case where the booking wasn't found or wasn't completed
            return res.status(404).json({
                success: false,
                message: "Booking not found or not completed for the given IDs."
            });
        }

        console.log("Updated Booking:", updatedBooking); // Log the updated booking

        return res.status(200).json({ // Use 200 OK for successful update
            success : true,
            message : "Payment status updated successfully.",
            booking: updatedBooking
        });

    } catch (error) {
        console.log('Error updating payment status: '+error);
        return res.status(400).json({
            success : false,
            // Send a clearer error message
            message : error.message || "Failed to update payment status."
        });
    }
};

export const addComment = async(req,res)=>{
    try {
        const {
            mechanicId,
            title,
            description,
            customerName,
            registerNumber
        } = req.body;

        const customerId = req.userId;

        if(!mechanicId || !customerId || !title || !description){
            throw new Error("All fields are required!!");
        }

        let inputText = `Title: ${title}\nDescription: ${description}`;

        // Await the analysis result
        const ratingResponse = await analyzeReviewWithHuggingFace(inputText);

        // Check if analysis failed
        if (ratingResponse.moderation === "error" || ratingResponse.rating === "error") {
            console.error("Sentiment analysis failed:", ratingResponse.details);
            // Decide how to handle: throw error, use default rating, etc.
            // Option 1: Throw an error
            throw new Error("Failed to analyze comment sentiment.");
            // Option 2: Use a default rating (e.g., 3 or null)
            // ratingResponse.rating = 3; // Example default
        }

        // Remove the unnecessary setTimeout
        // setTimeout(function() {
        //     console.log("This message will be logged after 10 seconds.");
        // }, 10000);

        // Ensure Rating type matches the schema (assuming String here)
        const Rating = String(ratingResponse.rating);
        const sentiment = ratingResponse.sentiment;

        const newComment = new comment({
            mechanicId,
            customerId,
            customerName,
            title,
            description,
            registerNumber,
            Rating, // Use the analyzed (and potentially defaulted) rating
            sentiment
        });

        await newComment.save();

        return res.status(201).json({
            success : true,
            message : "Comment added successfully"
        });

    } catch (error) {
        // Log the specific error
        console.error('Error adding comment: '+error);
        return res.status(400).json({
            success : false,
            // Send a more specific error message if possible
            message : error.message || "Failed to add comment."
        });
    }
};