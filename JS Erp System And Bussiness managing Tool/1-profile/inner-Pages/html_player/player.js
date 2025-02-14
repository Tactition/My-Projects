



function url() {
    if (sessionStorage.length <= 0) {
        document.getElementById("blocker").style.display = "none";
        document.body.innerHTML = "<h2>Illegal access</h2>";
    }

}
url();
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

// main functionality from here
// video upload 

var input = document.getElementById("input-file");
input.onchange = function () {
    var play_icon = document.getElementById("play-icon");
    var video = document.getElementById("video-player");
    var vidsrc = document.getElementById("video-src");
    var ytinput = document.getElementById("youtube-link");

    var url = URL.createObjectURL(input.files[0]);
    vidsrc.src = url;
    video.load();
    video.play();
    // video name
    var max_title = document.getElementById("player-title");
    var min_title = document.getElementById("mini-player-title");

    var name = input.files[0].name.split(".").shift();
    max_title.innerHTML=name;
    min_title.innerHTML = name;

    input.style.display = "none";
    ytinput.style.display = "none";

    play_icon.className="fa fa-pause";

}

var ytinput = document.getElementById("youtube-link");
ytinput.onchange = function () {
    var play_icon = document.getElementById("play-icon");
    var video = document.getElementById("video-player");
    var video_src = document.getElementById("video-src");

    var url = ytinput.value;
    alert(url)
    video_src.src = url;
    
    video.load();
    video.play();
    play_icon.className = "fa fa-pause";
    this.style.display = "none";
    input.style.display = "none";
}


var stop_icon = document.getElementById("stop-icon");
stop_icon.addEventListener('click', () => {
    var play_icon = document.getElementById("play-icon");
    var video = document.getElementById("video-player");
    video.pause();

    play_icon.className = "fa fa-play";
});

var repeat = document.getElementById("replay-icon");
repeat.onclick = function () {
    var play_icon = document.getElementById("play-icon");
    var video = document.getElementById("video-player");
    video.currentTime = 0;
    video.play();
    play_icon.className = "fa fa-pause";

}

var play_icon = document.getElementById("play-icon");
play_icon.addEventListener('click', function () {
    var video = document.getElementById("video-player");

    if (this.className == "fa fa-play") {
        this.setAttribute("class", "fa fa-pause");
        this.title = "pause";
        video.play();

    } else {
        this.className = "fa fa-play";
        this.title = "play"
        video.pause();

    }
});

// video prog coding

function progress_duration() {
    var video = document.getElementById("video-player");
    var progress = document.getElementById("progress");

    var current_duration = document.getElementById("current-duration");
    var total_duration = document.getElementById("total-duration");


    video.ontimeupdate = function () {
        var full_duration = video.duration;
        var now_duration = video.currentTime;
        var play_icon = document.getElementById("play-icon");

        var percent = now_duration / full_duration * 100;
        progress.style.width = percent + "%";
        progress.style.color = "red";

        current_duration.innerHTML = parseInt(now_duration / 60) + ":" + parseInt(now_duration % 60);
        total_duration.innerHTML = parseInt(full_duration / 60) + ":" + parseInt(full_duration % 60);

        video.onended = function () {
            if (full_duration == now_duration) {
                play_icon.className = "fa fa-play";
            }
            else {
                play_icon.className = "fa fa-pause";
            }
        }

    }

    if (current_duration == total_duration) {
        var play_icon = document.getElementById("play-icon");
    }

};


progress_duration();

var progress = document.querySelector(".cont-prog"); //progress main
progress.onclick = function (event) {
    var video = document.getElementById("video-player"); //video element
    var percent = event.offsetX / this.offsetWidth; // 420/2=210px =event click.. 210 is half and  video ful dur =421
    video.currentTime = percent * video.duration; //421 * 0.5 = 210s.
    //200/420 = 0.5 * 421s


}

var video = document.getElementById("video-player");
video.addEventListener("progress", function () {
    var loadprog = document.querySelector("#buffer-progress");
    var progress_per = document.querySelector("#progress-percent");
    var full_duration = video.duration;
    var loaded = this.buffered.end(0);
    var percent = (loaded / full_duration) * 100;
    // how much is loaded divided by how much is full duration and multiplied by 100 resturns the width in percents 
    // which is then seted in css
    loadprog.style.width = percent + "%";
    progress_per.innerHTML = parseInt(percent) + "%";
})




var full_screen = document.getElementById("fullscreen");
full_screen.addEventListener('click', function () {
    var video = document.getElementById("video-player");
    if (video.requestFullscreen) {
        video.requestFullscreen();
    }
    else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    }
    else if (mozRequestFullScreen) {
        video.mozRequestFullScreen();
    }
});

var volume_icon = document.getElementById("volume-icon");
volume_icon.addEventListener('click', function () {
    var volume_slider = document.getElementById("volume-slider");
    var video = document.getElementById("video-player");

    if (volume_slider.style.display == "none") {

        volume_slider.style.display = "block";

        volume_slider.oninput = function () {
            video.volume = this.value;

            if (volume_slider.value != 0) {
                volume_icon.className = "fa fa-volume-up";
                volume_icon.title = this.value * 100 + "%";
                //  volume 0.1 to `1 
                //0.5 * 100 = 50 

            } else {
                volume_icon.className = "fa fa-volume-off";
                volume_slider.title = this.value * 100 + "%";
            }
        }

    }
    else {
        volume_slider.style.display = "none";
    }
})

//download icon 

var download = document.getElementById("download-icon");
download.addEventListener('click', function () {
    var source = document.getElementById("video-src").src;
    let a = document.createElement("A")
    a.href = source;
    a.download = source;
    a.click();

})

// gear menu

var gear = document.querySelector('.setting-icon');
gear.addEventListener('click', function () {
    var menu = document.querySelector('.menu');
    var video = document.getElementById("video-player");
    var input = document.querySelector("#playback-slider");
    var show_playback = document.getElementById("playback");

    if (menu.style.display == "none") {
        menu.style.display = "block";
    }
    else {
        menu.style.display = "none";
    }


    input.oninput = function () {
        video.playbackRate = input.value;
        show_playback.innerHTML = input.value;
    }


    var reset = document.getElementById("reset");
    reset.addEventListener('click', function () {
        var video = document.getElementById("video-player");
        video.playbackRate = 1; // default is 1 for video player
        show_playback.innerHTML = 1;
        input.value = 1;
        show_playback.innerHTML = 1;
    });


});

var miniplayer_icon = document.getElementById("mini-icon");
miniplayer_icon.onclick = function () {
    var video = document.getElementById("video-player");
    var video_src = document.getElementById("video-src").src;
    var mini_player_div = document.querySelector(".mini-player");
    var mini_video = document.getElementById("mini-video");
    var mini_src = document.getElementById("mini-video-src");
    var play_icon = document.getElementById("play-icon");

    // mini shifter
    mini_player_div.style.display = "block";
    mini_player_div.style.height = "auto";

    video.pause();
    var mini_current_time = video.currentTime;
    var mini_after_time;

    mini_src.setAttribute("src", video_src);
    mini_video.load();
    mini_video.currentTime = mini_current_time;

    let vol = video.volume


    if (play_icon.className == "fa fa-pause") {
        mini_video.play();
        mini_video.onmouseover = function () {
            mini_video.controls = true;
        }
    } else {
        mini_video.pause();
        mini_video.onmouseover = function () {
            mini_video.controls = true;
            mini_video.volume = vol;
        }
    }
    mini_video.volume = vol

    //mini video
    var close_icon = document.getElementById("close-icon");
    close_icon.onclick = function close() {
        mini_after_time = mini_video.currentTime;
        mini_player_div.style.display = "none";
        mini_video.pause();
        video.currentTime = mini_after_time;

        if (play_icon.className == "fa fa-pause") {
            video.play()
            play_icon.className = "fa fa-pause";
        }
        else {
            play_icon.className = "fa fa-play";
            video.pause();

        }
    }

}


function titles() {
    var max_title = document.getElementById("player-title");
    var min_title = document.getElementById("mini-player-title");
    var video_src = document.getElementById("video-src")
    var mini_src = document.getElementById("mini-video-src");

    var title1 = video_src.getAttribute("src").split(/\/|\\/g).pop();
    max_title.innerHTML = title1;
    min_title.innerHTML = title1;
}

titles();

// container themes 
var cont_theme = document.getElementById("cont-theme");
cont_theme.onchange = function () {
    let head = document.querySelector(".top-header");
    let bottom = document.querySelector(".controls");
    const color = this.value;
    head.style.background = color;
    bottom.style.background = color;
    localStorage.setItem("theme", color);

}

// icons codieng
var icon_theme = document.getElementById("icon-theme");
icon_theme.addEventListener('change', function () {
    var colour = this.value;
    var iconElements = document.querySelectorAll('.controls i');
    iconElements.forEach(function (allicon) {
        allicon.style.color = colour
    })
    localStorage.setItem("icon-theme", colour);


})


var text = document.getElementById("text-theme");
text.addEventListener('change', function () {
    var tcolor = this.value;
    let elements = document.querySelectorAll("#player-title, .cont-time, .mini-player, .playlist")
    localStorage.setItem('text-theme', tcolor);
    for (let i = 0; i <= elements.length; i++) {
        elements[i].style.color = tcolor;
    };

})

function activeColor() {
    let color = localStorage.getItem("theme");
    let colour = localStorage.getItem("icon-theme");
    var tcolor = localStorage.getItem("text-theme");

    let head = document.querySelector(".top-header");
    let bottom = document.querySelector(".controls");

    head.style.background = color;
    bottom.style.background = color;

    var iconElements = document.querySelectorAll('.controls i');
    iconElements.forEach(function (allicon) {
        allicon.style.color = colour
    })

    cont_theme.value = color
    icon_theme.value = colour
    text.value = tcolor;

    let elements = document.querySelectorAll("#player-title, .cont-time, .mini-player, .playlist");

    for (let i = 0; i < elements.length; i++) {
        elements[i].style.color = tcolor;
    }

}
activeColor();

var button = document.querySelector("#reset-theme");
button.onclick = function () {
    localStorage.removeItem("theme");
    localStorage.removeItem("icon-theme");
    localStorage.removeItem("text-theme");
    location.reload();
}

function controller() {
    var video = document.getElementById("video-player");
    if (video.paused) {
        video.play();
        play_icon.className = "fa fa-pause";
    }
    else {
        video.pause();
        play_icon.className = "fa fa-play";
    }
}

addEventListener("keydown", function (event) {
    var video = document.getElementById("video-player");
    if (event.keyCode == "32") {
        controller();
    }
})




