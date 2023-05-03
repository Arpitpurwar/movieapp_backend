const express = require('express');
const io = require('socket.io')
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, "client")))


const server = app.listen(3400, ()=> {
    console.log(`server is running on http://localhost:3400`)
})

let socketio = io(server);

socketio.on("connection", (socket)=> {
    console.log("New connection added");
    console.log("id", socket.id);
    socket.emit('passNotification', "Thanks for joining this group");
    socket.on('sendMessage', (data)=> {
        console.log('Data from UI',data);
    })
})
