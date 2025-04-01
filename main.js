document.addEventListener("DOMContentLoaded", function () {
  const balloon = document.getElementById("balloon");
  const explosion = document.getElementById("explosion");
  const messageContainer = document.getElementById("message-container");
  const closeBtn = document.getElementById("close-btn");

  // Detect touch devices and add appropriate classes
  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    document.body.classList.add("touch-device");
  }

  // Randomly change balloon color
  function randomColor() {
    const colors = [
      "#ff6b6b",
      "#74b9ff",
      "#55efc4",
      "#ffeaa7",
      "#a29bfe",
      "#fd79a8",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  const balloonBody = document.querySelector(".balloon-body");
  balloonBody.style.background = randomColor();

  // Balloon click/touch event
  function handleBalloonClick(e) {
    // Prevent double-clicks or multiple touches
    balloon.removeEventListener("click", handleBalloonClick);
    balloon.removeEventListener("touchend", handleBalloonTouchEnd);

    // Hide balloon
    balloon.style.display = "none";

    // Create explosion particles
    createExplosion(e);

    // Show message after a slight delay
    setTimeout(function () {
      messageContainer.classList.add("show-message");
    }, 800);
  }

  function handleBalloonTouchEnd(e) {
    e.preventDefault(); // Prevent ghost clicks
    handleBalloonClick(e);
  }

  balloon.addEventListener("click", handleBalloonClick);
  balloon.addEventListener("touchend", handleBalloonTouchEnd);

  // Create explosion effect
  function createExplosion(e) {
    // Create fragments - adjust for device performance
    const isMobile = window.innerWidth < 768;
    const fragments = isMobile ? 80 : 150;
    const colors = [
      "#ff6b6b",
      "#74b9ff",
      "#55efc4",
      "#ffeaa7",
      "#a29bfe",
      "#fd79a8",
    ];

    // Get balloon position
    const rect = balloon.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < fragments; i++) {
      const particle = document.createElement("div");
      particle.className = "particles";

      // Random position within balloon area
      const size = Math.random() * (isMobile ? 6 : 8) + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Set color
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = color;
      particle.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px ${color}`;

      // Set initial position at balloon center
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;

      document.body.appendChild(particle);

      // Animation with random direction and speed
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 15 + 5;
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const lifetime = Math.random() * 1000 + 500;

      // Use requestAnimationFrame for smoother animation
      requestAnimationFrame(() => {
        particle.style.opacity = "1";

        let startTime = Date.now();
        let lastTimestamp = startTime;

        function animateParticle(timestamp) {
          const elapsed = timestamp - startTime;
          const progress = elapsed / lifetime;

          if (progress >= 1) {
            if (particle.parentNode) {
              document.body.removeChild(particle);
            }
            return;
          }

          const x = centerX + (vx * elapsed) / 20;
          const y =
            centerY +
            (vy * elapsed) / 20 +
            0.5 * 9.8 * Math.pow(elapsed / 100, 2);

          particle.style.left = `${x}px`;
          particle.style.top = `${y}px`;
          particle.style.opacity = 1 - progress;

          requestAnimationFrame(animateParticle);
        }

        requestAnimationFrame(animateParticle);
      });
    }

    // Sound effect (browser might block this without user interaction)
    try {
      const audio = new Audio(
        "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAAwAAAbAAqqqq1dXV1ero6Ojo9PT09PT////////////////////+AAAAAExhdmM1OC4xMwAAAAAAAAAAAAAAACQDQAAAAAAAAAABsIQxJFEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/4zLAAAAAAAAAAAAATEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/4zDEADPIAUQVJGAAVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
      );
      audio.play();
    } catch (e) {
      console.log("Audio play failed:", e);
    }
  }

  // Reset button click
  closeBtn.addEventListener("click", function () {
    messageContainer.classList.remove("show-message");
    setTimeout(function () {
      balloon.style.display = "block";
      balloonBody.style.background = randomColor();

      // Re-add event listeners
      balloon.addEventListener("click", handleBalloonClick);
      balloon.addEventListener("touchend", handleBalloonTouchEnd);
    }, 500);
  });

  // Add different balloon colors on page reload
  window.addEventListener("load", function () {
    balloonBody.style.background = randomColor();

    // Handle initial orientation
    checkOrientation();
  });

  // Handle orientation changes
  window.addEventListener("resize", checkOrientation);

  function checkOrientation() {
    const isLandscape = window.innerWidth > window.innerHeight;
    const isSmallHeight = window.innerHeight < 500;

    if (isLandscape && isSmallHeight) {
      document.body.classList.add("landscape-small");
    } else {
      document.body.classList.remove("landscape-small");
    }
  }

  // Add subtle background animation
  function createBackgroundParticles() {
    // Reduce particle count on mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 20 : 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "confetti";

      const size = Math.random() * (isMobile ? 6 : 8) + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      const color = `hsl(${Math.random() * 360}, 70%, 70%)`;
      particle.style.setProperty("--color", color);
      particle.style.backgroundColor = color;

      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;

      document.body.appendChild(particle);

      // Slight random movement
      gsap(particle);
    }
  }

  function gsap(element) {
    let x = Math.random() * 10 - 5;
    let y = Math.random() * 10 - 5;
    let duration = Math.random() * 10 + 10;
    let opacity = Math.random() * 0.5 + 0.1;

    element.style.opacity = opacity;

    animateElement();

    function animateElement() {
      setTimeout(() => {
        element.style.transition = `transform ${duration}s ease-in-out, top ${duration}s ease-in-out, left ${duration}s ease-in-out`;
        element.style.transform = `translate(${x}px, ${y}px)`;

        setTimeout(() => {
          x = Math.random() * 10 - 5;
          y = Math.random() * 10 - 5;
          animateElement();
        }, duration * 1000);
      }, 100);
    }
  }

  // Initialize background particles
  createBackgroundParticles();

  // Fix iOS Safari 100vh issue
  function setVhProperty() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  setVhProperty();
  window.addEventListener("resize", setVhProperty);

  // Prevent scrolling on mobile when interacting with the balloon
  document.addEventListener(
    "touchmove",
    function (e) {
      if (e.target.closest(".balloon")) {
        e.preventDefault();
      }
    },
    { passive: false }
  );

  // Handle iOS touch issues
  document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
  });
});
