import express from "express"
import { verifyToken } from "../middleware/verifyToken.js";

import {
    getAllCustomerRequest,
    updateAcceptRequest,
    getPendingList,
    getCompletedList,
    updateCompleteCustomerRequest,
    getBillForm,
    AddBillForm,
    updateBillForm,
    getComments,
    AddShop
} from "../controllers/mechanic.controller.js"

const router = express.Router();


router.post('/addShop',verifyToken,AddShop)
router.get('/request',verifyToken,getAllCustomerRequest)
router.patch('/accept/:id',verifyToken,updateAcceptRequest)
router.get('/pending',verifyToken,getPendingList)
router.get('/completed',verifyToken,getCompletedList)
router.patch('/completed/:id',verifyToken,updateCompleteCustomerRequest)
router.get('/bill/:id',verifyToken,getBillForm)
router.post('/bill',AddBillForm)
router.put('/bill/:id',verifyToken,updateBillForm)
router.get('/comments',verifyToken,getComments)


export default router