/* Coffee Lab - shared site JS */

(function () {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav.primary');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
  }

  // Menu tabs (only on menu page)
  const tabs = document.querySelectorAll('.menu-tab');
  const sections = document.querySelectorAll('.menu-section');
  if (tabs.length && sections.length) {
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        tabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        const targetEl = document.getElementById(target);
        if (targetEl) {
          targetEl.classList.add('active');
          // Scroll into view smoothly
          window.scrollTo({ top: targetEl.offsetTop - 100, behavior: 'smooth' });
        }
      });
    });
  }

  // Toast forms - placeholder behavior
  // In production, the shop will swap these with the actual Toast embed scripts
  // (Toast provides JS embed snippets for rewards and email capture)
  document.querySelectorAll('.toast-form').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Connecting to Toast...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '✓ Thanks for signing up!';
        form.querySelectorAll('input').forEach(i => i.value = '');
        setTimeout(() => {
          btn.textContent = original;
          btn.disabled = false;
        }, 2400);
      }, 900);
    });
  });

  // Login link - opens Toast phone-based login
  document.querySelectorAll('[data-toast-login]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      // In production, this would navigate to the merchant Toast login URL,
      // e.g. https://www.toasttab.com/coffee-lab/rewardsSignin
      alert('🐾 Toast Login\n\nIn production this opens Toast\'s phone-number login page where guests verify with a code.');
    });
  });

  // Reveal-on-scroll for sections
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.style.opacity = 1;
          en.target.style.transform = 'translateY(0)';
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .7s ease, transform .7s ease';
      obs.observe(el);
    });
  }
})();
