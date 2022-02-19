const ws = require('ws');

const server = new ws.Server({ port: 3000 });

server.on('connection', (server) => {
    server.on('message', (message) => {
        let data = JSON.parse(message);
        console.log('message data: ', data);
    })
    server.on('closed', (code, reason) => {
        console.log('closed | code: ', code, 'reason: ' , reason);
    })
})
