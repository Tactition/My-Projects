submit_btn.onclick = function store_voucher() {
    var v_num = document.getElementById("voucher-number").innerHTML;
    var v_date = document.getElementById("voucher-date").innerHTML;
    var v_partyname = document.getElementById("purchase-input").value;

    var i, store_item = [], store_qty = [], store_rate = [], store_sellprice = [], store_per, store_amount = [], store_tax = [];

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

    store_per = per_input.value;

    for (i = 0; i < amount_input.length; i++) {
        store_amount[i] = amount_input[i].value;
    }


    var suplier_name = document.getElementById("suplier-name").value;
    var suplier_phone = document.getElementById("suplier-phone").value;
    var suplier_address = document.getElementById("suplier-address").value;

    var v_subtotal = document.getElementById("subtotal").innerHTML;

    var taxes_amount = document.getElementById("taxes-amount");
    var tax_spans = taxes_amount.getElementsByTagName("span");
    var j;
    for (j = 0; j < tax_spans.length; j++) {
        store_tax[j] = tax_spans[j].innerHTML;
    }

    var v_total = document.getElementById("grand-total").innerHTML;
    var v_paid = document.getElementById("voucher-paid").value;
    var v_dues = document.getElementById("balance").innerHTML;


    var voucher_details = {
        voucher_no: v_num,
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
    };

    var purchase_data = JSON.stringify(voucher_details);
    var last_voucher_number = 0;
    var i;
    for (i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.includes("purchase_voucher")) {
            var v_num = key.replace("purchase_voucher_", " ");
            last_voucher_number = Math.max(last_voucher_number, v_num);
        }
    }

    if (v_partyname != "") {

        if (v_total != "") {

            if (v_paid != 0) {

                if (suplier_name != "") {
                    // localStorage.setItem("purchase_voucher_" + (last_voucher_number + 1), purchase_data);
                    // location.reload();
                }
                else {
                    alert("plese fil suplier");
                }

            }
            else {
                alert("Please Fill The paid");
            }

        }
        else {
            alert("total is empty");
        }

    }
    else {
        alert("party name is empty");
    }


};
