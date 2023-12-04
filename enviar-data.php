<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Enviar Data a WebSocket</title>
</head>
<body>
    <h1>Enviando DATA</h1>
    
    <?php
    //Datos que deseas enviar al servidor WebSocket

    $data = array('time' => date('Y-m-d'));

    // Debuggeo de la variable data
    // var_dump($data);
    // echo "<br/>";

    // URL del servidor WebSocket
    $url = 'http://localhost:8080';

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));

    $response = curl_exec($ch);

    // Manejar la respuesta (puede ser opcional dependiendo de tu caso)
    echo 'Respuesta del servidor WebSocket: ' . $response;

    curl_close($ch);
    ?>

</body>
</html>