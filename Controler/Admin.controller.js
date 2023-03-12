import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
import {db} from "../db.configue.js"


//Get All Commande 
export const GetAllCommande=async(req,res)=>{
    try {
        const Commande=await prisma.client.findMany({
            include:{
                commande:true
            }
        })
        if(Commande){
            res.status(200).json(Commande)
        }else{
            res.status(400).json({"msg":"Ooops ! "})
        }
    } catch (error) {
        res.status(500).json({"msg":"Ooops ! "+error})
    }
}
//Get All Commercant 
export const GetAllComercant=async(req,res)=>{
    try {
        const Comercant=await prisma.commercant.findMany({
            include:{
                commande:true
            }
        })
        if(Comercant){
            res.status(200).json(Comercant)
        }else{
            res.status(400).json({"msg":"Ooops ! "})
        }
    } catch (error) {
        res.status(500).json({"msg":"Ooops ! "+error})
    }
}
//Get the last Commande 
export const GetlastCommande=async(req,res)=>{
    try{
         const Commande=prisma.commande.findMany({
       select:{
        code:true,
        Date_cmd:true,
        etat:true,
        ispayed:true,
        Adress:true,
        commercant:{
            include:true
        },
        Client:{
            include:true
        }
    },
    take:5,
})
    if(Commande){
        res.status(200).json(Commande)
    }
    }catch(error){
        res.status(500).send({"msg":error})
    }
   
}
//Get the last Commercant 
export const GetlastCommercant=async(req,res)=>{
    try {
     const Commande="SELECT * FROM `commercant` LIMIT ?"
     db.query(Commande,5,(err,reslt)=>{
        if(reslt){
            res.status(200).json(reslt)
        }
     })
    } catch (error) {
        res.status(500).send({"msg":error})
    }
   
}
//Get Statistique 
export const GetStatique=async(req,res)=>{
    try {
          const result = await prisma.user.groupBy({
        by: ['code', 'Date_cmd'],
        orderBy: {
          Date_cmd: true
        },
        _count: {
          _all: true
        },
      })
      if(result){
        res.status(200).json(result)
      }
    } catch (error) {
        res.status(500).json(error)
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
//search Commercant 
export const SearchCommercant=async(req,res)=>{
    const q=req.query.email;
    
   try {
    const Commercant=prisma.commercant.findMany({
        where:{
            email:{
                contains:q
            }
        }
    })
    if((await Commercant).length>0){
        res.status(200).send({"le commercant trouver est:": await Commercant})
    }else{
        res.status(404).send({"msg":"Commercant Not Found "})
    }
    
   } catch (error) {
    res.status(500).send({"msg":error})
   }
   
}
// add to historique 
export const AddTohistorique=async(req,res)=>{
    const {montant,ComId}=req.body;
    try {
        const payer=await prisma.commercant.update({
           where:{
            Id:ComId
           },
            data:{
              Paye:true ,
              montant_actuelle:0 
            },  
        })
        if(payer){
               const AddHistorique= await prisma.historique.create({
        data:{
            montant:montant,
            ComId:ComId
            }
        }
    )
    if ( AddHistorique) {
        res.status(200).send({"msg":"Historique Added with Sucsses"})
    }else{
        res.status(400).send({"msg":"oooppps"})
    }
        }else{
            res.status(400).send({"msg":"oooppps"})
        }
     
    } catch (error) {
        res.status(500).json({"msg":"fama haja "+error})
    }
    
}
// Get Commercant's Historique By Id
export const CommercantHistorique=async(req,res)=>{
    const Id=req.body.Id;
    try {
        const ComHist=await prisma.commercant.findUnique({
            include:{
                historique:true
            },
            where:{
                Id:Id
            }
        })
        if(ComHist){
            res.status(200).json(ComHist)
        }else{
            res.status(404).send("No historique ")
        }
    } catch (error) {
        res.status(500).send({'msg':"fama haja "+error})
    }
}
//ajouter un Livreur et Modifier l'etat de Commande 
export const Update_commande=async(req,res)=>{
    const code=req.body.code;
    const idliv=req.body.idliv;
    try {
        const Update_com=await prisma.commande.update({
            where:{
                code:code
            },
            data:{
                idliv:idliv
            }
        })
        if(Update_com){
            const Etat=await prisma.commande.update({
                where:{
                    code:code
                },
                data:{
                    etat:"en_route"
                }
            })
            if(Etat){
                res.status(200).json(Etat)
            }else{
                res.status(400).json({"msg":"ooops etat ne pas modifier  ! "})
            }
        }else{
            res.status(400).json({"msg":"ooops livreur ne pas ajouter  ! "})
        }
    } catch (error) {
      res.status(500).json({"msg":"ooops !! "+error})  
    }
}
//Reset l'etat de Commercant 
export const Commercant_Reset=async(req,res)=>{
    const Id=req.body.Id;
    try {
         const Update_com=await prisma.commercant.update({
        where:{
            Id:Number(Id)
        },
        data:{
            montant_actuelle:0.0,
            Paye:false

        }
    })
    if(Update_com){
        res.status(200).json(Update_com);
    }else{
        res.status(400).json({"msg":"desolé il ya un erreur  "}); 
    }
    } catch (error) {
        res.status(500).send({"msg":"ooops "+error})
    }
   
}
//Delete Commercant 
export const Delete_com=async(req,res)=>{
    try {
        const Comercant=await prisma.commercant.delete({
            where:{
                Id:req.body.Id
            }
        })
        if(Comercant){
            res.status(200).send({"msg":"Commercant a eté effacer"})
        }else{
            res.status(400).json({"msg":"Ooops ! je crois qu'il n'ya pas un commercant a ce id  "})
        }
    } catch (error) {
        res.status(500).json({"msg":"Ooops ! "+error})
    }
}
//Add to Objective 
export const AddObjective=async(req,res)=>{
    const {Titel,Description,nbr_defi}=req.body
    try {
        const Add=  "insert into objectif(Titel,Description,nbr_defi) values(?,?,?)";
        db.query(Add,[Titel,Description,nbr_defi],(err,reslt)=>{
            if ( reslt) {
            res.status(200).json("Objective a éte ajouter")
        }else{
            res.status(400).json({"msg":"Oops"+err})
        }
        })
    
        
    } catch (error) {
        res.status(500).json({"msg":"Oops"+error})
    }

}
//Consulter les Objective 
export const Allobjective=async(req,res)=>{
    try {
        const Objective=await prisma.objectif.findMany({})
        if(Objective){
            res.status(200).json(Objective);
        }else{
            res.status(404).json({"msg":"Aucune Objective trouvé "})
        }
    } catch (error) {
     res.status(500).json({"msg":"Ooops ! "+error})   
    }
}
//Condulter la reclamation de Client 
export const Reclamation =async(req,res)=>{
    try {
        const Reclamation=await prisma.client.findMany({
            include:{
              Rapport:true  
            }
        })
        if(Reclamation){
            res.status(200).json(Reclamation)
        }else{
            res.status(400).json({"msg":"Oops"})
        }
    } catch (error) {
        res.status(500).json({"msg":"Oops"+error})
    }
}
//Get Commercant By id 
export const GetComercantById=async(req,res)=>{
    const Id=req.body.Id;
    try {
        const Com=await prisma.commercant.findUnique({
            where:{
                Id:Id 
            }
        })
        if(Com){
            res.status(200).json(Com)
        }else{
            res.status(404).json({"msg":"Commercant Not Found "})
        }
    } catch (error) {
        res.status(500).json({"msg":"Ooops !"+error})
    }
}
//Get Facture By id 
export const GetFactureById=async(req,res)=>{
   const code_cmd=req.body.code_cmd;
    try {
       const Facture=await prisma.commande.findUnique({
        where:{
            code:code_cmd
        },
        include:{
            facture:true
        }
       }) 
       if(Facture){
        res.status(200).json(Facture)
       }else{
        res.status(404).send({"msg":"Facture not Found "})
       }
    } catch (error) {
        res.status(500).send({"msg":"Oops"+error})
    }
}