import mongoose from "mongoose";



const billSchema = new mongoose.Schema({
    mechanicId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user.model'
        },
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user.model'
    },
    registerNumber : {
        type : String,
        required : true,
        unique : true,
        ref : 'bookSlot.model'
    },
    Decription : {
        type : String,
        required : true
    },
    totalAmount : {
        type : String,
        required : true
    }
},{timestamps:true})

export const bill = mongoose.model('bill',billSchema);

