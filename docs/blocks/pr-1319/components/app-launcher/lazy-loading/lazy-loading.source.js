const FETCH_DELAY_MS = 2e3;
const apps = [
  { label: "Payments Administration", iconName: "payment", uri: "https://www.tylertech.com", target: "_blank" },
  { label: "PEP Administration", iconName: "admin_panel_settings", uri: "https://www.tylertech.com", target: "_blank" },
  { label: "User Management", iconName: "people", uri: "https://www.tylertech.com", target: "_blank" },
  { label: "Time Tracking", iconName: "schedule", uri: "https://www.tylertech.com", target: "_blank" },
  { label: "Document Center", iconName: "folder", uri: "https://www.tylertech.com", target: "_blank" }
];
const fetchApps = () => new Promise((resolve) => setTimeout(() => resolve(apps), FETCH_DELAY_MS));
const appLauncher = document.querySelector("forge-app-launcher");
let hasRequestedApps = false;
appLauncher?.addEventListener("toggle", async () => {
  if (!appLauncher.open || hasRequestedApps) {
    return;
  }
  hasRequestedApps = true;
  try {
    const loadedApps = await fetchApps();
    appLauncher.allApps = loadedApps;
  } catch {
    hasRequestedApps = false;
  }
});
