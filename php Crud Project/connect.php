<?php

$server = "localhost";
$db_username = "root";
$db_password = "";
$db_name = "crudproject";

$conn = mysqli_connect($server, $db_username, $db_password, $db_name);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}
