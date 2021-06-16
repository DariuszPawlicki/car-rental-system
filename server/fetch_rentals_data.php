<?php
    session_start();

    include "db_conn.php";

    header("Access-Control-Allow-Origin: {$_SESSION['request_origin']}");
    header("Access-Control-Allow-Credentials: true");

    $stmt = $pdo->query("SELECT * FROM scheduled_rentals");

    $rentals_data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo(json_encode($rentals_data));
?>