// Floating Image Animation
const imgContainer = document.querySelector('.image-container');
const floatRange = 15;
const floatSpeed = 5;
let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;
let lastTimestamp = null;

function getRandomOffset() {
  return [
    Math.random() * 2 * floatRange - floatRange,
    Math.random() * 2 * floatRange - floatRange
  ];
}

function pickNewTarget() {
  [targetX, targetY] = getRandomOffset();
}

function animateFloat(ts) {
  if (!lastTimestamp) lastTimestamp = ts;
  const dt = (ts - lastTimestamp) / 1000;
  lastTimestamp = ts;

  const dx = targetX - currentX;
  const dy = targetY - currentY;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < 1) {
    pickNewTarget();
  } else {
    const moveDist = floatSpeed * dt;
    if (moveDist >= dist) {
      currentX = targetX;
      currentY = targetY;
    } else {
      currentX += (dx / dist) * moveDist;
      currentY += (dy / dist) * moveDist;
    }
  }

  imgContainer.style.transform = `translateY(-50%) translate(${currentX}px, ${currentY}px)`;

  requestAnimationFrame(animateFloat);
}
pickNewTarget();
requestAnimationFrame(animateFloat);
