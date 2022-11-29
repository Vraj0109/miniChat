
const socket = io('http://localhost:8000');
const form  = document.getElementById('send-container')
const msgInp = document.getElementById('msgInp')
const msgcontainer = document.querySelector(".container");


const appen = (message,pos)=>{
    const messageeli = document.createElement('div');
    messageeli.innerText = message;
    messageeli.classList.add('message');
    messageeli.classList.add(pos);
    msgcontainer.append(messageeli);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = msgInp.value;
    appen(`you:${message}`,'right');
    socket.emit('send',message);
    msgInp.value = '';
})


const  nam= prompt("enter your name"); 
socket.emit('new-user',nam);

socket.on('user-joined',name=>{
    appen(`${name} joined the chat`,'mid');
})

socket.on('recived',data=>{
    appen(`${data.name}:${data.message}`,'left');
})

socket.on('left',name=>{
    appen(`${name} left`,'mid');
})
