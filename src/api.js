import openSocket from 'socket.io-client';
 //const  socket = openSocket('http://192.168.1.63:9000');
// let socketUrl = 'http://192.168.1.63:9000'

const socketUrl = 'http://192.168.1.63:9000';
// const socketUrl = 'http://localhost:9000';

let socket;

const connect = (playerid,gameid,cb) => {
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

socket.on('game-started', () => cb());
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

const desktopconnect = (userid,gameid, cb) => {
    let error = null;

    socket = openSocket(socketUrl, {
    autoConnect: false,
    });

    socket.on('connect', () => {
    console.log('Connected');

    socket.emit('authentication', {
    _id: userid,
    gameId: gameid,
    user: true
    });
    });
    socket.on('new-question', (question) => {
        console.log(question)
        cb(question)
    })
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
    }

const disconnect = () => {
    socket.disconnect();
}

const desktopdisconnect = () => {
    socket.emit('killconnection')
}

const getplayers = (cb, gameId) => {
    socket.on('send-list-of-players',player => cb(player))
    socket.emit('get-list-of-players', gameId);
}
const sendanswer = (questionNumber, answerRight) => {
     socket.emit('answer', 1,answerRight)
    console.log(1,answerRight)
}

function subscribeToTimer(cb) {
    socket.on('timer', timestamp => cb(null, timestamp));
    socket.emit('subscribeToTimer', 3000);
  }

export { connect, disconnect, desktopconnect, getplayers, sendanswer }