var sonar,
    pongAud = function(e) {
        document.getElementById(e.detail.bat).play();
    },

    setup = function() {
        document.addEventListener("collision", pongAud);
        document.addEventListener("score", pongAud);
    };

window.addEventListener("load", setup);
