<?php

require "database.php";

$code = $_POST['code'];
$username_user = $_POST['user'];

$check_code = "SELECT activation_code from users where username = '$username_user' AND activation_code = '$code'";

$result_response = $db->query($check_code);

if ($result_response->num_rows != 0) {

    $update = "UPDATE users SET status = 'active' WHERE username = '$username_user' AND activation_code = '$code'";
    $res = $db->query($update);

    if ($res = true) {

        $user_name = "SELECT id FROM users WHERE username = '$username_user'";
        $result_username = $db->query($user_name);
        $table_row = $result_username->fetch_assoc();

        $table_name_user = "user_" . $table_row['id'];

        $create_table =  "CREATE TABLE $table_name_user(
           id INT(11) NOT NULL AUTO_INCREMENT,
           image_name VARCHAR(50),
           image_Path VARCHAR(50),
           image_size FLOAT(10),
           image_date DATETIME default CURRENT_TIMESTAMP,
           PRIMARY KEY(id)
       )";

        $create_response = $db->query($create_table);

        if ($create_response == true) {

            session_start();
            $_SESSION['username'] = $username_user;
            mkdir("../profile/Gallery/$table_name_user");
            echo "activation successfull";
        }
    } else {
        echo "Account activation failed";
    }
} else {
    echo "wrong code";
}
