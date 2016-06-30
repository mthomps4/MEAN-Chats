'use strict';

var http = require('http').Server(app);
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var io = require('socket.io')(http);
var app = express();

app.use(express.static('public'));

app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// io.on('connection', function(socket){
//   console.log('a user connected');
//   socket.on('disconnect', function(){
//     console.log('user disconnected');
//   });
// });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log(msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
