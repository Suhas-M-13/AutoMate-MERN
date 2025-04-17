import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
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
    customerName : {
        type : String,
        require : true
    },
    title : {
        type : String,
        require : true
    },
    description : {
        type : String,
        require : true
    },
    Rating : {
        type : String,
        require : true
    },
    sentiment : {
        type : String,
        require : true
    }
},{timestamps:true})


export const comment = mongoose.model('comments',commentSchema)