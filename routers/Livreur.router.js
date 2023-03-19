import  express from "express";
const router=express.Router()

import{GetAllCommande,
       UpdateState,
       UpdateCommandeState,
       GetAllFacture,
       GetFactureById,
       GetCommandeById
       

} from "../Controler/livreur.controller.js"

router.get("/livreur/command",GetAllCommande)
router.get("/livreur/facture",GetAllFacture)
router.get("/livreur/factureById",GetFactureById)
router.get("/livreur/commande",GetCommandeById)
router.put("/livreur/Comande",UpdateCommandeState)
router.put("/livreur",UpdateState)



export default router;