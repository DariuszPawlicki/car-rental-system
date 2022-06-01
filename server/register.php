<?php
    header("Access-Control-Allow-Origin: https://main.d3rc01zxc7rwnf.amplifyapp.com");
    header('Access-Control-Allow-Methods: POST, GET, PUT, OPTIONS, PATCH, DELETE');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Headers: Authorization, Content-Type, x-xsrf-token, x_csrftoken, Cache-Control, X-Requested-With');

    $cookie_params = session_get_cookie_params();
    $cookie_params["secure"] = true;

    session_set_cookie_params($cookie_params);

    session_start();
     if(!isset($_SESSION['request_origin']))
        $_SESSION['request_origin'] = 'https://main.d3rc01zxc7rwnf.amplifyapp.com';

    include "db_conn.php";

    echo("hello3");

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

	    http_response_code(200);
        }
        else
        {   echo("hello2");
            $response['message'] = 'Cannot connect to database';
	    
	        http_response_code(404);
        }           
        
        echo(json_encode($response));
    }   

?>
