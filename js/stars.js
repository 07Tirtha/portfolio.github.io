// Canvas Star Background
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let width, height;
let stars = [];
let numStars = window.innerWidth < 700 ? 80 : 200;
const connectRadius = 80;
let starColor = "255,255,255"; // default

function resizeCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
  numStars = width < 700 ? 80 : 200;
  generateStars();
}
window.addEventListener("resize", resizeCanvas);

function generateStars() {
  stars = [];
  for (let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 1.5
    });
  }
}
resizeCanvas();

function animateStars() {
  ctx.clearRect(0, 0, width, height);
  for (const star of stars) {
    star.x += star.vx;
    star.y += star.vy;
    if (star.x < 0 || star.x > width) star.vx *= -1;
    if (star.y < 0 || star.y > height) star.vy *= -1;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${starColor})`;
    ctx.fill();
  }
  for (let i = 0; i < stars.length; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      const dx = stars[i].x - stars[j].x;
      const dy = stars[i].y - stars[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < connectRadius) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.strokeStyle = `rgba(${starColor},${1 - dist / connectRadius})`;
        ctx.lineWidth = 0.4;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(animateStars);
}