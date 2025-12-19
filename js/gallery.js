document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("particles");

  const PARTICLE_COUNT = 600; // increase for more particles

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let p = document.createElement("div");
    p.classList.add("particle");

    // Randomize start position
    p.style.top = Math.random() * 100 + "%";
    p.style.left = Math.random() * 100 + "%";

    // Randomize speed
    let duration = 15 + Math.random() * 20;
    p.style.animationDuration = duration + "s";

    // Randomize size
    let size = 5 + Math.random() * 3;
    p.style.width = size + "px";
    p.style.height = size + "px";

    container.appendChild(p);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const thumbnails = document.querySelectorAll(".gallery-grid img");
  const viewer = document.getElementById("viewer");
  const viewerImg = document.getElementById("viewerImg");
  const viewerCaption = document.getElementById("viewerCaption");
  const magnifier = document.getElementById("magnifier");
  const closeBtn = document.getElementById("closeBtn");

  // Safety checks (prevents silent failures)
  if (!viewer || !viewerImg || !viewerCaption || !magnifier || !closeBtn) {
    console.error("Missing required elements. Check IDs: viewer, viewerImg, viewerCaption, magnifier, closeBtn");
    return;
  }

  let magnifierActive = false;
  let magnifierZoom = 2.5;

  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  function openViewer(img) {
    viewerImg.src = img.src;
    viewerCaption.textContent = img.dataset.caption || "";

    // show viewer with transition
    viewer.style.display = "flex";
    requestAnimationFrame(() => viewer.classList.add("active"));

    // magnifier only becomes enabled after click (desktop only)
    magnifierActive = !isTouch;
    magnifierZoom = 2.5;
    magnifier.style.display = "none";
  }

  function closeViewer() {
    viewer.classList.remove("active");
    magnifierActive = false;
    magnifier.style.display = "none";

    setTimeout(() => {
      viewer.style.display = "none";
      viewerImg.src = "";
    }, 350);
  }

  thumbnails.forEach(img => {
    img.addEventListener("click", () => openViewer(img));
  });

  closeBtn.addEventListener("click", closeViewer);

  viewer.addEventListener("click", (e) => {
    if (e.target === viewer) closeViewer();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeViewer();
  });

  // --- Magnifier follow ---
  viewerImg.addEventListener("pointermove", (e) => {
    if (!magnifierActive) return;

    const rect = viewerImg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // hide if outside image bounds
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      magnifier.style.display = "none";
      return;
    }

    const radius = magnifier.offsetWidth / 2;

    magnifier.style.display = "block";
    magnifier.style.left = `${e.clientX - radius}px`;
    magnifier.style.top = `${e.clientY - radius}px`;

    magnifier.style.backgroundImage = `url(${viewerImg.src})`;
    magnifier.style.backgroundRepeat = "no-repeat";
    magnifier.style.backgroundSize = `${rect.width * magnifierZoom}px ${rect.height * magnifierZoom}px`;
    magnifier.style.backgroundPosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
  });

  viewerImg.addEventListener("pointerleave", () => {
    magnifier.style.display = "none";
  });

  // --- Scroll wheel zoom for magnifier ---
  viewerImg.addEventListener("wheel", (e) => {
    if (!magnifierActive) return;

    // IMPORTANT: prevent the page from scrolling instead
    e.preventDefault();

    const step = 0.2;
    if (e.deltaY < 0) magnifierZoom += step;  // scroll up = zoom in
    else magnifierZoom -= step;               // scroll down = zoom out

    magnifierZoom = Math.min(Math.max(1.5, magnifierZoom), 6);
  }, { passive: false });
});