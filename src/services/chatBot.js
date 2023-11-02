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
      let res;
    
      await Promise.all(
        this.globalData.map(async (element) => {
          switch (msg) {
            case element.message:
              res = element.reply;
              break;
            case element.command:
              const price = 31750 + Math.random() * 400;
              let Coin = { price: parseFloat(price.toFixed(2)) };
              res = `${Coin.price} VNĐ`;
              break;
            case "weather":
              try{
                const data = await API.weatherAPI(axios);
                res = `Thời tiết hôm nay tại ${data.name} ${data.sys.country} 
                Dự báo mưa ${data.weather[0].description}
                Tầm nhìn ${data.visibility} m Gió ${data.wind.speed} m/s 
                Độ ẩm ${data.main.humidity} % Nhiệt độ ${(data.main.temp - 273.15).toFixed(2)} độ C`;
              }catch(err){
                res = "error";
              }
             
              break;
            case 'covid':
              try{
                const data = await API.covidAPI(axios);
                res = `Tình hình dịch covid 19 Số ca nhiễm ${data.cases} 
                       Số ca nhiễm hôm nay ${data.todayCases}
                       Số người chết ${data.deaths}
                       Số ca đã phục hồi ${data.recovered}
                       Dân số toàn cầu ${data.population}
                       Các quốc gia bị ảnh hưởng ${data.affectedCountries}
                        `;
              }catch(err){
                res = "error";
              }
            default:
              break;
          }
        })
      );
    
      return res;
    }
}
  
 
module.exports = {   

    bot : new Bot,
};






























