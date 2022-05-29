<?php
    session_start();

    include "db_conn.php";

    //header("Access-Control-Allow-Origin: {$_SESSION['request_origin']}");
    header("Access-Control-Allow-Origin: https://main.d3rc01zxc7rwnf.amplifyapp.com:443");
    //header("Access-Control-Allow-Credentials: true");

    $stmt = $pdo->query("SELECT * FROM cars");
    $cars_data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo(json_encode($cars_data));
?>