import mongoose from "mongoose"


const shopSchema = new mongoose.Schema({
    shopname : {
        type : String,
        required : true
    },
    ownerName : {
        type : String,
        required : true
    },
    mobileNumber : {
        type: String,
        required: true,
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
    },
    isShopVerified : {
        type : Boolean,
        require : true
    },
    location: {
        type: {
          type: String,
          enum: ["Point"],
          default: "Point",
          required: true
        },
        coordinates: {
          type: [Number], // [longitude, latitude]
          required: true
        }
    }
},{timestamps:true})


shopSchema.index({
    location : "2dsphere"
})

export const Shop = mongoose.model('shop',shopSchema)



  

