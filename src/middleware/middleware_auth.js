const {User, validate} = require("../models/users_db");
const express = require('express');
const readline = require('readline');
const JOI = require("joi");
const bcrypt = require("bcryptjs");
const {auth_api} = require('../controller/api/api_AuthController');
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

    middlewareLogin = async (err,req, res, next)=> {

      res.header('Access-Control-Allow-Origin', process.env.REACT_APP_HOSTNAME);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization','X-CSRF-Token');
      res.header('Access-Control-Allow-Credentials', 'true');

      console.log('Middleware Login Called!!!');
 
      try {

        const csrfToken = await auth_api.getCsrfTokenGenerate();
        const { error } = this.validate(req.body.data);
        const accessKey = req.get('Authorization');
        const user = await User.findOne({

              email: req.body.data.email 
        });

        console.log("Check csrf token: ", csrfToken);

        if(error){

          console.log(error.details[0].message);

          return res.status(400).send({ 

              message: `LOGIN ERROR: ${error.details[0].message}` 
          });        
        }   

        if (!user){

          return res.status(401).send({ 

              message: "Mật khẩu hoặc email không hợp lệ!" 
          });
        }
    
        const validPassword = await bcrypt.compare(
              req.body.data.password, 
              user.password);

  
        if (!validPassword){
  
          return res.status(401).send({ 

              message: "Mật khẩu hoặc email không hợp lệ!" 
          });
        }

        if (!accessKey || !accessKey.startsWith('Bearer ')) {

          return res.status(401).send({ 

              message: 'Bạn không có quyền truy cập!!!'
          });
        }

        const providedAccessKey = accessKey.split(' ')[1];

        if (providedAccessKey !== csrfToken) {

            return res.status(403).send({ 

                message: 'Bạn không có quyền truy cập!!!' 
            });
        }

        if (req.body.csrf_token !== csrfToken) {

          console.log("Invalid csrf token!!!");

          return res.status(401).send({ 

              message: 'Bạn không có quyền truy cập!!!' 
          });
      }

        next();
        
      }catch (error) {

          console.log("Auth Login Server Error: ",error);
        
          res.status(500).send({ 

              message: "Internal Server Error!" + error
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

            return res.status(403).send({ 
              
                message: 'Forbidden'
            });
        }

        next();

      }catch(error){

        console.log("Auth Register Server Error: ",error);
        
        return res.status(500).send({ 

            message: "Internal Server Error!" + error
        });
      }
    }


}

module.exports = {
    
   middleware_auth : new middleware_auth,
}