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
            window.location.href = "../../../../index.html";

        }
    }, 1000)

});

// show company headr details
function details() {
    var email = document.getElementById("company-Email")
    var phone = document.getElementById("company-phone")
    var comp_logo = document.getElementById("work-brand-logo")
    var company_name = document.getElementById("work-brand-name")
    var address = document.getElementById("company-address")
    var fax = document.getElementById("company-fax")

    var company_details = localStorage.getItem("company");
    var data = JSON.parse(company_details);

    comp_logo.setAttribute("src", data.company_logo);
    company_name.innerHTML = data.company_name;
    email.innerHTML = data.company_email;
    phone.innerHTML = data.company_phone;
    address.innerHTML = data.company_address;
    fax.innerHTML = data.company_fax;
    
}
details();


// show date and time 
function showdate() {
    var header_date = document.getElementById("header-date")
    var header_time = document.getElementById("header-time")

    var date = new Date()

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';

    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();


    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;


    header_date.innerHTML += day + ":" + month + ":" + year;

    header_time.innerHTML += " " + hours + ":" + minutes + " " + ampm;

}
showdate()



