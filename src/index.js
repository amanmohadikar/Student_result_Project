const express = require("express")
const mongoose = require("mongoose")
const route =  require("./route/route")

const app = express()

app.use(express.json())

mongoose.connect("mongodb+srv://Aman_Mohadikar:V5FW1Y8X6b2pIiud@cluster0.gdww84s.mongodb.net/customer")
.then(() => {console.log("mongodb is connected")})
.catch((error) => {console.log(error)})

app.use("/", route)

app.listen(3000, function(){
    console.log("this app is running on post :", 3000)
})