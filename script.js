// Helper to set a cookie
function setCookie(name, value, days = 365) {
  const date = new Date();
  date.setTime(date.getTime() + days*24*60*60*1000);
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

// Helper to get a cookie by name
function getCookie(name) {
  const cookieArr = document.cookie.split("; ");
  for (const cookie of cookieArr) {
    const [key, val] = cookie.split("=");
    if (key === name) return val;
  }
  return null;
}

// Apply the font preferences to CSS variables
function applyPreferences(fontSize, fontColor) {
  document.documentElement.style.setProperty("--fontsize", `${fontSize}px`);
  document.documentElement.style.setProperty("--fontcolor", fontColor);
}

// Handle form submission
document.getElementById("preferences-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const fontSize = document.getElementById("fontsize").value;
  const fontColor = document.getElementById("fontcolor").value;

  // Save to cookies
  setCookie("fontsize", fontSize);
  setCookie("fontcolor", fontColor);

  // Apply immediately
  applyPreferences(fontSize, fontColor);
});

// On page load: apply saved preferences if they exist
window.addEventListener("DOMContentLoaded", () => {
  const savedSize = getCookie("fontsize") || "16";
  const savedColor = getCookie("fontcolor") || "#000000";

  // Apply to form fields
  document.getElementById("fontsize").value = savedSize;
  document.getElementById("fontcolor").value = savedColor;

  // Apply to CSS
  applyPreferences(savedSize, savedColor);
});
