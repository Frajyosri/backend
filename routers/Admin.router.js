import  express from "express";
const router=express.Router()
import {GetlastCommande,
        GetlastCommercant,
         GetStatique,
         SearchProduct,
         SearchCommercant,
         AddTohistorique,
         CommercantHistorique,
         Update_commande,
         Commercant_Reset,
         GetAllCommande,
         GetAllComercant,
         Delete_com,
         AddObjective,
         Reclamation,
         Allobjective,
         GetFactureById,
         GetComercantById
} from "../Controler/Admin.controller.js";

//Get last Commande 
router.get("/admin/lastCommande",GetlastCommande)
//Get last Commercant
router.get("/admin/lastCommercant",GetlastCommercant)
//Get Statique 
router.get("/admin/stats",GetStatique)
//Search Product 
router.get("/admin/search",SearchProduct)
//Search Commercant 
router.get("/admin/Csearch",SearchCommercant)
//Add to historique
router.post("/admin/historique",AddTohistorique)
//Get the Commercant Historique 
router.get("/admin/Chistorique",CommercantHistorique)
//Update the Commande State 
router.put("/admin/commande",Update_commande)
//Reset the Commercant State 
router.put("/admin/commercant/reset",Commercant_Reset)
//Get All Commande 
router.get("/admin/Commande",GetAllCommande)
//Get All Commercant 
router.get("/admin/Comercant",GetAllComercant)
//Delete Commercant 
router.delete("/admin/comercant",Delete_com)
//Add Objective 
router.post("/admin/objective",AddObjective)
//Get All Client's Reclamation
router.get("/admin/Reclamation",Reclamation)
//Get All Objective
router.get("/admin/AllObjective",Allobjective)
//Get Facture By Id 
router.get("/admin/facture",GetFactureById)
//Get Commercant By Id  
router.get("/admin/comercantById",GetComercantById)
export default router;