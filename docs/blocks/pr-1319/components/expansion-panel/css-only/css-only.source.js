const button = document.getElementById("my-button");
const panel = document.querySelector(".forge-expansion-panel");
button?.addEventListener("click", () => {
  if (!panel) {
    return;
  }
  const expanded = !panel.classList.contains("forge-expansion-panel--open");
  button.setAttribute("aria-expanded", String(expanded));
  panel.classList.toggle("forge-expansion-panel--open", expanded);
});
