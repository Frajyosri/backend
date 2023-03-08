import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient();

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

export const ObjectiveById=async(req,res)=>{
    const id=req.body.id
    try {
        const objectif=await prisma.objectif.findUnique({
            where:{Id:Number(id)},
        })
        res.json(objectif)
     
}   catch(error){
    res.status(500).json({"msg":"Somthing wrong "+error})
}
}