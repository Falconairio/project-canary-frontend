import openSocket from 'socket.io-client';
 //const  socket = openSocket('http://192.168.1.63:9000');
// let socketUrl = 'http://192.168.1.63:9000'

// const socketUrl = 'http://192.168.1.63:9000';
const socketUrl = process.env.REACT_APP_API_URL;

let socket;

const connect = (playerid, gameid, questioncb, resultcb) => {
let error = null;

socket = openSocket(socketUrl, {
autoConnect: false,
});

socket.on('connect', () => {
    socket.emit('get-list-of-players', gameid)

socket.emit('authentication', {
_id: playerid,
gameId: gameid
});
});

// socket.on('game-started', (question) => questioncb );

socket.on('new-question', (question) => questioncb(question))

socket.on('show-results', (results) => resultcb(results))

// socket.on('new-question', () => {
//     //socket.emit('answer', {answer:answer.value,question:question.innerHTML, id:id});
//     socket.emit('answer', {answer:'Respuesta'});
// });

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

const desktopconnect = (userid,gameid, questioncb, playercb, resultcb) => {
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
        questioncb(question)
    })

    socket.on('send-list-of-players',player => playercb(player))

    socket.on('show-results', (results) => resultcb(results))

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

const getplayers = (cb, gameId) => {
    socket.on('send-list-of-players',player => cb(player))
    socket.emit('get-list-of-players', gameId);
    console.log('in getplayers')
}
const sendanswer = (questionNumber, answerRight) => {
     socket.emit('answer', {questionNumber,answerRight})
}

// EXAMPLE
// function subscribeToTimer(cb) {
//     socket.on('timer', timestamp => cb(null, timestamp));
//     socket.emit('subscribeToTimer', 3000);
//   }

export { connect, disconnect, desktopconnect, getplayers, sendanswer }