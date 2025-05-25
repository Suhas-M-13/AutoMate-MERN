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
    AddShop,
    mechanicDeatil,
    getServiceHistoryForMechanic
} from "../controllers/mechanic.controller.js"

const router = express.Router();

// review all files once and then do the editing in the another branch....
router.post('/addShop',verifyToken,AddShop)
router.get('/getMechanicDeatil',verifyToken,mechanicDeatil)
router.get('/request',verifyToken,getAllCustomerRequest)
router.patch('/accept/:id',verifyToken,updateAcceptRequest) //slot id - sorted
router.get('/pending',verifyToken,getPendingList)
router.get('/completed',verifyToken,getCompletedList)
router.patch('/completed/:id',verifyToken,updateCompleteCustomerRequest) //slot id - sorted
router.post('/bill/:id',verifyToken,getBillForm)  //slot id - sorted
router.post('/bill',verifyToken,AddBillForm) //slot id - sorted
router.put('/bill/:id',verifyToken,updateBillForm)
router.get('/comments',verifyToken,getComments)
router.get('/service-history',verifyToken,getServiceHistoryForMechanic)


export default router