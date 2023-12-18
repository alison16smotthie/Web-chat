const express = require('express');
const {auth_api} = require('../controller/api/api_AuthController');
const {middleware_auth} = require('../middleware/middleware_auth');
const {middleware_verifyToken} = require('../middleware/middware_verifyToken');

class AuthRoute{

    constructor(){
        
        this.router = express.Router();
    }

    Router(){

      this.router.get('/login',middleware_verifyToken.middlewareVerify,auth_api.index);
      this.router.post('/login',middleware_auth.middlewareLogin,auth_api.login);
      this.router.post('/register/store',middleware_auth.middlewareRegister,auth_api.store);

      return this.router;
    }
}


module.exports = {
    
    AuthRoute : new AuthRoute,
};
















