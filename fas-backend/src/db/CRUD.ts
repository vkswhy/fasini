import { IchatObj, IuserObj } from "./../utils/interfaces"
import db from "./"
const getAllUsersDB = async ()=>{
    const Users = await (await db)?.collection("Users").find().toArray()
    return Users
}


export const addNewUserDB = async (userObj:IuserObj) => {
    const data = await (await db)?.collection("users").insertOne(userObj)
    return data as unknown as IuserObj
}


export const getUserByUserNameDB = async (userName: string) => {
    console.log(userName)
    const data = await (await db)?.collection("users").find({username: userName}).toArray()
    console.log(data)
    return data[0] as unknown as IuserObj
}

export const addChatDB = async (chatObj: IchatObj) => {
    const data = await (await db)?.collection("chats").insertOne(chatObj)
    console.log(data)
}

export const getAllMessages = async (username: string) =>{
    const data = await (await db)?.collection("chats").find({ to: username }).toArray()
    console.log(data)
}

