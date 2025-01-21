"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allsockets = [];
wss.on('connection', (socket) => {
    socket.on('message', (message) => {
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === 'join') {
            allsockets.push({
                socket,
                room: parsedMessage.payload.roomId
            });
        }
        if (parsedMessage.type === 'chat') {
            const currentUser = allsockets.find((user) => user.socket == socket);
            const currentUserRoom = currentUser ? currentUser.room : null;
            allsockets.forEach((user) => {
                if (user.room === currentUserRoom) {
                    user.socket.send(parsedMessage.payload.message);
                }
            });
        }
    });
});
