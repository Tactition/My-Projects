<?php
session_start();
$current_username = $_SESSION["username"];
$user_fullname = $_SESSION["name"];
$user_table_name = $_SESSION["table_name"];


if (!isset($_SESSION["username"])) {

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

    <div class="gallery">
        <div class="row no-gutters">



            <?php
            require("../php/database.php");
            $get_media_path = "SELECT image_path, image_name FROM $user_table_name";
            $media_path_result = $db->query($get_media_path);

            while ($data = $media_path_result->fetch_assoc()) {

                $media_path = $data['image_path'];
                $nameNpath = str_replace("../", "", $media_path);
                $mediaInfo = pathinfo($nameNpath);
                $extension = strtolower($mediaInfo['extension']);

                echo "<div class='col-md-3'>
                        <div class='card m-2'>
                            <div class='card-body'>";

                if ($extension == 'jpg' || $extension == 'png') {
                    echo "<img src='" . $nameNpath . "' alt='Image' class='gallery-img'/>";
                } elseif ($extension == 'mp4' || $extension == 'webm' || $extension == 'ogg') {
                    echo "<video controls class='gallery-video' width='100%' height='250px'>
                            <source src='" . $nameNpath . "' type='video/" . $extension . "'>
                            Your browser does not support the video tag.
                          </video>";
                }

                echo "      </div>
                            <div class='card-footer d-flex justify-content-between'>
                                <span class='media-title'>" . $mediaInfo['filename'] . "</span>
                                <div class='nes-icon d-inline'>
                                    <i class='fa fa-download download-icon mx-2' data-location='" . $nameNpath . "' data-name='" . $mediaInfo['filename'] . "'></i>
                                    <i class='fa fa-trash delete-icon mx-2' data-location='" . $nameNpath . "' data-name='" . $mediaInfo['filename'] . "' ></i>
                                </div>
                            </div>
                        </div>
                      </div>";
            }
            ?>


            ?>

        </div>
    </div>

    <!-- model -->


    <div class="modal" id="modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-head">
                    <i class="fa fa-close p-1 m-4 float-right" data-dismiss="modal"></i>
                </div>
                <div class="modal-body" id="modal-body">

                </div>
            </div>
        </div>
    </div>









    <script src="../js/jquery.js"></script>
    <script src="../js/popper.min.js"></script>
    <script src="../js/bootstrap.js"></script>
    <script src="css-js/profile.js"></script>
</body>

</html>