var prep = function() {

    var
        speedup = 0.00025,
        xa = 0,
        ya = 0,
        l = document.querySelector("#lbat"),
        r = document.querySelector("#rbat"),
        lscore = document.querySelector("#lscore"),
        rscore = document.querySelector("#rscore"),
        ball = document.querySelector("#ball"),
        scores,

        calculateSpeedup = function() {
            xa+=xa*speedup;
            ya+=ya*speedup;
        }

        serveBall = function() {
            ball.setAttribute("x", 790);
            ball.setAttribute("y", 440);
            randomiseTrajectory(10, 20);
        },


        randomiseTrajectory = function(min, max) {
            xa=0;
            ya=0;
            while( Math.abs(xa+ya) <= min) {
                xa=Math.random()*max-(max/2);
                ya=Math.random()*max-(max/2);
            }
        },

        randomise = function(max) {
            return Math.random()*max-(max/2);
        },

        updateScores = function() {
            lscore.textContent = scores.left;
            rscore.textContent = scores.right;
        },

        resetScores = function() {
            scores = {"left": 0, "right": 0};
            updateScores();
        },


        score = function(what) {
            document.dispatchEvent(
                new CustomEvent("score", {"detail":{"bat":"tang"}})
            );

            scores[what.who]+=what.val;
            updateScores();
            serveBall();
        },

        moveBall = function() {
            ball.setAttribute("x", ball.x.baseVal.value + xa);
            ball.setAttribute("y", ball.y.baseVal.value + ya);
        },

        checkCollisions = function() {
            //screen top and bottom
            if ((ball.y.baseVal.value <= 10) || (ball.y.baseVal.value > 880)) {
                ya=-ya;
            }

            //screen left and right
            if (ball.x.baseVal.value < 0) {
                score({"who": "right","val": 1});
            }

            if (ball.x.baseVal.value > 1580) {
                score({"who": "left", "val": 1});
            }

            //screen left bat
            if (
                (ball.x.baseVal.value <= 50) &&
                (ball.y.baseVal.value > l.y.baseVal.value) &&
                (ball.y.baseVal.value < (l.y.baseVal.value + l.height.baseVal.value))
            ) {
                xa=-xa;
                xa+=randomise(4);
                ya+=randomise(4);
                moveBall();
                document.dispatchEvent(
                    new CustomEvent("collision", {"detail":{"bat":"ting"}})
                );
            }

            //screen right bat
            if (
                (ball.x.baseVal.value >= 1530) &&
                (ball.y.baseVal.value > r.y.baseVal.value) &&
                (ball.y.baseVal.value < (r.y.baseVal.value + r.height.baseVal.value))
            ) {
                xa=-xa;
                xa+=randomise(4);
                ya+=randomise(4);
                moveBall();
                document.dispatchEvent(
                    new CustomEvent("collision", {"detail":{"bat":"tong"}})
                );
            }
        },

        step = function() {
            calculateSpeedup();
            moveBall();
            checkCollisions();

            // allows third party code to listen for each step and update the
            // game - useful for CPU players
            document.dispatchEvent( new CustomEvent("pingpongstep") );

            window.requestAnimationFrame(step);
        };

    randomiseTrajectory(10, 20);

    resetScores();

    step();

}


svgDebug = function(msg) {
    document.getElementById("debug").textContent = msg;
},


window.addEventListener("load", prep);
