function url() {
    if (sessionStorage.length <= 0) {
        document.getElementById("blocker").style.display = "none";
        document.body.innerHTML = "<h2>Illegal access</h2>";

    }

}
url();

const menuToggle = document.querySelector('#side-btn');
const menuArea = document.querySelector('.menu-area');

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

    email.innerHTML = data.company_email;
    phone.innerHTML = data.company_phone;
    comp_logo.setAttribute("src", data.company_logo)
    company_name.innerHTML = data.company_name;
    address.innerHTML = data.company_address;
    fax.innerHTML = data.company_fax;
}
details();

// show date and time 
function showdate() {
    var voucher_date_feild = document.getElementById("voucher-date")
    var voucher_time_feild = document.getElementById("voucher-time")

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


    voucher_date_feild.innerHTML += day + "/" + month + "/" + year;

    voucher_time_feild.innerHTML += " " + hours + ":" + minutes + " " + ampm;

}
showdate();

// show voucher logo and other and details like company naeme
function voucher_logo_details() {
    var voucher_logo = document.getElementById("voucher-logo");
    var voucher_company = document.getElementById("voucher-company");
    var voucher_address = document.getElementById("voucher-address");
    var voucher_phone = document.getElementById("voucher-phone")

    var voucher_company_details = localStorage.getItem("company");
    var company_info = JSON.parse(voucher_company_details);
    // voucher_logo.style.background="url("+company_info.company_logo+")";
    // voucher_logo.style.backgroundSize="contain";
    // voucher_logo.style.backgroundRepeat="no-repeat";
    voucher_logo.src = company_info.company_logo;
    voucher_company.innerHTML += company_info.company_name;
    voucher_address.innerHTML += company_info.company_address;
    voucher_phone.innerHTML += company_info.company_phone;


}
voucher_logo_details();

// ist menuu onclick code ✅
var ist_menu = document.getElementById("ist-menu");
var ist_wrapper = document.getElementById("ist-wrapper");
ist_menu.addEventListener("click", function () {

    if (ist_wrapper.style.display == "block") {
        ist_wrapper.classList.add("animate__animated", "animate__backOutUp")

        setTimeout(function () {
            ist_wrapper.style.display = "none";
            ist_wrapper.classList.remove("animate__animated", "animate__backOutUp")
        }, 1000)
    }
    else {
        ist_wrapper.style.display = "block";
        ist_wrapper.classList.add("animate__animated", "animate__backInDown")
        setTimeout(function () {
            ist_wrapper.classList.remove("animate__animated", "animate__backInDown")

        }, 1000)
    }

})

function ist_close() {
    ist_wrapper.style.display = "none";
}

// second menu onclick code ✅
var sec_end_menu = document.getElementById("sec-menu");
var sec_wrapper = document.getElementById("sec-wrapper");
sec_end_menu.addEventListener("click", function () {

    if (sec_wrapper.style.display == "block") {
        sec_wrapper.classList.add("animate__animated", "animate__backOutUp")
        setTimeout(function () {
            sec_wrapper.classList.remove("animate__animated", "animate__backOutUp")
            sec_wrapper.style.display = "none";
        }, 1000)
    }
    else {
        sec_wrapper.classList.add("animate__animated", "animate__backInDown")
        sec_wrapper.style.display = "block";
        setTimeout(function () {
            sec_wrapper.classList.remove("animate__animated", "animate__backInDown")
        }, 1000)
    }

});

function sec_close() {
    sec_wrapper.style.display = "none";
}

// ist menu unit measure functionality development ✅
function unitmeasure() {
    var symbol_measure_input = document.getElementById("symbol-measure").value;
    var symbol_name_input = document.getElementById("symbol-name").value;

    var symbol_data = {
        symbol_measure: symbol_measure_input,
        formal_name: symbol_name_input
    }
    alert("saved")
    var unit_data = JSON.stringify(symbol_data)
    localStorage.setItem("unit_" + symbol_measure_input, unit_data)
}

function manage_unit(){
    var selected_unit = document.getElementById("select-unit");
    var delete_btn = document.getElementById("delete-unit");

    var i;
    for (i = 0; i < localStorage.length; i++) {
        var all_keys = localStorage.key(i)
        if(all_keys.includes("unit_")){
            selected_unit.style.display="inline";
            var option = document.createElement('option');
            selected_unit.append(option);
            option.appendChild(document.createTextNode(all_keys))
        }
    }
    selected_unit.onchange = function(){
        var measure = document.getElementById("symbol-measure");
        var name = document.getElementById("symbol-name");

        delete_btn.style.display = "inline";

        var unitname = this.value;
        var compresed_details = localStorage.getItem(unitname);
        var details_unit = JSON.parse(compresed_details);
        
        measure.value = details_unit.symbol_measure;
        measure.disabled = true;
        name.value = details_unit.formal_name;
    }
    delete_btn.onclick = function(){
        localStorage.removeItem(selected_unit.value);
        var notice = document.getElementById("notice-unit");
        notice.innerHTML = "Successfully Deleted &nbsp;" + selected_unit.value;
        setInterval(function () {
            location.reload();
        }, 1000);
    }

}
manage_unit();

// tax functionallity ✅
var tax_form = document.getElementById("tax-form")
tax_form.onsubmit = function taxsetup() {
    var tax_name = document.getElementById("tax-name").value;
    var tax_percent = document.getElementById("tax-percent").value;
    var notice = document.getElementById("notice-tax")

    if (tax_name.includes("tax")) {
        notice.innerHTML = "name validated succesfully";

        if (!isNaN(parseInt(tax_percent.charAt(0)))) {
            notice.innerHTML = "number at Frst found";

            if (tax_percent.charAt(1).includes("%") || tax_percent.charAt(2).includes("%")) {
                notice.innerHTML = "percent found ";

                var tax_data = {
                    tax_name: tax_name,
                    tax_percent: tax_percent
                }
                var tax_data = JSON.stringify(tax_data)
                localStorage.setItem("tax_" + tax_name, tax_data);
                notice.innerHTML = "Tax details saved"

                setInterval(function () {
                    notice.innerHTML = "";
                    location.reload();
                }, 1000);

            }
            else {
                notice.innerHTML = "Plese enter the second value as % eg: 2% "
            }
        }
        else {
            notice.innerHTML = "Plese enter the first value as number eg: 2% "
        }

    } else {
        notice.innerHTML = "please include tax or t in Name"
    }
    return false;

}
// manage tax
function manage_tax() {
    var selected_tax = document.getElementById("select-tax");
    var delete_btn = document.getElementById("delete-tax");
    var t;
    for (t = 0; t < localStorage.length; t++) {
        var all_keys = localStorage.key(t)
        if (all_keys.includes("tax")) {
            selected_tax.style.display = "inline";

            var option = document.createElement("option");
            option.append(document.createTextNode(all_keys));
            selected_tax.append(option);

        }

    }
    selected_tax.onchange = function () {
        var input_name = document.getElementById("tax-name");
        var input_per = document.getElementById("tax-percent");
        var tax = localStorage.getItem(this.value)
        var details = JSON.parse(tax)

        input_name.value = details.tax_name;
        input_name.disabled = true;
        input_per.value = details.tax_percent;

        delete_btn.style.display = "inline";
        delete_btn.onclick = function () {
            var notice = document.getElementById("notice-tax")
            localStorage.removeItem(selected_tax.value);
            notice.innerHTML = "Successfully Deleted &nbsp;" + selected_tax.value;

            setInterval(function () {
                location.reload();
            }, 1000);
        }


    }

}
manage_tax();


// function to get tax data from local storage and display it on the voucher page ✅
function tax_in_voucher() {
    var voucher_tax_name = document.getElementById("voucher-tax-name")
    var i;
    for (i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.includes("tax")) {
            var key_value = localStorage.getItem(key);
            var extract_key = JSON.parse(key_value)
            var tax_names = extract_key.tax_name + ":" + extract_key.tax_percent + "<br>";
            voucher_tax_name.innerHTML += tax_names;
        }
    }


}
tax_in_voucher();



// third menu on and off voucher toggle
var third_menu = document.getElementById("third-menu");
var third_wrapper = document.getElementById("third-wrapper");
third_menu.addEventListener("click", function () {

    if (third_wrapper.style.display == "block") {
        third_wrapper.classList.add("animate__animated", "animate__backOutUp")

        setTimeout(function () {
            third_wrapper.classList.remove("animate__animated", "animate__backOutUp")
            third_wrapper.style.display = "none";
            location.reload()
        }, 1000)

    }
    else {
        var voucher_name = document.getElementById("vouchername");
        third_wrapper.style.display = "block";

        // voucher number
        var vouchar_number = document.getElementById("voucher-number");
        var highestVoucher = 0; // Initialize the highest voucher number found

        // Loop through all local storage keys
        for (var i = 0; i < localStorage.length; i++) {
            var keys = localStorage.key(i);
            if (keys.match("_voucher")) {
                var new_voucher = keys.split("_")
                var store_next_voucher = Number(new_voucher[0]);
                highestVoucher = Math.max(highestVoucher, store_next_voucher); // Update highest voucher number
            }
            else {
                vouchar_number.innerHTML = "Voucher No : " + 1;
            }
        }

        // Increment the highest voucher number to generate the next voucher number
        var nextVoucher = highestVoucher + 1;

        // Display the next voucher number
        vouchar_number.innerHTML = "Voucher No : " + nextVoucher;
        store_voucher = nextVoucher;



        third_wrapper.classList.add("animate__animated", "animate__backInDown");
        var popup_cookie_split = document.cookie.split("=")
        third_wrapper.classList.add(popup_cookie_split[1])
        voucher_name.focus();
    }
})

var fourth_menu = document.getElementById("fourth-menu");
fourth_menu.addEventListener("click", function () {
    var c;
    for (c = 0; c < localStorage.length; c++) {
        var key = localStorage.key(c);
        if (key === "company") {
            var confirm = window.confirm("do you Wanna Delete The Company")
            if (confirm == true) {
                var i;
                for (i = 0; i < localStorage.length; i++) {

                    var tax_keys = localStorage.key(i);
                    if (tax_keys.includes("tax")) {
                        localStorage.removeItem(tax_keys);
                    }

                    var unit_key = localStorage.key(i);
                    if (unit_key.includes("unit")) {
                        localStorage.removeItem(unit_key);
                    }

                    var voucher_key = localStorage.key(i);
                    if (voucher_key.includes("voucher")) {
                        localStorage.removeItem(voucher_key);
                    }

                }
                
                console.log("fully Deleted Everything")
                location.href = "../bussiness.html";
            }
        }
        else {
            console.log("No company Found For Deletion")
        }
    }
});

// pop up of voucher with storing in cookie 
var popup_voucher_btn = document.getElementById("voucher-popup-btn");
popup_voucher_btn.addEventListener("click", function () {
    var third_wrapper = document.getElementById("third-wrapper");

    if (!third_wrapper.classList.contains("voucher-popup-active")) { //if the third wrapper dont contain active clas
        // Add the CSS class if the condition is met
        third_wrapper.classList.add("voucher-popup-active");

        document.cookie = "popupcookie=voucher-popup-active;max-age=43200";

    } else {
        // Remove the CSS class if the condition is not met
        third_wrapper.classList.remove("voucher-popup-active")
        document.cookie = "popupcookie=;max-age=0"
    }


});

// close voucher btn
function closevoucher() {
    third_wrapper.classList.add("animate__animated", "animate__backOutUp");
    setTimeout(function () {
        third_wrapper.style.display = "none";
        third_wrapper.classList.remove("animate__animated", "animate__backOutUp")

        var delete_btn = document.getElementById("delete-voucher")
        if (delete_btn.style.display == "block") {
            location.reload();
        }

    }, 1000)


}


//vouchar form custome detailas enter comands
var voucher_form = document.getElementById("voucher-form");
var voucherform_inputs = voucher_form.getElementsByTagName('input');
voucherform_inputs[0].onkeyup = function (event) {

    if (voucherform_inputs[0].value != "" && event.keyCode == 13) {
        voucherform_inputs[1].focus();
    }
}

voucherform_inputs[1].onkeyup = function (event) {
    if (event.keyCode == 13) {
        voucherform_inputs[2].focus();
    }
}

voucherform_inputs[2].onkeyup = function (event) {
    if (event.keyCode == 13) {
        voucherform_inputs[3].focus();

    }
}

voucherform_inputs[3].onkeyup = function (event) {
    var add_product = document.getElementById("add-product");
    if (event.keyCode == 13) {
        add_product.focus();
        add_product.click();
    }
}


var voucher_name = document.getElementById("vouchername");
document.addEventListener("keydown", function enter(event) {
    if (event.keyCode === 13) { // Check if Enter key is pressed
        if (third_wrapper.style.display != "block") {
            third_wrapper.style.display = "block";
            third_wrapper.classList.add("voucher-popup-active");
            document.cookie = "popupcookie=voucher-popup-active;max-age=43200";
            voucher_name.focus();

            document.removeEventListener('keydown', enter);
        }
        // Remove the event listener
    }
});


// all boject data 

var store_subtotal;
var store_tax = [];
var store_total;
var store_paid;
var store_dues;
var store_voucher = 1;

var add_product = document.getElementById("add-product");
add_product.onclick = function add_item() {

    var product_table = document.getElementById("product-table");
    var tr = document.createElement("tr");
    var td_item = document.createElement("td");
    var td_price = document.createElement("td");
    var td_quantity = document.createElement("td");
    var td_unit = document.createElement("td")
    var td_amount = document.createElement("td");
    var td_delete = document.createElement("td");

    var input_item = document.createElement("input");
    input_item.type = "text";
    input_item.className = "item"
    input_item.placeholder = "item Description";

    var input_price = document.createElement("input");
    input_price.type = "number";
    input_price.className = "price";
    input_price.placeholder = "Price";

    var input_quantity = document.createElement("input");
    input_quantity.type = "number";
    input_quantity.className = "quantity";
    input_quantity.placeholder = "Quantity";

    var input_unit = document.createElement("select");
    input_unit.className = "unit";

    var input_amount = document.createElement("input");
    input_amount.type = "number";
    input_amount.disabled = true;
    input_amount.className = "amount"
    input_amount.placeholder = "Amount";

    var input_delete = document.createElement("i")
    input_delete.className = "fa fa-trash";
    input_delete.setAttribute("align", "center");

    product_table.appendChild(tr)
    tr.appendChild(td_item)
    td_item.appendChild(input_item)

    tr.appendChild(td_price)
    td_price.appendChild(input_price)

    tr.appendChild(td_quantity)
    td_quantity.appendChild(input_quantity)

    tr.appendChild(td_unit);
    td_unit.appendChild(input_unit);


    var u;
    for (u = 0; u < localStorage.length; u++) {
        var all_keys = localStorage.key(u)
        if (all_keys.includes("unit_")) {

            var unit_key = localStorage.getItem(all_keys);
            var unit_details = JSON.parse(unit_key);

            let option = document.createElement("option");
            option.append(document.createTextNode(unit_details.symbol_measure));
            input_unit.append(option);


        }
    }


    tr.appendChild(td_amount)
    td_amount.appendChild(input_amount)

    tr.appendChild(td_delete)
    td_delete.appendChild(input_delete);  // ✅



    input_delete.onclick = function () {
        var del_icon_td = this.parentElement;
        var del_icon_tr = del_icon_td.parentElement;

        var amount_del = del_icon_tr.getElementsByClassName("amount")[0];
        var amountToRemove = Number(amount_del.value);

        // Update subtotal
        store_subtotal -= amountToRemove;
        document.getElementById("total-voucher-amount").innerHTML = "<i class='fa fa-rupee'></i> " + store_subtotal.toFixed(2);

        // Calculate taxes
        var voucher_tax_amount = document.getElementById("voucher-tax-amount");
        var total_amount_with_tax = 0;
        var i, tax_amount_with_per = '';

        for (i = 0; i < localStorage.length; i++) {
            var all_keys = localStorage.key(i);
            if (all_keys.match("tax") != null) {
                var getkey = localStorage.getItem(all_keys);
                var tax_details = JSON.parse(getkey);
                tax_amount_with_per += tax_details.tax_percent + ";";
            }
        }

        voucher_tax_amount.innerHTML = "";

        var splited_tax = tax_amount_with_per.split(";");
        var tax = [];
        for (i = 0; i < splited_tax.length - 1; i++) {
            var num = Number(splited_tax[i].replace("%", "")); // Convert to a number
            var tax_price = (store_subtotal * num) / 100;
            tax[i] = tax_price;
            voucher_tax_amount.innerHTML += "<i class='fa fa-rupee'></i>&nbsp;" + tax_price.toFixed(2) + "<br>";

            total_amount_with_tax += tax_price;
        }

        // Calculate total
        var grand_total = store_subtotal + total_amount_with_tax;
        document.getElementById("voucher-grand-total").innerHTML = "<i class='fa fa-rupee'></i>&nbsp;" + grand_total.toFixed(2);

        // Update total
        store_total = grand_total - amountToRemove;
        store_total = Math.max(store_total, 0).toFixed(2); // Ensure total is non-negative
        document.getElementById("voucher-grand-total").innerHTML = "<i class='fa fa-rupee'></i>&nbsp;" + store_total;

        // Update dues
        var voucher_paid_input = Number(document.getElementById('voucher-paid-balance').value);
        voucher_paid_input = 0

        //  not storing dues here cause bug accurs and for printing dues while typin in paid it works the same
        // Remove row from the table
        del_icon_tr.remove();
    }




    input_amount.onkeydown = function () {
        return false;
    }
    input_amount.oncontextmenu = function () {
        return false;
    }

    input_item.focus();


    function shiftFocus(event, nextInput) {
        if (event.keyCode === 13) { // Check if Enter key is pressed
            event.preventDefault(); // Prevent default Enter key behavior (form submission)
            nextInput.focus(); // Focus on the next input field
        }
    }

    input_item.onkeydown = function (event) {
        shiftFocus(event, input_price);
    }

    input_price.onkeydown = function (event) {
        shiftFocus(event, input_quantity);
    }

    input_quantity.onkeydown = function () {
        this.onkeyup = function (event) {

            if (event.keyCode == 13) {
                add_product.click();
                var items = document.getElementsByClassName("item");
                items[items.length - 1].focus();
            }

        }
    }

    input_quantity.oninput = function () {

        input_amount.value = input_price.value * input_quantity.value

        var amount = document.getElementsByClassName("amount"); // classname to start loop and add all the total mount of total number of products
        var sub_total_amount = document.getElementById("total-voucher-amount"); // for sub total 
        var voucher_tax_amount = document.getElementById("voucher-tax-amount") // to write tax amount 
        var voucher_grand_total = document.getElementById("voucher-grand-total") // subtotal + tax 
        var voucher_dues = document.getElementById("voucher-dues");
        var voucher_paid_input = document.getElementById("voucher-paid-balance");


        var i = 0;
        var previous_amount = 0;

        for (i = 0; i < amount.length; i++) {
            previous_amount = previous_amount + Number(amount[i].value);
        } // total amount iin sub total 

        store_subtotal = previous_amount.toFixed(2);   // variable decleared at top to store sub total in storage 

        sub_total_amount.innerHTML = "<i class='fa fa-rupee'></i> &nbsp;" + previous_amount.toFixed(2);
        // finished subtotal coding 

        var i;
        var avoid_repeat = 0;// to avoid printing multiple times
        var total_with_tax = 0;


        for (i = 0; i < localStorage.length; i++) {

            var key = localStorage.key(i);
            if (key.includes("tax")) {
                var key_value = localStorage.getItem(key);
                var extract_key = JSON.parse(key_value);

                var value_with_percent = extract_key.tax_percent;

                var actual_percent_without_percent_in_string = value_with_percent.replace("%", "");

                var actual_percent_without_percent_in_number = parseInt(actual_percent_without_percent_in_string);

                var taxInt = previous_amount * (actual_percent_without_percent_in_number / 100);
                //store tax in storage 

                if (taxInt !== null && taxInt !== undefined) {
                    store_tax[i] = taxInt;
                }



                avoid_repeat = avoid_repeat + "<i class='fa fa-rupee'></i>&nbsp;" + taxInt.toFixed(2) + "<br>";  // this is string

                voucher_tax_amount.innerHTML = avoid_repeat.replace(0, "");


                total_with_tax += taxInt;
                var grand_total = total_with_tax + previous_amount;

                //store grand total in storage
                store_total = grand_total.toFixed(2);

                voucher_grand_total.innerHTML = "<i class='fa fa-rupee'></i>&nbsp;" + grand_total.toFixed(2);

                voucher_dues.innerHTML = "<i class='fa fa-rupee'></i>&nbsp;" + grand_total.toFixed(2);

                voucher_paid_input.oninput = function () {
                    var paid_value = Number(document.getElementById("voucher-paid-balance").value);
                    store_paid = paid_value;
                    store_dues = grand_total - paid_value;
                    store_dues = Math.max(store_dues, 0).toFixed(2); // Ensure dues are non-negative
                    document.getElementById('voucher-dues').innerHTML = "<i class='fa fa-rupee'></i>&nbsp;" + store_dues;
                }


            }

        }


    }

    input_price.oninput = function () {

        input_amount.value = input_price.value * input_quantity.value

        var amount = document.getElementsByClassName("amount"); // classname to start loop and add all the total mount of total number of products
        var sub_total_amount = document.getElementById("total-voucher-amount"); // for sub total 
        var voucher_tax_amount = document.getElementById("voucher-tax-amount") // to write tax amount 
        var voucher_grand_total = document.getElementById("voucher-grand-total") // subtotal + tax 
        var voucher_dues = document.getElementById("voucher-dues");
        var voucher_paid_input = document.getElementById("voucher-paid-balance");


        var i = 0;
        var previous_amount = 0;

        for (i = 0; i < amount.length; i++) {
            previous_amount = previous_amount + Number(amount[i].value);
        } // total amount iin sub total 

        store_subtotal = previous_amount.toFixed(2);   // variable decleared at top to store sub total in storage 

        sub_total_amount.innerHTML = "<i class='fa fa-rupee'></i> &nbsp;" + previous_amount.toFixed(2);
        // finished subtotal coding 

        var i;
        var avoid_repeat = 0;// to avoid printing multiple times
        var total_with_tax = 0;


        for (i = 0; i < localStorage.length; i++) {

            var key = localStorage.key(i);
            if (key.includes("tax")) {
                var key_value = localStorage.getItem(key);
                var extract_key = JSON.parse(key_value);

                var value_with_percent = extract_key.tax_percent;

                var actual_percent_without_percent_in_string = value_with_percent.replace("%", "");

                var actual_percent_without_percent_in_number = parseInt(actual_percent_without_percent_in_string);

                var taxInt = previous_amount * (actual_percent_without_percent_in_number / 100);
                //store tax in storage 

                if (taxInt !== null && taxInt !== undefined) {
                    store_tax[i] = taxInt;
                }



                avoid_repeat = avoid_repeat + "<i class='fa fa-rupee'></i>&nbsp;" + taxInt.toFixed(2) + "<br>";  // this is string

                voucher_tax_amount.innerHTML = avoid_repeat.replace(0, "");


                total_with_tax += taxInt;
                var grand_total = total_with_tax + previous_amount;

                //store grand total in storage
                store_total = grand_total.toFixed(2);

                voucher_grand_total.innerHTML = "<i class='fa fa-rupee'></i>&nbsp;" + grand_total.toFixed(2);

                var minus_paid_with_grand_total = grand_total;

                voucher_dues.innerHTML = "<i class='fa fa-rupee'></i>&nbsp;" + grand_total.toFixed(2);

                voucher_paid_input.oninput = function () {
                    var paid_value = Number(document.getElementById("voucher-paid-balance").value);
                    store_paid = paid_value;
                    store_dues = grand_total - paid_value;
                    store_dues = Math.max(store_dues, 0).toFixed(2); // Ensure dues are non-negative
                    document.getElementById('voucher-dues').innerHTML = "<i class='fa fa-rupee'></i>&nbsp;" + store_dues;
                }


            }

        }


    }


}


// get bill
var get_bill = document.getElementById("get-bill-btn");
get_bill.onclick = function get_bills() {
    var close_voucher_btn = document.getElementById("voucher-popup-btn");
    var popup_voucher_btn = document.getElementById("close-voucher");
    var paid_input = document.getElementById("voucher-paid-balance");

    var select = document.getElementsByTagName("select")
    var s
    for (s = 0; s < select.length; s++) {
        select[s].style.border = "1px solid #7a7a7a";
        select[s].style.borderRadius = '4px';
        select[s].style.appearance = "none"
    }

    close_voucher_btn.style.display = "none";
    popup_voucher_btn.style.display = "none";
    third_wrapper.style.position = "absolute";
    third_wrapper.style.width = "100%"
    third_wrapper.style.height = "100%"
    third_wrapper.style.top = "0";
    third_wrapper.style.left = "0";
    third_wrapper.style.zIndex = "100";

    // paid_input.style.display = "";
    get_bill.style.display = "none";

    add_product.style.display = "none"



    var product_table = document.getElementById("product-table");
    var product_table_tr = product_table.getElementsByTagName("tr");
    var i;
    var store_item = []
    var store_price = []
    var store_quantity = []
    var store_unit = []
    var store_amount = []


    for (i = 0; i < product_table_tr.length; i++) {
        var product_table_td = product_table_tr[i].getElementsByTagName("td")
        var last_table_td = product_table_td[product_table_td.length - 1]
        last_table_td.remove();

    }

    // saving the data of voucher in storage

    var buyer_name = document.getElementById("vouchername").value;
    var buyer_email = document.getElementById("voucheremail").value;
    var buyer_address = document.getElementById("voucheraddress").value;
    var buyer_phone = document.getElementById("voucherphone").value;
    var date = document.getElementById("voucher-date").textContent;
    var time = document.getElementById("voucher-time").innerText;

    var buyer_item = document.getElementsByClassName("item");
    for (i = 0; i < buyer_item.length; i++) {
        store_item[i] = buyer_item[i].value;
    }

    var buyer_price = document.getElementsByClassName("price");
    for (i = 0; i < buyer_price.length; i++) {
        store_price[i] = buyer_price[i].value;
    }

    var buyer_quantity = document.getElementsByClassName("quantity");
    for (i = 0; i < buyer_quantity.length; i++) {
        store_quantity[i] = buyer_quantity[i].value;
    }

    var buyer_unit = document.getElementsByClassName("unit");
    for (i = 0; i < buyer_unit.length; i++) {
        store_unit[i] = buyer_unit[i].value;
    }

    var buyer_amount = document.getElementsByClassName("amount");
    for (i = 0; i < buyer_amount.length; i++) {
        store_amount[i] = buyer_amount[i].value;
    }

    var filteredStoreTax = store_tax.filter(function (tax) {
        return tax !== null && tax !== undefined;
    });

    var buyer_object = {
        buyer_date: date,
        buyer_time: time,
        buyer_name: buyer_name,
        buyer_email: buyer_email,
        buyer_address: buyer_address,
        buyer_phone: buyer_phone,
        store_item: store_item,
        store_price: store_price,
        store_quantity: store_quantity,
        store_unit: store_unit,
        store_amount: store_amount,
        store_subtotal: store_subtotal,
        store_tax: filteredStoreTax,
        store_total: store_total,
        store_paid: store_paid,
        store_dues: store_dues
    }

    var buyer_details = JSON.stringify(buyer_object);
    localStorage.setItem(store_voucher + "_voucher", buyer_details);


    // print();
}

var search_voucher = document.getElementById("search_voucher")
search_voucher.onkeydown = function search_voucher(event) {
    if (event.keyCode == 13) {
        var voucher_number = this.value + "_voucher";
        var i;
        console.log(voucher_number);

        for (i = 0; i < localStorage.length; i++) {
            var keys = localStorage.key(i);
            if (keys.match(voucher_number)) {
                var voucher = localStorage.getItem(voucher_number)
                var voucher_details = JSON.parse(voucher)

                var voucher_opened = document.getElementById("third-wrapper")
                var delete_btn = document.getElementById("delete-voucher");
                var ist_row = document.getElementById("ist-row")
                var dynamic_voucher_number = document.getElementById("voucher-number")

                var voucher_date = document.getElementById("voucher-date")
                var voucher_time = document.getElementById("voucher-time")
                voucher_opened.style.display = "block"
                voucher_opened.classList.add("voucher-popup-active")
                delete_btn.style.display = "block";
                ist_row.style.backgroundColor = "red";
                ist_row.style.color = "white";
                ist_row.style.fontWeight = "bold";
                ist_row.style.fontFamily = "san-serif";
                var only_number = voucher_number.split("_")
                dynamic_voucher_number.innerHTML = "Current Voucher Number : " + only_number[0];

                store_voucher = only_number[0];

                delete_btn.addEventListener("click", function () {
                    var allower = window.confirm("Are You Sure")
                    if (allower == true) {
                        localStorage.removeItem(voucher_number);
                        location.reload()
                    }
                    else {
                        alert("No Key Found")
                    }
                })


                voucher_date.innerHTML = voucher_details.buyer_date;
                voucher_time.innerHTML = voucher_details.buyer_time;

                document.getElementById("vouchername").value = voucher_details.buyer_name;
                document.getElementById("voucheremail").value = voucher_details.buyer_email;
                document.getElementById("voucheraddress").value = voucher_details.buyer_address;
                document.getElementById("voucherphone").value = voucher_details.buyer_phone;

                var item = document.getElementsByClassName("item");
                var price = document.getElementsByClassName("price");
                var quantity = document.getElementsByClassName("quantity");
                var unit = document.getElementsByClassName("unit")
                var amount = document.getElementsByClassName("amount");

                var item_length = voucher_details.store_item.length;
                var j;
                for (j = 0; j < item_length; j++) {
                    var add_product = document.getElementById("add-product");
                    add_product.click();

                    item[j].value = voucher_details.store_item[j];
                    // item[j].blur()
                    item[j].removeAttribute('disabled')
                    price[j].value = voucher_details.store_price[j];
                    price[j].removeAttribute('disabled')
                    quantity[j].value = voucher_details.store_quantity[j];
                    quantity[j].removeAttribute('disabled')
                    unit[j].value = voucher_details.store_unit[j];

                    amount[j].value = voucher_details.store_amount[j];

                }



                var amount = document.getElementsByClassName("amount"); // classname to start loop and add all the total mount of total number of products
                var sub_total_amount = document.getElementById("total-voucher-amount"); // for sub total 
                var voucher_tax_amount = document.getElementById("voucher-tax-amount") // to write tax amount 
                var voucher_grand_total = document.getElementById("voucher-grand-total") // subtotal + tax 
                var voucher_dues = document.getElementById("voucher-dues");
                var voucher_paid_input = document.getElementById("voucher-paid-balance");


                var i = 0;
                var previous_amount = 0;

                for (i = 0; i < amount.length; i++) {
                    previous_amount = previous_amount + Number(amount[i].value);
                } // total amount iin sub total 

                store_subtotal = previous_amount.toFixed(2);   // variable decleared at top to store sub total in storage 

                sub_total_amount.innerHTML = "<i class='fa fa-rupee'></i> &nbsp;" + previous_amount.toFixed(2);
                // finished subtotal coding 

                var i;
                var avoid_repeat = 0;// to avoid printing multiple times
                var total_with_tax = 0;


                for (i = 0; i < localStorage.length; i++) {

                    var key = localStorage.key(i);
                    if (key.includes("tax")) {
                        var key_value = localStorage.getItem(key);
                        var extract_key = JSON.parse(key_value);

                        var value_with_percent = extract_key.tax_percent;

                        var actual_percent_without_percent_in_string = value_with_percent.replace("%", "");

                        var actual_percent_without_percent_in_number = parseInt(actual_percent_without_percent_in_string);

                        var taxInt = previous_amount * (actual_percent_without_percent_in_number / 100);
                        //store tax in storage 

                        if (taxInt !== null && taxInt !== undefined) {
                            store_tax[i] = taxInt;
                        }



                        avoid_repeat = avoid_repeat + "<i class='fa fa-rupee'></i>&nbsp;" + taxInt.toFixed(2) + "<br>";  // this is string

                        voucher_tax_amount.innerHTML = avoid_repeat.replace(0, "");


                        total_with_tax += taxInt;
                        var grand_total = total_with_tax + previous_amount;

                        //store grand total in storage
                        store_total = grand_total.toFixed(2);


                        voucher_grand_total.innerHTML = "<i class='fa fa-rupee'></i>&nbsp;" + grand_total.toFixed(2);

                        voucher_dues.innerHTML = "<i class='fa fa-rupee'></i>&nbsp;" + grand_total.toFixed(2);

                        // storing paid and dues in storage 
                        // balnce deduction 🧲

                        voucher_paid_input.oninput = function () {
                            var paid_value = document.getElementById("voucher-paid-balance").value;
                            store_paid = paid_value;
                            var minused_dues = store_total - paid_value;
                            voucher_dues.innerHTML = "<i class='fa fa-rupee'></i>&nbsp;" + minused_dues.toFixed(2);
                            store_dues = minused_dues.toFixed(2)

                        }

                    }

                }


                voucher_paid_input.value = voucher_details.store_paid;


                voucher_dues.innerHTML = "<i class='fa fa-rupee'></i> &nbsp;" + voucher_details.store_dues;


                var date = document.getElementById("voucher-date");
                date.onclick = function () {
                    var input = window.prompt("Edit date in defined format", voucher_details.buyer_date);
                    this.innerHTML = input;
                    voucher_date = input;
                    if (input == null || input == " ") {
                        this.innerHTML = "Date : " + buyer_extract.store_date;
                    }

                }

                var time = document.getElementById("voucher-time");
                time.onclick = function () {
                    var input = window.prompt("Edit time in defined format", voucher_details.buyer_time);
                    this.innerHTML = input;
                    voucher_time = input;
                    if (input == null || input == " ") {
                        this.innerHTML = "Date : " + buyer_extract.store_date;
                    }

                }

                var pdf_btn = document.createElement("button");
                pdf_btn.id = "pdf-btn"; // Set the ID of the button
                var pdf_insert = document.getElementById("pdf-insert");
                pdf_insert.appendChild(pdf_btn);
                pdf_btn.className = "last-btns";
                pdf_btn.innerHTML = "Generate PDF";

                var voucher = document.getElementById("third-wrapper");
                document.getElementById('pdf-btn').onclick = function () {
                    alert("i am pdf converter")
                };

            }
            else {
                console.log("no voucher found")


            }
        }
    }
}
