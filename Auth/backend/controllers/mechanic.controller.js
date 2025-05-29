import { book } from "../models/bookSlot.model.js"
import { User } from "../models/user.model.js"
import { Shop } from "../models/shop.model.js"

import { comment } from "../models/comments.model.js"
import { bill } from "../models/bill.model.js"

import mongoose from "mongoose"
import { acceptNotification, completeNotification, invoiceGeneratedNotification } from "../mailtrap/emails.js"




export const mechanicDeatil = async (req, res) => {

    try {
        const mechanicId = req.userId

        if (!mechanicId) {
            throw new Error("No mechanic found")
        }

        const mechanic = await User.findById(mechanicId).select("-password")

        if (!mechanic) {
            throw new Error("mechanic not found")
        }

        return res.status(200).json({
            success: true,
            message: "Details fetched successfully",
            mechanic
        })

    } catch (error) {
        // console.log('Error creating shop: ', error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
}
export const AddShop = async (req, res) => {
    try {
        const ownerId = req.userId
        const { shopname, ownerName, mobileNumber, description, serviceAvailable, address, timings, location } = req.body;

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
            timings,
            location,
            isShopVerified: false
        });

        // Save the shop to the database
        await newShop.save();

        return res.status(201).json({
            success: true,
            message: "Shop created successfully",
            shop: newShop
        });
    } catch (error) {
        // console.log('Error creating shop: ', error);
        return res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }

}

export const getAllCustomerRequest = async (req, res) => {
    try {
        const mechanicId = req.userId

        const customerRequest = await book.find({
            mechanicId: new mongoose.Types.ObjectId(mechanicId),
            isAccepted: false
        })

        // console.log(customerRequest)

        const customerDetail = []

        for (let i = 0; i < customerRequest.length; i++) {
            const fetchData = await User.find({
                _id: customerRequest[i].customerId
            }).select("-password")
            customerDetail.push(fetchData)
        }

        // console.log(customerDetail[0][0].name);


        return res.status(200).json({
            success: true,
            message: "Successfully fetched data",
            customerRequest,
            customerDetail
        })
    } catch (error) {
        // console.log('Error in fetching details...'+error);
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}

export const updateAcceptRequest = async (req, res) => {
    try {
        // const mechanicId = req.userId
        const bookslotId = req.params.id
        // const {bookslotId} = req.body

        // if(!customerId){
        //     return res.status(400).json({
        //         success: false,
        //         message: "Invalid Customer ID"
        //     })
        // }

        if (!bookslotId) {
            return res.status(400).json({
                success: false,
                message: "bookslotId is required"
            })
        }

        const bookSlot = await book.findById(bookslotId)
        // const bookSlot = await book.findOne({
        //     mechanicId,
        //     customerId,
        //     registerNumber
        // })

        if (!bookSlot) {
            return res.status(404).json({
                success: false,
                message: "No booking slot found"
            })
        }

        bookSlot.isAccepted = true
        await bookSlot.save()


        const customerId = bookSlot.customerId
        const mechanicId = bookSlot.mechanicId

        const customerDetail = await User.findById(customerId).select("-password")
        const mechanicDetail = await User.findById(mechanicId).select("-password")
        const shopDetail = await Shop.find({
            ownerId  : mechanicId
        })

        // console.log("shopdetail : ",shopDetail)

        try {
            await acceptNotification(
                customerDetail.email,
                bookSlot.customerName,
                mechanicDetail.name,
                bookSlot.bookDate,
                bookSlot.bookTime,
                shopDetail[0].shopname,
                bookSlot.registerNumber,
                mechanicDetail.mobileNumber
            )
        } catch (emailError) {
            console.error("Error sending confirmation email:", emailError);
            // Continue with the booking even if email fails
        }

        return res.status(200).json({
            success: true,
            message: "Request accepted successfully"
        })

    } catch (error) {
        // console.error('Error in accepting request:', error);
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        })
    }
}

export const getPendingList = async (req, res) => {
    try {
        const mechanicId = req.userId

        const bookSlot = await book.find({
            mechanicId,
            isAccepted: true,
            isCompleted: false
        })

        const customerDetail = []

        for (let i = 0; i < bookSlot.length; i++) {
            const fetchData = await User.find({
                _id: bookSlot[i].customerId
            }).select("-password")
            customerDetail.push(fetchData)
        }

        // console.log(customerDetail[0][0].name);


        return res.status(200).json({
            success: true,
            message: "Successfully fetched data",
            bookSlot,
            customerDetail
        })


    } catch (error) {
        // console.log('Error in fetching details...'+error);
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}

export const getServiceHistoryForMechanic = async (req, res) => {
    try {
        const mechanicId = req.userId

        const bookSlot = await book.find({
            mechanicId,
            isPaid: true
        })

        const customerDetail = []

        for (let i = 0; i < bookSlot.length; i++) {
            const fetchData = await User.find({
                _id: bookSlot[i].customerId
            }).select("-password")
            customerDetail.push(fetchData)
        }

        return res.status(200).json({
            success: true,
            message: "Successfully fetched data",
            bookSlot,
            customerDetail
        })
    } catch (error) {
        // console.log('Error in fetching details...'+error);
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}

export const getCompletedList = async (req, res) => {
    try {
        const mechanicId = req.userId

        const bookSlot = await book.find({
            mechanicId,
            isCompleted: true,
            isPaid: false
        })

        const customerDetail = []

        for (let i = 0; i < bookSlot.length; i++) {
            const fetchData = await User.find({
                _id: bookSlot[i].customerId
            }).select("-password")
            customerDetail.push(fetchData)
        }

        // console.log(customerDetail[0][0].name);


        return res.status(200).json({
            success: true,
            message: "Successfully fetched data",
            bookSlot,
            customerDetail
        })


    } catch (error) {
        // console.log('Error in fetching details...'+error);
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}

export const updateCompleteCustomerRequest = async (req, res) => {
    try {
        // const mechanicId = req.userId
        const bookslotId = req.params.id
        // const {registerNumber} = req.body

        if (!bookslotId) {
            throw new Error("invalid Customer...")
        }

        const bookSlot = await book.findById(bookslotId)
        // const bookSlot = await book.findOne({
        //     mechanicId,
        //     customerId,
        //     registerNumber
        // })

        if (!bookSlot) {
            throw new Error("no slot booked...")
        }

        bookSlot.isCompleted = true

        bookSlot.save()

        const customerId = bookSlot.customerId
        const mechanicId = bookSlot.mechanicId

        const customerDetail = await User.findById(customerId).select("-password")
        const mechanicDetail = await User.findById(mechanicId).select("-password")
        const shopDetail = await Shop.find({
            ownerId  : mechanicId
        })


        try {
            await completeNotification(
                customerDetail.email,
                bookSlot.customerName,
                mechanicDetail.name,
                bookSlot.bookDate,
                bookSlot.bookTime,
                shopDetail[0].shopname,
                bookSlot.registerNumber,
                mechanicDetail.mobileNumber
            )
        } catch (emailError) {
            console.error("Error sending confirmation email:", emailError);
            // Continue with the booking even if email fails
        }

        return res.status(200).json({
            success: true,
            message: "Successfully updated the complete button"
        })


    } catch (error) {
        // console.log('Error in fetching details...'+error);
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}

export const getComments = async (req, res) => {
    try {
        const mechanicId = req.userId

        const comments = await comment.find({
            mechanicId
        })

        return res.status(200).json({
            success: true,
            message: "successfully fetched",
            comments
        })
    } catch (error) {
        // console.log('Error in fetching details...'+error);
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}

export const getBillForm = async (req, res) => {
    try {
        const mechanicId = req.userId
        const customerId = req.params.id
        const { bookslotId } = req.body

        // console.log("customer id : ",customerId);
        // console.log("mechanicId id : ",mechanicId);


        if (!bookslotId) {
            throw new Error("no booking is made for this...")
        }
        if (!customerId) {
            throw new Error("No customer found...")
        }
        if (!mechanicId) {
            throw new Error("No mechanic found")
        }

        const billForm = await bill.find({
            bookslotId: new mongoose.Types.ObjectId(bookslotId),
        })

        // if(billForm){
        //     return res.status(200).json({
        //         message : "Bill generated already",
        //         success : false
        //     })
        // }

        const shopDetail = await Shop.find({
            ownerId: mechanicId
        })
        const bookSlot = await book.findById(bookslotId)
        // const bookSlot = await book.find({
        //     mechanicId,
        //     customerId,
        //     registerNumber
        // })
        const customerDetail = await User.findById(customerId).select("-password")
        const mechanicDetail = await User.findById(mechanicId).select("-password")

        return res.status(200).json({
            success: true,
            message: "Successfully fetched the information",
            shopDetail,
            bookSlot,
            customerDetail,
            mechanicDetail,
            billForm
        })
    } catch (error) {
        // console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}

export const AddBillForm = async (req, res) => {
    try {
        const {
            customerId,
            Decription,
            totalAmount,
            registerNumber,
            bookslotId
        } = req.body


        const mechanicId = req.userId


        // console.log(customerId,
        //     Decription,
        //     totalAmount,
        //     registerNumber,mechanicId);



        if (!mechanicId || !customerId || !Decription || !totalAmount || !bookslotId || !registerNumber) {
            throw new Error("All fields are required!!")
        }

        let amount = Number(totalAmount)

        const newBill = new bill({
            mechanicId,
            customerId,
            registerNumber,
            Decription,
            totalAmount: amount,
            bookslotId
        })

        await newBill.save()

        const customerDetail = await User.findById(customerId).select("-password")
        const mechanicDetail = await User.findById(mechanicId).select("-password")
        const bookSlot = await book.findById(bookslotId)
        const shopDetail = await Shop.find({
            ownerId  : mechanicId
        })


        try {
            await invoiceGeneratedNotification(
                customerDetail.email,
                bookSlot.customerName,
                mechanicDetail.name,
                bookSlot.bookDate,
                bookSlot.bookTime,
                shopDetail[0].shopname,
                bookSlot.registerNumber,
                mechanicDetail.mobileNumber
            )
        } catch (emailError) {
            console.error("Error sending confirmation email:", emailError);
            // Continue with the booking even if email fails
        }

        return res.status(201).json({
            success: true,
            message: "Bill data added to db"
        })
    } catch (error) {
        // console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}

export const updateBillForm = async (req, res) => {
    try {
        const {
            Decription,
            totalAmount
        } = req.body
        const mechanicId = req.userId
        const customerId = req.params.id

        if (!mechanicId || !customerId) {
            throw new Error("customer id or mechanic id is undefined...")
        }

        const billForm = await bill.findOne({
            mechanicId,
            customerId
        })

        if (!billForm) {
            throw new Error("no bill found")
        }

        // console.log('desc : '+Decription+" amt : "+totalAmount);

        billForm.Decription = Decription
        billForm.totalAmount = totalAmount


        await billForm.save()

        return res.status(200).json({
            success: true,
            message: "Bill form Updated successfully",
            billForm
        })
    } catch (error) {
        // console.log('Error in fetching shop details...'+error);
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}