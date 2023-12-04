//Desde aqui vamos a interactuar con el socket, dandole toda la logica del lado del servidor
module.exports = (io) => {

    let nickNames = [];

    io.on('connection', (socket) => {
        // console.log('Nuevo usuario conectado');

        //Al recibir el mensaje recogemos los datos del mensaje
        socket.on('enviar mensaje', (datos) => {
            io.sockets.emit('nuevo mensaje', {
                msg: datos,
                username: socket.nickname
            })


        })

        socket.on('nuevo usuario', (datos, callback) => {
            if(nickNames.indexOf(datos) != -1){
                callback(false);
            }else{
                callback(true);
                socket.nickname = datos;
                nickNames.push(datos);

                io.sockets.emit('usernames', nickNames);
            }
        });

        socket.on('disconnect', datos => {
            if(!socket.nickname){
                return;
            } else{
                nickNames.splice(nickNames.indexOf(socket.nickname), 1);
                io.sockets.emit('usernames', nickNames);
            }
        })

    })


}