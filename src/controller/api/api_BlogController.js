const {Blog_data} = require('../../models/blogData.js');
const renderView = require('../../models/database_function.js');
require("dotenv").config();


class api_BlogController {

    index = async (req, res, next)=>{
          
        Blog_data.find({}).then(async (data) => { 
          
          data = await data.map(res => res.toObject());

          res.status(200).send(data);

        }).catch(err =>{

            console.log("The process of calling the company API is being interrupted: " + err);

            res.render('index.cl7');
        });
    }

    store = async (req, res, next)=>{
 
      try{

          const data = new Blog_data(req.body);
     
          data.save();

          res.redirect('/blog-api');

      }catch(err){

          res.send({

              "message":err
          });
      }
  }
}

module.exports = {
  
  blog_api : new api_BlogController,
}
