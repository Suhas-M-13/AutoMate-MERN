import express from "express"

import  {
    getAllShopList,
    getShopById,
    getBookFormDetails,
    addBookSlot,
    getShopListPendingById,
    getShopListCompletedById,
    getGeneratedBill,
    getDeatilsForFeedBackForm,
    addComment,
    updatePayment,
    getServiceHistoryForCustomer,
    getMapRoute,
    getNearByShops,
    createPaymentIntentForBill
} from "../controllers/consumer.controller.js"
import {verifyToken} from "../middleware/verifyToken.js"


const router = express.Router();


router.get('/shoplist',getAllShopList)
router.get('/shoplist/:id',getShopById)

router.post('/view-bill',verifyToken,getGeneratedBill) //reg is imp

router.get('/book-slot/:id',verifyToken,getBookFormDetails)
router.post('/book-slot',verifyToken,addBookSlot)

router.get('/pending',verifyToken,getShopListPendingById)
router.get('/completed',verifyToken,getShopListCompletedById)
router.get('/service-history',verifyToken,getServiceHistoryForCustomer)

router.patch('/updatePay',verifyToken,updatePayment)
router.post('/getfeedback',verifyToken,getDeatilsForFeedBackForm) //reg is imp
router.post('/feedback',verifyToken,addComment)

router.post('/get-route',getMapRoute)

router.post('/nearbyShop',getNearByShops)

router.post('/payment',createPaymentIntentForBill)


export default router
