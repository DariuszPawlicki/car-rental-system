<?php
    session_start();

    include "db_conn.php";

    //header("Access-Control-Allow-Origin: {$_SESSION['request_origin']}");
    header("Access-Control-Allow-Origin: https://main.d3rc01zxc7rwnf.amplifyapp.com");
    //header("Access-Control-Allow-Credentials: true");

    if($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $borrowers_name = $_POST['name'];
        $borrowers_lastname = $_POST['surname'];
        $date_of_rent = $_POST['date_rental'];
        $date_of_return = $_POST['date_end_rental'];
        $car_id = $_POST['car_id'];      

        $response = ["message" => "", "rental_success" => false, "rental_id" => null];

        if(new DateTime($date_of_rent) > new DateTime($date_of_return))
        {
            $response["message"] = "Date of return cannot preceed date of rent!";
        }
        else
        {
            $stmt = $pdo->prepare("SELECT * FROM scheduled_rentals WHERE car_id = :car_id AND ".
                            "(:date_of_rent >= date_of_rent AND :date_of_rent <= date_of_return OR ".
                            ":date_of_return >= date_of_rent AND :date_of_return <= date_of_return)");

            $stmt->execute(["car_id" => $car_id, "date_of_rent" => $date_of_rent, "date_of_return" => $date_of_return]);        

            if($stmt->rowCount() > 0)
            {
                $response["message"] = "This car is already rented in selected period of time.";
            }           
            else
            {
                $stmt = $pdo->prepare("INSERT INTO scheduled_rentals(borrowers_name, borrowers_lastname,".
                                    "date_of_rent, date_of_return, car_id) ".
                                    "VALUES(:borrowers_name, :borrowers_lastname, :date_of_rent, :date_of_return, :car_id);");
                
                $stmt->execute(["borrowers_name" => $borrowers_name, "borrowers_lastname" => $borrowers_lastname,
                                "date_of_rent" => $date_of_rent, "date_of_return" => $date_of_return, "car_id" => $car_id]);
                
                $stmt = $pdo->prepare("SELECT * FROM scheduled_rentals WHERE ".
                                      "rental_id = (SELECT MAX(rental_id) FROM scheduled_rentals)");
                
                $stmt->execute();

                $response["message"] = "Rented car successfully.";
                $response["rental_success"] = true;
                $response["rental_id"] = $stmt->fetch()["rental_id"];
            }
        }
    
        echo(json_encode($response));
    }
?>