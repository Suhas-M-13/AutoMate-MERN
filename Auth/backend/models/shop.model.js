import mongoose from "mongoose"


const shopSchema = new mongoose.Schema({
    shopname : {
        type : String,
        required : true
    },
    ownerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user.model'
    },
    description: {
        type: String
    },
    serviceAvailable: [{
        type: String,
        enum: ['Bike', 'Car']
    }],
    address: {
        type: String
    },
    timings: {
        type: Map,
        of: {
            from: String,
            to: String,
            notavailable: Boolean
        }
    }
},{timestamps:true})

export const Shop = mongoose.model('shop',shopSchema)



  

