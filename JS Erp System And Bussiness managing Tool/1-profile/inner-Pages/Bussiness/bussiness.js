function url() {
    if (sessionStorage.length <= 0) {
        document.getElementById("blocker").style.display = "none";
        document.body.innerHTML = "<h2>Illegal access</h2>";

    }

}
url();

function username_upload() {
    var dynamic_name = document.getElementById("user-name");
    var user_mail = sessionStorage.getItem("userinfo");
    var user_details = localStorage.getItem(user_mail);
    var user_data = JSON.parse(user_details);
    var fullname = user_data.user;
    dynamic_name.innerHTML = atob(fullname);
    var image = document.getElementById("user-img");
    var img_url = localStorage.getItem(user_mail + "user_image");
    image.setAttribute("src", img_url);
};
username_upload();

var log_off = document.getElementById("logout");
log_off.addEventListener('click', function () {
    var i = 3;
    var timer = setInterval(function () {
        log_off.innerHTML = "logging Out In " + i;
        i--;
        if (i == -1) {
            clearInterval(timer);
            sessionStorage.clear();
            window.location.href = "../../../index.html";

        }
    }, 1000)

});

var btns = document.getElementsByClassName("main-buttons");
function btnhover() {
    var i;
    for (i = 0; i < btns.length; i++) {
        btns[i].onmouseover = function () {
            this.classList.add("animated", "pulse");
        }
        btns[i].onmouseout = function () {
            this.classList.remove("animated", "pulse");
        }
    }
}
btnhover();

// open form 
btns[0].addEventListener('click', function () {
    var companywork = document.querySelector(".create-company-work");
    var createBtn = document.getElementById("create-btn");
    if (companywork.style.display == "block") {
        companywork.style.display = "none";
        createBtn.textContent = "Create Company";

    } else {
        companywork.style.display = "block";
        companywork.classList.add("animate__animated", "animate__backInDown");
        createBtn.textContent = "Close Form";
    }

});

// form validation
function form_validation() {
    var company_name = document.getElementById("company-name");
    var company_mailing = document.getElementById("company-mailing");
    var companylogo_file = document.getElementById("company-logo-file");
    var company_address = document.getElementById("company-address");
    var company_fax = document.getElementById("company-fax");
    var company_phone = document.getElementById("company-phone");
    var company_email = document.getElementById("company-email");
    var company_website = document.getElementById("company-website");
    var comp_fiananc_year = document.getElementById("company-fianancial-year");
    var company_stock = document.getElementById("stock-type");
    var notice = document.querySelector("#notice");

    company_name.onchange = function () { //when we write then onchange work when cahnge happens
        if (isNaN(this.value)) {

            company_mailing.onchange = function () {
                if (this.value.match(company_name.value)) {
                    alert("Company mailling name cant be same As Name");
                    this.style.color = "red";
                    this.style.border = "1px solid red";
                    this.classList.add("animate__animated", "animate__shakeX");

                    this.onclick = function () {
                        this.style.border = "";
                        this.style.color = "inherit"
                        this.value = "";
                    }

                }
                else {
                    if (
                        this.value.includes(".pvt.ltd") || this.value.includes(".Pvt.Ltd") || this.value.includes(".govt.ltd")) {

                        comp_fiananc_year.onchange = function () {
                            var currentdate = new Date();
                            var select_date = new Date(comp_fiananc_year.value);

                            if (select_date.getFullYear() > currentdate.getFullYear()) {

                                if (select_date.getMonth() + 1 == 4 || select_date.getMonth() + 1 == 3) {

                                    if (select_date.getDate() == 1 || select_date.getDate() == 2 || select_date.getDate() == 3) {

                                        var imageUrl;
                                        companylogo_file.onchange = function () {
                                            var company_logo = document.getElementById("company-logo");
                                            var reader = new FileReader();
                                            reader.readAsDataURL(companylogo_file.files[0]);
                                            reader.onload = function () {
                                                imageUrl = reader.result;
                                                company_logo.style.background = "url(" + imageUrl + ")";
                                                company_logo.style.backgroundRepeat = "no-repeat";
                                                company_logo.style.backgroundSize = "100% 100%";
                                                notice.innerHTML = "&#10003;  photo updated";

                                                var form = document.querySelector("#create-form");

                                                var company_details = {
                                                    company_name: company_name.value,
                                                    company_mailing_name: company_mailing.value,
                                                    company_logo: imageUrl,
                                                    company_address: company_address.value,
                                                    company_fax: company_fax.value,
                                                    company_phone: company_phone.value,
                                                    company_email: company_email.value,
                                                    company_website: company_website.value,
                                                    financial_year: comp_fiananc_year.value,
                                                    stock_type: company_stock.value
                                                };
                                                form.onsubmit = function () {
                                                    var company_data = JSON.stringify(company_details);
                                                    localStorage.setItem("company", company_data);
                                                    alert("Company Created");
                                                    var form_cont = document.querySelector(".create-company-work");
                                                    form_cont.style.display = "none";
                                                    notice.innerHTML = "&#10003;  company created";

                                                    setTimeout(function(){
                                                        location.reload();
                                                    },3000)
                                                    return false;
                                                }


                                            }
                                        }

                                    }
                                    else {
                                        this.style.color = "red";
                                        this.type = "text";
                                        this.value = "Ist date only"
                                        this.style.border = "1px solid red";
                                        this.classList.add("animate__animated", "animate__shakeX");
                                        this.onclick = function () {
                                            this.style.border = "";
                                            this.style.color = "inherit"
                                            this.value = "";
                                            this.type = "date";
                                        }
                                    }
                                }
                                else {
                                    this.style.color = "red";
                                    this.type = "text";
                                    this.value = "3 or 4 month only"
                                    this.style.border = "1px solid red";
                                    this.classList.add("animate__animated", "animate__shakeX");
                                    this.onclick = function () {
                                        this.style.border = "";
                                        this.style.color = "inherit"
                                        this.value = "";
                                        this.type = "date";
                                    }
                                }
                            }
                            else {
                                this.style.color = "red";
                                this.type = "text";
                                this.value = "please specify New year"
                                this.style.border = "1px solid red";
                                this.classList.add("animate__animated", "animate__shakeX");
                                this.onclick = function () {
                                    this.style.border = "";
                                    this.style.color = "inherit"
                                    this.value = "";
                                    this.type = "date";
                                }
                            }
                        }

                    }
                    else {
                        this.value = "Enter name with .pvt.ltd or .Pvt.Ltd or .govt.ltd";
                        this.style.color = "red";
                        this.style.border = "1px solid red";
                        this.classList.add("animate__animated", "animate__shakeX");

                        this.onclick = function () {
                            this.style.border = "";
                            this.style.color = "inherit"
                            this.value = "";
                        }
                    }
                }
            }
        }
        else {
            this.value = "please Enter Company Name without Number";
            this.style.color = "red";
            this.style.border = "1px solid red";
            this.classList.add("animate__animated", "animate__shakeX");

            this.onclick = function () {
                this.style.border = "";
                this.style.color = "inherit"
                this.value = "";
            }
        }
    }
}
form_validation();

//company details updater
function company_finder() {
    var form_cont = document.querySelector(".create-company-work");
    var createBtn = document.getElementById("create-btn");
    var fafa_create = document.getElementById("fafa-create");
    var notice = document.querySelector("#notice");
    var delete_company = document.querySelector(".delete-company");

    if (localStorage.getItem('company') != null) {
        form_cont.remove();
        delete_company.style.display = "block";

        var key_data = JSON.parse(localStorage.getItem('company'));
        createBtn.innerHTML = key_data.company_name;
        createBtn.style.fontFamily = 'Montserrat';
        createBtn.style.fontWeight = '600';
        createBtn.style.color = 'rgb(255 72 0)';
        fafa_create.className = "";
        fafa_create.style.height = "100%";
        fafa_create.style.background = "url(" + key_data.company_logo + ")";
        fafa_create.style.backgroundSize = "100% 100%";

        fafa_create.title = 'click to Update Image';
        fafa_create.onclick = function () {
            var prompt = window.confirm("Do you want to update the image?");
            if (prompt == true) {
                var input_file = document.createElement("input");
                input_file.type = "file";
                input_file.accept = "image/*"
                input_file.click()
                input_file.onchange = function () {
                    if (this.files[0].size > 512000) {
                        notice.style.display = "inline-block"
                        notice.innerHTML += " &#9888; Max file size is 500KB"
                        setTimeout(() => {
                            notice.style.display = "none"
                        }, 3000)
                    }
                    else {
                        var reader = new FileReader()
                        reader.readAsDataURL(this.files[0])
                        reader.onload = function () {
                            var input_url = reader.result
                            fafa_create.style.background = "url(" + input_url + ")"
                            fafa_create.style.backgroundSize = "100% 100%";
                            fafa_create.style.backgroundRepeat = "no-repeat";

                            localStorage.getItem("company");
                            var company_data = JSON.parse(localStorage.getItem("company"));
                            company_data.company_logo = input_url;
                            JSON.stringify(company_data);
                            localStorage.setItem("company", JSON.stringify(company_data));
                            notice.innerHTML = "&#10003;  photo updated";
                            notice.style.display = "inline-block";
                            setTimeout(() => {
                                notice.style.display = "none"
                            }, 10000);

                        }
                    }
                }

            }
        }

    }

    createBtn.onclick = function () {
        var i = 0;
        for (i = 0; i < localStorage.length; i++) {
            var keys = localStorage.key(i);

            if (keys === "company") {
                var data = JSON.parse(localStorage.getItem(keys));

                if (data.stock_type == "Account-Only"){
                    window.location.href = "./business-types/business-only.html"
                }
                else if(data.stock_type == "Account-Inventory"){
                    window.location.href = "./business-types/business-inventory.html";
                }
            }
            else {
                console.log("Noo Company Found")
            }
        }

    }
}
company_finder();

// delete company 
var delete_company = document.querySelector(".delete-company");
delete_company.onclick = function () {
    var consent = window.confirm("Are you sure you want to delete your company?");
    if (consent == true) {
        localStorage.removeItem('company');
        delete_company.style.display = "none";
        location.reload()
    }
}








