// Hero entrance animation
setTimeout(() => {
  document.querySelectorAll('.hero-line').forEach(el => el.classList.add('in'));
}, 100);

// Typewriter effect on the name AND tagline (skip if user prefers reduced motion)
const h1 = document.querySelector('#hero h1');
const tagline = document.querySelector('.hero-tagline');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typewrite(el, fullText, perCharBase, perCharVar, onDone) {
  el.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'type-cursor';
  cursor.textContent = '▊';
  el.appendChild(cursor);

  let i = 0;
  const step = () => {
    if (i < fullText.length) {
      el.insertBefore(document.createTextNode(fullText[i]), cursor);
      i++;
      setTimeout(step, perCharBase + Math.random() * perCharVar);
    } else {
      onDone(cursor);
    }
  };
  step();
}

if (h1 && tagline && !prefersReduced) {
  const nameText = h1.textContent.trim();
  const taglineText = tagline.textContent.trim();
  tagline.textContent = '';

  setTimeout(() => {
    typewrite(h1, nameText, 75, 55, (nameCursor) => {
      setTimeout(() => {
        nameCursor.remove();
        typewrite(tagline, taglineText, 45, 35, (tagCursor) => {
          setTimeout(() => {
            tagCursor.classList.add('fade-out');
            setTimeout(() => tagCursor.remove(), 800);
          }, 1000);
        });
      }, 450);
    });
  }, 450);
}


// Music
const music = document.getElementById('bg-music');
music.volume = 0.35;
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

// Typewriter for section labels
if (!prefersReduced) {
  const labelObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent.trim();
      el.textContent = '';

      let j = 0;
      const typeLabel = () => {
        if (j < text.length) {
          el.textContent = text.slice(0, j + 1);
          j++;
          setTimeout(typeLabel, 35 + Math.random() * 40);
        }
      };
      setTimeout(typeLabel, 150);
      labelObserver.unobserve(el);
    });
  }, { threshold: 0.25 });

  document.querySelectorAll('.section-label').forEach(el => labelObserver.observe(el));
}

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

