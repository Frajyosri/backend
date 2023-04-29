import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();
import {db} from "../db.configue.js"

//Get All Commande 
export const GetAllCommande=async(req,res)=>{
    try {
        const Commande= await prisma.commande.findMany({
            where:{
                idliv: Number(req.params.id)
            }
        })
        if(Commande){
            res.status(200).json(Commande)
        }else{
            res.status(400).json({"msg":"Ooops"})
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
        res.status(201).send("success")
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
                id:req.params.id
            },
            data:{
                etat:"livrer"
            }
        })
        if(Update_commande){
            res.status(201).json(Update_commande);
        }else{
            res.status(404).send({"msg":"no Commande Found "})
        }
    }catch(error){
        res.status(500).json({"msg":"Ooops"+error})
    }
}
//Update Commande En_route State
export const updateCommande=async(req,res) => {
    const code_cmd=req.params.id;
    try {
        const Update="UPDATE `commande` AS c,facture AS f SET `etat`='en_route' WHERE c.id=f.code_cmd AND code_cmd=?";
        db.query(Update,[code_cmd],(err,result) => {
            console.log(code_cmd);
            if(result){
                res.status(200).json(" Commande Updated")
            }else{
                res.status(400).json({" Error":err.message});
            }
        })
    } catch (error) {
        res.status(500).json({"msg":"Ooops"+error})
    }
}
//Get Commande By Commande 
export const GetCommandeById=async(req,res)=>{
    const id = req.params.id
    try {
        const CommandeById="SELECT NomCom,prenomCom,nomCli,prenomCli,phoneCom,phoneCli,nom_Produit,prix_produit,qte_produit,Prix_card,etat ,montant,dateFact,code_cmd FROM commande AS cmd,client AS cl,commercant AS com,produit AS p,carditem as ci,card AS c ,facture AS f WHERE cmd.ComId=com.id AND cmd.CliId=cl.id AND cmd.id=f.code_cmd AND cmd.idCard=c.id AND c.id=ci.idCard and ci.idProduit=p.id and cmd.id=?";
        db.query(CommandeById,id,(err,resltat)=>{
            if (resltat) {
                res.status(200).json(resltat) 
             }else{
                 res.status(404).json({"msg":"Commande Not Found "+err})
             }
        })
        
        
    } catch (error) {
        res.status(500).json({"Ooops":"il ya Un Erreur "+error})
    }
}
export const UpdateLivreur=async(req,res)=>{
    const {email,phoneliv,mdp}=req.body;
    const id = req.params.id;
    try {
        const Livreur=await prisma.livreur.update({
            where:{
                id:Number(id),
            },
            data:{
                email:email,
                mdp:mdp,
                phoneliv:phoneliv,
            }
        })
        if(Livreur){
            res.status(201).json({Livreur})
        }else{
            res.status(400).json({"msg": "Invalid livreur Bad Request"})
        }
    } catch (error) {
        res.status(500).json({"erreur":"Ooops !! "+error.message})
    }
}
//Get livreur Bu Id 
export const getLivreurById=async(req,res)=>{
    try {
        const livrer =await prisma.livreur.findUnique({
            where:{
                id:Number(req.params.id)
            },
            
        })
        if(livrer){
            res.status(200).json(livrer);
        }else{
            res.status(404).json({"msg":"Not Found"});
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}