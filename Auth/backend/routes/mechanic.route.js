import express from "express"
import { verifyToken } from "../middleware/verifyToken";

import {
    getAllCustomerRequest,
    getAllCustomerRequest,
    getPendingList,
    getCompletedList,
    completedCustomerRequest,
    getBillForm,
    AddBillForm,
    updateBillForm,
    getComments
} from "../controllers/mechanic.controller.js"

const router = express.Router();


router.get('/request',verifyToken,getAllCustomerRequest)
router.patch('/accept/:id',verifyToken,getAllCustomerRequest)
router.get('/pending',verifyToken,getPendingList)
router.get('/completed',verifyToken,getCompletedList)
router.patch('/completed/:id',verifyToken,completedCustomerRequest)
router.get('/bill',verifyToken,getBillForm)
router.post('/bill',AddBillForm)
router.put('/bill/:id',verifyToken,updateBillForm)
router.get('/comments',verifyToken,getComments)


export default router