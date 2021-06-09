<?php
    session_start();

    header("Access-Control-Allow-Origin: {$_SESSION['request_origin']}");
    header("Access-Control-Allow-Credentials: true");

    if(isset($_SESSION['username']))
    {      
        session_destroy();
        echo(json_encode(array('loggedIn' => false, 'message' => 'Logged out')));
    }
?>