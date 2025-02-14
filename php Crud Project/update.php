<?php

require("connect.php");


// showinf previous data
$sql_query = "SELECT * FROM cruddata ORDER BY id ASC";

$result = mysqli_query($conn, $sql_query);

if ($result) {

    while ($data = mysqli_fetch_assoc($result)) {

        $id = $data['id'];
        $name = $data['name'];
        $email = $data['email'];
        $mobile = $data['mobile'];
        $password = $data['password'];
    }
}
// end previous data


$current_user_id =  $_GET['id'];

if (isset($_POST['submit'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $password = $_POST['password'];

    $sql_query = "UPDATE cruddata SET name = '$name', email = '$email', mobile = '$mobile', password = '$password' WHERE id = $current_user_id";

    $conn->query($sql_query);

    if ($conn) {
        header('location:display.php');
    } else {
        echo "Data not updated";
    }
}
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>php Crud Project</title>

    <link rel="stylesheet" href="assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/css/animate.min.css">
    <link rel="stylesheet" href="assets/css/style.css">

    <script src="assets/js/jquery.js"></script>
    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/script.js"></script>

</head>

<body>
    <div class="container mt-5">
        <a href="display.php" class="btn btn-primary float-end mb-4">View Users</a>
        <h3 class="mb-4">Update User</h3>
        <form method="POST">
            <div class="mb-3">
                <label for="name" class="form-label">Name</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="Enter your name" value="<?php echo $name; ?>">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" placeholder="Enter your email" value="<?php echo $email; ?>">
            </div>
            <div class="mb-3">
                <label for="mobile" class="form-label">Mobile</label>
                <input type="text" class="form-control" id="mobile" name="mobile" placeholder="Enter your mobile" value="<?php echo $mobile; ?>">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="text" class="form-control" id="password" name="password" placeholder="Enter your password" value="<?php echo $password; ?>">
            </div>
            <button type="submit" class="btn btn-primary" name="submit">Update</button>
        </form>
    </div>



</body>

</html>