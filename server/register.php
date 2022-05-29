<?php

    $cookie_params = session_get_cookie_params();
    $cookie_params["secure"] = true;

    session_set_cookie_params($cookie_params);

    session_start();

    include "db_conn.php";

    if(!isset($_SESSION['request_origin']))
        $_SESSION['request_origin'] = 'http://localhost:3000';

    //header("Access-Control-Allow-Origin: {$_SESSION['request_origin']}");
    header("Access-Control-Allow-Origin: https://main.d3rc01zxc7rwnf.amplifyapp.com");
    //header("Access-Control-Allow-Credentials: true");

    if($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $response = ['signIn' => false, 'message' => ''];

        if($pdo)
        {
            $username = $_POST['username'];
            $password = $_POST['password'];

            $stmt = $pdo->prepare("INSERT INTO users(username, password, is_admin) VALUES (:username, :password, false)");
            $stmt->execute(['username' => $username, 'password' => $password]);

            $response['signIn'] = true;
            $response['message'] = "Account created";
        }
        else
        {
            $response['message'] = 'Cannot connect to database';
        }           
        
        echo(json_encode($response));
    }   

?>