function showdate() {
    var header_date = document.getElementById("sales-voucher-date")

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

function details() {
    var email = document.getElementById("sales-company-Email");
    var phone = document.getElementById("sales-company-phone");
    var comp_logo = document.getElementById("sales-work-brand-logoo");
    var company_name = document.getElementById("sales-work-brand-namee");
    var address = document.getElementById("sales-company-address");
    var fax = document.getElementById("sales-company-fax");

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


function display_sales_ac() {
    var input = document.getElementById("sales-input");
    var hint = document.getElementById("sales-suggestions");

    input.oninput = function () {
        hint.innerHTML = "";
        var i, j;
        for (i = 0; i < localStorage.length; i++) {
            var allkey = localStorage.key(i);
            if (allkey.match("ledger_no")) {
                var key_data = localStorage.getItem(allkey);
                var main_data = JSON.parse(key_data);
                if (main_data.group.match("Sales account")) {

                    if (main_data.ledger_name.toLowerCase().match(input.value.toLowerCase()) != null) {
                        hint.style.display = "block";
                        var span = document.createElement("span");
                        span.className = "sales-sug-span"
                        hint.appendChild(span);
                        span.append(document.createTextNode(main_data.ledger_name));
                    }

                    var hint_hover = document.getElementsByClassName("sales-sug-span");
                    for (j = 0; j < hint_hover.length; j++) {

                        hint_hover[j].onmouseover = function () {
                            this.style.backgroundColor = "#c9eece";

                            this.onclick = function () {
                                input.value = this.innerText;
                                hint.style.display = "none";
                                var add_btn = document.getElementById("sales-add-item-btn");
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

                            var add_btn = document.getElementById("sales-add-item-btn");
                            add_btn.disabled = false;
                            add_btn.title = "Add More Items"
                            add_btn.click();

                        }
                    }

                }
            }
        }
    }
}

display_sales_ac();



function sales_add_item() {
    var item_table = document.getElementById("sales-sec-table");
    var tr = document.createElement("tr");
    tr.className = "animate__animated animate__slideInDown";
    tr.style.animationDuration = '0.2s';
    item_table.appendChild(tr);

    var td_item = document.createElement("td");
    var td_qty = document.createElement("td");
    var td_rate = document.createElement("td");
    var td_per = document.createElement("td");
    var td_amount = document.createElement("td");
    var td_delete = document.createElement("td");

    tr.appendChild(td_item);
    tr.appendChild(td_rate);
    tr.appendChild(td_qty);
    tr.appendChild(td_per);
    tr.appendChild(td_amount);
    tr.appendChild(td_delete);

    var item_input = document.createElement("input");
    item_input.type = "text";
    item_input.className = "sales-item";
    item_input.id = "sales-item-input";
    item_input.placeholder = "Item Description";

    var qty_input = document.createElement("input");
    qty_input.type = "number";
    qty_input.disabled = true;
    qty_input.className = "sales-qty";
    qty_input.id = "sales-qty-input";
    qty_input.placeholder = "Quantity";

    var rate_input = document.createElement("input");
    rate_input.type = "number";
    rate_input.disabled = true;
    rate_input.className = "sales-rate";
    rate_input.id = "sales-rate-input";
    rate_input.placeholder = "Rate";

    var per_input = document.createElement("select");
    per_input.className = "sales-per";
    per_input.id = "sales-per-input";
    per_input.placeholder = "Per";

    var defaultOption = document.createElement("option");
    defaultOption.textContent = "Default";
    per_input.appendChild(defaultOption);

    for (var i = 0; i < localStorage.length; i++) {
        var allkey = localStorage.key(i);
        if (allkey.match("unit")) {
            var key_data = localStorage.getItem(allkey);
            var data = JSON.parse(key_data);

            var option = document.createElement("option");
            option.textContent = data.symbol_measure;
            per_input.appendChild(option);
        }
    }

    var amount_input = document.createElement("input");
    amount_input.type = "number";
    amount_input.disabled = true;
    amount_input.className = "sales-amount";
    amount_input.id = "sales-amount-input";
    amount_input.placeholder = "Amount";
    amount_input.title = "Disabled For Security Purposes";

    var delete_icon = document.createElement("i");
    delete_icon.className = "fa fa-trash";
    delete_icon.id = "sales-delete-icon";

    delete_icon.onclick = function () {
        var parent_tr = this.parentElement.parentElement;
        parent_tr.remove();
        sales_subtotal(); // Assuming sales_subtotal() is defined elsewhere
        sales_calculate_tax();
        document.getElementById("sales-voucher-paid").value = 0;
    };

    td_item.appendChild(item_input);
    td_rate.appendChild(rate_input);
    td_qty.appendChild(qty_input);
    td_per.appendChild(per_input);
    td_amount.appendChild(amount_input);
    td_delete.appendChild(delete_icon);

    // Focus on the item input field
    item_input.click();
    item_input.focus();


    item_input.oninput = function () {
        showstock();

        rate_input.disabled = false;

        rate_input.oninput = function () {
            qty_input.disabled = false;

            amount_input.value = (qty_input.value * rate_input.value).toFixed(2);
            sales_subtotal();
            sales_calculate_tax();
            document.getElementById("sales-voucher-paid").value = 0;

            qty_input.onkeyup = function (event) {
                var key = String.fromCharCode(event.keyCode);
                var all_options = per_input.getElementsByTagName("option");
                for (var i = 0; i < all_options.length; i++) {
                    if (all_options[i].textContent.toUpperCase().charAt(0) === key.toUpperCase()) {
                        per_input.value = all_options[i].textContent;
                        break;
                    }
                }

                amount_input.value = (qty_input.value * rate_input.value).toFixed(2);
                sales_subtotal();
                sales_calculate_tax();
                document.getElementById("sales-voucher-paid").value = 0;

                amount_input.onkeydown = function () {
                    return false;
                };

                amount_input.oncontextmenu = function () {
                    return false;
                };
            };
        };
    };

    item_input.onkeyup = function (event) {
        if (event.keyCode === 13) {
            rate_input.focus();
        }
    };

    rate_input.onkeyup = function (event) {
        if (event.keyCode === 13) {
            qty_input.focus();
        }
    };

    qty_input.onkeydown = function (event) {
        if (event.keyCode === 13) {
            sales_add_item();
        }
    };


}


function call_sales_add_item() {
    var add_btn = document.getElementById("sales-add-item-btn");
    add_btn.addEventListener("click", sales_add_item);


    window.onkeyup = function (event) {
        if (event.altKey && event.keyCode == 65) {  // alt + A
            add_btn.click();

        }
    };
}

call_sales_add_item();

function sales_subtotal() {
    var all_amount = document.getElementsByClassName("sales-amount");
    var subtotal = document.getElementById("sales-subtotal");
    var previous_data = 0;

    for (var i = 0; i < all_amount.length; i++) {
        var value = parseFloat(all_amount[i].value) || 0;
        previous_data += value;
    }

    subtotal.innerHTML = previous_data.toFixed(2);
}

function sales_read_tax() {
    var tax_name = document.getElementById("sales-taxes-name");

    for (var i = 0; i < localStorage.length; i++) {
        var allkey = localStorage.key(i);
        if (allkey.match("ptax")) {
            var key_data = localStorage.getItem(allkey);
            var read_data = JSON.parse(key_data);

            var span = document.createElement("span");
            span.className = "sales-taxes";
            span.appendChild(document.createTextNode(read_data.tax_name + "  :  " + read_data.tax_percent));

            tax_name.appendChild(span);
        }
    }
}

sales_read_tax();

function sales_default_taxes() {
    var sub_total_amount = document.getElementById("sales-taxes-amount");

    for (var i = 0; i < localStorage.length; i++) {
        var all_key = localStorage.key(i);
        if (all_key.match("ptax")) {
            var span = document.createElement("span");
            span.className = "sales-taxes";
            span.appendChild(document.createTextNode("00.00"));
            sub_total_amount.appendChild(span);
        }
    }
}

sales_default_taxes();

function sales_calculate_tax() {
    var sub_total_amount = document.getElementById("sales-taxes-amount");

    var subtotal = document.getElementsByClassName("sales-amount");
    var subtotal_amount = 0;
    var total_tax = 0;

    for (var i = 0; i < subtotal.length; i++) {
        var value = parseFloat(subtotal[i].value) || 0;
        subtotal_amount += value;
    }

    sub_total_amount.innerHTML = ""; // Clear previous content

    for (var j = 0; j < localStorage.length; j++) {
        var allkey = localStorage.key(j);
        if (allkey.match("ptax")) {
            var key_data = localStorage.getItem(allkey);
            var read_data = JSON.parse(key_data);
            var only_tax = parseFloat(read_data.tax_percent.replace("%", " ")) || 0;
            var subtotal_tax = subtotal_amount * (only_tax / 100);
            total_tax += subtotal_tax;

            var span = document.createElement("span");
            span.className = "fa fa-rupee sales-taxes";
            span.style.display = "block";
            sub_total_amount.appendChild(span);
            span.appendChild(document.createTextNode(" " + subtotal_tax.toFixed(2)));
        }
    }

    sales_calculate_total(subtotal_amount, total_tax);
}

function sales_calculate_total(subtotal_amount, total_tax) {
    var grand_total_field = document.getElementById("sales-grand-total");

    var subtotal = parseFloat(subtotal_amount);
    var total_tax_amount = parseFloat(total_tax);
    var grand_total = subtotal + total_tax_amount;
    grand_total_field.innerHTML = grand_total.toFixed(2);

    sales_paid(grand_total);
}

function sales_paid(grand_total) {
    var paid_input = document.getElementById("sales-voucher-paid");
    var balance_field = document.getElementById("sales-balance");

    balance_field.innerHTML = "0";
    paid_input.onfocus = function () {
        paid_input.value = "";
        paid_input.oninput = function () {
            var paid_value = Number(document.getElementById("sales-voucher-paid").value);
            var balance = grand_total - paid_value;
            balance_field.innerHTML = balance.toFixed(2);
        };
    };
}

sales_paid();

var sales_submit_btn = document.getElementById("sales-voucher-submit");
sales_submit_btn.onclick = function () {
    store_sales_voucher()
}
function store_sales_voucher() {
    var v_num = document.getElementById("sales-number").innerHTML;
    var v_date = document.getElementById("sales-voucher-date").innerHTML;
    var v_partyname = document.getElementById("sales-input").value;

    var store_item = [];
    var store_qty = [];
    var store_rate = [];
    var store_per = [];
    var store_amount = [];
    var store_tax = [];

    var item_input = document.getElementsByClassName("sales-item");
    var qty_input = document.getElementsByClassName("sales-qty");
    var rate_input = document.getElementsByClassName("sales-rate");
    var per_input = document.getElementsByClassName("sales-per");
    var amount_input = document.getElementsByClassName("sales-amount");

    for (var i = 0; i < item_input.length; i++) {
        store_item[i] = item_input[i].value;
    }

    for (var i = 0; i < qty_input.length; i++) {
        store_qty[i] = qty_input[i].value;
    }

    for (var i = 0; i < rate_input.length; i++) {
        store_rate[i] = rate_input[i].value;
    }

    for (var i = 0; i < per_input.length; i++) {
        store_per[i] = per_input[i].value;
    }

    for (var i = 0; i < amount_input.length; i++) {
        store_amount[i] = amount_input[i].value;
    }

    var customer_name = document.getElementById("sales-customer-name").value;
    var customer_phone = document.getElementById("sales-customer-phone").value;
    var customer_address = document.getElementById("sales-customer-address").value;

    var v_subtotal = document.getElementById("sales-subtotal").innerHTML;

    var taxes_amount = document.getElementById("sales-taxes-amount");
    var tax_spans = taxes_amount.getElementsByTagName("span");
    for (var j = 0; j < tax_spans.length; j++) {
        store_tax[j] = tax_spans[j].innerHTML;
    }

    var v_total = document.getElementById("sales-grand-total").innerHTML;
    var v_paid = document.getElementById("sales-voucher-paid").value;
    var v_dues = document.getElementById("sales-balance").innerHTML;

    var voucher_details = {
        voucher_no: "sales_voucher_" + v_num,
        voucher_date: v_date,
        account_name: v_partyname,
        store_item: store_item,
        store_qty: store_qty,
        store_rate: store_rate,
        store_per: store_per,
        store_amount: store_amount,
        store_s_name: customer_name,
        store_s_phone: customer_phone,
        store_s_address: customer_address,
        subtotal: v_subtotal,
        store_tax: store_tax,
        store_total: v_total,
        store_paid: v_paid,
        store_dues: v_dues
    };

    var sales_data = JSON.stringify(voucher_details);

    var notice = document.getElementById("sales-notice-purchase");

    if (v_partyname !== "") {
        if (v_total !== "") {
            if (v_paid !== "0") {
                if (customer_name !== "") {
                    localStorage.setItem("sales_voucher_" + v_num, sales_data);
                    notice.innerHTML = "Voucher Saved. Click to Generate Pdf <button onclick='sales_print()'>Generate PDF</button>";
                    location.reload();
                } else {
                    notice.innerHTML = "Please Fill The Supplier Field";
                }
            } else {
                notice.innerHTML = "Please Fill The Paid Amount";
            }
        } else {
            notice.innerHTML = "Total is Empty";
        }
    } else {
        notice.innerHTML = "Party Name is Empty";
    }

    setTimeout(function () {
        notice.innerHTML = "";
    }, 1500);
};

function move_to_sales_supplier() {
    var sales_customer_name = document.getElementById("sales-customer-name");
    window.onkeyup = function (event) {
        if (event.shiftKey && event.keyCode == 83) {  // shift + s
            sales_customer_name.click();
            sales_customer_name.focus();
        }
    }
}

move_to_sales_supplier();

function shiftSalesFocus() {
    var sales_customer_name = document.getElementById("sales-customer-name");
    var sales_customer_address = document.getElementById("sales-customer-address");
    var sales_customer_phone = document.getElementById("sales-customer-phone");
    var sales_v_paid = document.getElementById("sales-voucher-paid");
    var sales_submit_btn = document.getElementById("sales-voucher-submit");

    function jump_sales_next(event, next_input) {
        if (event.keyCode === 13) {
            event.preventDefault();
            next_input.click();
            next_input.focus();
        }
    }

    sales_customer_name.onkeyup = function (event) {
        jump_sales_next(event, sales_customer_phone);
    }

    sales_customer_phone.onkeydown = function (event) {
        jump_sales_next(event, sales_customer_address);
    }

    sales_customer_address.onkeydown = function (event) {
        jump_sales_next(event, sales_v_paid);
    }

    sales_v_paid.onkeydown = function (event) {
        if (event.keyCode === 13) {
            var per = window.confirm("Do you want to save Voucher?");
            if (per) {
                sales_submit_btn.click();
            }
        }
    }
}

shiftSalesFocus();


function current_sales_balance() {
    var sales_balance = document.getElementById("sales-purchase-balance");
    var i, balance = 0;
    for (i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.includes("sales_voucher")) {
            var key_data = localStorage.getItem(key);
            var read_data = JSON.parse(key_data);
            balance += parseFloat(read_data.store_total);
        }
    }
    sales_balance.innerHTML = balance + "  Cr";
}

current_sales_balance();

function search_voucher() {
    var search = document.getElementById("sales-search");
    var notice = document.getElementById("find-notice");

    var v_num = document.getElementById("sales-number");
    var v_date = document.getElementById("sales-voucher-date");
    var v_partyname = document.getElementById("sales-input");
    var item_inputs = document.getElementsByClassName("sales-item");
    var qty_inputs = document.getElementsByClassName("sales-qty");
    var rate_inputs = document.getElementsByClassName("sales-rate");
    var per_inputs = document.getElementsByClassName("sales-per");
    var amount_inputs = document.getElementsByClassName("sales-amount");
    var customer_name = document.getElementById("sales-customer-name");
    var customer_phone = document.getElementById("sales-customer-phone");
    var customer_address = document.getElementById("sales-customer-address");
    var v_paid = document.getElementById("sales-voucher-paid");
    var v_dues = document.getElementById("sales-balance");

    search.onkeyup = function (event) {
        if (event.keyCode == 13) {
            var voucher_found = false;

            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                if (key.includes("sales_voucher_" + search.value)) {
                    var key_data = localStorage.getItem(key);
                    var data = JSON.parse(key_data);
                    var voucher_number = data.voucher_no;

                    if (voucher_number == "sales_voucher_" + search.value) {
                        voucher_found = true;



                        // Display delete icon and handle deletion
                        var dlt_icon = document.getElementById("sales-voucher-delete");
                        dlt_icon.style.display = "block";
                        dlt_icon.onclick = function () {
                            var consent = window.confirm("Do You Want to delete the Voucher?");
                            if (consent) {
                                localStorage.removeItem(voucher_number);
                                location.reload();
                            }
                        };

                        // Display notice of voucher found
                        setInterval(function () {
                            notice.innerHTML = 'Found ' + voucher_number;
                            notice.style.color = "black";
                        }, 100);

                        // Update voucher details in UI
                        v_num.innerHTML = search.value;
                        v_date.innerHTML = data.voucher_date;
                        v_partyname.value = data.account_name;

                        for (var j = 0; j < data.store_item.length; j++) {
                            sales_add_item(); //  add_item function adds a new row
                            item_inputs[j].value = data.store_item[j];
                            item_inputs[j].disabled = false;
                            rate_inputs[j].value = data.store_rate[j];
                            rate_inputs[j].disabled = false;
                            qty_inputs[j].value = data.store_qty[j];
                            qty_inputs[j].disabled = false;
                            per_inputs[j].value = data.store_per[j];
                            amount_inputs[j].value = data.store_amount[j];
                        }

                        customer_name.value = data.store_s_name;
                        customer_phone.value = data.store_s_phone;
                        customer_address.value = data.store_s_address;

                        sales_calculate_tax();
                        sales_subtotal();

                        v_paid.value = data.store_paid;
                        v_dues.innerHTML = data.store_dues;

                        // Update submit button behavior
                        var submit_btn = document.getElementById("sales-voucher-submit");
                        submit_btn.onclick = function () {
                            var notice = document.getElementById("sales-notice-purchase");
                            notice.innerHTML = "Voucher Edited And Saved. Click to Generate Pdf <button onclick='print()'>Generate pdf</button>";
                            store_sales_voucher();

                            setTimeout(function () {
                                location.reload();
                            }, 2500);
                        };
                    }
                    else {
                        alert("Error in voucher");
                    }
                }
            }

            if (!voucher_found) {
                notice.innerHTML = "No Voucher data Found";
            }
        }
    };
}

search_voucher();

// show stocks 
function showstock() {
    var item_input = document.getElementsByClassName("sales-item");

    var i, j, show_sug_items = [];
    var stock_hint = document.createElement("div");
    stock_hint.id = "stock-hint";
    for (i = 0; i < item_input.length; i++) {
        item_input[i].onkeydown = function () {

            // dynamic div 
            var current_tr = this.parentElement;
            current_tr.style.display = "relative";
            current_tr.append(stock_hint);

            this.oninput = function (event) {
                var current_input = event.target;

                stock_hint.style.display = "block"
                //store items in sug array
                for (j = 0; j < localStorage.length; j++) {
                    var allkeys = localStorage.key(j);
                    if (allkeys.match("purchase_voucher")) {
                        var key_data = localStorage.getItem(allkeys);
                        var data = JSON.parse(key_data);
                        var item_length = data.store_item.length;

                        for (var k = 0; k < item_length; k++) {

                            if (!show_sug_items.includes(data.store_item[k])) {
                                show_sug_items.push(data.store_item[k]);
                                console.log("No double items found");
                            }
                            else {
                                console.log("double items found and Merged")
                            }
                        }

                    }
                    else {
                        console.log("No Purchase Acoount found")
                    }
                }

                // showing hints for item 
                stock_hint.innerHTML = "";
                for (var s = 0; s < show_sug_items.length; s++) {
                    if (show_sug_items[s].toUpperCase().indexOf(this.value.toUpperCase()) !== -1) {
                        var span = document.createElement("span");
                        span.className = "stock-sug-span"
                        stock_hint.appendChild(span);
                        span.append(document.createTextNode(show_sug_items[s]));

                    }
                }
                // onenter or click on hint coding 
                var hint_hover = document.getElementsByClassName("stock-sug-span");
                for (var s = 0; s < hint_hover.length; s++) {

                    hint_hover[s].onmouseover = function () {
                        this.style.backgroundColor = "#c9eece";
                        current_input.value = this.innerHTML;
                    }

                    hint_hover[s].onmouseout = function () {
                        this.style.backgroundColor = "inherit";

                    }

                    this.onkeydown = function (event) {
                        if (event.key === "Enter") {
                            var spans = stock_hint.getElementsByTagName("span");
                            this.value = spans[0].innerHTML;
                            stock_hint.style.display = "none";
                        }
                    }

                }
            }

        }
        item_input[i].addEventListener("blur", function () {
            stock_hint.style.display = "none"
        })
    }
}

