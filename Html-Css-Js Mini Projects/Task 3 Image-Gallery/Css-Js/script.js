
$(document).ready(function () {

    $(".filter-btn").on("click", function () {
        $(".filter-btn").removeClass("active");

        $(this).addClass("active");

        let category = $(this).data("category");

        $(".gallery-item").each(function () {
            if ($(this).hasClass(category)) {
                $(this).show(500);
            } else {
                $(this).hide(500);
            }
        });

    });

    // light box effect
    $(".gallery-item").on("click", function () {
        let image = $(this).attr("src");
        $(".lightbox-img").attr("src", image);
        $(".lightbox").fadeIn();
    });

    $(".close, .lightbox .lightbox-img").on("click", function () {
        $(".lightbox").fadeOut();
    });

    $(".lightbox").on("click", function (event) {
        event.stopPropagation(); //here i amd rukawing the click bubbling
    });

});




function refresh_Index() {
    // chat gpt ka code
    // Initialize the current index to 0
    var currentIndex = 0;
    var gallery = document.querySelector('.gallery');
    var galleryItems = gallery.querySelectorAll('.gallery-item');
    var totalItems = galleryItems.length;
    var nextBtn = document.querySelector('.next');
    var prevBtn = document.querySelector('.prev');
    var lightboxImg = document.querySelector('.lightbox-img');
    nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % totalItems;   // yaha mai remainder dunduga taki last image ke baad first image aaye gii and if last nhi hai to next image aaye 
        var nextImage = galleryItems[currentIndex].getAttribute('src');
        lightboxImg.setAttribute('src', nextImage);
    });
    prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        var prevImage = galleryItems[currentIndex].getAttribute('src');
        lightboxImg.setAttribute('src', prevImage);
    });
}
refresh_Index();


// Build a grid-based gallery using HTML & CSS to display images in a responsive layout ✅
// Include a header with filter buttons (e.g., "All", "Nature", "Cities") ✅
// Use jQuery to dynamically show/hide images based on the selected filter ✅
// Add a hover effect on each image to display a caption overlay ✅
// Include a "Load More" button that loads additional images without reloading the page ❌
// Implement a lightbox effect when clicking an image, showing a larger view with navigation buttons (Next/Previous) ✅
