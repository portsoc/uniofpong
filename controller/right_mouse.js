var
    r,
    spinOff = 0,
    spin = 0,

    updateRightBatPosition = function(e) {
        r.setAttribute("y", Math.max(0,Math.min(700,e.pageY)) );
        spin = (spinOff-e.pageY)/20;
        spinOff = e.pageY;
    },

    prepRightBat = function() {
        r = document.querySelector("#rbat");
        document.addEventListener("mousemove", updateRightBatPosition);
    };

window.addEventListener("load", prepRightBat);
