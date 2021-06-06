<?php
    session_start();

    include "db_conn.php";  

    header("Access-Control-Allow-Origin: *");

    if($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $response = array('loggedIn' => false, 'message' => '');

        if($conn)
        {
            $username = $_POST['username'];
            $password = $_POST['password'];

            $query = "SELECT * FROM users WHERE username='${username}' AND password='${password}'";
            $result = pg_query($conn, $query);

            if(pg_num_rows($result) === 1)
            {
                $user = pg_fetch_assoc($result);

                $_SESSION['username'] = $user['username'];
                $_SESSION['user_id'] = $user['user_id'];

                $response['loggedIn'] = true;
                $response['message'] = 'Logged in';
            }
            else
                $response['message'] = 'Username or password is incorrect';
        }
        else
            $response['message'] = 'Cannot connect to database';
        
        echo(json_encode($response));
    }   
?>