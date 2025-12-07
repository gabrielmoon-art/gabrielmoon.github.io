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