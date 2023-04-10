import  express from "express";
const router=express.Router()
import {
       getAllComercantwithhistorique,
       getclient_Commande,
       ObjectiveById,
       AddFacture,
       GetAllFacture,
       GetFactureById,
       SearchProduct,
       Commercant_Update,
       AddCommande,
       DeleteCommande,
       GetAllCategory,
       GetAllProduct,
       addClient,
       GetCommandeByCode,
       updateImage,
       getCommercantById
} from "../Controler/Commercant.controller.js";

//get the client of commercant
//get the commande of commercant
//get the score of commercant 
//get the historique of commercant
router.get("/commercant",getAllComercantwithhistorique)

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
//delete Commande 
router.delete("/commande",DeleteCommande)
//Get All Category 
router.get("/category",GetAllCategory)
//Get All Produit By Id 
router.get("/produit",GetAllProduct)
//Add Client 
router.get("/client",addClient)
//Get Commande By Code 
router.get("/commandeByCode",GetCommandeByCode)
//Commercant Image Update
router.put("/commercant/:id",updateImage)
//Get Commercant By id 

router.get("/commercant/details/:id",getCommercantById)

export default router;