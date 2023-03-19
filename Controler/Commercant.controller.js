import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
import {db} from "../db.configue.js"



//obtenir les information de commercant et son client 
export const getAllComercantwithClient= async(req,res)=>{
    try {
        const id=req.body.Id
        const Allcom=await prisma.commercant.findUnique({
            where:{
                Id:Number(id)
            },
            include:{client:true},
        })
        res.json(Allcom)
        
    } catch (error) {
        res.status(500).send({"msg":"somthing wreng" + error})
    }
}
//obtenir les information de commercant et son Commande 
export const getAllComercantwithCommande= async(req,res)=>{
    try {
        const id=req.body.Id
        const Allcom=await prisma.commercant.findUnique({
            where:{
                Id:Number(id)
            },
            include:{client:true},
        })
        res.json(Allcom)
        
    } catch (error) {
        res.status(500).send({"msg":"somthing wreng" + error})
    }
}
//obtenir les information de commercant et son historique 
export const getAllComercantwithhistorique= async(req,res)=>{
    try {
        const id=req.body.Id
        const Allcom=await prisma.commercant.findUnique({
            where:{
                Id:Number(id)
            },
            include:{client:true},
        })
        res.json(Allcom)
        
    } catch (error) {
        res.status(500).send({"msg":"somthing wreng" + error})
    }
}
//obtenir les information de commercant et son Score 
export const getAllComercantwithScore= async(req,res)=>{
    try {
        const id=req.body.Id
        const Allcom=await prisma.commercant.findUnique({
            where:{
                Id:Number(id)
            },
            include:{client:true},
        })
        res.json(Allcom)
        
    } catch (error) {
        res.status(500).send({"msg":"somthing wreng" + error})
    }
}
//obtenir les Commande de chaque Client par id 
export const getclient_Commande=async(req,res)=>{
    const id=req.body.id
    try {
        const Allclient=await prisma.client.findUnique({
            where:{id:Number(id)},
            include:{commande:true},
        })
        res.json(Allclient)
        
    } catch (error) {
        res.status(500).send({"msg":"somthing wreng" + error})
    }
}
//obtenir les informtion d'objective par id 
export const ObjectiveById=async(req,res)=>{
    const id=req.params.id
    try {
        const objectif=await prisma.objectif.findUnique({
            where:{Id:Number(id)},
        })
        res.json(objectif)
     
}   catch(error){
    res.status(500).json({"msg":"Somthing wrong "+error})
}
}
//Ajouter Facture 
export const AddFacture=async(req,res)=>{
    const {montant,code_cmd}=req.body;
    try {
        const Addfact="insert into facture (montant,code_cmd) values(?,?)"
        db.query(AddFacture,[montant,code_cmd],(err,reslt)=>{
            if(reslt){
               res.status(200).json({"msg":"Facture a eté bien Enregistrer "}) 
            }else{
                res.status(400).json({"msg":"fama Galta "}) 
            }
        }) 
    } catch (error) {
        res.status(500).send({"msg":"fama Galta "+error})
    }
   
}
//Get All Facture 
export const GetAllFacture=async(req,res)=>{
    try {
        const Facture=await prisma.facture.findMany();
        if(Facture){
            res.status(200).json(  Facture)
            
        }else{
            res.status(400).send({"msg":"fama Ghalta"})
        }
    } catch (error) {
       res.status(500).send({"msg":"fama Ghalta"+error}) 
    }
}
//Get Facture Details 
export const GetFactureById=async(req,res)=>{
    try {
        const Id=req.params.id ;
        const FacturById=prisma.facture.findUnique({
            where:{
                id: Number(Id) 
            }
        })
        if (await FacturById.length>0) {
            res.status(200).json(await FacturById)
        }else{
            res.status(200).json({"msg":"Aucune Facture "})
        }
    } catch (error) {
        res.status(500).json({"msg":"Ooops !"+error})
    }
}
//serach product 
export const SearchProduct=async(req,res)=>{
    const q=req.query.nom;
    
   try {
    const Product=prisma.produit.findMany({
        where:{
            nom:{
                contains:q
            }
        }
    })
    if((await Product).length>0){
        res.status(200).send({"le produit trouver est:": await Product})
    }else{
        res.status(404).send({"msg":"Product Not Found "})
    }
    
   } catch (error) {
    res.status(500).send({"msg":error})
   }
   
}
//Update Comercant profile 
export const Commercant_Update=async(req,res)=>{
    const Id=req.body.Id;
    try {
         const Update_com=await prisma.commercant.update({
        where:{
            Id:Number(Id)
        },
        data:{
            email:req.body.email,
            phone:req.body.phone,
            benificier:req.body.benificier,
            montant_actuelle:req.body.montant_actuelle

        }
    })
    if(Update_com){
        res.status(200).json(Update_com);
    }else{
        res.status(400).json({"msg":"desolé "}); 
    }
    } catch (error) {
        res.status(500).send({"msg":"ooops "+error})
    }
   
}
//Add Commande 
export const AddCommande=async(req,res)=>{
    const {code,qte_prod,lat,long,ComId,Idproduit,CliId}=req.body;
    try {
        const Commande="insert into commande (code,qte_prod,lat,long,ComId,Idproduit,CliId)values(?,?,?,?,?,?,?)"
        db.query(Commande,[code,qte_prod,lat,long,ComId,Idproduit,CliId],(err,Commande)=>{
          if(Commande){
            res.status(201).send({"Commande ajouter avec Suscces": Commande})
        }else{
            res.status(400).send({"msg":"Ooops"+err})
        }
        })
       
    } catch (error) {
        res.status(500).send({"msg":error})
    }
}