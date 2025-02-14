<?php

require "database.php";

$username = $_POST['user'];
$password = $_POST['pass'];

// echo $username . "--" . $password;

$checkuser = "SELECT username,fullname FROM users WHERE username = '$username'";

$response = $db->query($checkuser);

if ($response->num_rows == 1) {

    // check name of user  and send as sesion
    $name_row = $response->fetch_assoc();
    $name = $name_row["fullname"];

    $checkpass = "SELECT password FROM users WHERE username = '$username' AND password = '$password'";

    $result = $db->query($checkpass);

    if ($result->num_rows == 1) {

        $check_active = "SELECT status FROM users WHERE username = '$username' AND status = 'active'";

        $result_active = $db->query($check_active);

        if ($result_active->num_rows == 1) {

            session_start();
            $_SESSION['username'] = $username;
            $_SESSION['name'] = $name;

            echo "success";
        } else {


            // fetch activation code
            $fetch_code = "SELECT activation_code FROM users WHERE username = '$username' AND password = '$password'";

            $result_code = $db->query($fetch_code);
            $data = $result_code->fetch_assoc();

            $code = $data['activation_code'];

            $mailer =  mail($username, "Account Activation", "Hello $username,Your activation code is <code> $code </code>", "From: pictureCloud@gmail.com");

            if ($mailer == true) {
                // activation code sent
                echo "activation code sent";
                session_start();
                $_SESSION['username'] = $username;
                $_SESSION['name'] = $name;
            } else {
                echo "activation code failed to deliver";
            }
        }
    } else {

        echo "Password does not match";
    }
} else {
    echo "Username does not exist";
}
