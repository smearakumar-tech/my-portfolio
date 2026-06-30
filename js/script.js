/**
 * Smeara Kumar Portfolio — script.js
 * Typing animation, sticky navbar, scroll reveal,
 * progress bars, scroll-to-top, contact form.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================
     1. STICKY NAVBAR – add .scrolled class on scroll
  ======================================================== */
  const navbar = document.getElementById('mainNavbar');
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ========================================================
     2. COLLAPSE MOBILE MENU ON NAV LINK CLICK
  ======================================================== */
  const navCollapseEl = document.getElementById('navCollapse');
  if (navCollapseEl) {
    const bsCollapse = new bootstrap.Collapse(navCollapseEl, { toggle: false });
    document.querySelectorAll('#navCollapse .nav-link').forEach(link => {
      link.addEventListener('click', () => {
        // Only collapse when toggler is visible (mobile)
        const toggler = document.getElementById('navToggler');
        if (toggler && window.getComputedStyle(toggler).display !== 'none') {
          bsCollapse.hide();
        }
      });
    });
  }

  /* ========================================================
     3. TYPING ANIMATION
  ======================================================== */
  const typingEl = document.getElementById('typingEl');
  if (typingEl) {
    const roles = [
      'Full-Stack Developer',
      'UI/UX Designer',
      'Software Engineer',
      'AI Enthusiast',
      'Problem Solver'
    ];
    let ri = 0, ci = 0, deleting = false, speed = 120;

    const typeNext = () => {
      const current = roles[ri];
      typingEl.textContent = deleting
        ? current.substring(0, ci - 1)
        : current.substring(0, ci + 1);

      if (deleting) {
        ci--;
        speed = 55;
      } else {
        ci++;
        speed = 120;
      }

      if (!deleting && ci === current.length) {
        speed = 2200;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        speed = 500;
      }
      setTimeout(typeNext, speed);
    };
    setTimeout(typeNext, 1000);
  }

  /* ========================================================
     4. SCROLL-TO-TOP BUTTON
  ======================================================== */
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      scrollBtn.classList.toggle('show', window.scrollY > 420);
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ========================================================
     5. INTERSECTION OBSERVER — SCROLL REVEAL
  ======================================================== */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => revealObserver.observe(el));
  }

  /* ========================================================
     6. ANIMATED PROGRESS BARS (triggered by IntersectionObserver)
  ======================================================== */
  const animateBars = (entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-width]').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        obs.unobserve(entry.target);
      }
    });
  };

  const barSections = document.querySelectorAll('.skills-section');
  if (barSections.length) {
    const barObserver = new IntersectionObserver(animateBars, { threshold: 0.1 });
    barSections.forEach(section => barObserver.observe(section));
  }

  /* ========================================================
     7. CONTACT FORM — VALIDATION & SIMULATED SUBMISSION
  ======================================================== */
  const form = document.getElementById('contactForm');
  const successBox = document.getElementById('formSuccess');
  const sendBtn = document.getElementById('sendMsgBtn');

  if (form && sendBtn) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
      }

      // Show loading state
      sendBtn.disabled = true;
      const origHTML = sendBtn.innerHTML;
      sendBtn.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Sending…
      `;

      // Simulate async send (1.8 s)
      setTimeout(() => {
        sendBtn.innerHTML = `<i class="bi bi-check2-all me-2"></i>Sent Successfully!`;
        if (successBox) {
          successBox.classList.remove('d-none');
          successBox.classList.add('d-flex');
        }

        // Reset after 8 s
        setTimeout(() => {
          form.reset();
          form.classList.remove('was-validated');
          sendBtn.disabled = false;
          sendBtn.innerHTML = origHTML;
          if (successBox) {
            successBox.classList.add('d-none');
            successBox.classList.remove('d-flex');
          }
        }, 8000);
      }, 1800);
    });
  }

});
