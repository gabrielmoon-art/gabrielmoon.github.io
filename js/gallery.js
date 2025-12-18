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

const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const resetZoomBtn = document.getElementById("resetZoom");
const closeBtn = document.getElementById("closeBtn");

let scale = 1;

// Open viewer
thumbnails.forEach(img => {
  img.addEventListener("click", () => {
    viewer.style.display = "flex";
    viewerImg.src = img.src;
    viewerCaption.textContent = img.dataset.caption || "";
    scale = 1;
    viewerImg.style.transform = "scale(1)";
  });
});

// Zoom
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

// Close
closeBtn.addEventListener("click", () => {
  viewer.style.display = "none";
});

viewer.addEventListener("click", (e) => {
  if (e.target === viewer) {
    viewer.style.display = "none";
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    viewer.style.display = "none";
  }
});