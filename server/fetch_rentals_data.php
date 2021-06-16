<?php
    session_start();

    include "db_conn.php";

    //header("Access-Control-Allow-Origin: {$_SESSION['request_origin']}");
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Credentials: true");

    $stmt = $pdo->query("SELECT * FROM scheduled_rentals");

    $rentals_data = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // array_walk($rentals_data, function (& $rental){
    //     $rental["name"] = $rental["borrowers_name"];
    //     $rental["surname"] = $rental["borrowers_lastname"];
    //     $rental["dateRental"] = $rental["date_of_rent"];
    //     $rental["dateEndRental"] = $rental["date_of_return"];
    //     $rental["id"] = $rental["car_id"];

    //     unset($rental["borrowers_name"]);
    //     unset($rental["borrowers_lastname"]);
    //     unset($rental["date_of_rent"]);
    //     unset($rental["date_of_return"]);
    //     unset($rental["car_id"]);
    // });


    echo(json_encode($rentals_data));
?>