var
    l,
    r,
    pongTable,
    pongTableCoords,
    halfWidth = (screen.width/2),



    touchMove = function(event) {
        event.preventDefault();
        for (var i=0; i<event.targetTouches.length; i++) {
            var touch = event.targetTouches[i];
            var y = (touch.pageY/screen.height);
            console.log(touch, y, pongTableCoords);

            if (touch.pageX<halfWidth) {
                l.setAttribute("y", Math.max(0,Math.min(700,touch.pageY)));
            } else {
                r.setAttribute("y", Math.max(0,Math.min(700,touch.pageY)));
            }
        }
    },

    preventDefault = function(e) {
        e.preventDefault();
    },

    prepLeftBat = function() {
        l = document.querySelector("#lbat");
        r = document.querySelector("#rbat");
        pongTable = document.querySelector("#pongtable");
        pongTableCoords = pongTable.getBoundingClientRect();
        document.addEventListener('touchstart', touchMove, false);
        document.addEventListener('touchmove', touchMove, false);
        document.addEventListener('touchend', touchMove, false);
        // document.addEventListener('touchstart', preventDefault, false);
        // document.addEventListener('touchmove', preventDefault, false);
    };

window.addEventListener("load", prepLeftBat);
