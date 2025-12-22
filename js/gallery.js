document.addEventListener("DOMContentLoaded", () => {
  /* -------------------- Particles -------------------- */
  const particleContainer = document.getElementById("particles");
  if (particleContainer) {
    const PARTICLE_COUNT = 600;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");

      p.style.top = Math.random() * 100 + "%";
      p.style.left = Math.random() * 100 + "%";

      const duration = 15 + Math.random() * 20;
      p.style.animationDuration = duration + "s";

      const size = 5 + Math.random() * 3;
      p.style.width = size + "px";
      p.style.height = size + "px";

      particleContainer.appendChild(p);
    }
  }

  /* -------------------- Gallery Viewer -------------------- */
  const images = Array.from(document.querySelectorAll(".gallery-grid img"));
  const viewer = document.getElementById("viewer");
  const viewerImg = document.getElementById("viewerImg");
  const viewerCaption = document.getElementById("viewerCaption");
  const closeBtn = document.getElementById("closeBtn");
  const prevBtn = document.getElementById("prevImg");
  const nextBtn = document.getElementById("nextImg");

  if (!viewer || !viewerImg || !viewerCaption || !closeBtn || !prevBtn || !nextBtn) {
    console.error("Gallery viewer: missing required elements.");
    return;
  }

  const preloadCache = {};

  function preloadImage(src) {
    if (!src || preloadCache[src]) return;
    const img = new Image();
    img.src = src;
    preloadCache[src] = true;
  }

  function preloadAround(index) {
    if (images.length < 2) return;

    const next = images[(index + 1) % images.length];
    const prev = images[(index - 1 + images.length) % images.length];

    preloadImage(next.src);
    preloadImage(prev.src);
  }

  let currentIndex = 0;

  function openViewer(imgEl) {
    currentIndex = images.indexOf(imgEl);
    if (currentIndex < 0) currentIndex = 0;

    viewerImg.src = images[currentIndex].src;
    viewerImg.alt = images[currentIndex].alt || "";
    viewerCaption.textContent = images[currentIndex].dataset.caption || "";

    // reset slide classes
    viewerImg.classList.remove("slide-in-left", "slide-in-right", "slide-active");
    viewerImg.classList.add("slide-active");

    viewer.style.display = "flex";
    requestAnimationFrame(() => viewer.classList.add("active"));

    preloadAround(currentIndex);
  }

  function closeViewer() {
    viewer.classList.remove("active");
    viewer.setAttribute("aria-hidden", "true");

    setTimeout(() => {
      viewer.style.display = "none";
      viewerImg.src = "";
    }, 350);
  }

  function showImage(index, direction = "right") {
    if (images.length === 0) return;

    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    currentIndex = index;

    const enterClass = direction === "right" ? "slide-in-right" : "slide-in-left";

    // Start the incoming animation state
    viewerImg.classList.remove("slide-active", "slide-in-left", "slide-in-right");
    viewerImg.classList.add(enterClass);

    requestAnimationFrame(() => {
      // Swap content
      viewerImg.src = images[currentIndex].src;
      viewerImg.alt = images[currentIndex].alt || "";
      viewerCaption.textContent = images[currentIndex].dataset.caption || "";

      // Animate to active
      viewerImg.classList.remove("slide-in-left", "slide-in-right");
      viewerImg.classList.add("slide-active");
    });

    preloadAround(currentIndex);
  }

  // Thumbnail clicks
  images.forEach((img) => {
    img.addEventListener("click", () => openViewer(img));
  });

  // Buttons
  prevBtn.addEventListener("click", () => showImage(currentIndex - 1, "left"));
  nextBtn.addEventListener("click", () => showImage(currentIndex + 1, "right"));

  // Close actions
  closeBtn.addEventListener("click", closeViewer);
  viewer.addEventListener("click", (e) => {
    if (e.target === viewer) closeViewer();
  });

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (!viewer.classList.contains("active")) return;

    if (e.key === "Escape") closeViewer();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1, "left");
    if (e.key === "ArrowRight") showImage(currentIndex + 1, "right");
  });
});