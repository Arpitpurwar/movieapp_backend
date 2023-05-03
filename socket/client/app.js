const socket = io();
socket.emit('sendMessage', {'name': "Arpit", 'greeting': "hello"});

socket.on("passNotification", (data)=> {
    console.log('response from server', data);
})