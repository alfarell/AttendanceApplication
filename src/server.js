const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const appMiddlewares = require('./middlewares/app-middleware');
const appRoutes = require('./routes/index.js');
const logEvent = require('./events/myEmitter')
const loggingListener = require('./events/logging.listener');

const app = express();
loggingListener();
app.use(appMiddlewares);
app.use(appRoutes);

const server = http.createServer(app);

const io = socketIo(server)
io.on('connect', function (socket) {
    logEvent.emit('APP-INFO',{
        logTitle: 'SOCKET',
        logMessage: `Made Socket Connection ${socket.id}`
    });

    socket.on('test', function (data) {
        console.log(data);
    });

    socket.on('disconnect', function () {
        console.log("DC");
    })
});

server.on('error', function (e) {
    logEvent.emit('APP-ERROR', {
        logTitle: 'APP-FAILED',
        logMessage: e
    });
});

module.exports = server;
