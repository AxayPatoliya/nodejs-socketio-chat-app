// node server for the chat application
// node server which will handle socket io connections

const io = require('socket.io')(8000);

const users = {};

io.on('connection', socket => { //every users will be listed
    socket.on('new-user-joined', name => { //what to do when a particular user joins
        console.log("new user joined", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); //emits to all the users except the one who joined
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});
