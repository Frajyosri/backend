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
    from "../Controler/Auth.controller.js "

//client sign in 
router.get("/client/login",Client_sign_in)

router.post("/client/register",Client_register)

router.get("/admin/login",Admin_login)

router.put("/admin/reset",Admin_Rest)

router.get("/comercant/login",commercant_login)

router.post("/comercant/register",commercant_register)
router.get("/livreur/login",Livreur_login)
//livreur register 
router.post("/livreur/register",Livreur_register)

export default router;