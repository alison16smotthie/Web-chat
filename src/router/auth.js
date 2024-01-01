const express = require('express');
const csrf = require('csurf')
const {auth_api} = require('../controller/api/api_AuthController');
const {middleware_auth} = require('../middleware/middleware_auth');
const {middleware_verifyToken} = require('../middleware/middware_verifyToken');
const {csrfProtection} = require('../config/security/csrfSecurity');

class AuthRoute{

    constructor(){
        
        this.router = express.Router();
    }

    Router(){


        this.router.get('/login',csrfProtection,middleware_auth.middlewareLogin,auth_api.index);
        this.router.post('/login',middleware_auth.middlewareLogin,auth_api.login);
        this.router.get('/account',middleware_verifyToken.middlewareVerify,auth_api.account);
        this.router.post('/register/store',middleware_auth.middlewareRegister,auth_api.store);

        return this.router;
    }
}


module.exports = {
    
    AuthRoute : new AuthRoute,
};

