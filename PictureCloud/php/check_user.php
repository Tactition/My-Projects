<?php require('database.php');?>

<?php 

$useremail = $_POST['user_email'];

$search = "SELECT username FROM users where username = '$useremail'";

$response =  $db->query($search);

if($response->num_rows != 0){
    echo "already theee";
}
else{
    echo "user not found";
}

?>