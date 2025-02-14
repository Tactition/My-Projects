<?php
session_start();
$username = $_SESSION["username"];
$user_fullname = $_SESSION["name"];


if (!isset($_SESSION["username"]) || !isset($_SESSION["name"])) {

    header("Location: ../index.php");
    exit();
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo " Mr. " . $user_fullname . "'s- Database"; ?></title>


    <link rel="stylesheet" href="../css/animate.css">
    <link rel="stylesheet" href="../css/bootstrap.css">
    <link rel="stylesheet" href="css-js/profile.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


</head>

<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><?php echo " Mr " . $user_fullname; ?></a>

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>


            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul class="navbar-nav">

                    <li class="nav-item">
                        <a class="nav-link">
                            <span>Notice :</span> <span id="noticeData"></span>
                        </a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link" href="php/logout.php">
                            <i class="fas fa-sign-out-alt"></i> Logout
                        </a>
                    </li>

                </ul>
            </div>
        </div>
    </nav>

    <!-- Main Container -->
    <div class="container-folder p-2">
        <div class="card p-4">
            <div id="upload-icon" class="card-body">
                <i class="fas fa-folder"></i>
                <div>
                    <h5 class="card-title">UPLOAD FILES</h5>
                    <div class="progress mb-2">
                        <div class="progress-bar" role="progressbar" id="upload-progress" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>

                    <div class="card-icons ">
                        <p id="uploaded-notice"></p>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- 2nd container box -->

    <div class="container-folder p-2">
        <div class="card p-4">
            <div class="card-body">
                <i class="fa fa-stack-overflow" aria-hidden="true"></i>
                <div>
                    <h5 class="card-title">Memory Status</h5>
                    <p class="card-text">

                        <?php
                        $current_user = $username;
                        require("../php/database.php");
                        $query = "SELECT storage,used_storage FROM users WHERE username = '$current_user'";
                        $response = $db->query($query);

                        $storage_data = $response->fetch_assoc();
                        $used_storage = $storage_data['used_storage'];
                        $storage = $storage_data['storage'];

                        $percetage = $used_storage / $storage * 100;

                        echo $used_storage . " / " . $storage . " MB";  ?>


                    </p>
                    <div class="progress mb-2">
                        <div class="progress-bar" role="progressbar" style="width: <?php echo $percetage; ?>%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" id="progress-bar"></div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- 3rd container gallery -->

    <div class="container-folder p-2">
        <div class="card p-4">
            <div class="card-body">
                <i class="fa fa-picture-o" aria-hidden="true"></i>
                <a href="gallery.php">
                    <h5 class="card-title">Gallery</h5>
                    <p class="card-text">

                        <?php

                        $id_cmd = "SELECT id FROM users WHERE username = '$current_user'";
                        $ex_id_cmd = $db->query($id_cmd);
                        $user_data = $ex_id_cmd->fetch_assoc();

                        $user_id = $user_data['id'];

                        $user_table_name = "user_" . $user_id;

                        $query = "SELECT COUNT(id) AS TOTAL FROM $user_table_name";

                        $response = $db->query($query);
                        $count = $response->fetch_assoc();
                        echo "Total images :" . $count['TOTAL'];

                        $_SESSION["table_name"] = $user_table_name;
                        ?>

                    </p>
                </a>
            </div>
        </div>
    </div>


    <div class="container-folder p-2">
        <div class="card p-4">
            <div id="upload-icon" class="card-body">
                <a href="shop.php" class="fas fa-folder"></a>
                <a href="shop.php">
                    <h5 class="card-title">Buy Storage</h5>
                    <span class="card-text">Upgrade Your Plan to Get More storage</span>

                    <div class="card-icons ">
                        <p id="uploaded-notice"></p>
                    </div>

                </a>
            </div>
        </div>
    </div>



    <script src="../js/jquery.js"></script>
    <script src="../js/popper.min.js"></script>
    <script src="../js/bootstrap.js"></script>
    <script src="css-js/profile.js"></script>
</body>

</html>