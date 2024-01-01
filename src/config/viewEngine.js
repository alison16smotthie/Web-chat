const express = require('express');
const session = require('express-session');
const flash = require('express-flash');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const csrf = require('csurf');
require("dotenv").config();
const path = require('path');
const morgan = require('morgan');

let configViewEngine = (app, bodyParser, handlebars, SESSION_SECRET, SESSION_ALGORITHM) =>{

    app.use(cookieParser());

    // app.use(morgan('combined'));

    app.use(session({

        secret: SESSION_SECRET,
        algorithm: SESSION_ALGORITHM,
        resave: false,
        saveUninitialized: true,
        cookie:{
            secure: false,
            httpOnly : true,
            sameSite: 'None', 
            maxAge: 60 * 60 *1000}
    }));

    // app.use(csrf({ cookie: true }));

    app.use(cors({
        origin: process.env.ACCESS_ALL || 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE,OPTIONS',
        allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token'],
        credentials: true,
        exposedHeaders: ['X-CSRF-Token'],
    }));


    app.use(flash());
    app.use(express.static("./src/public"));
    app.use(bodyParser.json());
    app.use(express.urlencoded({extended: true})); 
    app.use(express.json());    
    app.engine('cl7', handlebars.engine(
        {extname : '.cl7',}
    ));
    app.set('view engine','cl7');
    app.use(express.static("./src/views"));
    app.set("views", "./src/views");
}

module.exports = {
    
    configViewEngine : configViewEngine,
};

