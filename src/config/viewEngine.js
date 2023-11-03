const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const cors = require('cors');
require("dotenv").config();
const path = require('path');

let configViewEngine = (app, bodyParser, handlebars, SESSION_SECRET, SESSION_ALGORITHM) =>{

    app.use(session({
        secret: SESSION_SECRET,
        algorithm: SESSION_ALGORITHM,
        resave: false,
        saveUninitialized: true,
        cookie:{
                secure: false,
                httpOnly : true,
                maxAge: 5 * 60 *1000
            }
      }));
    app.use(cors({
        
        origin: process.env.LOCALHOST_ACCESS_API,
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'X-Requested-With,content-type',
        credentials: true
    }));
    app.use(flash());
    app.use(express.static("./src/public"));
    app.use(bodyParser.json());
    app.use(express.urlencoded({extended: true})); 
    app.use(express.json());    
    app.engine('cl7', handlebars.engine({extname : '.cl7',}));
    app.set('view engine','cl7');
    app.use(express.static("./src/views"));
    app.set("views", "./src/views");
}

module.exports = {
    configViewEngine : configViewEngine
};
    
  








