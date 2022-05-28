<?php
    session_start();

    //header("Access-Control-Allow-Origin: {$_SESSION['request_origin']}");
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Credentials: true");

    if(isset($_SESSION['username']))
    {      
        session_destroy();
        echo(json_encode(array('loggedIn' => false, 'message' => 'Logged out')));

        $_SESSION = [];

        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
    }
?>