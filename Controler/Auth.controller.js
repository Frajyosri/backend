import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();


export const Client_sign_in=async(req,res)=>{
    const {email,password}=req.body;
    const   clientexiste= await prisma.client.findUnique(
        {where:{email:email,
            mdp:password}
        }
        )
        if(clientexiste){
            res.status(200)
        }else{
            res.status(400)
        }
}

export const commercant_login=async(req,res)=>{
    const {email,password}=req.body;
    const ClientSelect=await prisma.commercant.findUnique({where:{email:email,mdp:password}})
    if(ClientSelect){
        res.status(200)
    }else{
        res.status(400)
    }
}

export const Admin_login=async(req,res)=>{
    const {email,password}=req.body;
    const   clientexiste= await prisma.admin.findUnique({where:{UserName:email,Password:password}})
            if(clientexiste){
                res.status(200).send({"msg":"welcome there  "})
            }else{
                res.status(400).send({"msg":"no clint found "})
            }
}

export const Livreur_login=async(req,res)=>{
    const {email,password}=req.body;
    const   livexiste= await prisma.livreur.findUnique(
        {where:
            {email:email,
            mdp:password}
        }
        )
        if(livexiste){
            res.status(200)
        }else{
            res.status(400)
        }
}