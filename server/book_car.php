<?php
    session_start();

    include "db_conn.php";

    header("Access-Control-Allow-Origin: {$_SESSION['request_origin']}");
    header("Access-Control-Allow-Credentials: true");

    if($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $borrowers_name = $_POST['name'];
        $borrowers_lastname = $_POST['surname'];
        $date_of_rent = $_POST['date_rental'];
        $date_of_return = $_POST['date_end_rental'];
        $car_id = $_POST['car_id'];

        $stmt = $pdo->prepare("INSERT INTO scheduled_rentals(borrowers_name, borrowers_lastname,".
                              "date_of_rent, date_of_return, car_id) ".
                              "VALUES(:borrowers_name, :borrowers_lastname, :date_of_rent, :date_of_return, :car_id);");

        $stmt->execute(["borrowers_name" => $borrowers_name, "borrowers_lastname" => $borrowers_lastname,
                        "date_of_rent" => $date_of_rent, "date_of_return" => $date_of_return, "car_id" => $car_id]);                     
    }
?>