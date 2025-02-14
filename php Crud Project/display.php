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
        <div class="d-flex justify-content-between mb-3">
            <h3>User Management</h3>
            <a class="btn btn-primary" href="index.php" >Add User</a>
        </div>
        <table class="table table-bordered text-center">
            <thead class="table-light">
                <tr>
                    <th>S No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile</th>
                    <th>Password</th>
                    <th>Operations</th>
                </tr>
            </thead>


            <?php

            require 'connect.php';

            $sql_query = "SELECT * FROM cruddata ORDER BY id ASC";

            $result = mysqli_query($conn, $sql_query);

            if ($result) {

                while ($data = mysqli_fetch_assoc($result)) {

                    $id = $data['id'];
                    $name = $data['name'];
                    $email = $data['email'];
                    $mobile = $data['mobile'];
                    $password = $data['password'];

                    echo "<tr>
                    <td>$id</td>
                    <td>$name </td>
                    <td>$email</td>
                    <td>$mobile</td>
                    <td>$password</td>
                    <td>
                        <a href='update.php?id=$id' class='btn btn-primary btn-sm'>Update</a>
                        <a href='delete.php?id=$id' class='btn btn-danger btn-sm'>Delete</a>
                    </td>
                </tr>";
                }
            }



            ?>

            <!-- <tbody>
               
                <tr>
                    <td>9</td>
                    <td>Khanam</td>
                    <td>khanam@gmail.com</td>
                    <td>4444444</td>
                    <td>123</td>
                    <td>
                        <button class="btn btn-primary btn-sm">Update</button>
                        <button class="btn btn-danger btn-sm">Delete</button>
                    </td>
                </tr>
            </tbody> -->

        </table>
    </div>


</body>

</html>