import mongoose from "mongoose";


const slotSchema = new mongoose.Schema({
    mechanicId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user.model'
    },
    customerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user.model'
    },
    customerName : {
        type : String,
        ref : 'user.model'
    },
    vehicleType : [{
        type : String,
        enum : ['Bike','Car']
    }],
    registerNumber : {
        type : String,
        required : true,
        unique : true
    },
    complaintDescription : {
        type : String,
        required : true
    },
    bookDate : {
        type : String,
        required : true
    },
    bookTime : {
        type : String,
        required : true
    },
    isAccepted : {
        type : Boolean,
        required : true
    },
    isCompleted : {
        type : Boolean,
        required : true
    }
},{timestamps:true});


// slotschema.index({ customeremail: 1, mechanicemail: 1 }, { unique: true });

export const book = mongoose.model('bookslot', slotSchema);
