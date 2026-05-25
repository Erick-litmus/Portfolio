/* ===== NAVBAR SCROLL ===== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ===== HAMBURGER MENU ===== */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ===== ACTIVE NAV LINK ON SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

/* ===== TYPEWRITER ===== */
const words = ['web apps.', 'fast APIs.', 'cool UIs.', 'great products.'];
let wordIndex = 0, charIndex = 0, deleting = false;
const typeTarget = document.getElementById('typewriter');

function type() {
  const word = words[wordIndex];
  typeTarget.textContent = deleting ? word.slice(0, charIndex--) : word.slice(0, charIndex++);
  if (!deleting && charIndex > word.length) {
    deleting = true;
    setTimeout(type, 1800);
    return;
  }
  if (deleting && charIndex < 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }
  setTimeout(type, deleting ? 60 : 110);
}
type();

/* ===== PARTICLES ===== */
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.1
  };
}
for (let i = 0; i < 100; i++) particles.push(createParticle());

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(168,85,247,${p.alpha})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ===== SCROLL REVEAL ===== */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.glass-card, .stat-card, .section-header, .hero-text, .about-text, .contact-info').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

/* ===== CONTACT FORM ===== */
const form = document.getElementById('contact-form');
const success = document.getElementById('form-success');
const btnText = document.getElementById('btn-text');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  btnText.textContent = 'Sending...';
  setTimeout(() => {
    btnText.textContent = 'Send Message 🚀';
    success.classList.add('show');
    form.reset();
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1200);
});

/* ===== FOOTER YEAR ===== */
document.getElementById('footer-year').textContent = new Date().getFullYear();
