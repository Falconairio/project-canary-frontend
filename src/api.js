import openSocket from 'socket.io-client';
 //const  socket = openSocket('http://192.168.1.63:9000');
// let socketUrl = 'http://192.168.1.63:9000'

const socketUrl = 'http://192.168.1.63:9000';

let socket;

const connect = (playerid,gameid) => {
let error = null;

socket = openSocket(socketUrl, {
autoConnect: false,
});

socket.on('connect', () => {
console.log(socketUrl);
console.log('Connected');

socket.emit('authentication', {
_id: playerid,
gameId: gameid
});
});

// var clients = openSocket.sockets.adapter.rooms[gameid].sockets;  

console.log(socket)

socket.on('game-started', () => console.log('game started'));
socket.on('new-question', () => {
console.log('new Question');
//socket.emit('answer', {answer:answer.value,question:question.innerHTML, id:id});
socket.emit('answer', {answer:'Respuesta'});
});

socket.on('unauthorized', (reason) => {
console.log('Unauthorized:', reason);

error = reason.message;

socket.disconnect();
});

socket.on('disconnect', (reason) => {
console.log(`Disconnected: ${error || reason}`);
error = null;
});

socket.open();
};

const desktopconnect = (userid,gameid) => {
    let error = null;

    socket = openSocket(socketUrl, {
    autoConnect: false,
    });

    socket.on('connect', () => {
    console.log(socketUrl);
    console.log('Connected');

    socket.emit('authentication', {
    _id: userid,
    gameId: gameid
    });
    });
    }

const disconnect = () => {
    socket.disconnect();
}

const desktopdisconnect = () => {
    socket.emit('killconnection')
}



export { connect, disconnect, desktopconnect }