const http = require('http');
const express = require('express');
const socket = require('socket.io');
const appMiddlewares = require('./middlewares/app-middleware');
const appRoutes = require('./routes/index.js');
const logEvent = require('./events/myEmitter')
const loggingListener = require('./events/logging.listener');

const app = express();
loggingListener();
app.use(appMiddlewares);
app.use(appRoutes);

const server = http.createServer(app);

const io = socket(server)
io.on('connect', function (socket) {
    console.log("Made Socket Connection" + socket.id);

    socket.on('test', function (data) {
        console.log(data);
    });

    socket.on('/test', function (msg) {
        console.log(msg);
    });

    socket.on('disconnect', function (socket) {
        console.log("DC" + socket);
    })
});

server.on('error', function (e) {
    logEvent.emit('APP-ERROR', {
        logTitle: 'APP-FAILED',
        logMessage: e
    });
});

module.exports = server;
