const express = require('express');
let router = express.Router();
const {ChatRoute} = require('./chat');
const {HomeRoute} = require('./home');
const {CompanyRoute} = require('./company');
const {bot_facebook} = require('../controller/botFbController');
const {postWebhook, getWebhook} = require('../controller/botFbController');


let webInit = (app) => {

    app.get('/botfb', bot_facebook.index);
    app.get('/webhook', getWebhook)
    app.post('/webhook', postWebhook);
    app.use('/chat', ChatRoute.Router());
    app.use('/company-api', CompanyRoute.Router());

    app.use('/', HomeRoute.Router());
}

module.exports = {
    
    webInit : webInit
};










