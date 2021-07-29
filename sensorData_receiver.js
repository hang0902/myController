var Client = require('node-rest-client').Client;
var https = require("http");
var SocketServer = require("ws").Server;
var fs = require("fs");
const express = require("express");
var Service = require('node-windows').Service;

const PORT = 4000;
const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`));
const wss = new SocketServer({server})

var client = new Client();


wss.on('connection', ws=>{

  console.log("Client Connected");

  ws.on('close',() => {
      console.log('Close connected');
  })

  ws.onmessage = event =>{
      
      if(event.data != null){
          console.log(event.data);

          readJson(event.data, ws);
           

      }
  }

})
//Create a new service object
var svc = new Service({
  name:'Phsical Tranning',
  description: 'The nodejs.org example web server.',
  script: 'C:\\Users\\jacky\\myControllerApp\\sensorData_receiver.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();

