const mongoose = require("mongoose")


const shopschema = mongoose.Schema({
    shopname : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true,
        unique : true
    },
    latitude : {
        type : String,
        require : true
    },
    longitude : {
        type : String,
        require : true
    }
})

const executeShopSchema = mongoose.model("shop",shopschema)

module.exports = executeShopSchema