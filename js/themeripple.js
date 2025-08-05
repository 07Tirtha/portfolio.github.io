// Theme Reveal Ripple Effect
const toggleBtn = document.getElementById("themeToggle");
const appContent = document.getElementById("app-content");
let isLight = appContent.classList.contains("light-mode") || localStorage.getItem("theme") === "light";
let rippleDuration = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--ripple-duration')) || 0.9;

// Set the initial theme and button state
if (isLight) {
  appContent.classList.add("light-mode");
  document.body.classList.add("light-mode");
  toggleBtn.textContent = "🌞";
  starColor = "0,0,0";
} else {
  appContent.classList.remove("light-mode");
  document.body.classList.remove("light-mode");
  toggleBtn.textContent = "🌙";
  starColor = "255,255,255";
}

function getMaxRadius(cx, cy) {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  return Math.max(
    Math.hypot(cx, cy),
    Math.hypot(cx, vh - cy),
    Math.hypot(vw - cx, cy),
    Math.hypot(vw - cx, vh - cy)
  );
}

// Main theme toggle with masked reveal (content snapshot)
toggleBtn.addEventListener("click", function() {
  const btnRect = toggleBtn.getBoundingClientRect();
  const cx = btnRect.left + btnRect.width / 2;
  const cy = btnRect.top + btnRect.height / 2;

  // 1. Clone main content for overlay
  const overlay = document.createElement("div");
  overlay.className = "theme-overlay";
  // Add the theme class to the overlay itself to control the background color/content of the expanding ripple
  if (isLight) {
    overlay.classList.add("dark-mode"); // Toggling TO dark, so ripple shows dark content
  } else {
    overlay.classList.add("light-mode"); // Toggling TO light, so ripple shows light content
  }

  // Clone the app content for the overlay, set correct mode
  const clone = appContent.cloneNode(true);
  if (isLight) {
    clone.classList.remove("light-mode");
    clone.classList.add("dark-mode");
  } else {
    clone.classList.remove("dark-mode");
    clone.classList.add("light-mode");
  }
  // Optional: remove IDs to avoid duplicate IDs in DOM (recommended)
  clone.id = "";
  // Place snapshot into overlay
  overlay.appendChild(clone);
  document.body.appendChild(overlay);

  // 2. Mask starts as small circle
  overlay.style.clipPath = `circle(0px at ${cx}px ${cy}px)`;
  overlay.style.webkitClipPath = `circle(0px at ${cx}px ${cy}px)`;

  // 3. Animate to full screen
  void overlay.offsetWidth;
  const radius = getMaxRadius(cx, cy) + 10;
  overlay.style.clipPath = `circle(${radius}px at ${cx}px ${cy}px)`;
  overlay.style.webkitClipPath = `circle(${radius}px at ${cx}px ${cy}px)`;

  // 4. After animation, swap theme for real content, fade out overlay, then remove
  setTimeout(() => {
    if (isLight) {
      appContent.classList.remove("light-mode");
      appContent.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      document.body.classList.add("dark-mode");
      toggleBtn.textContent = "🌙";
      localStorage.setItem("theme", "dark");
      starColor = "255,255,255";
    } else {
      appContent.classList.remove("dark-mode");
      appContent.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
      document.body.classList.add("light-mode");
      toggleBtn.textContent = "🌞";
      localStorage.setItem("theme", "light");
      starColor = "0,0,0";
    }
    overlay.classList.add("ripple-fade-out");
    setTimeout(() => {
      overlay.remove();
    }, 250); // 250ms matches the overlay fade-out transition
    isLight = !isLight;
  }, rippleDuration * 1000);
});
