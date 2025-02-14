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


    <!-- packages post  -->

    <section class="pricing-section py-5">
        <div class="container">
            <div class="text-center mb-4">
                <h2 class="font-weight-bold">Choose Your Plan</h2>
                <p class="text-muted">Select the best plan that suits your needs and enjoy unlimited picture storage.</p>
            </div>
            <div class="row">
                <!-- Basic Plan -->
                <div class="col-md-6">
                    <div class="card text-center shadow-sm">
                        <div class="card-header bg-primary text-white">
                            <h4 class="font-weight-bold">Basic Plan</h4>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title font-weight-bold">Rs: 100/month</h3>
                            <ul class="list-unstyled my-4">
                                <li>✔ 1GB Storage</li>
                                <li>✔ Secure Backup</li>
                                <li>✔ Basic Support</li>
                            </ul>
                            <a href="#" class="btn btn-primary btn-block purchase-btn" amount="100" plan="basic" storage="1024">Get Started</a>
                        </div>
                    </div>
                </div>

                <!-- Premium Plan -->
                <div class="col-md-6">
                    <div class="card text-center shadow-sm">
                        <div class="card-header bg-success text-white">
                            <h4 class="font-weight-bold">Premium Plan</h4>
                        </div>
                        <div class="card-body">
                            <h3 class="card-title font-weight-bold">Rs: 300/month </h3>
                            <ul class="list-unstyled my-4">
                                <li>✔ 10GB Storage</li>
                                <li>✔ Secure Backup</li>
                                <li>✔ Priority Support</li>
                            </ul>
                            <a href="#" class="btn btn-success btn-block purchase-btn" amount="300" plan="premium" storage="10240">Get Started</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>




    <script src="../js/jquery.js"></script>
    <script src="../js/popper.min.js"></script>
    <script src="../js/bootstrap.js"></script>
    <script src="css-js/profile.js"></script>
</body>

</html>