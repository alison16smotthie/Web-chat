const express = require('express');
let router = express.Router();
const {ChatRoute} = require('./chat');
const {HomeRoute} = require('./home');
const {bot_facebook} = require('../controller/botFbController');
const {postWebhook, getWebhook} = require('../controller/botFbController');


let webInit = (app) => {

    app.get('/botfb', bot_facebook.index);
    app.get('/webhook', getWebhook)
    router.post('/webhook', postWebhook);
    app.use('/chat', ChatRoute.Router());
    app.use('/', HomeRoute.Router());
}

module.exports = {
    webInit : webInit
};










