import { Router, Request, Response } from "express";
import { request } from "http";
import { login, register } from "./../services/auth";
import path from 'path';
const router = Router()
router.post("/register", (req:Request, res: Response)=>{
    register(req).then((data) =>{
        console.log(req)
        res.send(data)
    }
    ).catch((error)=>{
        console.log(error)
    })
})

router.get("/",(req:Request, res:Response) => {
    res.sendFile(path.join(__dirname,'index.html'));
})

router.post("/login", (req:Request, res: Response) => {
    login(req).then((data)=>{
        console.log(data)
        res.send(data)
    }).catch((error)=>{
        console.log(error)
        res.send(error)
    })
})

export default router