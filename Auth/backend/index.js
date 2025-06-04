import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"

import authRoutes from "./routes/auth.route.js"
import consumerRoutes from "./routes/consumer.route.js"
import mechanicRoutes from "./routes/mechanic.route.js"
import adminRoutes from './routes/admin.routes.js'

import {connectDB} from "./db/connection.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use(express.json())
app.use(cookieParser())


if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")))
    
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
    app.use(cors())
}
else{
    app.use(cors({
        origin : "http://localhost:5173",
        credentials : true,
    }))
}

app.get("/",(req,res)=>{
    res.send("Hello World!!")
})

app.use("/api/auth",authRoutes)
app.use("/api/consumer",consumerRoutes)
app.use("/api/mechanic",mechanicRoutes)
app.use("/api/admin", adminRoutes)



app.listen(PORT,()=>{
    connectDB()
    console.log(`connected to port ${PORT}`);
})