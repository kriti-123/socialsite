module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);
    io.sockets.on('connection',function(socket){
        console.log("new connection established");
        socket.on('disconnect',function(){
            console.log("connection disconneted");
        });
        socket.on('join_room',function(data){
            console.log("joining request",data);
            socket.join(data.chatroom);
            io.in(data.chatroom).emit('user_joined',data);
        });
        socket.on('send_message',function(data){
           io.in(data.chatroom).emit('receive_message',data);
        })
    });
        
}