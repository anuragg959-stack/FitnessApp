const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

/**
 * Applies the selected theme and updates icon state.
 * @param {"light" | "dark"} theme
 */
function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
}

const theme = localStorage.getItem("theme") || "light";
applyTheme(theme);

themeToggle?.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  const selectedTheme = isDark ? "dark" : "light";
  localStorage.setItem("theme", selectedTheme);
  themeIcon.textContent = isDark ? "☀️" : "🌙";
});

document.getElementById("guestBtn")?.addEventListener("click", () => {
  localStorage.setItem("userType", "guest");
  window.location.href = "dashboard.html";
});

document.getElementById("createProfileBtn")?.addEventListener("click", () => {
  localStorage.setItem("userType", "registered");
  window.location.href = "profile.html";
});
