import express from "express"
import { Server, Socket } from "socket.io";
import router from "./routes/tmp";
import {processSocket} from "./services/chats"
import cors from "cors"
// const { Server } = require("socket.io");
const app = express()
const socketApp = express()
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const corOptions = {
    origin: ["*"]
}
app.use(cors(corOptions));
const server = require("http").Server(app);
const io = new Server(server);

io.on('connection',(socket: Socket)=>{
    console.log("connected")
    processSocket(socket)
})


app.use(router)
export default server;
