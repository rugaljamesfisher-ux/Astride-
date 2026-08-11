/* =========================================
   MON ASTRE
   Scene Manager
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        /* =================================
           Elements
           ================================= */

        const canvas =
            document.getElementById(
                "starfield"
            );

        const asteroid =
            document.getElementById(
                "asteroid"
            );

        const titleContainer =
            document.getElementById(
                "title-container"
            );

        const soundScene =
            document.getElementById(
                "scene-sound"
            );

        const soundYes =
            document.getElementById(
                "sound-yes"
            );

        const soundNo =
            document.getElementById(
                "sound-no"
            );


        /* =================================
           Safety check
           ================================= */

        if (
            !canvas ||
            !asteroid ||
            !titleContainer ||
            !soundScene ||
            !soundYes ||
            !soundNo
        ) {

            console.error(
                "MON ASTRE: Required elements not found."
            );

            return;

        }


        const ctx =
            canvas.getContext("2d");


        /* =================================
           Scene state
           ================================= */

        let currentScene = 1;

        let soundEnabled = false;

        let stars = [];


        /* =================================
           Scene manager
           ================================= */

        function goToScene(sceneNumber) {

            const scenes =
                document.querySelectorAll(
                    ".scene"
                );


            scenes.forEach(
                scene => {

                    scene.classList.remove(
                        "active"
                    );

                }
            );


            const target =
                document.getElementById(
                    `scene-${
                        sceneNumber === 1
                            ? "void"
                            : sceneNumber === 2
                                ? "sound"
                                : "beginning"
                    }`
                );


            if (!target) {

                console.warn(
                    "Scene not found:",
                    sceneNumber
                );

                return;

            }


            target.classList.add(
                "active"
            );


            currentScene =
                sceneNumber;

        }


        /* =================================
           Stars
           ================================= */

        function resizeCanvas() {

            const pixelRatio =
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                );


            canvas.width =
                window.innerWidth *
                pixelRatio;


            canvas.height =
                window.innerHeight *
                pixelRatio;


            canvas.style.width =
                `${window.innerWidth}px`;


            canvas.style.height =
                `${window.innerHeight}px`;


            ctx.setTransform(
                pixelRatio,
                0,
                0,
                pixelRatio,
                0,
                0
            );


            createStars();

        }


        function createStars() {

            stars = [];


            const area =
                window.innerWidth *
                window.innerHeight;


            const starCount =
                Math.min(
                    Math.floor(
                        area / 7000
                    ),
                    250
                );


            for (
                let i = 0;
                i < starCount;
                i++
            ) {

                const depth =
                    Math.random();


                stars.push({

                    x:
                        Math.random() *
                        window.innerWidth,

                    y:
                        Math.random() *
                        window.innerHeight,

                    radius:
                        depth *
                        1.2 +
                        0.15,

                    opacity:
                        depth *
                        0.65 +
                        0.15,

                    twinkleSpeed:
                        Math.random() *
                        0.0015 +
                        0.0005,

                    phase:
                        Math.random() *
                        Math.PI *
                        2

                });

            }

        }


        function drawStars(time) {

            ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );


            for (
                const star of stars
            ) {

                const twinkle =
                    Math.sin(
                        time *
                        star.twinkleSpeed +
                        star.phase
                    );


                const opacity =
                    Math.max(
                        0.05,
                        star.opacity +
                        twinkle *
                        0.12
                    );


                ctx.beginPath();


                ctx.arc(
                    star.x,
                    star.y,
                    star.radius,
                    0,
                    Math.PI * 2
                );


                ctx.fillStyle =
                    `rgba(
                        255,
                        255,
                        255,
                        ${opacity}
                    )`;


                ctx.fill();

            }


            requestAnimationFrame(
                drawStars
            );

        }


        /* =================================
           Scene 01
           ================================= */

        function startOpening() {

            setTimeout(
                () => {

                    canvas.style.opacity =
                        "1";

                },
                700
            );


            setTimeout(
                () => {

                    asteroid.classList.add(
                        "fly"
                    );

                },
                3200
            );


            setTimeout(
                () => {

                    titleContainer.classList.add(
                        "visible"
                    );

                },
                7200
            );


            /*
                Move to Scene 02
                after the opening settles.
            */

            setTimeout(
                () => {

                    goToScene(2);

                },
                12500
            );

        }


        /* =================================
           Sound choice
           ================================= */

        soundYes.addEventListener(
            "click",
            () => {

                soundEnabled = true;

                console.log(
                    "Sound enabled."
                );

                continueExperience();

            }
        );


        soundNo.addEventListener(
            "click",
            () => {

                soundEnabled = false;

                console.log(
                    "Sound disabled."
                );

                continueExperience();

            }
        );


        /* =================================
           Continue
           ================================= */

        function continueExperience() {

            console.log(
                "Sound:",
                soundEnabled
                    ? "ON"
                    : "OFF"
            );


            /*
                Scene 03 will replace
                this placeholder later.
            */

            setTimeout(
                () => {

                    goToScene(3);

                },
                1000
            );

        }


        /* =================================
           Resize
           ================================= */

        window.addEventListener(
            "resize",
            resizeCanvas
        );


        /* =================================
           Start
           ================================= */

        resizeCanvas();

        requestAnimationFrame(
            drawStars
        );

        startOpening();

    }
);