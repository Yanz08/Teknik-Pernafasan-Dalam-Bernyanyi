/* ====================================
   BACKGROUND MANAGER
==================================== */

class BackgroundManager {

    constructor() {

        this.createDust();
        this.createSpotlight();
        this.initConstellation();

    }

    /* ====================================
       FLOATING DUST
    ==================================== */

    createDust() {

        const container =
            document.getElementById(
                "particles"
            );

        for (let i = 0; i < 120; i++) {

            const particle =
                document.createElement("div");

            particle.classList.add(
                "particle"
            );

            const random =
                Math.random();

            if (random < 0.33) {

                particle.classList.add(
                    "small"
                );

            } else if (random < 0.66) {

                particle.classList.add(
                    "medium"
                );

            } else {

                particle.classList.add(
                    "large"
                );

            }

            particle.style.left =
                `${Math.random() * 100}%`;

            particle.style.animationDuration =
                `${15 + Math.random() * 20}s`;

            particle.style.animationDelay =
                `${Math.random() * 10}s`;

            container.appendChild(
                particle
            );

        }

    }

    /* ====================================
       SPOTLIGHT
    ==================================== */

    createSpotlight() {

        const spotlight =
            document.getElementById(
                "spotlightParticles"
            );

        for (let i = 0; i < 35; i++) {

            const star =
                document.createElement("div");

            star.classList.add(
                "spotlight"
            );

            star.style.left =
                `${Math.random() * 100}%`;

            star.style.top =
                `${Math.random() * 100}%`;

            star.style.animationDelay =
                `${Math.random() * 6}s`;

            spotlight.appendChild(
                star
            );

        }

    }

    /* ====================================
       CONSTELLATION
    ==================================== */

    initConstellation() {

        this.canvas =
            document.getElementById(
                "constellation"
            );

        this.ctx =
            this.canvas.getContext("2d");

        this.resizeCanvas();

        this.points = [];

        for (let i = 0; i < 70; i++) {

            this.points.push({

                x:
                    Math.random() *
                    this.canvas.width,

                y:
                    Math.random() *
                    this.canvas.height,

                vx:
                    (Math.random() - 0.5) *
                    0.4,

                vy:
                    (Math.random() - 0.5) *
                    0.4

            });

        }

        this.animateConstellation();

        window.addEventListener(
            "resize",
            () => this.resizeCanvas()
        );

    }

    resizeCanvas() {

        this.canvas.width =
            window.innerWidth;

        this.canvas.height =
            window.innerHeight;

    }

    animateConstellation() {

        const ctx =
            this.ctx;

        const canvas =
            this.canvas;

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        this.points.forEach(point => {

            point.x += point.vx;
            point.y += point.vy;

            if (
                point.x < 0 ||
                point.x > canvas.width
            ) {

                point.vx *= -1;

            }

            if (
                point.y < 0 ||
                point.y > canvas.height
            ) {

                point.vy *= -1;

            }

            ctx.beginPath();

            ctx.arc(
                point.x,
                point.y,
                2,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                "rgba(255,255,255,.8)";

            ctx.fill();

        });

        for (
            let i = 0;
            i < this.points.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < this.points.length;
                j++
            ) {

                const dx =
                    this.points[i].x -
                    this.points[j].x;

                const dy =
                    this.points[i].y -
                    this.points[j].y;

                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );

                if (distance < 140) {

                    ctx.beginPath();

                    ctx.moveTo(
                        this.points[i].x,
                        this.points[i].y
                    );

                    ctx.lineTo(
                        this.points[j].x,
                        this.points[j].y
                    );

                    ctx.strokeStyle =
                        `rgba(255,255,255,${
                            0.15 *
                            (1 - distance / 140)
                        })`;

                    ctx.stroke();

                }

            }

        }

        requestAnimationFrame(
            () =>
                this.animateConstellation()
        );

    }

    /* ====================================
       UPDATE SLIDE EFFECT
    ==================================== */

    update(slideIndex) {

        const spotlight =
            document.getElementById(
                "spotlightParticles"
            );

        const wave =
            document.getElementById(
                "musicWave"
            );

        const constellation =
            document.getElementById(
                "constellation"
            );

        /* Slide 1 */

        spotlight.style.opacity =
            slideIndex === 0
                ? "1"
                : "0";

        /* Slide 8 */

        wave.style.opacity =
            slideIndex === 7
                ? "1"
                : "0";

        /* Slide 10 */

        constellation.style.opacity =
            slideIndex === 9
                ? "1"
                : "0";

    }

}

/* ====================================
   INIT
==================================== */

const bgManager =
    new BackgroundManager();