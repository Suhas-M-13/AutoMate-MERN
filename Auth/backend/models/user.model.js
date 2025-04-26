import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true
    },
    lastlogin : {
        type : Date,
        default : Date.now
    },
    isverified : {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        require : true
    },
    mobileNumber : {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid 10-digit mobile number!`
        }
    },
    resetPasswordToken : String,
    resetPasswordExpiresAt : Date,
    verificationToken : String,
    verificationTokenExpiresAt : Date,

},{timestamps:true})

export const User = mongoose.model('user',userSchema)