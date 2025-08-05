// Accessible Navigation
const tabButtons = document.querySelectorAll('.tab-btn');
tabButtons.forEach(btn => {
  btn.setAttribute('tabindex', '0');
  btn.setAttribute('role', 'button');
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') btn.click();
  });
});
