const {Key_chat} = require('../models/users_db.js');
const axios = require('axios');
const {API} = require('../services/api.js');

class Bot {

    constructor() {
      this.globalData = null;
    }
  
    async findKeyChat() {

      const data = await Key_chat.find({})
      .catch(error=>{

          console.log(`connect failed`);
      });
      this.globalData = data.map(item => item);
    }
  
    async handleAutoMsg(msg) {
      let res = '';
  
      this.globalData.forEach(async element => {
            switch (msg) {
            case element.message:
                res = element.reply;
            break;
            case element.command:
                const price = 31750 + Math.random() * 400;
                let Coin = { price: parseFloat(price.toFixed(2)) };
                res = `${Coin.price} VNĐ`;
            break;
            case element.weather:
                API.weatherAPI(axios).then(data => {

                  console.log(data);
                  res = `${data.visibility}`

                }).catch(error => {
                  console.log(error);
                });
            break;
            default:

            break;
            }
      });
  
      return res;
    }
}
  
 
module.exports = {   

    bot : new Bot,
};






























