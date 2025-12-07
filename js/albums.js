document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("details.album-block").forEach((block) => {
        const content = block.querySelector(".album-layout");

        if (!content) return;

        // Start closed
        content.style.maxHeight = "0px";
        content.style.opacity = "0";

        block.addEventListener("toggle", () => {
            if (block.open) {
                // Expand
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.opacity = "1";
            } else {
                // Collapse
                content.style.maxHeight = "0px";
                content.style.opacity = "0";
            }
        });
    });
});