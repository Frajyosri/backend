import  express from "express";
const router=express.Router()

import{GetAllCommande,
       UpdateState,
       UpdateCommandeState,
       GetCommandeById,
       updateCommande,
       getCardItem
       

} from "../Controler/livreur.controller.js"

router.get("/livreur/:id",GetAllCommande)
router.get("/livreur/commande/:id",GetCommandeById)
router.put("/livreur/Comande/:id",UpdateCommandeState)
router.put("/livreur/:id",UpdateState)
router.put("/livreur/CommandState/:id",updateCommande)
router.get("/livreur/Card/:id",getCardItem)


export default router;