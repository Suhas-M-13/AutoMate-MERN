import { Shop } from "../models/shop.model.js"
import { User } from "../models/user.model.js"
import { book } from "../models/bookSlot.model.js"
import { bill } from "../models/bill.model.js"
import { comment } from "../models/comments.model.js"
import mongoose from "mongoose"
import { analyzeReviewWithHuggingFace } from "../services/analyzeReviewWithHuggingFace.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import axios from "axios"

import { bookingSlotConfirm, feedbackNotification, mechanicRequestNotify, paymentNotification } from "../mailtrap/emails.js"

import Stripe from 'stripe';

const stripe_secret_key = Stripe(process.env.STRIPE_SECRET_KEY);


export const getAllShopList = async (req, res) => {
    try {
        const allShop = await Shop.find({ isShopVerified: true })

        if (!allShop) {
            throw new Error("Error in fetching...")
        }

        return res.status(200).json({
            shopList: allShop,
            success: true,
            message: "fetched All shop details"
        })
    } catch (error) {
        // console.log('Error in fetching shop details...' + error);
        return res.status(400).json({
            success: false,
            message: "Failed to fetched shop details"
        })
    }
}

export const getShopById = async (req, res) => {
    const { id } = req.params

    try {
        const reqShop = await Shop.find({
            ownerId: id
        })
        const comments = await comment.find({
            mechanicId: id
        })
        const mechanicDeatil = await User.findById(id)

        if (!reqShop) {
            throw new Error("Error in fetching...")
        }
        if (!comments) {
            throw new Error("Error in fetching comments...")
        }

        return res.status(200).json({
            shopList: reqShop,
            reviews: comments,
            mechanicDeatil: mechanicDeatil,
            success: true,
            message: "fetched required shop details"
        })
    } catch (error) {
        // console.log('Error in fetching shop details...' + error);
        return res.status(400).json({
            success: false,
            message: "Failed to fetched shop details"
        })
    }


}

export const getBookFormDetails = async (req, res) => {


    try {
        const mechanicId = req.params.id
        const customerId = req.userId;

        const shopDetail = await Shop.find({
            ownerId: mechanicId
        })
        const customerDetail = await User.findById(customerId).select("-password");
        const mechanicDetail = await User.findById(mechanicId).select("-password");

        if (!shopDetail || !customerDetail || !mechanicDetail) {
            throw new Error("Error in fetching shop , customer , mechanic detail")
        }

        return res.status(200).json({
            success: true,
            message: "All details fetched",
            shopDetail,
            customerDetail,
            mechanicDetail
        })
    } catch (error) {
        // console.log('Error in fetching shop details...' + error);
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}

export const addBookSlot = async (req, res) => {
    try {
        const {
            mechanicId,
            customerName,
            vehicleType,
            registerNumber,
            complaintDescription,
            bookDate,
            bookTime,
            shopName
        } = req.body

        const customerId = req.userId

        if (!mechanicId || !customerName || !vehicleType || !registerNumber || !complaintDescription || !bookDate || !bookTime || !shopName) {
            throw new Error("All fields are required!!!")
        }

        if (!customerId) {
            throw new Error("customer id not found")
        }

        const checkSlot = await book.find({
            registerNumber
        })

        for (let i = 0; i < checkSlot.length; i++) {
            if (checkSlot[i] && !checkSlot[i].isPaid) {
                throw new Error("For one vehicle only one booking can be done until the current status of the vehicle service is completed and the bill is paid")
            }
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
            isAccepted: false,
            isCompleted: false,
            isPaid: false
        })

        await newBookSlot.save()

        // const token = generateTokenAndSetCookie(res, customerId, registerNumber)

        const customerDetail = await User.findById(customerId).select("-password")
        const mechanicDetail = await User.findById(mechanicId).select("-password")


        // console.log(customerDetail.email,customerName,mechanicDetail.name,bookDate,bookTime,shopName,registerNumber,mechanicDetail.mobileNumber)

        try {
            await bookingSlotConfirm(
                customerDetail.email,
                customerName,
                mechanicDetail.name,
                bookDate,
                bookTime,
                shopName,
                registerNumber,
                mechanicDetail.mobileNumber
            )
            await mechanicRequestNotify(
                mechanicDetail.email,
                mechanicDetail.name,
                customerName,
                bookDate,
                bookTime,
                shopName,
                registerNumber,
                vehicleType,
                customerDetail.mobileNumber
            )
        } catch (emailError) {
            console.error("Error sending confirmation email:", emailError);
            // Continue with the booking even if email fails
        }

        return res.status(201).json({
            success: true,
            message: "Slot details added successfully",
            data: {
                registerNumber,
                bookingId: newBookSlot._id,
            }
        })
    } catch (error) {
        // console.log('Error in book' + error);
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to add booking slot"
        })
    }
}

export const getShopListPendingById = async (req, res) => {
    try {
        const customerId = req.userId

        if (!customerId) {
            throw new Error("Not Authenticated..")
        }
        // console.log('id : ' + customerId);

        const bookSlot = await book.find({
            customerId,
            isCompleted: false
        })

        if (!bookSlot) {
            return res.status(200).json({
                success: true,
                message: "No list of shops",
                bookSlot
            })
        }

        // console.log("bookslot : ",bookSlot);

        const shopDetail = []

        for (let i = 0; i < bookSlot.length; i++) {
            // console.log("mech[i] : ",bookSlot[i].mechanicId);
            const fetchData = await Shop.find({
                ownerId: bookSlot[i].mechanicId
            })

            // console.log("shop : ",fetchData)

            const shopWithBooking = {
                ...fetchData[0].toObject(),
                isAccepted: bookSlot[i].isAccepted,
                registerNumber: bookSlot[i].registerNumber,
                vehicleType: bookSlot[i].vehicleType,
                BookDate: bookSlot[i].bookDate,
                bookslotId: bookSlot[i]._id
            }

            shopDetail.push(shopWithBooking)
        }

        if (!shopDetail) {
            throw new Error("Couldn't fetch shop details")
        }

        return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            bookSlot,
            shopDetail
        })
    } catch (error) {
        // console.log('Error in fetching shop details...' + error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}



export const getShopListCompletedById = async (req, res) => {
    try {
        const customerId = req.userId

        if (!customerId) {
            throw new Error("Not Authenticated..")
        }

        const bookSlot = await book.find({
            customerId,
            isCompleted: true,
            isPaid: false
        })

        if (!bookSlot) {
            return res.status(200).json({
                success: true,
                message: "No list of shops",
                bookSlot
            })
        }

        const shopDetail = []

        for (let i = 0; i < bookSlot.length; i++) {
            const fetchData = await Shop.find({
                ownerId: bookSlot[i].mechanicId
            })
            const shopWithBooking = {
                ...fetchData[0].toObject(),
                isPaid: bookSlot[i].isPaid,
                registerNumber: bookSlot[i].registerNumber,
                vehicleType: bookSlot[i].vehicleType,
                BookDate: bookSlot[i].bookDate,
                bookslotId: bookSlot[i]._id
            }

            shopDetail.push(shopWithBooking)
        }

        if (!shopDetail) {
            throw new Error("Couldn't fetch shop details")
        }

        return res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            bookSlot,
            shopDetail
        })
    } catch (error) {
        // console.log('Error in fetching shop details...' + error);
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}


export const getServiceHistoryForCustomer = async (req, res) => {
    try {
        const customerId = req.userId

        // Add await and convert to array
        const bookSlot = await book.find({
            customerId,
            isPaid: true
        }).lean() //lean() to convert to plain JS objects

        const shopDetail = []

        for (let i = 0; i < bookSlot.length; i++) {
            const fetchData = await Shop.find({
                ownerId: bookSlot[i].mechanicId
            }).lean()

            const shopWithBooking = {
                ...fetchData[0],
                isPaid: bookSlot[i].isPaid,
                registerNumber: bookSlot[i].registerNumber,
                vehicleType: bookSlot[i].vehicleType,
                BookDate: bookSlot[i].bookDate,
                bookslotId : bookSlot[i]._id
            }

            shopDetail.push(shopWithBooking)
        }

        return res.status(200).json({
            success: true,
            message: "Successfully fetched data",
            bookSlot,
            shopDetail
        })
    } catch (error) {
        // console.log('Error in fetching details...' + error);
        return res.status(400).json({
            success: false,
            message: error.message // Send error message instead of error object
        })
    }
}

export const getGeneratedBill = async (req, res) => {
    try {
        const customerId = req.userId
        // const { mechanicId, registerNumber } = req.body
        const { bookslotId, mechanicId } = req.body

        if (!customerId || !mechanicId || !bookslotId) {
            throw new Error("no mechanic id or customer id")
        }

        // console.log("mechanic ; ", mechanicId);
        // console.log("customer ; ", customerId);

        // Convert string IDs to ObjectId using new syntax
        const billDetail = await bill.find({
            // mechanicId: new mongoose.Types.ObjectId(mechanicId),
            // customerId: new mongoose.Types.ObjectId(customerId),
            // registerNumber: registerNumber
            bookslotId: new mongoose.Types.ObjectId(bookslotId)
        })

        // console.log("bill found", billDetail)

        if (!billDetail || billDetail.length === 0) {
            throw new Error("No bill found")
        }

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
            billDetail,
            shopDetail,
            bookSlot,
            customerDetail,
            mechanicDetail
        })
    } catch (error) {
        // console.log('Error in fetching shop details...' + error);
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const getDeatilsForFeedBackForm = async (req, res) => {
    try {
        const customerId = req.userId
        // const { mechanicId, registerNumber } = req.body
        const { mechanicId, bookslotId } = req.body

        if (!customerId || !mechanicId) {
            throw new Error("no mechanic id or customer id")
        }

        const shopDetail = await Shop.find({
            ownerId: mechanicId
        })
        const customerDetail = await User.findById(customerId).select("-password")
        const bookFormDetail = await book.find({
            mechanicId: new mongoose.Types.ObjectId(mechanicId),
            customerId: new mongoose.Types.ObjectId(customerId),
            _id: new mongoose.Types.ObjectId(bookslotId)
            // registerNumber: registerNumber
        })

        return res.status(200).json({
            success: true,
            message: "Successfully fetched the information",
            shopDetail,
            customerDetail,
            bookFormDetail,
        })
    } catch (error) {
        // console.log('Error in fetching shop details...' + error);
        return res.status(400).json({
            success: false,
            message: error
        })
    }
}

export const updatePayment = async (req, res) => {
    try {
        const customerId = req.userId;
        // const { mechanicId, registerNumber } = req.body;
        const { mechanicId, bookslotId } = req.body;

        if (!mechanicId || !customerId) {
            throw new Error("Mechanic ID and Customer ID are required!");
        }

        if (!bookslotId) {
            throw new Error("No booking id was found..")
        }

        const updatedBooking = await book.findOneAndUpdate(
            {
                // mechanicId: new mongoose.Types.ObjectId(mechanicId),
                // customerId: new mongoose.Types.ObjectId(customerId),
                // isCompleted: true,
                // registerNumber: registerNumber,
                _id: new mongoose.Types.ObjectId(bookslotId)
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

        // console.log("Updated Booking:", updatedBooking); // Log the updated booking

        const customerDetail = await User.findById(customerId).select("-password")
        const mechanicDeatil = await User.findById(mechanicId).select("-password")
        const shopDetail = await Shop.find({
            ownerId: new mongoose.Types.ObjectId(mechanicId)
        })

        const bookSlot = await book.findById(bookslotId)
        const billDetail = await bill.find({
            bookslotId: new mongoose.Types.ObjectId(bookslotId)
        })

        const now = new Date();
        const formattedDate = now.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Kolkata"
        });

        const formattedTime = now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata"
        });

        // console.log(billDetail[0].totalAmount)

        try {
            await paymentNotification(
                mechanicDeatil.email,
                mechanicDeatil.name,
                customerDetail.name,
                bookSlot.bookDate,
                bookSlot.bookTime,
                formattedDate,
                formattedTime,
                shopDetail[0].shopname,
                bookSlot.registerNumber,
                bookSlot.vehicleType,
                customerDetail.mobileNumber,
                billDetail[0].totalAmount
            )

        } catch (emailError) {
            console.error("Error sending confirmation email:", emailError);
            // Continue with the booking even if email fails
        }

        return res.status(200).json({ // Use 200 OK for successful update
            success: true,
            message: "Payment status updated successfully.",
            booking: updatedBooking
        });

    } catch (error) {
        // console.log('Error updating payment status: ' + error);
        return res.status(400).json({
            success: false,
            // Send a clearer error message
            message: error.message || "Failed to update payment status."
        });
    }
};

export const addComment = async (req, res) => {
    try {
        const {
            mechanicId,
            title,
            description,
            customerName,
            registerNumber,
            vehicleType,
            bookslotId
        } = req.body;

        const customerId = req.userId;

        if (!mechanicId || !customerId || !title || !description || !vehicleType) {
            throw new Error("All fields are required!!");
        }

        let inputText = `Title: ${title}\nDescription: ${description}`;
        let ratingResponse = null;
        let attempts = 0;
        const maxAttempts = 6;
        const delayBetweenAttempts = 2000; // 2 seconds

        // Retry logic for Hugging Face API
        while (attempts < maxAttempts) {
            try {
                ratingResponse = await analyzeReviewWithHuggingFace(inputText);

                // Check if we got a valid response
                if (ratingResponse &&
                    ratingResponse.moderation !== "error" &&
                    ratingResponse.rating !== "error" &&
                    ratingResponse.rating >= 1 &&
                    ratingResponse.rating <= 5) {
                    break; // Exit the loop if we got a valid response
                }

                attempts++;
                if (attempts < maxAttempts) {
                    // console.log(`Attempt ${attempts} failed, retrying in ${delayBetweenAttempts/1000} seconds...`);
                    await new Promise(resolve => setTimeout(resolve, delayBetweenAttempts));
                }
            } catch (error) {
                attempts++;
                // console.error(`Attempt ${attempts} failed with error:`, error);
                if (attempts >= maxAttempts) {
                    throw new Error("Failed to analyze comment after multiple attempts");
                }
                await new Promise(resolve => setTimeout(resolve, delayBetweenAttempts));
            }
        }

        // If we still don't have a valid response after all attempts
        if (!ratingResponse ||
            ratingResponse.moderation === "error" ||
            ratingResponse.rating === "error" ||
            ratingResponse.rating < 1 ||
            ratingResponse.rating > 5) {
            // console.error("Failed to get valid rating after all attempts, using default rating");
            ratingResponse = {
                rating: 3, // Default neutral rating
                sentiment: "neutral",
                moderation: "success"
            };
        }

        const Rating = String(ratingResponse.rating);
        const sentiment = ratingResponse.sentiment;

        const newComment = new comment({
            mechanicId,
            customerId,
            customerName,
            title,
            description,
            registerNumber,
            Rating,
            sentiment,
            vehicleType,
            bookslotId
        });

        await newComment.save();

        const customerDetail = await User.findById(customerId).select("-password")
        const mechanicDeatil = await User.findById(mechanicId).select("-password")
        const shopDetail = await Shop.find({
            ownerId: new mongoose.Types.ObjectId(mechanicId)
        })

        const bookSlot = await book.findById(bookslotId)

        // console.log(bookslotId)

        const now = new Date();
        const formattedDate = now.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Kolkata"
        });

        const formattedTime = now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata"
        });


        try {
            await feedbackNotification(
                mechanicDeatil.email,
                mechanicDeatil.name,
                customerDetail.name,
                bookSlot.bookDate,
                bookSlot.bookTime,
                formattedDate,
                formattedTime,
                shopDetail[0].shopname,
                bookSlot.registerNumber,
                bookSlot.vehicleType,
                customerDetail.mobileNumber,
                Rating
            )

        } catch (emailError) {
            console.error("Error sending confirmation email:", emailError);
            // Continue with the booking even if email fails
        }

        return res.status(201).json({
            success: true,
            message: "Comment added successfully",
            rating: Rating,
            sentiment: sentiment
        });

    } catch (error) {
        // console.error('Error adding comment:', error);
        return res.status(400).json({
            success: false,
            message: error.message || "Failed to add comment"
        });
    }
};

export const getMapRoute = async (req, res) => {
    const { user, shop } = req.body;

    const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${user.lon},${user.lat};${shop.lon},${shop.lat}?overview=full&geometries=geojson`;

    try {
        const response = await axios.get(osrmUrl);
        const route = response.data.routes[0];

        const coords = route.geometry.coordinates;
        const distance = route.distance
        const duration = route.duration
        // console.log(response.data)
        // console.log(response.data.routes[0].geometry)

        res.json({ routeCoords: coords, distance: distance, duration: duration });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: "Failed to fetch route" });
    }
}

export const getNearByShops = async (req, res) => {
    try {

        const { userLong, userLat } = req.body

        const shopDetail = await Shop.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [userLong, userLat] },
                    $maxDistance: 5000 // in meters
                }
            }
        })

        // console.log("shops : ",shopDetail)

        return res.status(200).json({
            message: "successfully fetched",
            shopDetail: shopDetail
        })

    } catch (error) {
        // console.error(error);
        res.status(500).json({ message: "Failed to fetch shops" });
    }
}

export const createPaymentIntentForBill = async (req, res) => {

    try {
        const { billId } = req.body;
        const billDetail = await bill.findById(billId);
        if (!billDetail) return res.status(404).json({ error: 'Bill not found' });

        const paymentIntent = await stripe_secret_key.paymentIntents.create({
            amount: billDetail.totalAmount * 100, // in paise
            currency: 'inr',
            automatic_payment_methods: { enabled: true },
        });

        // console.log('paymentIntent : ',paymentIntent)

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
            amount: billDetail.totalAmount,
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}