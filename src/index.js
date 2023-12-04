const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const app = express(); //Inicializamos la app con express

const server = require('http').Server(app); // Vinculamos la app al servidor
const socketio = require('socket.io')(server); // Vinculamos socket.io al servidor

app.set('port', process.env.PORT || 8080); //Seteamos un puerto por default
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', (req,res) => {
    const dataDePHP = req.body;

    socketio.emit('dataDePHP', dataDePHP);

    res.send('Datos recibidos en el servidor de WEBSOCKET')
})

require('./socket')(socketio); // Ejecutamos la funcion del archivo sockets.js, incluimos el archivo de socket.js

// Archivos estaticos:
app.use(express.static(path.join(__dirname, 'public')));


server.listen(app.get('port'), () => {
    console.log('Escuchando desde el puerto ' + app.get('port'));
})
