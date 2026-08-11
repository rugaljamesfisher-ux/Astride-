/* =========================================
   MON ASTRE
   Scene 03 — The Beginning
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const canvas =
            document.getElementById(
                "orbit-canvas"
            );

        if (!canvas) {
            console.error(
                "Scene 03 canvas not found."
            );
            return;
        }

        const ctx =
            canvas.getContext("2d");


        /* =================================
           State
           ================================= */

        let width = 0;
        let height = 0;

        let centerX = 0;
        let centerY = 0;

        let animationTime = 0;


        /* =================================
           Celestial bodies
           ================================= */

        const astre = {

            angle: Math.PI,

            radius: 95,

            size: 13,

            color: 255

        };


        const otherBody = {

            angle: 0,

            radius: 95,

            size: 9,

            color: 180

        };


        /* =================================
           Resize
           ================================= */

        function resize() {

            const ratio =
                Math.min(
                    window.devicePixelRatio || 1,
                    2
                );

            width =
                window.innerWidth;

            height =
                window.innerHeight;


            canvas.width =
                width * ratio;

            canvas.height =
                height * ratio;


            canvas.style.width =
                `${width}px`;

            canvas.style.height =
                `${height}px`;


            ctx.setTransform(
                ratio,
                0,
                0,
                ratio,
                0,
                0
            );


            centerX =
                width / 2;

            centerY =
                height / 2;

        }


        /* =================================
           Draw glowing body
           ================================= */

        function drawBody(
            x,
            y,
            size,
            brightness
        ) {

            const glow =
                ctx.createRadialGradient(
                    x,
                    y,
                    0,
                    x,
                    y,
                    size * 5
                );


            glow.addColorStop(
                0,
                `rgba(
                    255,
                    255,
                    255,
                    ${brightness}
                )`
            );


            glow.addColorStop(
                1,
                "rgba(255,255,255,0)"
            );


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                size * 5,
                0,
                Math.PI * 2
            );

            ctx.fillStyle = glow;

            ctx.fill();


            ctx.beginPath();

            ctx.arc(
                x,
                y,
                size,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgb(
                    ${brightness * 255},
                    ${brightness * 255},
                    ${brightness * 255}
                )`;

            ctx.fill();

        }


        /* =================================
           Draw orbit
           ================================= */

        function drawOrbit() {

            ctx.beginPath();

            ctx.ellipse(
                centerX,
                centerY,
                astre.radius,
                astre.radius * 0.42,
                0,
                0,
                Math.PI * 2
            );

            ctx.strokeStyle =
                "rgba(255,255,255,0.045)";

            ctx.lineWidth = 1;

            ctx.stroke();

        }


        /* =================================
           Animation
           ================================= */

        function animate() {

            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            /*
                The orbit slowly expands.
            */

            const breathing =
                Math.sin(
                    animationTime * 0.0005
                ) * 4;


            const orbitRadius =
                astre.radius +
                breathing;


            /*
                Bodies move slowly.
            */

            astre.angle += 0.0015;

            otherBody.angle += 0.0015;


            /*
                Calculate positions.
            */

            const astreX =
                centerX +
                Math.cos(
                    astre.angle
                ) *
                orbitRadius;


            const astreY =
                centerY +
                Math.sin(
                    astre.angle
                ) *
                orbitRadius *
                0.42;


            const otherX =
                centerX +
                Math.cos(
                    otherBody.angle
                ) *
                orbitRadius;


            const otherY =
                centerY +
                Math.sin(
                    otherBody.angle
                ) *
                orbitRadius *
                0.42;


            drawOrbit();


            /*
                Draw the two bodies.
            */

            drawBody(
                otherX,
                otherY,
                otherBody.size,
                0.65
            );


            drawBody(
                astreX,
                astreY,
                astre.size,
                0.95
            );


            animationTime++;

            requestAnimationFrame(
                animate
            );

        }


        /* =================================
           Start
           ================================= */

        window.addEventListener(
            "resize",
            resize
        );


        resize();

        animate();

    }
);