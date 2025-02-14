const menuToggle = document.querySelector('#side-btn');
const menuArea = document.querySelector('.menu-area');

menuToggle.addEventListener('click', () => {
  menuArea.classList.toggle('active');
});

//ist menuu code for every thing✅
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

function manage_unit() {
    var selected_unit = document.getElementById("select-unit");
    var delete_btn = document.getElementById("delete-unit");

    var i;
    for (i = 0; i < localStorage.length; i++) {
        var all_keys = localStorage.key(i)
        if (all_keys.includes("unit_")) {
            selected_unit.style.display = "inline";
            var option = document.createElement('option');
            selected_unit.append(option);
            option.appendChild(document.createTextNode(all_keys))
        }
    }
    selected_unit.onchange = function () {
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
    delete_btn.onclick = function () {
        localStorage.removeItem(selected_unit.value);
        var notice = document.getElementById("notice-unit");
        notice.innerHTML = "Successfully Deleted &nbsp;" + selected_unit.value;
        setInterval(function () {
            location.reload();
        }, 1000);
    }

}
manage_unit();

function ist_close() {
    ist_wrapper.style.display = "none";
}

// second menu code for everything✅
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

                var sales_radio = document.getElementById("sales-tax");
                var purchase_radio = document.getElementById("purchase-tax");

                if (sales_radio.checked) {
                    var tax_data = JSON.stringify(tax_data)
                    localStorage.setItem("stax_" + tax_name, tax_data);
                    notice.innerHTML = "Sales Tax details saved"
                }
                else if (purchase_radio.checked) {
                    var tax_data = JSON.stringify(tax_data)
                    localStorage.setItem("ptax_" + tax_name, tax_data);
                    notice.innerHTML = "Purchase Tax details saved"
                }

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

function sec_close() {
    sec_wrapper.style.display = "none";
}

// last button close company 

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

// back button
document.addEventListener("keyup", function (event) {
    if (event.ctrlKey && event.code === "Backspace" || event.ctrlKey && event.keyCode === 8) {
        window.location.href = "../bussiness.html";
    }
});

// ledger on click

var ledger_btn = document.getElementById("fifth-menu");
ledger_btn.addEventListener("click", function () {
    window.location.href = "pages/ledger.html";
});

function default_ledgers() {
    var cash = localStorage.getItem("cash_ledger");
    var profit_loss = localStorage.getItem("profit_loss_ledger");

    if (cash == null && profit_loss == null) {
        var cash_ledger = {
            ledger_name: "Cash",
            group: "Cash In Hand",
            balance: " ",
            mode: " "
        }
        var cash_store = JSON.stringify(cash_ledger)
        localStorage.setItem("cash_ledger", cash_store)

        var profit_loss_ledger = {
            ledger_name: "Profit & Loss A/c",
            group: "Profit & Loss A/c",
            balance: " ",
            mode: " "
        }
        var profit_loss_store = JSON.stringify(profit_loss_ledger)
        localStorage.setItem("profit_loss_ledger", profit_loss_store)
        console.log("Ledgers Creatied ")
    }
    else {
        console.log("Ledgers Already Stored")
    }
}

default_ledgers()

// voucher 

var voucher_btn = document.getElementById("third-menu");
voucher_btn.onclick = function () {
    window.location.href = "pages/voucher.html";
}




