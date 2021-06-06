<?php
    session_start();

    include "db_conn.php";

    header("Access-Control-Allow-Origin: *");

    $query = "SELECT * FROM available_cars";
    $results = pg_query($conn, $query);
    $cars_data = pg_fetch_all($results);

    print_r($_SESSION['username']);
?>