const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

const guestBtn = document.getElementById("guestBtn");
const createProfileBtn = document.getElementById("createProfileBtn");
const routeStatus = document.getElementById("routeStatus");
const profileModal = document.getElementById("profileModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const profileForm = document.getElementById("profileForm");

const profileName = document.getElementById("profileName");
const profileEmail = document.getElementById("profileEmail");
const profilePhone = document.getElementById("profilePhone");
const profilePhoto = document.getElementById("profilePhoto");
const settingsBtn = document.getElementById("settingsBtn");
const supportBtn = document.getElementById("supportBtn");
const signOutBtn = document.getElementById("signOutBtn");
const profileStatus = document.getElementById("profileStatus");

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");

  if (themeIcon) {
    themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

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

function openProfileModal() {
  if (!profileModal) {
    return;
  }

  profileModal.classList.add("open");
  profileModal.setAttribute("aria-hidden", "false");
}

function closeProfileModal() {
  if (!profileModal) {
    return;
  }

  profileModal.classList.remove("open");
  profileModal.setAttribute("aria-hidden", "true");
}

function initLandingPage() {
  guestBtn?.addEventListener("click", () => {
    navigateWithState("guest", "dashboard.html");
  });

  createProfileBtn?.addEventListener("click", () => {
    openProfileModal();
  });

  closeModalBtn?.addEventListener("click", closeProfileModal);
  profileModal?.addEventListener("click", (event) => {
    if (event.target === profileModal) {
      closeProfileModal();
    }
  });

  profileForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("nameInput")?.value.trim();
    const email = document.getElementById("emailInput")?.value.trim();
    const phone = document.getElementById("phoneInput")?.value.trim();
    const photoFile = document.getElementById("photoInput")?.files?.[0];

    let photoData = "";

    if (photoFile) {
      photoData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = reject;
        reader.readAsDataURL(photoFile);
      });
    }

    localStorage.setItem("userType", "registered");
    localStorage.setItem(
      "profileData",
      JSON.stringify({
        name,
        email,
        phone,
        photoData,
      }),
    );

    navigateWithState("registered", "profile.html");
  });
}

function initProfilePage() {
  if (!profileName || !profileEmail || !profilePhone || !profilePhoto) {
    return;
  }

  const savedProfile = JSON.parse(localStorage.getItem("profileData") || "{}");

  profileName.textContent = savedProfile.name || "Fitness Pal User";
  profileEmail.textContent = savedProfile.email || "No email added";
  profilePhone.textContent = savedProfile.phone || "No phone number added";
  profilePhoto.src =
    savedProfile.photoData ||
    "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'><rect width='120' height='120' fill='%23d9d9d9'/><circle cx='60' cy='44' r='22' fill='%23919191'/><rect x='25' y='76' width='70' height='30' rx='14' fill='%23919191'/></svg>";

  settingsBtn?.addEventListener("click", () => {
    if (profileStatus) {
      profileStatus.textContent = "Settings panel will be available soon.";
    }
  });

  supportBtn?.addEventListener("click", () => {
    window.location.href = "mailto:support@fitnesspal.app";
  });

  signOutBtn?.addEventListener("click", () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("profileData");
    window.location.href = "index.html";
  });
}

const theme = localStorage.getItem("theme") || "light";
applyTheme(theme);

themeToggle?.addEventListener("click", () => {
  const isDark = !document.body.classList.contains("dark");
  const selectedTheme = isDark ? "dark" : "light";
  localStorage.setItem("theme", selectedTheme);
  applyTheme(selectedTheme);
});

initLandingPage();
initProfilePage();
