/* ============================================================
   SIGNAL CURSOR — Custom cursor scoped to ERA 5 (The Signal)
   ============================================================ */

(function initSignalCursor() {
    'use strict';

    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    var signalSection = document.getElementById('era-the-signal');
    if (!signalSection) return;

    // Create cursor element
    var cursor = document.createElement('div');
    cursor.className = 'signal-cursor-ring';
    document.body.appendChild(cursor);

    // Create inner dot
    var dot = document.createElement('div');
    dot.className = 'signal-cursor-ring__dot';
    cursor.appendChild(dot);

    var mouseX = window.innerWidth / 2;
    var mouseY = window.innerHeight / 2;
    var isInsideSignal = false;

    // Track mouse position
    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Check if mouse is inside the signal section
        var rect = signalSection.getBoundingClientRect();
        var wasInside = isInsideSignal;
        isInsideSignal = (
            e.clientX >= rect.left &&
            e.clientX <= rect.right &&
            e.clientY >= rect.top &&
            e.clientY <= rect.bottom
        );

        if (isInsideSignal) {
            cursor.style.opacity = '1';
            signalSection.style.cursor = 'none';
        } else {
            cursor.style.opacity = '0';
            signalSection.style.cursor = '';
        }

        // Use GSAP for smooth follow
        if (typeof gsap !== 'undefined') {
            gsap.to(cursor, {
                x: mouseX,
                y: mouseY,
                duration: 0.15,
                ease: 'power2.out',
                overwrite: true
            });
        } else {
            cursor.style.transform = 'translate(' + mouseX + 'px, ' + mouseY + 'px) translate(-50%, -50%)';
        }
    });

    // Hide on mouse leave page
    document.addEventListener('mouseleave', function () {
        cursor.style.opacity = '0';
    });

    // Scale up on interactive elements within signal section
    var interactiveSelectors = 'a, button, .flip-card, .toggle-btn, .era-nav__dot, [data-clickable]';

    document.addEventListener('mouseover', function (e) {
        if (isInsideSignal && e.target.closest(interactiveSelectors)) {
            cursor.classList.add('signal-cursor-ring--hover');
        }
    });

    document.addEventListener('mouseout', function (e) {
        if (e.target.closest(interactiveSelectors)) {
            cursor.classList.remove('signal-cursor-ring--hover');
        }
    });

    // Pulse on click
    document.addEventListener('mousedown', function () {
        if (isInsideSignal) {
            cursor.classList.add('signal-cursor-ring--click');
        }
    });

    document.addEventListener('mouseup', function () {
        cursor.classList.remove('signal-cursor-ring--click');
    });
})();
