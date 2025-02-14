
<?php

session_start();
$current_username = $_SESSION['username'];
$user_fullname = $_SESSION["name"];

if (!isset($_SESSION["username"]) || !isset($_SESSION["name"])) {

    header("Location: ../index.php");
    exit();
}

$storage = $_GET["storage"];
$plan = $_GET["plan"];

echo $p_date = date("d-m-y");

// including db
require("../../php/database.php");

// getting result from db 
$StorageRetriveQuery = "SELECT storage FROM users WHERE username = '$current_username'";
$result = $db->query($StorageRetriveQuery);
$data = $result->fetch_assoc();

$currentStorage =  $data['storage'];

$finalStorage = $currentStorage + $storage;

$updateQuery = "UPDATE users SET plans = '$plan' , storage= '$finalStorage' , purchase_date = '$p_date' WHERE username='$current_username'";

if ($db->query($updateQuery)) {
    header("location:../profile.php");
} else {
    echo "error in updating database for plan";
}















?>