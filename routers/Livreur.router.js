import  express from "express";
const router=express.Router()

import{GetAllCommande,
       UpdateState,
       UpdateCommandeState,
       GetCommandeById,
       updateCommande,
       UpdateLivreur,
       getLivreurById
       

} from "../Controler/livreur.controller.js"

router.get("/livreur/:id",GetAllCommande)  //Done  ++ 
router.get("/livreur/commande/:id",GetCommandeById) //Done + +
router.put("/livreur/:id",UpdateLivreur) //Done ++
router.put("/livreur/Comande/:id",UpdateCommandeState) //Done ++ 
router.put("/livreurStat/:id",UpdateState) //Done ++
router.put("/livreur/CommandState/:id",updateCommande) //Done ++
router.get("/livreurById/:id",getLivreurById)  //Done  ++


export default router;