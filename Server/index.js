require("./db/mongoose"); 
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const socket = require("socket.io");

const app = express();
require('dotenv').config();
const port = 5000;

app.use(cors());
app.use(express.json());


app.use("/api/auth", userRoutes);
app.use("/api/messages", messagesRoutes);


const server = app.listen(port,()=>{

console.log(`server running in ${port}`)


});
const io = socket(server,{


cors:{
    origin:"http://localhost:3000",
    credentials : true
}
});

global.onlineUsera= new Map();
io.on("connection",(socket)=>{

global.chatsocket = socket;
socket.on("add-user",(userId) =>{

    onlineUsera.set(userId,socket.id);
  });

 socket.on("send-msg",(data)=>{

    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
 }})

});