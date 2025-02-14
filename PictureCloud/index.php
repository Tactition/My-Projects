<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Picture Cloud</title>

    <link rel="stylesheet" href="css/animate.css">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">


</head>

<body>

    <div class="main">

        <!-- Sign up form -->


        <ul class="nav nav-tabs justify-content-center" role="tablist">
            <li class="nav-item">
                <a href="#signup" class="nav-link " data-toggle="tab">Sign Up</a>
            </li>

            <li class="nav-item active">
                <a href="#signin" class="nav-link active" data-toggle="tab">Sign In</a>
            </li>
        </ul>

        <div class="tab-content" role="tabpanel">
            <!-- Tab Pane for Sign Up -->
            <div class="tab-pane fade show " id="signup">
                <div class="container">

                    <div class="signup-content">
                        <div class="signup-form">
                            <h2 class="form-title">Sign up</h2>

                            <form method="POST" class="register-form" id="register-form">

                                <div class="form-group">
                                    <input type="text" name="name" id="name" placeholder="Your Name" />
                                </div>

                                <div class="form-group">
                                    <input type="email" name="email" id="email" placeholder="Your Email" />

                                    <span class="position-absolute d-none" id="emailchecker" style="right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;">
                                        <i class="fa fa-circle-o-notch fa-spin" id="loader"></i>
                                    </span>

                                </div>

                                <div class="form-group position-relative">
                                    <input type="password" name="pass" id="pass" placeholder="Password" />

                                    <span class="position-absolute" id="togglePassword" style="right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;">
                                        <i id="icon" class="fa fa-eye"></i>
                                    </span>
                                </div>

                                <div class="form-group">
                                    <div class="input-group mb-3">

                                        <input type="text" name="randompass" id="randompass" class="form-control" placeholder="Random Password Generate" aria-label="Random Password Generate" aria-describedby="button-generate">

                                        <div class="input-group-append">
                                            <button class="btn btn-primary" type="button" id="generate"><i class="fa fa-refresh"></i> </button>
                                            <button class="btn btn-info" type="button" id="insert">
                                                <i class="fa fa-plus"></i> </button>
                                        </div>
                                    </div>
                                </div>


                                <div class="form-group form-button">
                                    <input type="submit" name="signup" id="signup-button" class="form-submit" value="Register" />
                                </div>


                            </form>

                            <!-- activation code button -->
                            <div class="form-group d-none" id="activation">
                                <div class="input-group">
                                    <input type="text" class="form-control" name="activation_code" id="activation_code" placeholder="Activation Code" />

                                    <div class="input-group-append">
                                        <button class="btn btn-primary" type="button" id="generate_code">
                                            <i class="fa fa-check-square-o"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>




                        </div>

                        <div class="signup-image">
                            <figure>
                                <img src="images/signup.png" alt="sing up image">
                            </figure>
                            <a href="#" class="signup-image-link">I am already member</a>
                        </div>
                    </div>

                </div>
            </div>

            <div class="tab-pane fade active show" id="signin">
                <div class="container">
                    <div class="signin-content">
                        <div class="signin-image">
                            <figure><img src="images/login.png" alt="sing up image"></figure>
                            <a href="#" class="signup-image-link">Create an account</a>
                        </div>

                        <div class="signin-form">
                            <h2 class="form-title">Sign in</h2>

                            <form method="POST" class="register-form" id="login-form">
                                <div class="form-group">
                                    <label for="your_name"><i class="zmdi zmdi-account material-icons-name"></i></label>
                                    <input type="text" name="your_name" id="sign-email" placeholder="Your Name" />
                                </div>
                                <div class="form-group position-relative">
                                    <label for="your_pass"><i class="zmdi zmdi-lock"></i></label>
                                    <input type="password" name="your_pass" id="sign-pass" placeholder="Password" />
                                    <span class="position-absolute" id="toggleSignPassword" style="right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;">
                                        <i id="sign-icon" class="fa fa-eye"></i>
                                    </span>
                                </div>
                                
                                <div class="form-group">
                                    <input type="checkbox" name="remember-me" id="remember-me" class="agree-term" />
                                    <label for="remember-me" class="label-agree-term"><span><span></span></span>Remember me</label>
                                </div>
                                <span id="sign-notice"></span>
                                <div class="form-group form-button">
                                    <input type="submit" name="signin" id="signin" class="form-submit" value="Log in" />
                                </div>
                            </form>

                            <div class="social-login">
                                <span class="social-label">Or login with</span>
                                <ul class="socials">
                                    <li><a href="#"><i class="display-flex-center zmdi zmdi-facebook"></i></a></li>
                                    <li><a href="#"><i class="display-flex-center zmdi zmdi-twitter"></i></a></li>
                                    <li><a href="#"><i class="display-flex-center zmdi zmdi-google"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>




    </div>


    <script src="js/jquery.js"></script>
    <script src="js/popper.min.js"></script>
    <script src="js/bootstrap.js"></script>
    <script src="js/main.js"></script>

</body>

</html>