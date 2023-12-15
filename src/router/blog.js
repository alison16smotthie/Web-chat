const express = require('express');
const {middleware} = require('../middleware/middleware');
const {blog_api} = require('../controller/api/api_BlogController.js');

class BlogRoute{

  constructor(){
    
      this.router = express.Router();
  }

  Router(){

      this.router.get('/',blog_api.index);
      this.router.post('/blog-store', blog_api.store);

      return this.router;

  }
}


module.exports = {

  BlogRoute : new BlogRoute
};


