<?php
    $db_host = "ec2-52-19-96-181.eu-west-1.compute.amazonaws.com";
    $db_name = "d2g6vigfe6tvnl";
    $db_user = "cglbtehhvhsyyg";
    $db_password = "a2d275a109172f52ef144f4e861c70d40c2936bca69e5245d1d5911204e600f2";
 
    $dsn = "pgsql:host=${db_host};dbname=${db_name}";
    $pdo = new PDO($dsn, $db_user, $db_password);

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);  
?>