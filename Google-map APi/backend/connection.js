const mongoose = require("mongoose")


const connectDB = async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/maps").then(()=>{
            console.log('Database connect successfully');
        })
    } catch (error) {
        console.log('Error in connecting to database : '+error);
    }
}

module.exports = connectDB