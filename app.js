var Client = require('node-rest-client').Client;
var https = require("http");
var SocketServer = require("ws").Server;
var fs = require("fs");
const express = require("express");
const MongoClient = require('mongodb').MongoClient;
//var Services = require('node-windows').Service;




const url = 'mongodb+srv://test_user_2021:867721@cluster0.x3sev.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = 4000;
const server = express().listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new SocketServer({server})
var client = new Client();
const _command = '';
const _ws = '';





const readJson = function(_command , _ws){

var m_data;
fs.readFile('./Request/request.json', 'utf-8', function(err, p_data){
if(err){
console.log (err);
}else{
const obj = JSON.parse(p_data);

for(i=0; i < obj.list.length;i++){
    if(_command.includes(obj.list[i]._name)){
        if(_command.includes("開啟")){

            var m_request = obj.list[i]._on;

            https.get(m_request, (resp) =>{
                resp.on('data', (d) => {
                    process.stdout.write(d);
                    console.log(d);

                    console.log('已經開啟');
               

                _ws.send("收到");

                  });
                
                }).on('error', (e) => {
                  console.error(e);

                

            });


        }else if(_command.includes('關閉')){

            // client.get(obj.list[i]._off, function(data,response){
            //     console.log('已經關閉');
            // });

            // https.get(obj.list[i]._off,(resp) =>{

            //     console.log('已經關閉');
            //     console.log(obj.list[i]._off);

            //     _ws.send(obj.list[i]._off);

            // });
            var m_request = obj.list[i]._off;

            https.get(m_request, (resp) =>{
                resp.on('data', (d) => {
                    process.stdout.write(d);
                    console.log(d);

                    console.log('已經關閉');
               

                    _ws.send("收到");

                  });
                
                }).on('error', (e) => {
                  console.error(e);

                

            });


        }
    }
    
}

}

});
}

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

MongoClient.connect(url , function (err , db ){
    if(err) throw err;
    var dbo = db.db("User");
    var myobj = { name: "ce", url: "www.runoob" };

    dbo.collection("Transformer").insertOne(myobj, function(err,res){
        if(err) throw err;
        console.log("Done");
        db.close;
    })
    dbo.collection("Transformer").find({}).toArray(function(err,res){
        if(err) throw err;
        console.log(result);
        db.close;
    })
});

// svc.on('install',function(){
//     console.log('Install complete.');
//     svc.start();
// });

// svc.install();


