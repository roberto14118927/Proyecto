var express = require('express');
var hex2ascii = require('hex2ascii');
var app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow- Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});

const net = require('net');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
for (var k in interfaces) {
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

var HOST = addresses[0];
var PORT = 3000;


server.listen(PORT, function () {
    console.log("Servidor corriendo puerto: " + PORT + ", " + HOST)
});




var ESP32 = net.createServer(function (sock) {
    sock.on('data', function (data) {
        console.log(data);
        // console.log(data);
        // datosin = data.toString().split(".");
        // if (datosin.length == 0) {
        //     return;
        // }
        // console.log("CONECTADO: " + Object.keys(esp_sockets).length);
    });

    // sock.on('close', function (data) {
    //     console.log("close...");
    //     var idx = esp_sockets.indexOf(sock);
    //     if (idx != -1) {
    //         esp_sockets.splice(idx, 1);
    //     }

    // });

    // sock.on('end', function () {
    //     var idx = esp_sockets.indexOf(sock);
    //     if (idx != -1) {
    //         esp_sockets.splice(idx, 1);
    //     }
    //     console.log("end...");
    // });

    // sock.on('timeout', function (data) {
    //     console.log("timeout...");
    // });

    // sock.on('error', function (data) {
    //     console.log("error...");
    // });

});



ESP32.on('error', function(e) { 
    console.log("Error: Necesario reiniciar...");
    if (e.code == 'EADDRINUSE') {
      console.log('Address in use, retrying...');
      setTimeout(function() {
        ESP8266.close();
        ESP8266.listen(PORT, PORT);
      }, 1000);
    }
  });

  ESP32.listen(PORT, HOST);