
import './App.css';
import io from "socket.io-client";
import {useState} from "react";
import Chats from './Chats';
const socket = io.connect("http://localhost:4000");


function App() {
  const [username,setUsername] = useState("");
  const [room,setRoom] = useState("");
  const [showChat,setShowChat] = useState(false);





  const joinRoom = ()=>{
    
    
    if(username !=="" && room !==""){

      setShowChat(!showChat);
      socket.emit("join_room",room);
     
    }
  }

  return (
    <div className="App">
      <h1 style = {{color:"#43a047"}}>Join Chat</h1>

      <div className='joinChatContainer'>

      <input type = "text" placeholder='Himanhshu...' onChange = {(e)=>setUsername(e.target.value)}/>
      <input type = "text" placeholder='Room Id' onChange = {(e)=>setRoom(e.target.value)}/>
      <button onClick = {joinRoom}>Join A room</button>
     
      </div>
      {showChat  ? 
      <Chats socket = {socket} username = {username} room = {room}/>
      :
      " "
      }
    </div>
  );
}

export default App;
