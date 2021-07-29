var mqtt = require('mqtt');
var opt = {
    port:1883,
    clientId: 'nodejs'
};

var io = require("socket.io");
var express = require("express");
var app = express();
app.use(express.static('www'));
var Server = app.listen(5438);