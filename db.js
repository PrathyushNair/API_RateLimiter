const mongoose=require("mongoose")
const ENV=require("dotenv")
ENV.config()
const dataBase=process.env.MONGODB_URL
const connect=mongoose.connect(dataBase)
module.exports=connect