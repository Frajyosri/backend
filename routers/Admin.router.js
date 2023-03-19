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
         GetComercantById,
         DeleteProduct,
         GetAllProduct,
         GetCategory,
         GetCategoryById,
         GetProductById,
         UpdateProduit
} from "../Controler/Admin.controller.js";
import { PrismaClient } from "@prisma/client";
import path from "path"
const prisma=new PrismaClient();
import multer from "multer";
import {db} from "../db.configue.js"
var filename="";
//Upload File 
const mystorage=multer.diskStorage({
    destination:"../Uploads",
    filename:(req,file,redirect)=>{
        let date= Date.now();
        let f1=date+"."+file.mimetype.split("/")[1];
        redirect(null,f1)
        filename=f1;
    }
})



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
router.get("/admin/Chistorique/:id",CommercantHistorique)
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
//add product 
router.post("/admin/produit",multer({storage:mystorage}).single("image"),async(req,res)=>{
        const {nom,description,prix,color,pht,pat,remise,idcategory}=req.body
        try {
        const Product="insert into produit (nom,description,prix,color,image,pht,pat,remise,idcategory)values (?,?,?,?,?,?,?,?,?)"
           db.query(Product,[nom,description,prix,color,filename,pht,pat,remise,idcategory],(err,reslt)=>{
            if(reslt){
                res.status(201).json({"msg":"Produit a eté ajouter avec Sucsses "})
            }else{
                res.status(400).json({"msg":err})
            }
           })
        } catch (error) {
            res.status(500).json({"Ooops":error})

            
        } })
//Get All product 
router.get("/admin/produit",GetAllProduct)
//Delete Product 
router.delete("/admin/product/:id",DeleteProduct)
//get   Category by Id 
router.get("/admin/category/:id",GetCategoryById)
//get All category 
router.get("/admin/category",GetCategory)
router.get("/admin/produit/:id",GetProductById)
router.put("/admin/produit/:id",UpdateProduit)
export default router;