
class API{

       fetchData = async (axios) => {
              try {
                     const response = await axios.get('https://fakestoreapi.com/products');
                     const products = response.data;
          
                     return products;
              } catch (error) {
                     console.error(error);
              }
       };

}


module.exports = {
        API: new API
};