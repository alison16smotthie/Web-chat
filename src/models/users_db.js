const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User_db = new Schema(
    
    {
        name : {type : String, maxLength: 600},
        img : {type : String, maxLength: 600},
        description : {type : String, maxLength: 600},
        slug : {type : String, maxLength: 600},
        createdAt : {type : Date, default: Date.now}, 
        updatedAt : {type : Date, default: Date.now}, 
    },

);

const Title_web = new Schema(
    {
        logo : {type : String, maxLength: 600},
        heading : {type : String, maxLength: 600},
        name_dev : {type : String, maxLength: 600},
        address : {type : String, maxLength: 600},
        createdAt : {type : Date, default: Date.now}, 
        updatedAt : {type : Date, default: Date.now}, 
    },
);

const Key_chat = new Schema(
    {
        message : {type : String, maxLength: 1000000000},
        reply : {type : String, maxLength: 1000000000},
        command : {type : String, maxLength: 1000000000},
        createdAt : {type : Date, default: Date.now}, 
        updatedAt : {type : Date, default: Date.now}, 
    },
);

const User_send_message = new Schema(
    {
        msg : {type : String, maxLength: 600},
        createdAt : {type : Date, default: Date.now}, 
        updatedAt : {type : Date, default: Date.now}, 
    },
);

const Account = new Schema(
    {
        username : {type : String, maxLength: 600},
        password : {type : String, maxLength: 600},
        createdAt : {type : Date, default: Date.now}, 
        updatedAt : {type : Date, default: Date.now}, 
    },
);


module.exports = {
    User_db : mongoose.model('User_db', User_db),
    Title_web : mongoose.model('Title_web', Title_web),
    Key_chat : mongoose.model('Key_chat', Key_chat),
    User_send_message : mongoose.model('User_send_message', User_send_message),
    Account : mongoose.model('Account', Account),

};
















