<?php
    $cookie_params = session_get_cookie_params();
    $cookie_params["secure"] = true;

    session_set_cookie_params($cookie_params);

    session_start();
    
    include "db_conn.php";
    
    if(!isset($_SESSION['request_origin']))
        $_SESSION['request_origin'] = 'http://localhost:3000';

    header("Access-Control-Allow-Origin: {$_SESSION['request_origin']}");
    header("Access-Control-Allow-Credentials: true");

    if($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $response = ['loggedIn' => false, 'message' => '', 'username' => ''];

        if($pdo)
        {
            $username = $_POST['username'];
            $password = $_POST['password'];

            $stmt = $pdo->prepare("SELECT * FROM users WHERE username=:username AND password=:password");
            $stmt->execute(['username' => $username, 'password' => $password]);

            if($stmt->rowCount() === 1)
            {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                $_SESSION['username'] = $user['username'];

                $response['loggedIn'] = true;
                $response['message'] = 'Logged in';
                $response['username'] = $user['username'];
            }
            else
            {
                $response['message'] = 'Username or password is incorrect';
            }
                
        }
        else
        {
            $response['message'] = 'Cannot connect to database';
        }           
        
        echo(json_encode($response));
    }   
?>