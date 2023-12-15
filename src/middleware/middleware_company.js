const express = require('express');
const readline = require('readline');
require('dotenv').config();

class middleware_company {

    constructor() {
       
    }

  
    middlewareCompany = async (req, res, next)=> {

        if(req.query.access_key === process.env.access_key){

            return next();
        } 

        res.send({

            "message": "Ban khong co quyen truy cap!!!"
        });
    }


}

module.exports = {
    
    middleware_company : new middleware_company,
}