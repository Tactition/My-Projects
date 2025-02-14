function url() {
    if (sessionStorage.length <= 0) {
        document.getElementById("blocker").style.display = "none";
        document.body.innerHTML = "<h2>Illegal access </h2>";
    }

};
url();

function upload_pic() {
    var input = document.getElementById("file-upload");
    if (input.files[0].size < 10000010) {
        var freader = new FileReader();
        freader.readAsDataURL(input.files[0]);
        freader.onloadend = function (event) {
            var img_url = event.target.result;
            var show = document.getElementById("upload-btn");
            show.style.background = "url(" + event.target.result+")";
            show.style.backgroundRepeat = "no-repeat";
            show.style.backgroundSize = "cover";
            document.getElementById("fa").style.display = "none";
            var icon = document.getElementById("forward_btn");
            icon.style.display = "block";
            icon.onclick = function(){
                localStorage.setItem(sessionStorage.getItem("userinfo") + "user_image", img_url);
                var background_hider = document.getElementById("blocker");
                background_hider.style.display = "none";
                var app = document.getElementById("app-content");
                app.style.display = "block";
                location.reload(); 
            }
        }
    }
    else{
        alert("plese use other photo");
    }
};

function stop_upload() {
    var background_hider = document.querySelector(".profile-upload");
    if (localStorage.getItem(sessionStorage.getItem("userinfo") + "user_image") != null) {
        background_hider.style.display = "none";
        var app = document.getElementById("app-content");
        app.style.display = "block";

    }
    else {
        background_hider.style.display = "flex";
    }
};

function profile_name() {
    var dynamic_name = document.getElementById("user_name"); // writes dynamic name in profile
    var user_mail = sessionStorage.getItem("userinfo");
    var user_details = localStorage.getItem(user_mail);
    var user_data = JSON.parse(user_details);
    var fullname = user_data.user;
    dynamic_name.innerHTML = atob(fullname);

};

function show_name_pic() {
    var username = document.getElementById("user-name"); // updares dynamic img in profile
    var user_mail = sessionStorage.getItem("userinfo");
    var user_detail = localStorage.getItem(user_mail);
    var user_data = JSON.parse(user_detail);
    var fullname = user_data.user;
    username.innerHTML = atob(fullname);

    var image = document.getElementById("user-img");
    var img_url = localStorage.getItem(user_mail + "user_image");
    image.setAttribute("src", img_url);

};

var log_off = document.getElementById("logout");
log_off.addEventListener('click',function(){
    var i = 5;
    var timer = setInterval(function () {
        log_off.innerHTML="logging Out In "+i;
        i--;
        if (i==-1) {
            clearInterval(timer);
           window.location.href="../index.html";
        }
    },1000)
    
});

var cont_btn = document.getElementById("3rd_app");
cont_btn.addEventListener('click',function(){
    window.location.href="./inner-pages/contact_page/contact.html";
});

var playr_btn = document.getElementById( "2nd_app");
playr_btn.addEventListener('click',function(){
    window.location.href="./inner-pages/html_player/player.html"
});

var bussiness = document.getElementById("1st_app");
bussiness.addEventListener('click',function(){
    window.location.href="./inner-pages/Bussiness/bussiness.html"
})


var profile = document.getElementById("4th_app");
profile.addEventListener('click',function(){
    window.location.href="./inner-pages/about-page/about.html"
})

show_name_pic();
stop_upload();
profile_name();
url();