import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();

//Get All Commande 
export const GetAllCommande=async(req,res)=>{
    try {
        const Commande= await prisma.livreur.findUnique({
            where:{
                id: Number(req.params.id)
            },
            include:{
                commande:true
            }
        })
        if(Commande){
            res.status(200).json({"le Commande Trouve est":Commande})
        }else{
            res.status(400).json({"msg":"Ooops "})
        }
    } catch (error) {
        res.status(500).json({"msg":"Ooops"+error})
    }
}
//Update his State 
export const UpdateState=async(req,res)=>{
    try {
       const State=await prisma.livreur.update({
        where:{
            id:Number(req.params.id)
        },
        data:{
            isdispo:req.body.isdispo
        }
       }) 
       if(State){
        res.status(201).json(State)
       }else{
        res.status(404).json({"msg":"Ooops "})
       }
    } catch (error) {
        res.status(500).json({"msg":"Ooops "+error})
    }
}
//Update Commande's Livrer State
export const UpdateCommandeState=async(req,res)=>{
    try{
        const Update_commande=await prisma.commande.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                etat:"livrer"
            }
        })
        if(Update_commande){
            res.status(201).json(Update_commande)
        }else{
            res.status(404).send({"msg":"no Commande Found "})
        }
    }catch(error){
        res.status(500).json({"msg":"Ooops"+error})
    }
}
//Update Commande En_route State
export const updateCommande=async(req,res) => {
    try {
        const Update_commande=await prisma.commande.update({
            where:{
                id:Number(req.params.id)
            },
            data:{
                etat:"en_route"
            }
        })
        if(Update_commande){
            res.status(201).json(Update_commande)
        }else{
            res.status(404).send({"msg":"no Commande Found "})
        }
    } catch (error) {
        res.status(500).json({"msg":"Ooops"+error})
    }
}

//Get Commande By Commande 
export const GetCommandeById=async(req,res)=>{
    try {
        const CommandeById=await prisma.commande.findUnique({
            where:{
                id: Number (req.params.id)
            },
            include:{
                Client:true,
                facture:true,
                commercant:true,
                Card:true,
            }
        })
        if (CommandeById) {
           res.status(200).json(CommandeById) 
        }else{
            res.status(404).json({"msg":"Commande Not Found "})
        }
        
    } catch (error) {
        res.status(500).json({"Ooops":"il ya Un Erreur "+error})
    }
}

//Get Card Item By Id 
export const getCardItem=async(req,res)=>{
    const id=req.params.id;
    try {
        const Card =await prisma.Card.findUnique({
            where:{
                id:Number(id)
            },
            include:{
                cardItem:true
            }
        })
        if(Card){
            res.status(200).json({Card})
        }else{
            res.status(404).json({"msg": "Card not found"})
        }
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
}