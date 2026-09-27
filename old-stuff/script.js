/* ===========================================================
   OUR STORY
   JAVASCRIPT
=========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       ELEMENTS
    ========================================================= */

    const music = document.getElementById("music");

    const landing = document.getElementById("landing");
    const landingContent = document.getElementById("landingContent");

    const envelopeWrapper =
        document.getElementById("envelopeWrapper");

    const letter =
        document.getElementById("letter");

    const beginStory =
        document.getElementById("beginStory");

    const story =
        document.getElementById("story");

    const inviteButton =
        document.querySelector(".invite-button");

    const rsvpButton =
        document.querySelector(".rsvp-button");


    /* =========================================================
       MUSIC
    ========================================================= */

    let musicStarted = false;

    function startMusic() {

        if (!music || musicStarted) return;

        music.volume = 0.45;

        const playPromise = music.play();

        if (playPromise !== undefined) {

            playPromise
                .then(() => {
                    musicStarted = true;
                })
                .catch(() => {
                    /*
                     Browser autoplay protection may prevent
                     playback until the user interacts.
                    */
                });

        }

    }


    /* =========================================================
       ENVELOPE OPEN
    ========================================================= */

    if (envelopeWrapper) {

        envelopeWrapper.addEventListener("click", () => {

            /*
             Prevent clicking the envelope multiple times.
            */

            if (envelopeWrapper.classList.contains("open")) {
                return;
            }

            envelopeWrapper.classList.add("open");

            startMusic();

            /*
             After the envelope opens, slightly fade the
             landing content.
            */

            setTimeout(() => {

                if (landingContent) {
                    landingContent.classList.add("opened-state");
                }

            }, 500);

            /*
             Move to the letter automatically.
            */

            setTimeout(() => {

                showLetter();

            }, 1300);

        });

    }


    /* =========================================================
       SHOW LETTER
    ========================================================= */

    function showLetter() {

        if (!landing || !letter) return;

        /*
         Hide landing
        */

        landing.classList.add("hidden");

        /*
         Show letter
        */

        letter.classList.remove("hidden");

        /*
         Start at the top of the letter
        */

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        /*
         Small delay for browser rendering
        */

        setTimeout(() => {

            letter.classList.add("visible");

        }, 50);

    }


    /* =========================================================
       BEGIN STORY
    ========================================================= */

    if (beginStory) {

        beginStory.addEventListener("click", () => {

            /*
             Make absolutely sure music starts after
             a real user interaction.
            */

            startMusic();

            /*
             Hide letter
            */

            letter.classList.add("hidden");

            /*
             Show main story
            */

            story.classList.remove("hidden");

            /*
             Reset scroll position
            */

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

            /*
             Prepare scroll animations
            */

            initializeRevealAnimations();

        });

    }


    /* =========================================================
       SCROLL REVEAL ANIMATIONS
    ========================================================= */

    function initializeRevealAnimations() {

        /*
         Elements that should animate into view.
        */

        const revealElements = [

            ".hero-content > *",
            ".chapter",
            ".meeting-heading",
            ".wall-photo",
            ".meeting-ending",
            ".film-divider",
            ".growing-left > *",
            ".editorial-frame",
            ".distance-content > *",
            ".memory-heading",
            ".memory-image",
            ".memory-card",
            ".timeline > *",
            ".event",
            ".engagement-photo",
            ".engagement-content > *",
            ".invite-content > *",
            ".final-content > *"

        ];

        /*
         Add fade-up class to each element.
        */

        revealElements.forEach(selector => {

            document
                .querySelectorAll(selector)
                .forEach(element => {

                    /*
                     Avoid adding the animation to elements
                     that are already prepared.
                    */

                    if (!element.classList.contains("fade-up")) {

                        element.classList.add("fade-up");

                    }

                });

        });


        /*
         Intersection Observer
        */

        const observer =
            new IntersectionObserver(

                (entries, observerInstance) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            /*
                             Once revealed, stop observing.
                            */

                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.15,
                    rootMargin: "0px 0px -60px 0px"
                }

            );


        /*
         Observe all fade-up elements.
        */

        document
            .querySelectorAll(".fade-up")
            .forEach(element => {

                observer.observe(element);

            });

    }


    /* =========================================================
       STAGGERED PHOTO WALL
    ========================================================= */

    function setupPhotoWall() {

        const photos =
            document.querySelectorAll(".wall-photo");

        photos.forEach((photo, index) => {

            photo.style.transitionDelay =
                `${index * 120}ms`;

        });

    }

    setupPhotoWall();


    /* =========================================================
       MEMORY CARD STAGGER
    ========================================================= */

    function setupMemoryCards() {

        const cards =
            document.querySelectorAll(".memory-card");

        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 100}ms`;

        });

    }

    setupMemoryCards();


    /* =========================================================
       TIMELINE STAGGER
    ========================================================= */

    function setupTimeline() {

        const events =
            document.querySelectorAll(".timeline .event");

        events.forEach((event, index) => {

            event.style.transitionDelay =
                `${index * 120}ms`;

        });

    }

    setupTimeline();


    /* =========================================================
       PARALLAX EFFECT
    ========================================================= */

    function setupParallax() {

        const parallaxImages = [

            ".hero-background",
            ".distance-paper",
            ".invite-bg",
            ".final-bg"

        ];

        /*
         Only enable on devices with a mouse.
        */

        if (window.matchMedia("(hover: hover)").matches) {

            window.addEventListener(
                "scroll",
                () => {

                    const scrollY =
                        window.scrollY;

                    parallaxImages.forEach(selector => {

                        document
                            .querySelectorAll(selector)
                            .forEach(image => {

                                const rect =
                                    image.parentElement.getBoundingClientRect();

                                /*
                                 Only calculate while the section
                                 is near the viewport.
                                */

                                if (
                                    rect.bottom > 0 &&
                                    rect.top <
                                    window.innerHeight
                                ) {

                                    const movement =
                                        rect.top * 0.08;

                                    image.style.transform =
                                        `scale(1.08) translateY(${movement}px)`;

                                }

                            });

                    });

                },
                { passive: true }
            );

        }

    }

    setupParallax();


    /* =========================================================
       SMOOTH INTERNAL NAVIGATION
    ========================================================= */

    function scrollToElement(element) {

        if (!element) return;

        element.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    /* =========================================================
       SAVE THE DATE BUTTON
    ========================================================= */

    if (inviteButton) {

        inviteButton.addEventListener("click", () => {

            /*
             Create an .ics calendar file.
            */

            const eventTitle =
                "Bride & Groom — Wedding";

            const eventDate =
                "20261212";

            const startTime =
                "190000";

            /*
             Wedding duration: 3 hours.
            */

            const endTime =
                "220000";

            const venue =
                "The Grand Ballroom";

            const description =
                "Wedding celebration of Bride & Groom.";


            const icsContent =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Our Story//Wedding//EN
BEGIN:VEVENT
UID:${Date.now()}@ourstory
DTSTAMP:${getICSDate(new Date())}
DTSTART:${eventDate}T${startTime}
DTEND:${eventDate}T${endTime}
SUMMARY:${eventTitle}
LOCATION:${venue}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`;


            const blob =
                new Blob(
                    [icsContent],
                    {
                        type: "text/calendar;charset=utf-8"
                    }
                );


            const url =
                URL.createObjectURL(blob);


            const link =
                document.createElement("a");

            link.href = url;

            link.download =
                "wedding-save-the-date.ics";

            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);

            URL.revokeObjectURL(url);

        });

    }


    /* =========================================================
       RSVP BUTTON
    ========================================================= */

    if (rsvpButton) {

        rsvpButton.addEventListener("click", () => {

            /*
             Replace this with your actual RSVP URL later.
             
             Example:
             window.location.href =
             "https://forms.google.com/....";
            */

            alert(
                "RSVP details coming soon ♡"
            );

        });

    }


    /* =========================================================
       ICS DATE FORMAT
    ========================================================= */

    function getICSDate(date) {

        const year =
            date.getUTCFullYear();

        const month =
            String(date.getUTCMonth() + 1)
                .padStart(2, "0");

        const day =
            String(date.getUTCDate())
                .padStart(2, "0");

        const hours =
            String(date.getUTCHours())
                .padStart(2, "0");

        const minutes =
            String(date.getUTCMinutes())
                .padStart(2, "0");

        const seconds =
            String(date.getUTCSeconds())
                .padStart(2, "0");


        return (
            `${year}${month}${day}` +
            `T${hours}${minutes}${seconds}Z`
        );

    }


    /* =========================================================
       SCROLL INDICATOR
    ========================================================= */

    const scrollIndicator =
        document.querySelector(".scroll-indicator");

    if (scrollIndicator) {

        scrollIndicator.addEventListener(
            "click",
            () => {

                const hero =
                    document.querySelector(".hero");

                if (!hero) return;

                const nextSection =
                    hero.nextElementSibling;

                if (nextSection) {

                    scrollToElement(
                        nextSection
                    );

                }

            }
        );

        scrollIndicator.style.cursor =
            "pointer";

    }


    /* =========================================================
       MUSIC VOLUME CONTROL
    ========================================================= */

    if (music) {

        music.volume = 0.45;

    }


    /* =========================================================
       KEYBOARD ACCESSIBILITY
    ========================================================= */

    if (envelopeWrapper) {

        envelopeWrapper.setAttribute(
            "role",
            "button"
        );

        envelopeWrapper.setAttribute(
            "tabindex",
            "0"
        );


        envelopeWrapper.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    envelopeWrapper.click();

                }

            }
        );

    }


    /* =========================================================
       PREVENT BROKEN IMAGE LAYOUT
    ========================================================= */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "error",
                () => {

                    image.style.opacity = "0.35";

                }
            );

        });


    /* =========================================================
       INITIAL STATE
    ========================================================= */

    /*
     The HTML starts with:

     #letter.hidden
     #story.hidden

     So only the landing page is visible initially.
    */

    if (letter) {
        letter.classList.add("hidden");
    }

    if (story) {
        story.classList.add("hidden");
    }

});
