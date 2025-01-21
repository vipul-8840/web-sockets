import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({port:8080});
interface User{
   socket:WebSocket;
   room:string;
}

let allsockets:User[] = [];
wss.on('connection',(socket)=>{
   

   socket.on('message',(message)=>{
      const parsedMessage = JSON.parse(message.toString());

      if(parsedMessage.type==='join')
      {
           allsockets.push({
            socket,
            room:parsedMessage.payload.roomId
           })
      }

      if(parsedMessage.type==='chat')
      {
          const currentUser = allsockets.find((user)=>user.socket==socket);
          const currentUserRoom = currentUser ? currentUser.room : null;
           
          allsockets.forEach((user)=>{
                 if(user.room===currentUserRoom)
                 {
                    user.socket.send(parsedMessage.payload.message)
                 }
          })





      }
 })
      

})