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
    bookslotId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'bookSlot.model',
        unique : true
    },
    registerNumber : {
        type : String,
        required : true,
        ref : 'bookSlot.model'
    },
    Decription : {
        type : String,
        required : true
    },
    totalAmount : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ['unpaid','paid'],
        default : 'unpaid'
    }
},{timestamps:true})

export const bill = mongoose.model('bill',billSchema);

