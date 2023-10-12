import { sendMessage, autoSend, asyncCallAutoMsg} from "./clientRendering.js";
const socket = io();
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.querySelector('#room-name');
const usersName = document.querySelector('#users');
const countUser = document.querySelector('#countUsers');

const {username, room} = Qs.parse(location.search, {
     ignoreQueryPrefix: true
});

socket.emit('joinRoom',{username, room});

socket.on('roomUsers', function user({room,users}){

    getRoom(room);
    clientGetUsers(users);
});

socket.on('message',async message => {

    console.log(message);
    countUser.innerHTML = message.countUsers;
    sendMessage(message);
    await asyncCallAutoMsg(message, message.automatic); 
});


chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = e.target.elements.text.value;
    socket.emit('chatMessage',msg); 
    e.target.elements.text.value = ''; 
    e.target.elements.text.focus(); 
    
});

function getRoom(room){

    roomName.innerHTML = `${room}`;
}

function clientGetUsers(users){

    usersName.innerHTML = `${users.map(user =>
        `<li>${user.username}</li>`).join(" ")
    }`;
    
    document.querySelector('.welcome-webchat').innerHTML = 
    `HELLO WORLD ^^ <br>${username.toUpperCase()} WELCOME TO WEBCHAT`;
    
}









