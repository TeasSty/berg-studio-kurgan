const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initProofStrip() {
  const strip = document.getElementById('proof-strip');
  const hero = document.getElementById('hero');
  if (!strip || !hero) return;

  const show = () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    const visible = heroBottom < 0;
    strip.classList.toggle('is-visible', visible);
    strip.setAttribute('aria-hidden', visible ? 'false' : 'true');
  };

  window.addEventListener('scroll', show, { passive: true });
  show();
}

function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const header = document.getElementById('header');
  const stickyCta = document.getElementById('sticky-cta');
  const proofStrip = document.getElementById('proof-strip');
  if (!toggle || !menu || !header) return;

  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Открыть меню');
    menu.hidden = true;
    header.classList.remove('is-menu-open');
    document.documentElement.classList.remove('menu-open');
    stickyCta?.classList.remove('is-menu-hidden');
    proofStrip?.classList.remove('is-menu-hidden');
  };

  const open = () => {
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Закрыть меню');
    menu.hidden = false;
    header.classList.add('is-menu-open');
    document.documentElement.classList.add('menu-open');
    stickyCta?.classList.add('is-menu-hidden');
    proofStrip?.classList.add('is-menu-hidden');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? close() : open();
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', close);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1024 && toggle.getAttribute('aria-expanded') === 'true') {
      close();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close();
      toggle.focus();
    }
  });
}

function initStickyCTA() {
  const sticky = document.getElementById('sticky-cta');
  const hero = document.getElementById('hero');
  if (!sticky || !hero) return;

  if (window.innerWidth >= 768) return;

  sticky.setAttribute('aria-hidden', 'false');

  const observer = new IntersectionObserver(
    ([entry]) => {
      sticky.classList.toggle('is-visible', !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: '0px' }
  );

  observer.observe(hero);
}

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.header__nav-link');

  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((link) => {
            const href = link.getAttribute('href');
            link.classList.toggle('is-active', href === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.25, rootMargin: '-35% 0px -45% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
}

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initHeader();
  initProofStrip();
  initMobileMenu();
  initStickyCTA();
  initActiveNav();
});
