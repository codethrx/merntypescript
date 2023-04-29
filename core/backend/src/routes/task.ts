import express, { Request,Response, } from "express";
import {client} from '../../prisma/client.js'
const router=express.Router();
router.route('/').get(async(req:Request,res:Response)=>{
    const tasks=await client.task.findMany({orderBy:{createdAt:'asc'}})
    res.json(tasks)
}).post(async(req:Request,res:Response)=>{
    const task=await client.task.create({data:req.body})
    res.json(task)
})
router.route('/:id').delete(async(req:Request,res:Response)=>{
    const tasks=await client.task.delete({where:{id:req.params.id}})
    res.json(tasks)
}).patch(async(req:Request,res:Response)=>{
    const task=await client.task.update({
        where: { id: req.params.id },
        data: { ...req.body },
      })
    res.json(task)
})

export default router