// Cursor Follower Dot
const follower = document.getElementById("follower");
let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
let posX = mouseX, posY = mouseY, vx = 0, vy = 0;
const stiffness = 0.1, damping = 0.75;

function updateFollowerVisibility() {
  followerContainer.style.display = window.innerWidth < 700 ? "none" : "block";
}
window.addEventListener("resize", updateFollowerVisibility);
updateFollowerVisibility();

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateFollower() {
  const dx = mouseX - posX;
  const dy = mouseY - posY;
  vx += dx * stiffness;
  vy += dy * stiffness;
  vx *= damping;
  vy *= damping;
  posX += vx;
  posY += vy;
  follower.style.transform = `translate3d(${posX - 20}px, ${posY - 20}px, 0)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();
