const socket = io('http://localhost:8000');

const form = document.querySelector('#send-container');

const messageInput = document.querySelector('#messageInp');

const messageContainer = document.querySelector('.container');

const joinedUser = prompt('Enter your name to join:');

socket.emit('new-user-joined', joinedUser);

const appendMsg = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
};

form.addEventListener('submit', e => {
    e.preventDefault();
    const message = messageInput.value;
    appendMsg(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

socket.on('user-joined', name => { //if existing user joins then notify other users
    appendMsg(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
    appendMsg(`${data.name}: ${data.message}`, 'left');
});