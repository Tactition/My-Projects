function showdate() {
    var header_date = document.getElementById("voucher-date")

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


    header_date.innerHTML += day + "-" + month + "-" + year;
}
showdate();

// displeay purchase acocunt  laallalalallalalla
function display_purchase_ac() {
    var input = document.getElementById("purchase-input");
    var hint = document.getElementById("suggestions");

    input.oninput = function () {
        hint.innerHTML = "";
        var i, j;
        for (i = 0; i < localStorage.length; i++) {
            var allkey = localStorage.key(i);
            if (allkey.match("ledger_no")) {
                var key_data = localStorage.getItem(allkey);
                var main_data = JSON.parse(key_data);
                if (main_data.group.match("Purchase account")) {

                    if (main_data.ledger_name.toLowerCase().match(input.value.toLowerCase()) != null) {
                        hint.style.display = "block";
                        var span = document.createElement("span");
                        span.className = "sug-span"
                        hint.appendChild(span);
                        span.append(document.createTextNode(main_data.ledger_name));
                    }

                    var hint_hover = document.getElementsByClassName("sug-span");
                    for (j = 0; j < hint_hover.length; j++) {

                        hint_hover[j].onmouseover = function () {
                            this.style.backgroundColor = "#c9eece";

                            this.onclick = function () {
                                input.value = this.innerText;
                                hint.style.display = "none";
                                var add_btn = document.getElementById("add-item-btn");
                                add_btn.disabled = false;
                                add_btn.title = "Add More Items"
                                add_btn.click();
                            }
                        }

                        hint_hover[j].onmouseout = function () {
                            this.style.backgroundColor = "inherit";

                        }
                    }

                    input.onkeydown = function (event) {
                        if (event.key === "Enter") {
                            var spans = hint.getElementsByTagName("span");
                            input.value = spans[0].innerHTML;
                            hint.style.display = "none";

                            var add_btn = document.getElementById("add-item-btn");
                            add_btn.disabled = false;
                            add_btn.title = "Add More Items"
                            add_btn.click();

                        }
                    }


                }

            }
        }
    }
    // input.focus();



};
display_purchase_ac();
// add item 

function add_item() {
    var item_table = document.getElementById("sec-table");
    var tr = document.createElement("tr");
    tr.className = "animate__animated animate__slideInDown";
    tr.style.animationDuration = '0.2s';
    item_table.appendChild(tr);
    var td_item = document.createElement("td");
    var td_qty = document.createElement("td");
    var td_rate = document.createElement("td");
    var td_sell_price = document.createElement("td")
    var td_per = document.createElement("td");
    var td_amount = document.createElement("td");
    var td_delete = document.createElement("td");

    tr.append(td_item);
    tr.append(td_rate);
    tr.append(td_qty);
    tr.append(td_sell_price)
    tr.append(td_per);
    tr.append(td_amount);
    tr.append(td_delete);

    var item_input = document.createElement("input");
    item_input.type = "text";
    item_input.className = "item";
    item_input.id = "item-input";
    item_input.placeholder = "item Description";

    var qty_input = document.createElement("input");
    qty_input.type = "number";
    qty_input.disabled = "true";
    qty_input.className = "qty";
    qty_input.id = "qty-input";
    qty_input.placeholder = "Quantity";

    var rate_input = document.createElement("input");
    rate_input.type = "number";
    rate_input.disabled = "true";
    rate_input.className = "rate";
    rate_input.id = "rate-input";
    rate_input.placeholder = "Rate";

    var sell_price = document.createElement("input");
    sell_price.type = "number";
    sell_price.className = "price";
    sell_price.disabled = "true"
    sell_price.id = "sell-input";
    sell_price.placeholder = "Selling Price";

    var per_input = document.createElement("select");
    per_input.className = "per"
    var defalt = document.createElement("option");
    defalt.append(document.createTextNode("Per Default"));
    per_input.append(defalt);

    per_input.className = "per";
    per_input.id = "per-input";
    per_input.placeholder = "Per";

    var i;
    for (i = 0; i < localStorage.length; i++) {
        var allkey = localStorage.key(i);
        if (allkey.match("unit")) {
            var key_data = localStorage.getItem(allkey);
            var data = JSON.parse(key_data);

            var option = document.createElement("option");
            option.append(document.createTextNode(data.symbol_measure));
            per_input.append(option);
        }
    }

    var amount_input = document.createElement("input");
    amount_input.type = "number";
    amount_input.disabled = "true";
    amount_input.className = "amount";
    amount_input.id = "amount-input";
    amount_input.placeholder = "Amount";
    amount_input.title = "Disabled For Security Purposes"

    var delete_icon = document.createElement("i");
    delete_icon.className = "fa fa-trash";
    delete_icon.id = "delete-icon";

    delete_icon.onclick = function () {
        var parent_tr = this.parentElement.parentElement;
        parent_tr.remove();
        subtotal(); // runs the subtotal function here
        calculate_tax();
        document.getElementById("voucher-paid").value = 0;
    }

    td_item.append(item_input);
    td_rate.append(rate_input);
    td_qty.append(qty_input);
    td_sell_price.append(sell_price)
    td_per.append(per_input);
    td_amount.append(amount_input);
    td_delete.append(delete_icon);


    // gives focus to last input feild 
    item_input.focus();


    item_input.oninput = function () {
        rate_input.disabled = false;

        rate_input.oninput = function () {
            qty_input.disabled = false;

            // multiplication of rate and quantity
            amount_input.value = (qty_input.value * rate_input.value).toFixed(2);
            subtotal();
            calculate_tax();
            document.getElementById("voucher-paid").value = 0;

            // matces the later with the select element values insid per o 
            qty_input.onkeyup = function (event) {

                sell_price.disabled = false;

                var key = String.fromCharCode(event.keyCode);
                var all_options = per_input.getElementsByTagName("option");
                var i;
                for (i = 0; i < all_options.length; i++) {
                    if (all_options[i].value.toUpperCase().charAt(0).match(key.toUpperCase())) {
                        per_input.value = all_options[i].value;
                    }
                }

                // multiplication of rate and quantity and printing in amont feild
                amount_input.value = (qty_input.value * rate_input.value).toFixed(2);
                subtotal(); // runs the subtotal function here
                calculate_tax();
                document.getElementById("voucher-paid").value = 0;


                amount_input.onkeydown = function () {
                    return false;

                }

                amount_input.oncontextmenu = function () {
                    return false
                }

            }
        }
    }

    item_input.onkeyup = function (event) {
        if (event.keyCode == 13) {
            rate_input.focus();
        }
    }

    rate_input.onkeyup = function (event) {
        if (event.keyCode == 13) {
            qty_input.focus();
        }
    }

    qty_input.onkeydown = function (event) {
        if (event.keyCode == 13) {
            sell_price.focus();
        }
    }

    sell_price.onkeydown = function () {
        var add_btn = document.getElementById("add-item-btn");
        var suplier_name = document.getElementById("suplier-name");
        if (this.value > rate_input.value) {

            if (event.keyCode == 13) {
                per_input.focus();
                per_input.onkeydown = function (event) {
                    if (event.keyCode == 13) {
                        add_btn.click();
                    }
                    else if (event.shiftKey) {
                        suplier_name.click();
                        suplier_name.focus();
                    }
                }
            }
        }
        else {

            if (event.keyCode == 13) {
                var span = document.createElement("span");
                span.innerText = ' ';
                span.innerHTML = "Sell price should be greater than rate";
                td_rate.appendChild(span);
                span.style.position = "absolute";
                span.style.top = "40%";
                span.style.fontSize = "12px"
                span.style.color = "red";
                span.style.display = "block";

                setTimeout(function () {
                    span.style.display = "none";
                }, 2000);
            }

        }


    }
}

function call_add_item() {
    var add_btn = document.getElementById("add-item-btn");
    add_btn.addEventListener("click", add_item);

    window.onkeyup = function (event) {
        if (event.altKey && event.keyCode == 65) {  // alt + A
            add_btn.click();
            move_to_supplier();
        }
    }
}

call_add_item();

// subtotal calculatiion

function subtotal() {
    var all_amount = document.getElementsByClassName("amount");
    // Variable declarations
    var subtotal = document.getElementById("subtotal");
    var previous_data = 0;
    var i;
    for (i = 0; i < all_amount.length; i++) {
        // Convert the value to a float number and add to previous_data
        var value = parseFloat(all_amount[i].value) || 0; // Fallback to 0 if the value is not a number
        previous_data += value;
    }
    // Display the subtotal with 2 decimal places
    subtotal.innerHTML = previous_data.toFixed(2);
}

// read tax from localStorage

function read_tax() {
    var tax_name = document.getElementById("taxes-name")
    var i;
    for (i = 0; i < localStorage.length; i++) {
        var allkey = localStorage.key(i);
        if (allkey.match("ptax")) {
            var key_data = localStorage.getItem(allkey);
            var read_data = JSON.parse(key_data);
            // creating spans to display taxses
            var span = document.createElement("span");
            span.className = "taxes";
            tax_name.append(span);
            span.append(document.createTextNode(read_data.tax_name + "  :  " + read_data.tax_percent))
        }
    }
}

read_tax();  // which shows the tax names in leftside of tax in voucher interface

function default_taxes() {
    var sub_total_amount = document.getElementById("taxes-amount");
    var i;
    for (i = 0; i < localStorage.length; i++) {
        var all_key = localStorage.key(i);
        if (all_key.match("ptax")) {
            var span = document.createElement("span");
            span.className = "taxes";
            span.appendChild(document.createTextNode("00.00"))
            sub_total_amount.append(span);

        }
    }
}

default_taxes();

// calculate taxes

function calculate_tax() {
    var sub_total_amount = document.getElementById("taxes-amount")

    var subtotal = document.getElementsByClassName("amount");
    var subtotal_amount = 0;
    var total_tax = 0;
    var i;
    for (i = 0; i < subtotal.length; i++) {
        var values = parseFloat(subtotal[i].value) || 0;
        subtotal_amount += values;
    }

    sub_total_amount.innerHTML = " "  // for avoiding repetation
    var j;
    for (j = 0; j < localStorage.length; j++) {
        var allkey = localStorage.key(j);
        if (allkey.match("ptax")) {
            var key_data = localStorage.getItem(allkey);
            var read_data = JSON.parse(key_data);
            var only_tax = parseFloat(read_data.tax_percent.replace("%", " ")) || 0;
            var subtotal_tax = subtotal_amount * (only_tax / 100);  //only tax not total with tax 
            total_tax += subtotal_tax;

            var span = document.createElement("span");
            span.className = "fa fa-rupee taxes";
            span.style.display = "block";
            sub_total_amount.append(span);
            span.append(document.createTextNode(" " + subtotal_tax.toFixed(2)));
        }
    }

    calculate_total(subtotal_amount, total_tax)  // sending values lo funtl below

}



// calculate grand total
function calculate_total(subtotal_amount, total_tax) {
    var gt_feild = document.getElementById("grand-total")

    var subtotal = parseFloat(subtotal_amount);
    var totaltax = parseFloat(total_tax);
    var grand_total = subtotal + totaltax;
    gt_feild.innerHTML = parseFloat(grand_total).toFixed(2);

    paid(grand_total);
}

function paid(grand_total) {
    var paid_input = document.getElementById("voucher-paid");
    var balance_feild = document.getElementById("balance");

    balance_feild.innerHTML = "NaN" ? balance_feild.innerHTML = 0 : parseFloat(grand_total);
    paid_input.onfocus = function () {
        paid_input.value = "";
        paid_input.oninput = function () {
            var paid_value = Number(document.getElementById("voucher-paid").value);
            var g_total = grand_total;
            var balance = g_total - paid_value;
            balance_feild.innerHTML = parseFloat(balance).toFixed(2);
        }
    }
}
paid();


var submit_btn = document.getElementById("voucher-submit");
submit_btn.onclick =  function(){
    store_voucher();
}

function store_voucher() {
    var v_num = document.getElementById("purchase-number").innerHTML;
    var v_date = document.getElementById("voucher-date").innerHTML;
    var v_partyname = document.getElementById("purchase-input").value;

    var i,
        store_item = [],
        store_qty = [],
        store_rate = [],
        store_sellprice = [],
        store_per = [],
        store_amount = [],
        store_tax = [];

    var item_input = document.getElementsByClassName("item");
    var qty_input = document.getElementsByClassName("qty");
    var rate_input = document.getElementsByClassName("rate");
    var sellprice_input = document.getElementsByClassName("price");
    var per_input = document.getElementsByClassName("per");
    var amount_input = document.getElementsByClassName("amount");


    for (i = 0; i < item_input.length; i++) {
        store_item[i] = item_input[i].value;
    }

    for (i = 0; i < qty_input.length; i++) {
        store_qty[i] = qty_input[i].value;
    }

    for (i = 0; i < rate_input.length; i++) {
        store_rate[i] = rate_input[i].value;
    }

    for (i = 0; i < sellprice_input.length; i++) {
        store_sellprice[i] = sellprice_input[i].value;
    }

    for (i = 0; i < per_input.length; i++) {
        store_per[i] = per_input[i].value;
    }

    for (i = 0; i < amount_input.length; i++) {
        store_amount[i] = amount_input[i].value;
    }


    var suplier_name = document.getElementById("suplier-name").value;
    var suplier_phone = document.getElementById("suplier-phone").value;
    var suplier_address = document.getElementById("suplier-address").value

    var v_subtotal = document.getElementById("subtotal").innerHTML;

    var taxes_amount = document.getElementById("taxes-amount");
    var tax_spans = taxes_amount.getElementsByTagName("span")
    var j;
    for (j = 0; j < tax_spans.length; j++) {
        store_tax[j] = tax_spans[j].innerHTML;
    }

    var v_total = document.getElementById("grand-total").innerHTML;
    var v_paid = document.getElementById("voucher-paid").value;
    var v_dues = document.getElementById("balance").innerHTML;


    var voucher_details = {
        voucher_no: "purchase_voucher_" + v_num,
        voucher_date: v_date,
        account_name: v_partyname,
        store_item: store_item,
        store_qty: store_qty,
        store_rate: store_rate,
        store_sellprice: store_sellprice,
        store_per: store_per,
        store_amount: store_amount,
        store_s_name: suplier_name,
        store_s_phone: suplier_phone,
        store_s_address: suplier_address,
        subtotal: v_subtotal,
        store_tax: store_tax,
        store_total: v_total,
        store_paid: v_paid,
        store_dues: v_dues
    }
    var purchase_data = JSON.stringify(voucher_details);

    var notice = document.getElementById("notice-purchase");

    if (v_partyname != "") {
        if (v_total != "") {
            if (v_paid != 0) {
                if (suplier_name != "") {
                    localStorage.setItem("purchase_voucher_" + v_num, purchase_data);
                    notice.innerHTML = "voucher Saved Click to Generate Pdf   <button onclick='print()'> Generate pdf</button>";
                    location.reload();
                }
                else {
                    notice.innerHTML = "Please Fill The Suplier Feild"
                }
            }
            else {
                notice.innerHTML = ("Please Fill The paid")
            }
        }
        else {
            notice.innerHTML = ("total is empty")
        }
    }
    else {
        notice.innerHTML = ("party name is empty")
    }

    setTimeout(function () {
        notice.innerHTML = ""
    }, 1500)
}

function move_to_supplier() {
    var suplier_name = document.getElementById("suplier-name");

    window.onkeyup = function (event) {
        if (event.shiftKey && event.keyCode == 83) {  // shift + s
            suplier_name.click();
            suplier_name.focus();
        }
    }
}

move_to_supplier();


function shiftFocus() {

    var suplier_name = document.getElementById("suplier-name");
    var suplier_address = document.getElementById("suplier-address");
    var suplier_phone = document.getElementById("suplier-phone");
    var v_paid = document.getElementById("voucher-paid")
    var submit_btn = document.getElementById("voucher-submit");

    function jump_next(event, next_input) {
        if (event.keyCode === 13) {
            event.preventDefault();
            next_input.click();
            next_input.focus();
        }
    }

    suplier_name.onkeyup = function (event) {
        jump_next(event, suplier_phone);
    }

    suplier_phone.onkeydown = function (event) {
        jump_next(event, suplier_address)
    }

    suplier_address.onkeydown = function (event) {
        jump_next(event, v_paid)
    }

    v_paid.onkeydown = function (event) {
        if (event.keyCode === 13) {
            {
                var per = window.confirm("Do you want to save Voucher")
                if (per == true) {
                    submit_btn.click();
                }
            }
        }

    }
}

shiftFocus();
// voucher number

function voucher_number() {
    window.onload = function () {
        var voucher_number = document.getElementById("purchase-number");
        var last_voucher_number = 0;
        var i;
        for (i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.includes("purchase_voucher")) {
                var v_num = key.replace("purchase_voucher_", " ")
                last_voucher_number = Math.max(last_voucher_number, v_num)
            }
        }
        voucher_number.innerHTML = parseInt(last_voucher_number) + 1;


        var sales_voucher_number = document.getElementById("sales-number");
        var last_voucher_number = 0;
        var i;
        for (i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.includes("sales_voucher")) {
                var v_num = key.replace("sales_voucher_", "");
                last_voucher_number = Math.max(last_voucher_number, parseInt(v_num));
            }
        }
        sales_voucher_number.innerHTML = last_voucher_number + 1;
    }
}


voucher_number()

// current ballance 

function current_balance() {
    var purchase_balance = document.getElementById("purchase-balance");
    var i, balance = 0;
    for (i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.includes("purchase_voucher")) {
            var key_data = localStorage.getItem(key);
            var read_data = JSON.parse(key_data);
            balance += parseInt(read_data.store_total);
        }
    }
    purchase_balance.innerHTML = balance + "  Cr";
}

current_balance();


function search_voucher() {
    var search = document.getElementById("search");
    var notice = document.getElementById("find-notice");

    var v_num = document.getElementById("purchase-number");
    var v_date = document.getElementById("voucher-date");
    var v_partyname = document.getElementById("purchase-input");
    var item_input = document.getElementsByClassName("item");
    var qty_input = document.getElementsByClassName("qty");
    var rate_input = document.getElementsByClassName("rate");
    var sellprice_input = document.getElementsByClassName("price");
    var per_input = document.getElementsByClassName("per");
    var amount_input = document.getElementsByClassName("amount");
    var suplier_name = document.getElementById("suplier-name");
    var suplier_phone = document.getElementById("suplier-phone");
    var suplier_address = document.getElementById("suplier-address")
    var v_paid = document.getElementById("voucher-paid");
    var v_dues = document.getElementById("balance");
    search.onkeyup = function (event) {
        if (event.keyCode == 13) {
            var i;
            for (i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.includes("purchase_voucher_" + search.value)) {
                    var key_data = localStorage.getItem(key);
                    var data = JSON.parse(key_data);
                    var voucher_number = data.voucher_no;
                    if (voucher_number == "purchase_voucher_" + search.value) {

                        var dlt_icon = document.getElementById("voucher-delete")
                        dlt_icon.style.display = "block";
                        dlt_icon.onclick = function () {
                            var consent = window.confirm("Do You Want to delete the Voucher")
                            if (consent == true) {
                                localStorage.removeItem(voucher_number);
                                location.reload();
                            }

                        }

                        setInterval(function () {
                            notice.innerHTML = 'Found ' + voucher_number;
                            notice.style.color = "black";
                        }, 100)


                        v_num.innerHTML = search.value;
                        v_date.innerHTML = data.voucher_date;
                        v_partyname.value = data.account_name;

                        var j;
                        for (j = 0; j < data.store_item.length; j++) {
                            add_item();
                            item_input[j].value = data.store_item[j];
                            item_input[j].disabled = false;
                            rate_input[j].value = data.store_rate[j];
                            rate_input[j].disabled = false;
                            qty_input[j].value = data.store_qty[j];
                            qty_input[j].disabled = false;
                            sellprice_input[j].value = data.store_sellprice[j];
                            sellprice_input[j].disabled = false;
                            per_input[j].value = data.store_per[j];
                            amount_input[j].value = data.store_amount[j];
                        }
                        suplier_name.value = data.store_s_name;
                        suplier_phone.value = data.store_s_phone;
                        suplier_address.value = data.store_s_address;

                        calculate_tax();
                        subtotal()
                        v_paid.value = data.store_paid;
                        v_dues.innerHTML = data.store_dues;

                        var submit_btn = document.getElementById("voucher-submit")
                        submit_btn.onclick = function () {
                            store_voucher();

                            var notice = document.getElementById("notice-purchase");
                            notice.innerHTML = "voucher Edited And Saved Click to Generate Pdf   <button onclick='print()'> Generate pdf</button>";

                            setTimeout(function () {
                                location.reload();
                            }, 2500)
                        }
                    }
                    else {
                        alert("Error in voucehr")
                    }
                }
                else {
                    notice.innerHTML = "No Voucher data Found"
                }
            }
        }
    }
}
search_voucher();


// voucher print header 
function unnecessary() {
    var comp_logoo = document.getElementById("work-brand-logoo")
    var company_namee = document.getElementById("work-brand-namee")
    var company_details = localStorage.getItem("company");
    var data = JSON.parse(company_details);
    company_namee.innerHTML = data.company_name;
    comp_logoo.setAttribute("src", data.company_logo);
}
unnecessary();