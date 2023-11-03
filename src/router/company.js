const express = require('express');
const {middleware} = require('../middleware/middleware');
const {company_api} = require('../controller/api/api_CompanyController.js');

class CompanyRoute{

  constructor(){
      this.router = express.Router();
  }

  Router(){

      this.router.get('/',company_api.index);

      return this.router;

  }
}


module.exports = {

  CompanyRoute : new CompanyRoute
};


