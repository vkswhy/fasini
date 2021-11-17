import { Socket } from "socket.io";
import jwt from "jsonwebtoken"
import { IchatObj, IuserObj, ResponseError } from "../utils/interfaces";
import { addChatDB, getAllMessages } from "../db/CRUD";
export const processSocket = (socket: Socket) => {
    const auth = socket.handshake.query?.authToken as string
    const authToken = auth.split(" ")[1]
    if(!authToken){
        socket.disconnect()
        throw new ResponseError({message:"not authenticated"})
    }
    const user:IuserObj= jwt.verify(authToken,process.env.JWTKEY) as IuserObj
    socket.join(user.username)
    socket.emit("joined",`joined room ${user.username}`)
    //deploying all the messages when user connects
    // getAllMessages(user.username)
    console.log(getAllMessages("vkswhy"))
    //Processing sendMessage
    socket.on("sendMessage", (msgObj: IchatObj) => {
        const newChatObj = createChatObj(user.username, msgObj)
        console.log(socket.rooms, newChatObj.to)
        if(socket.rooms.has(newChatObj.to)){
            socket.in(newChatObj.to).emit("getMessage",newChatObj)
            return
        }
        addChatDB(newChatObj);
    });
}
const createChatObj = (from:string,msgObj: IchatObj) => {
    const curTime = new Date().toISOString()
    if (!from || !msgObj.to || !msgObj.msg) {
        throw new ResponseError({message:"invalid message"})
    }
    const newMsgOBj: IchatObj = {
        from: from,
        to: msgObj.to,
        msg: msgObj.msg,
        datetime: curTime
    }
    return newMsgOBj
}