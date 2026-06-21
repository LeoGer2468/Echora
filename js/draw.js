let drawing = false;

document.addEventListener("mousedown", () => {
    drawing = true;
});

document.addEventListener("mouseup", () => {
    drawing = false;
});

document.addEventListener("mousemove", (e) => {

    if (!drawing) return;

    const dot = document.createElement("div");
    const size = Math.random() * 6 + 4;

dot.style.width = size + "px";
dot.style.height = size + "px";

    dot.className = "trail";

    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";

    document.body.appendChild(dot);

    setTimeout(() => {
        dot.remove();
    }, 1500);

});