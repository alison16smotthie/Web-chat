const {User, validate} = require("../models/users_db");
const express = require('express');
const readline = require('readline');
const JOI = require("joi");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();


class middleware_verifyToken {

    constructor() {
       
    }


    middlewareVerify = async (req, res, next)=> {
    
      try {

        const accessToken = req.get('Authorization');

        const token = accessToken.split(' ')[1];

        jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decoded) => {
          
          if (err) {

            console.log("Token quá hạn logout!!!");

            return res.status(401).send({ message: 'Token không hợp lệ!' });
          }
          
          req.user = decoded;
    
          next();

        });

        
      } catch (error) {

        console.log(error);
      
        res.status(500).send({ 

          message: "Internal Server Error!" 
        
        });
      }
    }

}

module.exports = {
    
  middleware_verifyToken : new middleware_verifyToken,
}