// Welcome overlay
const overlay = document.getElementById('welcome-overlay');
const music = document.getElementById('bg-music');
music.volume = 0.35;

function dismissOverlay(playMusic) {
  if (playMusic) {
    music.play();
  }
  overlay.classList.add('hide');
  overlay.addEventListener('transitionend', () => overlay.remove(), { once: true });
  setTimeout(() => {
    document.querySelectorAll('.hero-line').forEach(el => el.classList.add('in'));
  }, 300);
}

document.getElementById('musicYes').addEventListener('click', () => dismissOverlay(true));
document.getElementById('musicNo').addEventListener('click',  () => dismissOverlay(false));

// Nav music toggle
const musicToggle = document.getElementById('music-toggle');
musicToggle.addEventListener('click', () => {
  if (music.paused) { music.play(); } else { music.pause(); }
});

// Keep toggle in sync with music state
music.addEventListener('play',  () => musicToggle.classList.add('is-playing'));
music.addEventListener('pause', () => musicToggle.classList.remove('is-playing'));

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
toggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll fade-in
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

// Stat counter animation
function animateCount(el, target, prefix, suffix) {
  const duration = 1400;
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = prefix + Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const raw = el.dataset.target;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    animateCount(el, parseInt(raw), prefix, suffix);
    statObserver.unobserve(el);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(el => statObserver.observe(el));

