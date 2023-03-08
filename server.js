import  express from "express";
import  cors from "cors";
import  bodyparser from "body-parser";
import twilio  from "twilio";
import router from "./routers/Auth.router.js";
import Comercantrouter from "./routers/Commercant.router.js"
import bcrypt from "bcrypt"

const client=twilio(process.env.ACOUNT_UD,process.env.AUTH_TOKEN)
const app=express()
const port=process.env.PORT||8000

//definir la methode a besoin 
app.use(express.json());
app.use(cors())
app.use(bodyparser.urlencoded({extended:true}))
          //definir les Auth routes  
app.use("/api",router)
app.use("/api",Comercantrouter)
          /*
//client sign in 
app.get("/auth/client/login",async(req,res)=>{
    const mdp=req.body.mdp;
    const email=req.body.email;
    try {
    const  clientexiste= await prisma.client.findUnique({where:{email:email}})
            if(clientexiste){
            const isEqual=clientexiste.mdp===mdp;
            console.log(isEqual,mdp,clientexiste.mdp)
            if(isEqual){
                res.status(200).send({"msg":"welcome there  "})
            }else{
                res.status(400).send({"msg":"invalide mail or password"})
            }
            }else{
                res.status(400).send({"msg":"no clint found "})
            }
    } catch (error) {
         res.status(500).send({"msg":"somthing wreng" + error})
    }
})
//client register 
app.post("/auth/client/register",async(req,res)=>{
    const {nom,prenom,email,mdp,phone,idCom}=req.body;
   const inserClient="insert into client(nom,prenom,email,mdp,phone,idCom) value(?,?,?,?,?,?)";
   const salt=bcrypt.genSaltSync(10);
    const hach=bcrypt.hashSync(mdp,salt)
    try {
        const clientexiste=await prisma.client.count({where:{email:email}})
        if(clientexiste>0){
            res.status(401).send("client deja existe ")
        }else{
           db.query(inserClient,[nom,prenom,email,hach,phone,idCom],(err,reselt)=>{
            if(reselt){
                return  res.status(200).json({"msg":"user registred "});
              }else{
                return  res.status(400).json({"msg":" fama haja moch hiya  "+err});
              }
           })
        }
    } catch (error) {
        res.status(500).send({"msg":"oops "+ error})
    }
   
     
})

//admin sign in 
app.get("/auth/admin/login",async(req,res)=>{
    const email=req.body.UserName;
    const Password=req.body.Password;
    try {
         const  Adminexiste= await prisma.admin.findUnique({where:{UserName:email}})
            if(Adminexiste){
                const isEqual=Adminexiste.Password===Password;
                console.log(isEqual)
                if(isEqual){
                    res.status(200).send({"msg":"welcome there  "})
                }else{
                    res.status(400).send({"msg":"invalide mail or password"})
                }
                
            }else{
                res.status(400).send({"msg":"no clint found "})
            }
    } catch (error) {
         res.status(500).send({"msg":"somthing wreng" + error})
    }
})
//admin password reset 
app.put("/admin/reset",(req,res)=>{
    const newpassword=req.body.Password;
    const username=req.body.UserName;
    const salt=bcrypt.genSaltSync(10);
    const hach=bcrypt.hashSync(newpassword,salt)
    const   Admin= `UPDATE admin SET Password =? WHERE UserName=?`
    console.log(hach,username)
    try {
        db.query(Admin,[newpassword,username],(err,reslta)=>{
            if(reslta){
                console.log(newpassword)
                return res.status(200).send({"msg":"mot de passe tbadlet sayer"})
            }else{
                return res.status(400).send({"msg":"o93ed zazwa ^_^ "+err})
            }
        })
   
    } catch (error) {
        res.status(500).send({"msg":error})
    }
    
})

//commercant sign in 
app.get("/auth/comercant/login",async(req,res)=>{
    const email=req.body.email;
    const mdp=req.body.mdp;
    try {
        const   emailExiste= await prisma.commercant.findUnique({where:{email:email}})
        if(emailExiste){
            const isEqual=emailExiste.mdp===mdp
            console.log(isEqual,mdp,emailExiste.mdp)
            if(isEqual){
                res.status(200).send({"msg":"welcome there  "})
            }else{
                res.status(400).send({"msg":"invalide mail or password"})
            }
            
        }else{
            res.status(400).send({"msg":"no clint found "})
        }
    } catch (error) {
        res.status(500).send({"msg":"somthing wreng" + error})
    }
    
})
//commercant register 
app.post("/auth/comercant/register",async(req,res)=>{
        const {Nom,prenom,email,mdp,phone}=req.body;
        const addcom ="insert into commercant(nom,prenom,email,mdp,phone) value(?,?,?,?,?)";
       /* const salt=bcrypt.genSaltSync(10);
        const hach=bcrypt.hashSync(mdp,salt)*/
        /*
        try {
            const clientexiste=await prisma.commercant.count({where:{email:email}})
        if(clientexiste>0){
            res.status(401).send("commercant deja existe ")
        }else{
         db.query(addcom,[Nom,prenom,email,mdp,phone],(err,reslt)=>{
            if(reslt){
                res.status(200).send({"msg":"commercant added with sucsses "})
               }else{
                res.status(401).send({"msg":"fama haja mouch hiya"+err})
               }
         })
           }
        } catch (error) {
            res.status(500).send({"msg":"oops "+ error})
        }
        
    })

// livreur login 
app.get("/auth/livreur/login",async(req,res)=>{
    const email=req.body.email;
    const lpassword=req.body.mdp;
    try {
    const  emailexiste= await prisma.livreur.findUnique({where:{email:email}})
            if(emailexiste){
                const Passexiste=await prisma.livreur.findUnique({where:{mdp:lpassword}})
                const isEqual=bcrypt.compareSync(clientexiste.Password,Passexiste.Password);
                console.log(isEqual,Passexiste.Password,clientexiste.Password)
                if(isEqual){
                    res.status(200).send({"msg":"welcome there  "})
                }else{
                    res.status(400).send({"msg":"invalide mail or password"})
                }
            }else{
                res.status(400).send({"msg":"no clint found "})
            }
    } catch (error) {
         res.status(500).send({"msg":"somthing wreng" + error})
    }
})
//livreur register 
app.post("/auth/livreur/register",async(req,res)=>{
    const {nom,prenom,email,mdp,phone}=req.body;
    const addcom ="insert into livreur(nom,prenom,email,phone,mdp) value(?,?,?,?,?)"
    const salt=bcrypt.genSaltSync(10);
    const hach=bcrypt.hashSync(mdp,salt)
    try {
        const clientexiste=await prisma.livreur.count({where:{email:email}})
    if(clientexiste>0){
        res.status(401).send("livreur deja existe ")
    }else{
     db.query(addcom,[nom,prenom,email,phone,hach],(err,reslt)=>{
        if(reslt){
            res.status(200).send({"msg":"livreur added with sucsses "})
           }else{
            res.status(401).send({"msg":"fama haja mouch hiya"+err})
           }
     })
       }
    } catch (error) {
        res.status(500).send({"msg":"oops "+ error})
    }
    
})




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
*/
//demarage de serveur 
app.listen(port,()=>{
    console.log(`1 2 3  Run ` )
})