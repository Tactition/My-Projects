<?php 

$server = "localhost";
$database = "picdrive";
$username = "root";
$password = "";

$db = new mysqli($server,$username,$password,$database);

if($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
} 
else {
    // echo "connection successful";
}




?>