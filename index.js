const express=require("express")
const app=express()
const connect=require("./db")
const userModal=require("./Modal")
const ENV=require("dotenv")
ENV.config()
let PORT=process.env.PORT
let mainarr=[{name:"Prathyush"},{name:"Haritha"},{name:"Prem"},{name:"Sobhana"},{name:"Samyak"},{name:"Ravi"}]
app.use(express.json())
app.get("/",async(req,resp)=>{
    let me=req.ip
    let x=Date.now() 
    let userInfo=await userModal.find({my_id:me})
   if(userInfo.length==0)
   {
     let newuser=await userModal({my_ip:me.toString(),timeStamp:Date.now()})
     newuser.save((err,success)=>{
        if(err)
        {
            resp.send("err")
        }
        else
        {
            resp.send(mainarr)
        }
       
     })
   }
   else
   {
    let userInfo=await userModal.find({my_id:me})
    
    const {timeStamp,reqNumber}=userInfo[0]
   if(((Date.now()/1000)-(timeStamp)/1000)<60&&reqNumber<10 )
   {
    await userModal.updateOne({my_ip:me.toString(),reqNumber:reqNumber+1})
     resp.send(mainarr)
    }
  
   else if(((Date.now()/1000)-(timeStamp)/1000)>=60)
   {let newreqNum=1
    await userModal.updateOne({my_ip:me.toString(),timeStamp:Date.now(),reqNumber:newreqNum})
    resp.send(mainarr)
   }
   else{
    resp.send("Cannot full fuill req. Only 10 req per minute")
    }
   }
   
})
app.listen(PORT,async()=>{
 try
 {
    await connect
    console.log("Server connected")
 }
 catch
 {
     console.log("Server Error")
 }
})

