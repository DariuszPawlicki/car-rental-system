<?php
    session_start();
    
    include "db_conn.php";

    //header("Access-Control-Allow-Origin: {$_SESSION['request_origin']}");
    header("Access-Control-Allow-Origin: https://main.d3rc01zxc7rwnf.amplifyapp.com:443");
    //header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Headers: Content-Type, Accept");

    $rental_id = json_decode(file_get_contents("php://input"), true)["rentalId"];

    $stmt = $pdo->prepare("DELETE FROM scheduled_rentals WHERE rental_id = :rental_id");
    $stmt->execute(["rental_id" => $rental_id]);

    if($stmt->rowCount() === 1)
        echo(json_encode(["deleted" => true]));
    else
        echo(json_encode(["deleted" => false]));
?>