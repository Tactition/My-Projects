function cookieenable() {
    var page = document.querySelector(".webpage");
    if (navigator.cookieEnabled == true) {
        page.style.display = "none";

    }
}
function sidebar() {
    var sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "block";
    sidebar.style.animation = "sidebar 0.6s";
    sidebar.style.animationFillMode = "forwards";
}
function sidebar_close() {
    var sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";

}
function signup() {
    var user = btoa(document.getElementById("username").value);
    var pass = btoa(document.getElementById("password").value);
    var email = btoa(document.getElementById("email").value);
    var phone = btoa(document.getElementById("phone").value);
    var result = document.getElementById("login-result");
    

    var userinput = {
        user: user,
        pass: pass,
        email: email,
        phone: phone
    }
    var userdata = JSON.stringify(userinput);
    
    if (user && email && pass && phone != "") {
        localStorage.setItem(email, userdata);
        result.innerHTML = "Registerd succesfully";

        var user = document.getElementById("username").value="";
        var pass = document.getElementById("password").value="";
        var email = document.getElementById("email").value="";
        var phone = document.getElementById("phone").value="";

        setTimeout(() => {
            result.innerHTML = "";
        },2000);
        
    } else {
        result.innerHTML = "failed";
    }
    return false;
}
function login(){
    var userlogin = btoa(document.getElementById("sign-username").value);
    var passlogin = btoa(document.getElementById("sign-password").value);
    var login_input = {
        user:userlogin,
        pass:passlogin
    };

    var logindata = JSON.stringify(login_input);
    sessionStorage.setItem(userlogin,logindata);

    var session_data = sessionStorage.getItem(userlogin);
    var user_detail=JSON.parse(session_data);

    if (localStorage.getItem(user_detail.user)==null){
        alert("user not found");
    }
    else{
        var data = localStorage.getItem(user_detail.user)
        var uncompressed = JSON.parse(data)
       if(uncompressed.pass == user_detail.pass){
        sessionStorage.setItem("userinfo",userlogin);
        location.replace("1-profile/profile.html");
        return false;

    }else{
        alert("wrong password");
       }
    }
}
function incorrect(){
    var finder = document.getElementById("already-existed");
    var email = btoa(document.getElementById("email").value);
 
     if(localStorage.getItem(email) != null){
         finder.innerHTML="already-existed";
         document.getElementById("password").disabled="true";
         document.getElementById("submit").disabled="true";
         document.getElementById("phone").disabled="true";
         document.getElementById("email").classList.add("shake");
         document.getElementById("email").onclick=function() {
             this.value="";
             document.getElementById('already-existed').innerHTML='';
             document.getElementById("password").disabled=false;
             document.getElementById("submit").disabled=false;
             document.getElementById("phone").disabled=false;
         }
     }
 }
// function for sign up page to check the validity of input fields...
