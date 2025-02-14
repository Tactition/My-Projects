$(document).ready(function () {
    var password;
    // dynamic password generate fethch
    $("#generate").on("click", function () {

        $.ajax({
            type: "POST",
            url: "php/random-password.php",
            success: function (response) {
                $("#randompass").val(response);
                password = response;
            }


        })
    })

    // dynamic password insert in feild

    $("#insert").click(function () {
        $("#pass").val(password);
    });

    // show hid password 

    document.getElementById("togglePassword").addEventListener("click", function () {
        const passwordField = document.getElementById("pass");
        const type = passwordField.type === "password" ? "text" : "password";
        passwordField.type = type;

        var icon = document.getElementById("icon");
        // Change button text based on state
        if (type === "password") {
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        } else {
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        }
    });


    $("#email").on("blur", function () {
        var email = $("#email").val();
        if (email !== " ") {
            $.ajax({
                type: "POST",
                url: "php/check_user.php",
                data: {
                    user_email: email,
                },
                beforeSend: function () {
                    $("#emailchecker").removeClass("d-none");
                },
                success: function (response) {

                    if (response.trim() == "user not found") {
                        $("#loader").removeClass("fa-circle-o-notch fa-spin");
                        $("#loader").addClass("fa fa-check");
                    }
                    else {
                        alert("user already exist")
                        $("#email").val(" ");
                        $("#loader").removeClass("fa-circle-o-notch fa-spin");
                        $("#loader").addClass("fa fa-close");
                    }

                },
                error: function () {
                    console.log("ajax request failed")
                }
            })
        }
        else {
            alert("input is empaty")
        }
    })

    // form submit signup form

    $("#signup").on("submit", function (e) {
        e.preventDefault();



        var name = $("#name").val();
        var email = $("#email").val();
        var password = $("#pass").val();

        if (name == "" && email == "" && password == "" && !$("#signup-button").hasClass("disabled")) {
            alert("all feilds are required");
            return;
        }
        else {

            $.ajax({
                type: "POST",
                url: "php/signup.php",
                data: {
                    name: name,
                    email: email,
                    pass: password
                },
                cache:false,

                beforeSend: function () {
                    $("#signup-button").val("Signing you up");
                    $("#signup-button").attr("disabled", "disabled");
                },
                success: function (response) {

                    if (response.trim() == "activation code sent") {
                        $("#register-form").fadeOut(500);
                        $("#activation").removeClass("d-none");
                    }
                    else {
                        alert("failed to Send the Activation Code .. Error in mailer");
                    }

                },
                error: function () {
                    alert("faioled")
                }

            })
        }


    });


    //  activation validation

    $("#generate_code").on("click", function (e) {
        e.preventDefault();
        var code = $("#activation_code").val();
        var email = $("#email").val();
        $.ajax({
            type: "POST",
            url: "php/activation.php",
            data: {
                code: code,
                user: email,
            },
            success: function (response) {
                alert(response); //response

                if (response.trim() == "activation successfull") {

                    window.location.href = "profile/profile.php";// redirect to profile page
                }
                else {
                    alert("failed to activate");
                }
            },
            error: function () {
                alert("activation request failed")
            }

        })
    });


    // sign in  pssword show


    $('#toggleSignPassword').click(function () {
        const passwordField = $('#sign-pass');
        const passwordFieldType = passwordField.attr('type');
        const icon = $('#sign-icon');
        if (passwordFieldType === 'password') {
            passwordField.attr('type', 'text');
            icon.removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordField.attr('type', 'password');
            icon.removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    //end password show


    $("#signin").on("submit", function (e) {
        e.preventDefault();
        $("#signin").attr("disabled", true);

        var email = $("#sign-email").val();
        var password = $("#sign-pass").val();


        // first ajax request 
        $.ajax({
            type: "POST",
            url: "php/login.php",
            data: {
                user: email,
                pass: password
            },

            // ist ajax befor request 
            beforeSend: function () {
                $('#sign-in').attr('disabled', true);
                $('#sign-notice').text("Setting You In.. please wait");
                setTimeout(function () {
                    $('#sign-notice').text("");
                }, 5000);

            },

            // succes first ajax request
            success: function (response) {

                if (response.trim() == "success") {
                    window.location.href = "profile/profile.php";

                }

                else if (response.trim() == "Password does not match") {

                    $('#sign-notice').text(response);

                }
                else if (response.trim() == "activation code sent") {
                    $('#sign-notice').text("Please activate your account first.");

                    var createInput = document.createElement("input");
                    createInput.setAttribute("id", "sign-activate");
                    createInput.setAttribute("type", "text");
                    createInput.setAttribute("placeholder", "Activate your account");
                    createInput.setAttribute("style", "display: inline;");
                    $("#login-form").append(createInput);

                    createInput.oninput = function () {

                        if (createInput.value.length == 8) {
                            $.ajax({
                                type: "POST",
                                url: "php/activation.php",
                                data: {
                                    code: createInput.value,
                                    user: email
                                },
                                success: function (response) {
                                    if (response.trim() == "activation successfull") {
                                        $('#sign-notice').text("Account activated. You can now login");
                                        window.location.href = "profile/profile.php";
                                    }
                                    else {
                                        $('#sign-notice').text("Invalid code");
                                    }
                                },
                                error: function () {
                                    $('#sign-notice').text("Server in second ajax Error");
                                }
                            })
                        }
                        else {
                            $('#sign-notice').text("please enter the 8 didgit code send on email");
                        }

                    }

                }
                else {
                    $('#sign-notice').text(response);
                }

            },
            // errror in firsrt ajax request
            error: function () {
                $('#sign-notice').text("Server Error");
            }

        })

    });

});
