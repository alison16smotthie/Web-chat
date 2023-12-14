require('dotenv').config();

class ChatReactService{

  constructor() {


  }
  chatService = (io)=>{

      io.on("connection",function (socket) {

          console.log("User connected " + socket.id);
      
          socket.on("join_room", function (data) {
      
              socket.join(data);
              console.log(`User with id ${socket.id} join room: ${data}`);
          });
      
      
          socket.on("send_message", function (data) {
      
              console.table(data);
              socket.to(data.room).emit("receive_message",data);
          })
      
          socket.on("disconnect", function () {
      
              console.log("User disconnected " + socket.id);
          });
      });
  }

  


}



module.exports = {

  ChatReactService : new ChatReactService,
};


