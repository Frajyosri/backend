import  express from "express";
import  cors from "cors";
import  bodyparser from "body-parser";
import twilio  from "twilio";
import Authrouter from "./routers/Auth.router.js";
import Commercantrouter from "./routers/Commercant.router.js";
import Adminrouter from "./routers/Admin.router.js";
import bcrypt from "bcrypt"

const client=twilio(process.env.ACOUNT_UD,process.env.AUTH_TOKEN)
const app=express()
const port=process.env.PORT||8000

//definir la methode a besoin 
app.use(express.json());
app.use(cors())
app.use(bodyparser.urlencoded({extended:true}))
          //definir les Auth routes  
app.use("/api",Authrouter)
app.use("/api",Commercantrouter)
app.use("/api",Adminrouter)
  


//phone login 
app.get("/auth/phone/login",(req,res)=>{
    client
    .verify
    .services(process.env.SERVICEID)
    .verifications
    .create({
        to:`+${req.query.phone}`,
        channel:req.query.channel
    })
    .then((data)=>{
        res.status(200).send(data)
    }) 
})
//phone verification 
app.get("/auth/phone/verify",(req,res)=>{
    client
    .verify
    .services(process.env.SERVICEID)
    .verificationChecks
    .create({
        to:`+${req.query.phone}`,
        code:req.query.code 
    })
    .then((data)=>{
        res.status(200).send(data)
    }) 
})

//demarage de serveur 
app.listen(port,()=>{
    console.log(`1 2 3  Run ` )
})