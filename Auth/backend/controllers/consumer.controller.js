import {Shop} from "../models/shop.model.js"
import { User } from "../models/user.model.js"
import { book } from "../models/bookSlot.model.js"
import { bill } from "../models/bill.model.js"
import { comment } from "../models/comments.model.js"


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
        const reqShop = await Shop.findById(id)

        if(!reqShop){
            throw new Error("Error in fetching...")
        }

        return res.status(200).json({
            shopList : reqShop,
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
            customerId,
            customerName,
            vehicleType,
            registerNumber,
            complaintDescription,
            bookDate,
            bookTime,
        } = req.body

        if(!mechanicId || !customerId || !customerName || !vehicleType || !registerNumber || !complaintDescription || !bookDate || !bookTime){
            throw new Error("All fields are required!!!")
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
        console.log('Error in fetching shop details...'+error);
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
            shopDetail.push(fetchData)
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
            shopDetail.push(fetchData)
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

        const billDeatil = await bill.find({
            mechanicId,
            customerId
        })

        if(!billDeatil){
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
            billDeatil,
            shopDetail,
            bookSlot,
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

        return res.status(200).json({
            success : true,
            message : "Successfully fetched the information",
            shopDetail,
            customerDetail
        })
    } catch (error) {
        console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        }) 
    }
}

export const addComment = async(req,res)=>{
    try {
        const {
            mechanicId,
            customerId,
            title,
            description,
            Rating
        } = req.body

        if(!mechanicId || !customerId || !title || !description || !Rating){
            throw new Error("All fields are required!!")
        }

        const newComment = new comment({
            mechanicId,
            customerId,
            title,
            description,
            Rating
        })

        await newComment.save()

        return res.status(201).json({
            success : true,
            message : "Comment added successfully"
        })

    } catch (error) {
        console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success : false,
            message : error
        }) 
    }
}