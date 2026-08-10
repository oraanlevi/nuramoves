/* =============================================================
   NuraMoves — Site behavior
   Nav state, scroll reveals, FAQ accordion, journey slider,
   form handling with success/error states.
   ============================================================= */
document.addEventListener('DOMContentLoaded', () => {

  // Footer year
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Header scroll state
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => document.body.classList.toggle('nav-open'));
    document.querySelectorAll('.nav-list a').forEach(a => {
      a.addEventListener('click', () => document.body.classList.remove('nav-open'));
    });
  }

  // Scroll reveals
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const wasOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('is-open'));
      if (!wasOpen) item.classList.add('is-open');
    });
  });

  // Journey slider
  const slides = Array.from(document.querySelectorAll('.c-journey__slide'));
  const prevBtn = document.querySelector('.c-journey__prev');
  const nextBtn = document.querySelector('.c-journey__next');
  const currentEl = document.querySelector('.c-journey__current');
  if (slides.length && nextBtn) {
    let current = 0;
    const go = next => {
      const prev = current;
      current = (next + slides.length) % slides.length;
      slides[prev].classList.add('is-exit');
      slides[prev].classList.remove('is-active');
      setTimeout(() => slides[prev].classList.remove('is-exit'), 420);
      slides[current].classList.add('is-active');
      if (currentEl) currentEl.textContent = current + 1;
    };
    nextBtn.addEventListener('click', () => go(current + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => go(current - 1));
  }

  // Generic form handler — reusable
  function handleForm(formId, successId, errorId) {
    const form = document.querySelector(formId);
    if (!form) return;
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const successEl = document.querySelector(successId);
      const errorEl = document.querySelector(errorId);
      const endpoint = form.action;

      if (!endpoint || endpoint === window.location.href || endpoint.endsWith('#')) {
        if (errorEl) {
          errorEl.hidden = false;
          errorEl.innerHTML = 'Form endpoint not configured. Please email <a href="mailto:hello@brandnu.body">hello@brandnu.body</a> directly.';
        }
        return;
      }

      const originalText = btn ? btn.innerHTML : '';
      if (btn) { btn.disabled = true; btn.textContent = 'Sending\u2026'; }
      if (errorEl) errorEl.hidden = true;

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          form.hidden = true;
          if (successEl) {
            successEl.hidden = false;
            successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        } else { throw new Error('Server error'); }
      } catch {
        if (btn) { btn.disabled = false; btn.innerHTML = originalText; }
        if (errorEl) errorEl.hidden = false;
      }
    });
  }

  handleForm('#contact-form', '#contact-success', '#contact-error');
  handleForm('#apply-form', '#apply-success', '#apply-error');

  // Waitlist toggle (home page — show/hide form on button click)
  const waitlistToggleBtn = document.querySelector('.service-row__cta--toggle');
  const waitlistAreaEl = document.querySelector('.service-row__waitlist-area');
  if (waitlistToggleBtn && waitlistAreaEl) {
    waitlistToggleBtn.addEventListener('click', () => {
      const isHidden = waitlistAreaEl.hidden;
      waitlistAreaEl.hidden = !isHidden;
      waitlistToggleBtn.textContent = isHidden ? 'Close \u00d7' : 'Join Waitlist \u2192';
    });
  }

  // Waitlist forms (inline — home page + coaching page)
  document.querySelectorAll('.waitlist-form').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const success = form.nextElementSibling;
      const endpoint = form.action;
      if (!endpoint || endpoint.endsWith('#')) {
        if (success && success.classList.contains('waitlist-success')) {
          form.hidden = true;
          success.hidden = false;
        }
        return;
      }
      if (btn) { btn.disabled = true; btn.textContent = 'Joining\u2026'; }
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        if (res.ok && success && success.classList.contains('waitlist-success')) {
          form.hidden = true;
          success.hidden = false;
        } else { throw new Error(); }
      } catch {
        if (btn) { btn.disabled = false; btn.textContent = 'Join Waitlist'; }
      }
    });
  });

});
