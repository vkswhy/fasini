import React,{KeyboardEvent, MouseEvent, useEffect, useRef} from "react";
import { messages } from "../utils/fakeServer";
import {iMessage} from "./../utils/interfaces"
import sendIcon from "./../utils/icons/sendIcon1.svg"

function Chats({info}:{info:string}){
    const messages = fetchMessages();
    const inputF = useRef<HTMLTextAreaElement>(null);

    let lineCount = 30
    useEffect(()=>{

    }, [])
    const autoResize = (e:KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.code == "Enter"){
            e.preventDefault();
            handleSend();
        }

        const el = e.target as HTMLTextAreaElement
        el.style.height = "30px"
        el.style.height = el.scrollHeight+"px"
    }

    const handleSend = () => {
        const el = inputF?.current
        if(el){
            el.value = "";
            console.log(el.innerHTML)
        }
    }
    return(
        <div className="chat-container">
            <nav>wini</nav>
            <div className="msgs">
                {messages.map((message, index) => {
                    return (<RenderChat key ={index} info = {info} message = {message}/>)
                })}
            </div>
            <div className="msg-input">
                <textarea ref={inputF} onKeyDown={autoResize} placeholder="Message" rows={1}/>
                <div>
                    <button className="btn p-0" onClick={handleSend}>
                        <img src={sendIcon} width="32px" alt="" />
                    </button>
                </div>
            </div>

        </div>
    )
}

function RenderChat({info, message}:{info:string, message:iMessage}){
    const lorR = info === message.user ? "right":"left";
    const className = `msg msg-${lorR}`
    return (
        <p className= {className}>{message.content}</p>
    )
}
const fetchMessages = ():iMessage[] =>{
    //temporary
    return messages();
}
export default Chats;