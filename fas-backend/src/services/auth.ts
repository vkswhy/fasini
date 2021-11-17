import {NextFunction, Request, Response} from "express"
import {ResponseError, IloginObj, IregisterRequest, IuserObj} from "./../utils/interfaces"
import {addNewUserDB, getUserByUserNameDB} from "./../db/CRUD"
import jwt from "jsonwebtoken"
import crypto from "crypto"

export const register = async (req: IregisterRequest) => {
    try{
    const regData = req.body;
    if (!regData.username || !regData.name || !regData.password )
        throw new ResponseError({message:"name and password can't be empty"})
    const isAnonym = regData.phoneNo ? true: false
    const encrypted = encryptPassword(regData.password)
    const dbload:IuserObj = {username: regData.username, name: regData.name, password: encrypted, isAnonym: isAnonym}
    const ack= await addNewUserDB(dbload)
    const data = await getUserByUserNameDB(dbload.username)
    return generateNewToken(data)

    }
    catch(error){
        throw error
    }
} 
const generateNewToken = (userObj:IuserObj) =>{
    const preObj = {
        username: userObj.username,
        name: userObj.name,
        isAnonym: userObj.isAnonym
    }
    const authToken = jwt.sign(userObj, process.env.JWTKEY)
    return authToken;
}


const verifyToken = (req: Request, res: Response, next: NextFunction) =>{
    const auth:string = req?.headers?.authentication as string
    if(!auth) throw new ResponseError({message:"Not authenticated"})

    const authToken = auth.split(" ")[1]
    const user = jwt.verify(authToken,process.env.JWTKEY)
    return user
    next();
}

const extractUser = (req: Request) =>{
    const auth:string = req?.headers?.authentication as string
    if(!auth) throw new ResponseError({message:"Not authenticated"})
    const authToken = auth.split(" ")[1]
    const user: IuserObj = jwt.decode(authToken) as IuserObj
    return user
}

export const login = async (req: IloginObj) =>{
    const reqData = req.body
    if(!reqData.username || !reqData.password){
        throw new ResponseError({message:"invalid data"})
    }
    const encrypted = encryptPassword(reqData.password)
    const data = await getUserByUserNameDB(reqData.username)
    if (encrypted === data.password){
        console.log("login successful")
        return generateNewToken(data)
    }
    else{
        throw new ResponseError({message:"login failed"})
    }
}

const encryptPassword = (password: string) => {
    const encrypted = crypto.createHash("sha256").update(password).digest("hex")
    return encrypted;
}