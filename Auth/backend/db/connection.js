import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        // console.log(process.env.MONGO_URI);

        const conn = await mongoose.connect(process.env.MONGO_URI)
        // console.log(`MongoDb connected ${conn.connection.host}`);

    } catch (error) {
        // console.log("Error in connecting Mongodb : " + error.message);
        process.exit(1)
    }
}
