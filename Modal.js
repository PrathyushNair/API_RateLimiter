const mongoose=require("mongoose")
let UserSchema=mongoose.Schema({
    my_ip:String,
    timeStamp:Number,
    reqNumber:{type:Number,default:1}
})

let userModal=mongoose.model("user",UserSchema)
module.exports=userModal