<?php
    session_start();
    
    include "db_conn.php"; 
    
    $request_origin = 'http://localhost:3000';

    header("Access-Control-Allow-Origin: ${request_origin}");
    header("Access-Control-Allow-Credentials: true");

    if($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $response = ['loggedIn' => false, 'message' => ''];

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