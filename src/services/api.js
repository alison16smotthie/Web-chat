
class API {

       fetchData = async (axios) => {

              try {
                     const response = await axios.get('https://fakestoreapi.com/products');
                     const products = response.data;

                     return products;

              } catch (error) {

                     console.error(error);
              }
       };

       weatherAPI = async (axios) => {

              let api_key = "674263a39112ddf1ae19f39cdd608cc5";
              let search = "da nang";

              try {
                     const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api_key}`);
                     const weather = response.data;

                     return weather;

              } catch (error) {

                     console.error(error);
              }

       }

       covidAPI = async (axios) => {

              try {
                     const response = await axios.get(`https://disease.sh/v3/covid-19/all`);
                     const covid = response.data;

                     return covid;

              } catch (error) {

                     console.error(error);
              }
       }

}


module.exports = {
       API: new API
};