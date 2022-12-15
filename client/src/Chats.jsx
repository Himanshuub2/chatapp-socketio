import React from 'react'
import { useEffect } from 'react';
import {useState} from "react";


function Chats({socket,username,room}) {
    const [currentMessage,setCurrentMessage] = useState("");
    const [messageList,setMessageList] = useState([]);



    useEffect(()=>{
        socket.on("receive_message",(data)=>{
            console.log(data);
            setMessageList([...messageList,data])

        })
    })

    const sendMessage = async ()=>{
        if(currentMessage !==""){
            const messageData = {
                room:room,
                author:username,
                message:currentMessage,
                time:new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }


            await socket.emit("send_message",messageData);
            setMessageList([...messageList,messageData])

        }
    }

  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
        {
            messageList.map(item=>(
                <div className='message'>
                    <div>
                        <div className='message-content'>
                            <p>{item.message}</p>
                        </div>
                        <div className='message-meta'>
                        <p>{item.time}</p>
                        <p>{item.author}</p>

                        </div>
                    </div>
                </div>
            ))
        }
        </div>
        <div className='chat-footer'>
            <input type = "text" placeholder='write here...' onChange = {e=>setCurrentMessage(e.target.value)}></input>
            <button onClick = {sendMessage}>&#9658;</button>
        </div>

    </div>
  )
}

export default Chats;