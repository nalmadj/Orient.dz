/* ============================================================
   ORIENTDZ — Main Entry Point
   Initialisation globale de tous les composants
   ============================================================ */

import { initNavbar } from './components/navbar.js';
import { initToast }  from './components/toast.js';

// ── Scroll reveal avec IntersectionObserver ──
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Désobserver après animation pour économiser les ressources
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-scale').forEach((el) => {
    observer.observe(el);
  });
}

// ── Animation des compteurs stats ──
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el     = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const isDecimal = target % 1 !== 0;
        const duration = 1800;
        const start    = performance.now();

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          const value = target * ease;
          el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => observer.observe(el));
}

// ── Smooth scroll pour ancres internes ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // Fermer le menu mobile si ouvert
      document.body.classList.remove('nav-open');
    });
  });
}

// ── Initialisation au chargement ──
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initToast();
  initScrollReveal();
  initCounters();
  initSmoothScroll();
});
