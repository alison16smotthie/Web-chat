const express = require('express');
const fs = require('fs');
const axios = require('axios');
const app = express();
const handleBars = require('express-handlebars');
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const viewEngine = require('./config/viewEngine.js');
const route = require('./router/web.js');
const {Websocket_Connection} = require('./services/connect_websocket.js');
const {ChatReactService} = require('./services/chatReact.js');
const {API} = require('./services/api.js');
const {database_connection} = require('./config/databases/index.js');
const port = process.env.PORT || 3000;
require('dotenv').config();
viewEngine.configViewEngine(app, bodyParser, handleBars, 
process.env.SESSION_SECRET, process.env.SESSION_ALGORITHM); 
const io = new Server(server,{

    cors:{

        origin:process.env.ACCESS_ALL,
        methods: ["GET", "POST"]
    },
});

route.webInit(app);

Websocket_Connection.connectToClient(io);
Websocket_Connection.connectWebChat(io);
ChatReactService.chatService(io);

database_connection.connectDB(process.env.STRING_CONNECTION_MONGODB);

server.listen(port,async () => {
    
    console.log(`server running on port ${port}`);

});































