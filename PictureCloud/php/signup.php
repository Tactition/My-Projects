<?php

require "database.php";

$name  = $_POST['name'];
$username = $_POST['email'];
$password = $_POST['pass'];

// activation code \\

$pattern = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

$random_pass = str_shuffle($pattern);
$length = strlen($random_pass) - 1;

$generated_code = [];



for ($i = 0; $i < 8; $i++) {
    $indexnumber = rand(0, $length);
    $generated_code[] = $pattern[$indexnumber];
}
//generated code
$code = implode($generated_code);


$store_user = "INSERT INTO users (fullname, username, password, activation_code) VALUES ('$name', '$username', '$password', '$code')";

$query_response = $db->query($store_user);

if ($query_response == true) {
    // echo "signup successful";
    $mailer =  mail($username, "Picture Cloud Account Activation", "Hello $name,Your activation code is  $code ", "From: pictureCloud@gmail.com");

    if ($mailer == true) {
        // activation code sent
        echo "activation code sent";

    } else {
        echo "activation code failed to deliver";
    }

} else {
    echo "signup failed";
};
