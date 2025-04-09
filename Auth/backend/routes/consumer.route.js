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
    updatePayment
} from "../controllers/consumer.controller.js"
import {verifyToken} from "../middleware/verifyToken.js"


const router = express.Router();


router.get('/shoplist',getAllShopList)
router.get('/shoplist/:id',getShopById)
router.get('/view-bill/:id',verifyToken,getGeneratedBill)
router.get('/book-slot/:id',verifyToken,getBookFormDetails)
router.post('/book-slot',verifyToken,addBookSlot)
router.get('/pending',verifyToken,getShopListPendingById)
router.get('/completed',verifyToken,getShopListCompletedById)
router.get('/feedback/:id',verifyToken,getDeatilsForFeedBackForm)
router.post('/feedback',verifyToken,addComment)
router.patch('/updatePay',verifyToken,updatePayment)

export default router
