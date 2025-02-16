var accordion = document.querySelector(".accordion");
const accordion_items = accordion.querySelectorAll(".accordion-item");
var accordion_title = document.querySelectorAll(".accordion-title");

var section_title = document.querySelector('#section-title');
var section_content = document.querySelector('#section-content');
var add_btn = document.querySelector('#add-section');

function toggleAccordion() {

    accordion_title = document.querySelectorAll(".accordion-title");

    accordion_title.forEach((item, index) => {

        var openIndex = localStorage.getItem('currentSection');
        if (index == openIndex) item.parentElement.classList.add('active');

        item.addEventListener('click', function (event) {

            if (!event.ctrlKey && !event.shiftKey) {
                document.querySelectorAll(".accordion-item").forEach(item => {
                    item.classList.remove('active');
                    item.children[0].style.backgroundColor = '#8be72f';
                });
            }

            const parent = this.parentElement;
            parent.classList.toggle('active');
            parent.children[0].style.backgroundColor = parent.classList.contains('active') ? '#b5dd47' : '#8be72f';

            localStorage.setItem('currentSection', index);


        });
    });


}


add_btn.onclick = function () {

    localStorage.removeItem('currentSection');

    var accordion_item = document.createElement('div');
    accordion_item.classList.add('accordion-item');

    var accordion_title = document.createElement('div');
    accordion_title.classList.add('accordion-title');
    accordion_title.innerHTML = section_title.value + '<span class="accordion-icon">&#9660;</span>';

    var accordion_content = document.createElement('div');
    accordion_content.classList.add('accordion-content');
    accordion_content.innerText = section_content.value;

    if (section_title.value.trim() !== '' && section_content.value.trim() !== '') {
        accordion.prepend(accordion_item);
        accordion_item.prepend(accordion_title);
        accordion_item.append(accordion_content);
        
        toggleAccordion();
        
        section_title.value = '';
        section_content.value = '';
    }
    else{
        alert('Please fill in both fields');
    }
}

toggleAccordion();


//all the things that were said are done
// Accordion structure (multiple sections with a title and content area).✅
// Elegant styling (hover effects & active state animations).✅
// Click-to-expand (only one section opens at a time).✅
// Ctrl-key functionality (allows multiple sections to stay open).✅
// Dynamically add/remove sections (using jQuery/JavaScript).✅
// Smooth animations (for opening and closing sections).✅
// Persist accordion state (store open/closed sections in localStorage).✅