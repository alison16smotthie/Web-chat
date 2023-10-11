const express = require('express');
const {chatPage} = require('../controller/chatController');
const {middleware} = require('../middleware/middleware');

class ChatRoute{

    constructor(){
        this.router = express.Router();
    }

    Router(){

        this.router.get('/', middleware.middlewareChat,chatPage.chat);
        this.router.get('/api',chatPage.getApiMessage);
        this.router.get('/:slug', chatPage.show);
        
        this.router.post('/', chatPage.postChat);
        this.router.post('/api', chatPage.postApiMessage);

        return this.router;

    }
}




module.exports = {

    ChatRoute : new ChatRoute
};



