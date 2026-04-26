const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const guestBtn = document.getElementById("guestBtn");
const createProfileBtn = document.getElementById("createProfileBtn");
const routeStatus = document.getElementById("routeStatus");

/**
 * Applies the selected theme and updates icon state.
 * @param {"light" | "dark"} theme
 */
function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");

  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

/**
 * Persists user type, displays loading microcopy, and redirects.
 * @param {"guest" | "registered"} userType
 * @param {string} targetPage
 */
function navigateWithState(userType, targetPage) {
  localStorage.setItem("userType", userType);

  if (routeStatus) {
    routeStatus.textContent = "Preparing your space...";
  }

  [guestBtn, createProfileBtn].forEach((button) => {
    if (button) {
      button.disabled = true;
    }
  });

  window.setTimeout(() => {
    window.location.href = targetPage;
  }, 350);
}

const theme = localStorage.getItem("theme") || "light";
applyTheme(theme);

themeToggle?.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  const selectedTheme = isDark ? "dark" : "light";
  localStorage.setItem("theme", selectedTheme);
  applyTheme(selectedTheme);
});

guestBtn?.addEventListener("click", () => {
  navigateWithState("guest", "dashboard.html");
});

createProfileBtn?.addEventListener("click", () => {
  navigateWithState("registered", "profile.html");
});
