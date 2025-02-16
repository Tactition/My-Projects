// main js for all the functionalities
window.onload = function () {

    // variblees intitialization and declearation

    var notice = document.getElementById("notice");

    var name = document.getElementById("name");
    var phone = document.getElementById("phone");
    var email = document.getElementById("email");
    var nextbtn = document.querySelector(".next-btn");
    var prevbtn = document.querySelector(".prev-btn");

    var first__section = document.querySelector(".first-section .step-form");
    var second__section = document.querySelector(".second-section .step-form");
    var third__section = document.querySelector(".third-section .step-form");
    var fourth__section = document.querySelector(".submitted-section .step-form");


    var category = document.querySelector("#category");
    var nextbtn_bussiness = document.querySelector(".next-btn-bussiness");
    var prevbtnsummary = document.querySelector(".prev-btn-summary");

    var summaryName = document.getElementById("summary-name");
    var summaryEmail = document.getElementById("summary-email");
    var summaryPhone = document.getElementById("summary-phone");
    var summaryCategory = document.getElementById("summary-category");

    function form__validation() {

        name.onblur = function () {
            if (name.value == "") {
                notice.innerHTML = ("Please enter your name.");
            }
        }

        phone.onblur = function () {
            if (phone.value == "") {
                notice.innerHTML = ("Please enter your phone number with minimum 10 digits.");
            }
            else if (phone.value.length < 10) {
                notice.innerHTML = ("Please enter a valid 10-digit phone number.");
                phone.value = "";
            }
        }

        email.onblur = function () {
            if (email.value == "") {
                notice.innerHTML = ("Please enter your email address.");
            }
            else if (!email.value.includes("@")) {
                notice.innerHTML = ("@ is missing Please enterr the valid email address.");
                email.value = "";
            }
            else if (!email.value.includes(".com")) {
                notice.innerHTML = (".com is missing Please enterr the correct email address.");
                email.value = "";
            }
        }


        nextbtn.onclick = function () {
            if (name.value != "" && phone.value != "" && email.value != "") {

                $(first__section).fadeOut(function () {
                    $(second__section).fadeIn();
                });

                $("#step-2").addClass("active");


            } else {
                notice.innerHTML = ("Please fill all the fields to proceed to the next section.");
            }
        }

        prevbtn.onclick = function () {
            $(second__section).fadeOut(function () {
                $(first__section).fadeIn();
            });
            $("#step-2").removeClass("active");
        }

    }



    // second section js from here
    function bussiness__selection() {

        category.addEventListener("change", function () {
            var extraFields = document.getElementById("extra-fields");
            extraFields.innerHTML = "";

            var options = {
                Tech: ["Software Development", "AI", "data Science"],
                Health: ["Nutrition", "Wellness", "Medicine"],
                Education: ["E-Learning", "Home Tutoring", "Courses"]
            };

            if (this.value) {
                var select = document.createElement("select");

                for (var i = 0; i < options[this.value].length; i++) {

                    var option = document.createElement("option");
                    option.value = options[this.value][i];
                    option.textContent = options[this.value][i];
                    select.appendChild(option);

                }
                extraFields.appendChild(select);


            }
        });



        nextbtn_bussiness.onclick = function () {

            if (category.value == "") {
                alert("Please select the category to proceed further.");
            }
            else {


                $(second__section).fadeOut(function () {
                    $(third__section).fadeIn();
                    $("#step-3").addClass("active");
                });


                summaryName.textContent = name.value;
                summaryEmail.textContent = email.value;
                summaryPhone.textContent = phone.value;
                summaryCategory.textContent = category.value;

                var summary_btn = document.querySelector(".submit-btn-summary");
                summary_btn.onclick = function () {

                    $(third__section).fadeOut(function () {
                        $(fourth__section).fadeIn();
                    });

                }

            }

        }

        $(prevbtnsummary).click(function () {
            $(third__section).fadeOut(function () {
                $(second__section).fadeIn();
            });

            $("#step-3").removeClass("active");
        });



    }


    form__validation(); // calling the function for sec form validationn
    bussiness__selection(); // this is for third section

    setInterval(function () {
        notice.innerHTML = "";
    }, 5000);

}

// all the things that were said in the task
// Validated form (required fields, email format).✅
// Navigation buttons (Next/Previous with transitions).✅
// Dynamic dropdown (category-based fields in Step 2).✅
// Step-wise form progression (smooth transitions using jQuery).✅
// Responsive design (Flexbox/Grid for mobile compatibility).✅
// Dynamic summary (only relevant fields shown in Step 3).✅
// Progress indicator (step numbers or progress bar).✅
// Smooth animations/transitions for better UX.✅