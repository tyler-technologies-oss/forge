const showButton = document.querySelector("forge-button");
const busyIndicator = document.querySelector("forge-busy-indicator");
showButton?.addEventListener("click", () => {
  if (!busyIndicator) {
    return;
  }
  busyIndicator.open = true;
  setTimeout(() => {
    busyIndicator.open = false;
  }, 3e3);
});
