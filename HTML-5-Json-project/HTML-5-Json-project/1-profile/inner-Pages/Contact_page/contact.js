function url() {
    if (sessionStorage.length <= 0) {
        document.getElementById("blocker").style.display = "none";
        document.body.innerHTML = "<h2>Illegal access</h2>";

    }

}
const menuToggle = document.querySelector('#side-btn');
const menuArea = document.querySelector('.sidebar');

menuToggle.addEventListener('click', () => {
  menuArea.classList.toggle('active');
});

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


function add_contact() {
    var user = document.getElementById("username").value;
    var phone = document.getElementById("p-number").value;
    var email = document.getElementById("p-email").value;
    var form = document.getElementById("s-contact");
    var mailformat = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    var save = document.getElementById("saved");

    if (user && phone && email != "") {
        if (isNaN(user)) {
            if (email.match(mailformat)) {
                if (phone.charAt(0) != 0 && phone.length == 10) {
                    var contact = {
                        username: user,
                        phone: phone,
                        email: email
                    }
                    var contact_data = JSON.stringify(contact);
                    localStorage.setItem(user + "contact", contact_data);
                    form.reset();
                    save.style.display = "block";
                    setTimeout(function () {
                        save.style.display = "none";
                    }, 2000)
                    location.reload();
                }
                else {
                    alert("please enter valid phone number which do not start with 0 and length should be 10")
                }
            }
            else {
                alert("please enter valid email")
            }
        }
        else {
            alert("please enter a valid username");
        }
    } else {
        alert("please fill All the feilds")
    }
}

function showcontacts() {
    var i;
    for (i = 1; i <= localStorage.length; i++) {
        var keys = localStorage.key(i);  // here the key is contact name which is storeed in storage 
        if (keys.match("contact")) { // here we are refining contcts with contact keyword stored in them  

            if (localStorage.length >= 1) {
                var search = document.getElementById("s-search");
                search.style.display = "block";

            };

            var json_text = localStorage.getItem(keys);
            var key_extract = JSON.parse(json_text);

            var con = document.getElementById("contacts-container");
            var feildset = document.createElement("FIELDSET");
            var legend = document.createElement("LEGEND");
            var ul = document.createElement("UL");
            var li1 = document.createElement("LI");
            var li2 = document.createElement("LI");
            var trash_icon = document.createElement('i');  // trash icon creation
            trash_icon.setAttribute("class", "fa fa-trash");  // attributes of trash icon
            trash_icon.setAttribute("id", "delete-btn");
            var edit_icon = document.createElement('i');
            edit_icon.setAttribute("class", "fa fa-edit");
            edit_icon.setAttribute("id", "delete-btn",);
            var save_icon = document.createElement('i');
            save_icon.setAttribute("class", "fa fa-save");
            save_icon.setAttribute("id", "delete-btn",);

            con.appendChild(feildset);
            feildset.appendChild(legend);
            feildset.appendChild(ul);
            ul.appendChild(li1);
            ul.appendChild(li2);
            ul.appendChild(trash_icon);
            ul.appendChild(edit_icon);
            ul.appendChild(save_icon);

            legend.appendChild(document.createTextNode(key_extract.username));
            li1.appendChild(document.createTextNode(key_extract.email))
            li2.appendChild(document.createTextNode(key_extract.phone))
            li1.style.textTransform = "lowercase";
            save_icon.style.display = "none";

            // sending arguments to new functions like 
            deletecontact(keys, trash_icon);
            editcontact(keys, edit_icon, save_icon);

        }
    }
}

function editcontact(contact_name, edit, save_icon) {
    edit.onclick = function () {
        save_icon.style.display = "block";
        edit.style.display = "none";
        var ul = this.parentElement;
        var feildset = ul.parentElement;
        var legend = feildset.childNodes[0];
        legend.setAttribute("contenteditable", "true");
        legend.focus();

        var li = feildset.getElementsByTagName("li")  // here we are searching li's in feildset to make editable
        var i;
        for (i = 0; i < li.length; i++) {
            li[i].setAttribute("contenteditable", "true");
        }

        // data pair of name '✅
        var recent_legend;
        var current_legend;

        legend.onclick = function () {
            recent_legend = this.innerHTML;
        }

        legend.onblur = function () {
            current_legend = this.innerHTML;
        }

        // data pair of contact ✅

        var current_contact = [];


        li[0].onblur = function () {
            current_contact[0] = this.innerHTML;

        }

        li[1].onblur = function () {
            current_contact[1] = this.innerHTML;
        }

        save_icon.onclick = function () {

            var editeddata = {
                username: current_legend == undefined ? recent_legend : current_legend,
                email: current_contact[0] == undefined ? li[0].innerHTML : current_contact[0],
                phone: current_contact[1] == undefined ? li[1].innerHTML : current_contact[1],
            };

            var final_data = JSON.stringify(editeddata);
            localStorage.setItem(contact_name, final_data);
            legend.removeAttribute("contenteditable")
            alert("contact Edited and saved");

            for (i = 0; i < li.length; i++) {
                li[i].removeAttribute("contenteditable");
                li[i].style.border = "none";
                li[i].style.padding = "0";
            }
            save_icon.style.display = "none";
            edit.style.display = "block";
            location.reload();
        }
    }
}

function deletecontact(contact_name, del_btn) {
    del_btn.onclick = function () {
        var consent = window.confirm("Are you sure?");
        if (consent == true) {
            document.cookie = contact_name + "=" + localStorage.getItem(contact_name) + ";max-age=(60*60*24);"; // expires after 1 day or 24 hours because if we multiple 60*60*24 = 86400s which means 1 day 
            localStorage.removeItem(contact_name);
            location.reload();
        }
    }
}

function restorecontact(){
    var page = document.getElementById("restorecontact");
    var restoretable = document.getElementById("restoretable");
    var noticeheading = document.getElementById("noticeheading");

    var this_ele = document.getElementById("hiding");
    this_ele.style.visibility = "hidden";

    page.style.display = "block";


    if (document.cookie.length != 0) {
        noticeheading.innerHTML = "Deleted Contacts";
        var dividecookie = document.cookie.split(";")  // 1cookei name=value ; 1cookei name=value ; 
        var i, j;  // looping variables
        for (i=0; i <= dividecookie.length; i++){

            var key_value = dividecookie[i].split("=");  // it splits the key value pair; name [0] and value [1]

            for (j = 0; j < key_value.length; j++) {

                if (key_value[j].indexOf("contact") == -1) {  // if key_value has no contact
                    var extract = JSON.parse(key_value[j]);    // value will be in json format
                    var tr = document.createElement("TR");
                    var td1 = document.createElement("TD"); 
                    var td2 = document.createElement("TD");  // making elements to add data
                    var td3 = document.createElement("TD");
                    var td4 = document.createElement("TD");

                    td1.appendChild(document.createTextNode(extract.username));
                    td2.appendChild(document.createTextNode(extract.email));
                    td3.appendChild(document.createTextNode(extract.phone));
                    var res = document.createElement("I");
                    res.setAttribute("class", "fa fa-refresh");
                    td4.appendChild(res);

                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);

                    restoretable.appendChild(tr);

                    res.onclick = function () {  // now  here w'll send back the info to local storage and delete it here
                        var this_td = this.parentElement;
                        var this_tr = this_td.parentElement;
                        var td_all = this_tr.getElementsByTagName('td');

                        var restore_obj = {
                            username: td_all[0].innerHTML,
                            email: td_all[1].innerHTML,
                            phone: td_all[2].innerHTML
                        };
                        var readyforrestore = JSON.stringify(restore_obj);
                        localStorage.setItem(td_all[0].innerHTML + "contact", readyforrestore);
                        document.cookie = td_all[0].innerHTML + "contact=;max-age=0"; // here we are deleting the cookie from local storage by not passing "data" to local storage and by setting max-age to 0
                        this_tr.remove()
                        location.reload();
                    };

                }
            }

        }
        //create table dynamically from cookies
    }
    else {
        noticeheading.innerHTML = "No Deleted Contacts";
    }
}

function closeit() {
    var page = document.getElementById("restorecontact");
    var this_ele = document.getElementById("hiding");
    
    page.style.display = "none";
    page.style.transition = "0.5s"

    this_ele.style.visibility = "visible";

}

function search(input) {
    var keyword = input.value;
    var i;
    var contact_list = document.getElementById("contacts-container");
    var legend = contact_list.getElementsByTagName("legend");


    for (i = 0; i <= legend.length; i++) {
        if (legend[i].innerHTML.indexOf(keyword) != -1) { // here it searches for the keyword inside the legends of the contact-container table and if keyword is found it will display it by setting them block else none (-1 means not found) but with isnot !=
            legend[i].parentElement.style.display = "block";
        }
        else {
            legend[i].parentElement.style.display = "none";
        }
    }

}

function logout() {
    var usercons = confirm("Are you sure to LogOut?");
    if (usercons == true) {
        sessionStorage.clear();
        window.location.href = "../../index.html";  // if folder is inside folder we use ../../ which means this will go to parent folder of the perticular folder and then go to index
    }
};

url();
username_upload();
showcontacts();

