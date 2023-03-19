import  express from "express";
const router=express.Router()
import {getAllComercantwithCommande,
       getAllComercantwithClient,
       getAllComercantwithScore,
       getAllComercantwithhistorique,
       getclient_Commande,
       ObjectiveById,
       AddFacture,
       GetAllFacture,
       GetFactureById,
       SearchProduct,
       Commercant_Update,
       AddCommande
} from "../Controler/Commercant.controller.js";


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
router.get("/commercant/objective/:id",ObjectiveById)
//Get All facture 
router.get("/facture",GetAllFacture)
//Get Facture By Id 
router.get("/facture/:id",GetFactureById)
//Add New Facture 
router.post("/facture",AddFacture)
//Search Product 
router.get("/product/search",SearchProduct)
//Update the Commercant State 
router.put("/comercant/update",Commercant_Update)
//Add Commande 
router.post("/commande",AddCommande)
export default router;