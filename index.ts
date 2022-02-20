
const WebSocketInstance = require('ws');
const { uuid } = require('uuidv4')

const server = new WebSocketInstance.Server({ port: 3000 });
const clients = new Map();

server.on('connection', (ws) => {

    const id = uuid();
    const color = Math.floor(Math.random() * 360);
    const metadata = {id, color};

    clients.set(ws, metadata)

    ws.on('message', (messageAsString) => {
        try {
            let message = JSON.parse(messageAsString);
            let metadata = clients.get(ws);
            message.sender = metadata.id;
            const outbound = JSON.stringify(message);

            [...clients.keys()].forEach((client) => {
                console.log(client);
                console.log(outbound);
                client.send(outbound);
            });
            console.log('message data: ', message);
        } catch(error) {
            console.log(error)
        }
    })
    server.on('closed', (code, reason) => {
        clients.delete(ws);
    })
})
