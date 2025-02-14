<?php

session_start();
$current_user = $_SESSION["username"];
$user_fullname = $_SESSION["name"];

require("../../php/database.php");


if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
} else {

    //save the sessioned username in a variable
    $user_name = $current_user;

    $get_id = "SELECT id FROM users WHERE username = '$user_name'";
    $get_response = $db->query($get_id);
    $data = $get_response->fetch_assoc();

    $users_id = $data['id'];

    $folder_name = "../Gallery/user_" . $data['id'];

    // get file data of ajax

    $file = $_FILES['data'];
    $user_path = $file['tmp_name'];
    $file_name = strtolower($file['name']);
    $file_size = round($file['size'] / 1024 / 1024, 2);
    // move uploaded file 

    $get_size = "SELECT storage,used_storage FROM users WHERE id = '$users_id' AND username = '$user_name'";
    $get_size_response = $db->query($get_size);
    $size_data = $get_size_response->fetch_assoc();

    $total_storage = $size_data['storage'];
    $used_storage = $size_data['used_storage'];


    $available_storage = $total_storage - $used_storage;

    if ($file_size < $available_storage) {

        if (file_exists($folder_name . "/" . $file_name)) {
            echo "file already exists";
        } else {
            move_uploaded_file($user_path, $folder_name . "/" . $file_name);
            $set_details = "INSERT INTO user_$users_id(image_name,image_path,image_size) VALUES('$file_name','$folder_name/$file_name','$file_size') ";

            $details_response = $db->query($set_details);
            if ($details_response) {

                $updated_storage_size = $used_storage + $file_size;

                $update_used_storage = "UPDATE users SET used_storage = $updated_storage_size WHERE id = '$users_id' AND username = '$user_name'";
                $update_response = $db->query($update_used_storage);

                echo "success";
            } else {
                echo "failed";
            }
        }
    } else {
        echo "not enough storage.Kindly upgrade your plan";
    }
}
