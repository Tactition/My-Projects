document.addEventListener("keyup", function (event) {
    if (event.ctrlKey && event.code === "Backspace" || event.ctrlKey && event.keyCode === 8) {
        window.location.href = "../business-inventory.html";
    }
});

const menuToggle = document.querySelector('#side-btn');
const menuArea = document.querySelector('#side-bar');

menuToggle.addEventListener('click', () => {
  menuArea.classList.toggle('active');
});

function tabs() {
    var tab_list = document.getElementById("tab-list");
    var tab_button = tab_list.getElementsByTagName('button');
    var vouchers = document.getElementsByClassName("vouchers");

    for (var i = 0; i < tab_button.length; i++) {
        tab_button[i].onclick = function () {

            for (var h = 0; h < vouchers.length; h++) {
                vouchers[h].style.display = 'none';
                tab_button[h].style.color = "black";
            }
            var button_value = this.value;
            var voucher_id = document.getElementById(button_value);
            voucher_id.style.display = "block";
            this.style.color = "blue";

            document.getElementsByTagName("input")[1].focus();

        }
    }
    tab_button[0].click();
    document.getElementsByTagName("input")[1].focus();


    // shrt cuts

    document.onkeyup = function (event) {
        if (event.altKey && event.keyCode == 80) {
            tab_button[1].click();
            document.getElementsByTagName("input")[0].focus();  // alt + S
        }
        else if (event.altKey && event.keyCode == 83) {
            tab_button[0].click();
            document.getElementsByTagName("input")[0].focus();  // alt + p
        }
        
    }

}
tabs();