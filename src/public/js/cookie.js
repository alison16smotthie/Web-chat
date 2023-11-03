const username = 'name=tuong';
document.cookie = username;

var key = "tuong";
var value = "tuong";

switch (key) {
    case value:
        console.log("tuong");
        break;

    default:
        break;
}


async function companyAPI(){
    
    let api_key = "674263a39112ddf1ae19f39cdd608cc5";
    let search = "da nang";
    let data  = await fetch(`https://web-chat.up.railway.app/company-api`)
    .then(res=>{
            console.log(res);
            return res.json();
        }
    ).catch(function(error) {
        console.log("error");
    });
    
    console.log(data);
    
}


companyAPI();









































































