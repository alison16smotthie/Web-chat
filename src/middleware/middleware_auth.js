const {User, validate} = require("../models/users_db");
const express = require('express');
const readline = require('readline');
const JOI = require("joi");
const bcrypt = require("bcrypt");
require('dotenv').config();


class middleware_auth {

    constructor() {
       
    }

    validate = (data) =>{

      const schema = JOI.object({

        email: JOI.string().email().required().label("Email"),
        password: JOI.string().required().label("Password"),
      });

      return schema.validate(data);
    }

    middlewareLogin = async (req, res, next)=> {
    
      try {

        const { error } = this.validate(req.body);
        const accessKey = req.get('Authorization');
        const user = await User.findOne({

           email: req.body.email 
        });

        if(error){

          return res.status(400).send({ 

            message: `LOGIN ERROR: ${error.details[0].message}` 
          });        
        }   

        if (!user){

          return res.status(401).send({ 

            message: "Invalid Email or Password!" 
          });
        }
    
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
  
        if (!validPassword){
  
          return res.status(401).send({ 

            message: "Mật khẩu hoặc email không hợp lệ!" 
          });
        }

        if (!accessKey || !accessKey.startsWith('Bearer ')) {

          return res.status(401).send({ message: 'Bạn không có quyền truy cập!!!'});
        }

        const providedAccessKey = accessKey.split(' ')[1];

        if (providedAccessKey !== process.env.access_key) {

            return res.status(403).send({ message: 'Forbidden' });
        }

        next();
        
      } catch (error) {

          console.log(error);
        
          res.status(500).send({ 

            message: "Internal Server Error!" 
          });
      }
    }

    middlewareRegister = async (req, res, next)=> {

      try{

        const {error} = validate(req.body);
        const accessKey = req.get('Authorization');
        const user = await User.findOne({ email: req.body.email });

        if(error){

          return res.status(400).send({

            message:`REGISTER ERROR: ${error.details[0].message}`
          });
        }

        if(user) {
  
          return res.status(409).send({

            message:"User with given email already exists!"
          });
        }


        if (!accessKey || !accessKey.startsWith('Bearer ')) {

            return res.status(401).send({ message: 'Bạn không có quyền truy cập!!!'});
        }

        const providedAccessKey = accessKey.split(' ')[1];

        if (providedAccessKey !== process.env.access_key) {

            return res.status(403).send({ message: 'Forbidden' });
        }

        next();

      }catch(error){

        console.log(error);
        
        return res.status(500).send({ 

          message: "Internal Server Error!" 
        });
      }
    }


}

module.exports = {
    
   middleware_auth : new middleware_auth,
}