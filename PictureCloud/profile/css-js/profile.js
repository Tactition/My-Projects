$(document).ready(function () {

    $("#upload-icon").click(function () {

        var input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*,video/*";
        input.click();

        input.onchange = function () {

            var data = new FormData();
            data.append("data", this.files[0]);

            $.ajax({
                type: "POST",
                url: "php/upload.php",
                data: data,
                processData: false,
                contentType: false,
                cache: false,

                xhr: function () {
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = Math.round((evt.loaded / evt.total) * 100);
                            $("#upload-progress").css("width", percentComplete + "%");
                            $("#uploaded-notice").html("upload in Progress  " + percentComplete + "%")

                            if (percentComplete == 100) {
                                $("#uploaded-notice").html("uploaded Succesfully")
                            }

                            // You can update a progress bar or other UI element here
                        }
                    }, false);
                    return xhr;
                },

                success: function (response) {
                    $("#noticeData").html(response);
                },
                error: function () {
                    $("#noticeData").html("Error in uploading");
                }
            });

        }
    });


    //  icon click on galery page

    $(".download-icon").each(function () {
        $(this).click(function () {
            var download_location = $(this).attr("data-location");
            var download_name = $(this).attr("data-name");
            var a = document.createElement("a");
            a.href = download_location;
            a.download = download_name;
            a.click();
            // alert(download_location)
        });
    });

    $(".delete-icon").each(function () {
        $(this).click(function () {

            var main_div = $(this).parent().parent().parent().parent();
            var image_path = $(this).attr("data-location");

            $.ajax({
                type: "POST",
                url: "php/delete.php",

                data: {
                    image_path: image_path
                },
                success: function (response) {
                    $("#noticeData").html(response);
                    main_div.css("display", "none")
                }
            })
        })
    });


});



// modal call on click 

$(".gallery-img").each(function () {
    $(this).click(function () {
        var src_value = $(this).attr("src")
        $("#modal").modal();
        var img = $("<img>").css("width", "100%").attr("src", src_value);
        $("#modal-body").html(img);
    })
})


// payment gatway

$(".purchase-btn").each(function () {
    $(this).click(function () {
        var plan = $(this).attr("plan");
        var price = $(this).attr("amount");
        var storage = $(this).attr("storage")
        location.href = "php/payment.php?amount=" + price + "&plan=" + plan +"&storage="+storage;
    })
})