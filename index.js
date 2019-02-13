var express = require('express')
var aplicacion = express()

const net = require('net')
const server = require('http').Server(aplicacion)
const socket = require('socket.io')(server)
const os = require('os')

var interfaces = os.networkInterfaces();
var addresses = [];
var d;
for (var k in interfaces){
    for(var k2 in interfaces[k]){
        var address = interfaces[k][k2];
        if (address.family == 'IPv4' && !address.internal){
            d = address.address.toString()
            // console.log(address.address)
            // addresses.push(address.address);
        }
    }
}


var HOST = d;
var PORT = 3000;
var sockets = [];
console.log(HOST);
var ser = net.createServer(function(so){

    // sockets[0] = so;
    // socket.write(sockets[0]);
    // console.log(so)
    // console.log(so)
    console.log('Usuario conectado' + so.remoteAddress+':'+so.remotePort)
    // so.on('connect', function(){
    //     console.log('Usuario Nuevo')
    // })

    so.on('data', function(data){
        console.log(data)
    })

    so.on('close', function(){
        console.log('Usuario Desconectado')
    })
});

ser.listen(PORT, HOST);
