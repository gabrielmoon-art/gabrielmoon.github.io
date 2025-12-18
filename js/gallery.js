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

const thumbnails = document.querySelectorAll(".gallery-grid img");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");
const viewerCaption = document.getElementById("viewerCaption");
const magnifier = document.getElementById("magnifier");

const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const resetZoomBtn = document.getElementById("resetZoom");
const closeBtn = document.getElementById("closeBtn");

let scale = 1;
const magnifierZoom = 2.5;

/* Open viewer */
thumbnails.forEach(img => {
  img.addEventListener("click", () => {
    viewer.style.display = "flex";
    viewerImg.src = img.src;
    viewerCaption.textContent = img.dataset.caption || "";
    scale = 1;
    viewerImg.style.transform = "scale(1)";
    magnifier.style.display = "none";
  });
});

/* Zoom controls */
zoomInBtn.addEventListener("click", () => {
  scale += 0.2;
  viewerImg.style.transform = `scale(${scale})`;
});

zoomOutBtn.addEventListener("click", () => {
  scale = Math.max(0.4, scale - 0.2);
  viewerImg.style.transform = `scale(${scale})`;
});

resetZoomBtn.addEventListener("click", () => {
  scale = 1;
  viewerImg.style.transform = "scale(1)";
});

/* Close viewer */
closeBtn.addEventListener("click", () => {
  viewer.style.display = "none";
});

viewer.addEventListener("click", (e) => {
  if (e.target === viewer) viewer.style.display = "none";
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") viewer.style.display = "none";
});

/* Magnifier */
viewerImg.addEventListener("mousemove", (e) => {
  const rect = viewerImg.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  magnifier.style.display = "block";
  magnifier.style.left = `${e.clientX - 90}px`;
  magnifier.style.top = `${e.clientY - 90}px`;
  magnifier.style.backgroundImage = `url(${viewerImg.src})`;
  magnifier.style.backgroundSize = `${rect.width * magnifierZoom}px ${rect.height * magnifierZoom}px`;
  magnifier.style.backgroundPosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
});

viewerImg.addEventListener("mouseleave", () => {
  magnifier.style.display = "none";
});

/* Touch support */
viewerImg.addEventListener("touchmove", (e) => {
  const touch = e.touches[0];
  const rect = viewerImg.getBoundingClientRect();
  const x = touch.clientX - rect.left;
  const y = touch.clientY - rect.top;

  magnifier.style.display = "block";
  magnifier.style.left = `${touch.clientX - 90}px`;
  magnifier.style.top = `${touch.clientY - 90}px`;
  magnifier.style.backgroundImage = `url(${viewerImg.src})`;
  magnifier.style.backgroundSize = `${rect.width * magnifierZoom}px ${rect.height * magnifierZoom}px`;
  magnifier.style.backgroundPosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
});