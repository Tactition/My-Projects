<?php

$id =  $_GET['deleteid'];


require('connect.php');

$query = "DELETE FROM cruddata WHERE id = $id";

$result = $conn->query($query);

if ($result) {
    header('location:display.php');
} else {
    echo "Data not deleted";
}
