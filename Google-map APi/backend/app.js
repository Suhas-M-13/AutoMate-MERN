const express = require("express")

const connection = require("./connection")

const Shop = require("./models/shop")

const cors = require("cors")



connection()


const app = express()
const PORT = 1969


app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.get("/user",async(req,res)=>{
    const allShops = await Shop.find({})
    
    if(!allShops){
        return res.status(404).json({
            success : false,
            message : "couldn't get shops from database"
        })
    }

    return res.status(200).json({
        success : true,
        data : allShops,
        message : "shops details successfully fetched from database"
    })
})

app.post("/user",async (req,res)=>{
    let data = req.body

    let newShop = new Shop({
        shopname : data.shopname,
        email : data.email,
        latitude : data.latitude,
        longitude : data.longitude
    })

    await newShop.save()
    .then(()=>{
        return res.status(201).json({
            success : true,
            message : "shop added to database"
        })
    })
    .catch(()=>{
        return res.status(400).json({
            success : false,
            message : "couldn't add shop to database"
        })
    })
})




app.listen(PORT,()=>{
    console.log(`App listening to port ${PORT}`);
    
})
