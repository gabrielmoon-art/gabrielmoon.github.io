document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("particles");

  const PARTICLE_COUNT = 500; // increase for more particles

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
    let size = 3 + Math.random() * 3;
    p.style.width = size + "px";
    p.style.height = size + "px";

    container.appendChild(p);
  }
});