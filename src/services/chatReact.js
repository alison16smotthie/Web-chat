require('dotenv').config();
const {userJoin, getUsers, usersLeaveRoom, getRoomUsers} = require('../models/users.js');

class ChatReactService{

  constructor() {


  }
  
  chatService = (io)=>{

      io.on("connection",function (socket) {

          console.log("User connected " + socket.id);
      
          socket.on("join_room", function (data) {
      
              const user = userJoin(socket.id,data.username, data.room);
              socket.join(user.room);
              const dataUsers =  {room : user.room,users : getRoomUsers(user.room)};
              console.log(dataUsers);

              io.to(user.room).emit('room_users',dataUsers);

          });
      
      
          socket.on("send_message", function (data) {
      
              console.table(data);
              socket.to(data.room).emit("receive_message",data);
          })
      
          socket.on("disconnect", function () {

              const user = usersLeaveRoom(socket.id);
              console.log(user);

              if(user) {

                const dataUsers = {room : user.room,users: getRoomUsers(user.room)};
                io.to(user.room).emit('room_users', dataUsers);
                io.to(user.room).emit('user_left_room', { username: user.username, room: user.room });

              }
      
              console.log("User disconnected " + socket.id);
          });

          socket.on("leave_room", function () {

              const user = usersLeaveRoom(socket.id);
              console.log(user);

              if(user) {

                const dataUsers = {room : user.room,users: getRoomUsers(user.room)};
                io.to(user.room).emit('room_users', dataUsers);
                io.to(user.room).emit('user_left_room', { username: user.username, room: user.room });

              }
          });
      });
  }

}


module.exports = {

  ChatReactService : new ChatReactService,
};


