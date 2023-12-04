$(function() {
    const socket = io();
    var nick = '';

    //Accedemos a los elementos del DOM

    const messageForm = $('#message-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    const nickform = $('#nick-form');
    const nickerror = $('#nick-error');
    const nickname = $('#nick-name');

    const usernames = $('#usernames');

    const dia = $("#dia");


    // Eventos

    // Enviamos un mensaje al servidor
    messageForm.submit( e => {
        e.preventDefault();
        socket.emit('enviar mensaje', messageBox.val());
        messageBox.val('');
    });


    //Obtenemos la respuesta del servidor
    socket.on('nuevo mensaje', function(datos){
        // console.log(datos);
        let color = "#f4f4f4";

        if(nick == datos.username){
            color = "#9ff4c5";
        }
        chat.append(`<div class="msg-area mb-2 d-flex" style="background-color:${color}"><p class="msg"><b>${datos.username} :</b> ${datos.msg}</p></div>`)
    });

    //Nuevo Usuario
    nickform.submit(e => {
        e.preventDefault();

        socket.emit('nuevo usuario', nickname.val(), datos => {
            if(datos){
                nick = nickname.val();
                $('#nick-wrap').hide();
                $('#content-wrap').show();
            } else{
                nickerror.html('<div class="alert alert-danger">El usuario ya existe</div>');
            }

            nickname.val('');
        });
    })

    //Obtenemos el arreglo de usuarios conectados
    socket.on('usernames', (arr) => {
        let html = '';
        let color = '';
        let salir = '';

        console.log(arr);

        for(let i = 0; i < arr.length; i++){
            if(nick == arr[i]){
                color = '#027f43';
                salir = '<a class="enlace-salir" href="/">Salir</a>';
            } else{
                color = "#000";
                salir = '';
            }

            html += `<p style="color:${color}">${arr[i]} ${salir}</p>`;
        }

        usernames.html(html);
    })

    //Recibir la informacion desde php
    socket.on('dataDePHP', data => {
        dia.html(data['time']);
        localStorage.setItem('dia_x', data['time']);
    })

    // Verificamos si estamos en la pagina principal y guardamos el valor del dia para que este no se pueda borrar
    if(window.location.href == 'http://localhost:8080/'){
        dia.html(localStorage.getItem("dia_x")); //Usamos local storage para almacenar el valor de la fecha en caso esta se borre cuando se recargue la pagina
    } else{
        console.log("SEXO")
    }

})

