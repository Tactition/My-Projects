<?php

session_start();
$path = $_POST["image_path"];
$table_name = $_SESSION['table_name'];
$current_username = $_SESSION["username"];

require("../../php/database.php");

$fullpath = "../" . $path;


if (unlink($fullpath)) {

    $currentlyUsedStorage;
    $current_img_size;
    // delete storage from users data base where storage is saved
    $ret_storage = "SELECT used_storage FROM users WHERE username='$current_username'";

    if ($fetched_data = $db->query($ret_storage)) {
        $storagedata = $fetched_data->fetch_assoc();
        $currentlyUsedStorage =  $storagedata['used_storage'];
    } else {
        echo "failed to retrive the user storage";
    }
    // get current imgae size

    $get_img_size = "SELECT image_size FROM $table_name WHERE image_Path ='$fullpath'";
    $fetch_data_row = $db->query($get_img_size);

    if ($fetch_data_row) {
        $get_img_size = $fetch_data_row->fetch_assoc();
        $current_img_size = $get_img_size['image_size'];
    } else {
        echo "failed to retrive the image size";
    }

    $del_query = "DELETE FROM $table_name WHERE image_Path = '$fullpath'";
    if ($db->query($del_query)) {
        // calculate the size
        $updatedsize = $currentlyUsedStorage - $current_img_size;
        // update the size 
        $update_cmd = "UPDATE users SET used_storage = '$updatedsize' WHERE username ='$current_username'";
        if ($db->query($update_cmd)) {

            echo "successfully deleted ";
        }
        else{
            echo "unsuccesfull";
        }
    } else {
        echo "failed to delete the row in db";
    }
} else {
    echo "failed to delete file ";
}
