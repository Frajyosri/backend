import  express from "express";
const router=express.Router()
import{Client_sign_in,
        Admin_login,
        commercant_login,
        Livreur_login,
         Client_register,
         commercant_register,
         Admin_Rest,
         Livreur_register
}
    from "../Controler/Auth.controller.js ";

import multer from "multer";

let filename="";
const myStorage=multer.diskStorage({
    destination:"./Uploads",
    filename(req,file,redirect){
     let date=Date.now();
     let f1=date+"."+ file.mimetype.split("/")[1];
     redirect(null,f1)
     filename=f1;
    }
    })
const Upload=multer({storage:myStorage})


//client sign in 
router.post("/client/login",Client_sign_in)
router.post("/client/register",Client_register)
router.post("/admin/login",Admin_login)
router.put("/admin/reset",Admin_Rest)
router.post("/comercant/login",commercant_login)
router.post("/comercant/register",commercant_register)
router.post("/livreur/login",Livreur_login)

//livreur register 
router.post("/livreur/register",Livreur_register)

export default router;