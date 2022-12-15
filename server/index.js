import express from "express";
import http from "http";
import cors from "cors";
import {Server} from "socket.io"
const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server,{                               ///new Server( httpserver , {cors:{}})
    cors:{ 
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    },
})


io.on("connection",(socket)=>{
    console.log(socket.id);
    
    socket.on("join_room",(data)=>{
        socket.join(data);
        console.log(`User ID : ${socket.id} joined room :${data}`);
    })


    socket.on("send_message",(data)=>{
        console.log(data);
        socket.to(data.room).emit("receive_message",data);
    })

    socket.on("disconnect",()=>{
        console.log("user Disconnected",socket.id);
    })
})






server.listen(4000,()=>{
    console.log("Server running --",4000)
})


