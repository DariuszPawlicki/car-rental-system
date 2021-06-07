<?php
    session_start();

    include "db_conn.php";

    header("Access-Control-Allow-Origin: *");

    $stmt = $pdo->query("SELECT * FROM cars");
    $cars_data = $stmt->fetchAll();

    echo(json_encode($cars_data));
?>