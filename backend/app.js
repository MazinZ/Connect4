const express = require('express');
const http = require('http');
const colyseus = require('colyseus');
const room = require('./server/Connect4/room');

const app = new express();
const port = parseInt(process.env.PORT, 10) || 8000;

const server = http.createServer(app);
const gameServer = new colyseus.Server({ server });

gameServer.register('connect4', room);
app.set('port', port);
server.listen(port);

module.exports = app;
