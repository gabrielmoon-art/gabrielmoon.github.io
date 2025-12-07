document.addEventListener("DOMContentLoaded", () => {
  const detailsBlocks = document.querySelectorAll("details.album-block");

  detailsBlocks.forEach(details => {
    const content = details.querySelector(".album-layout");

    // Ensure start state
    content.style.overflow = "hidden";
    content.style.maxHeight = details.open ? content.scrollHeight + "px" : "0px";
    content.style.opacity = details.open ? "1" : "0";

    // Handle clicks manually
    details.querySelector("summary").addEventListener("click", (e) => {
      e.preventDefault(); // stop instant toggle

      if (!details.open) {
        // OPEN ANIMATION
        details.open = true;
        requestAnimationFrame(() => {
          content.style.maxHeight = content.scrollHeight + "px";
          content.style.opacity = "1";
        });
      } else {
        // CLOSE ANIMATION
        content.style.maxHeight = content.scrollHeight + "px"; // set current height
        requestAnimationFrame(() => {
          content.style.maxHeight = "0px";
          content.style.opacity = "0";
        });

        // Delay actual <details> closing
        setTimeout(() => {
          details.open = false;
        }, 500); // matches CSS transition time
      }
    });
  });
});

detailsBlocks.forEach(other => {
  if (other !== details) other.open = false;
});

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