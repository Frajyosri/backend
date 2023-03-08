import  express from "express";
const router=express.Router()
import {getAllComercantwithCommande,
       getAllComercantwithClient,
       getAllComercantwithScore,
       getAllComercantwithhistorique,
       getclient_Commande,
       ObjectiveById
} from "../Controler/Commercant.controller.js"

//get the client of commercant
router.get("/commercant/client",getAllComercantwithClient)
//get the commande of commercant
router.get("/commercant/commande",getAllComercantwithCommande)
//get the historique of commercant
router.get("/commercant/historique",getAllComercantwithhistorique)
//get the score of commercant 
router.get("/commercant/score",getAllComercantwithScore)
//get the commande of client by id 
router.get("/client/commande",getclient_Commande)
//get the objective By id 
router.get("/commercant/objective",ObjectiveById)
export default router;