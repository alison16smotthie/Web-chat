const express = require('express');
const csrf = require('csurf');
const cors = require('cors');
const {admin} = require('../controller/AdminController');
const {middleware_admin} = require('../middleware/middleware_admin');
const {csrfProtection} = require('../config/security/csrfSecurity');

class AdminRoute{

    constructor(){
        
        this.router = express.Router();
    }

    Router(){


        // this.router.get('/login',csrfProtection,middleware_auth.middlewareLogin,auth_api.index);
        // this.router.post('/login',csrfProtection,middleware_auth.middlewareLogin,auth_api.login);

        // this.router.get('/account',cors({
        //     origin: 'http://localhost:3000',//process.env.REACT_APP_HOSTNAME || 
        //     methods: 'GET,POST,PUT,DELETE,OPTIONS',
        //     allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
        //     credentials: true,
        //     optionsSuccessStatus: 204,
        //     exposedHeaders: ['X-CSRF-Token'],
        // }),middleware_verifyToken.middlewareVerify,auth_api.account);

        this.router.post('/register/store',middleware_admin.middlewareAuthCreateAdmin,admin.store);

        return this.router;
    }
}


module.exports = {
    
    AdminRoute : new AdminRoute,
};

