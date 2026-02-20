/* ========================================
   MáLà Food — Site JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Swiper Init ---------- */
  const menuSwiper = new Swiper('.menu-swiper', {
    slidesPerView: 'auto',
    spaceBetween: 16,
    grabCursor: true,
    freeMode: {
      enabled: true,
      sticky: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: { spaceBetween: 20 },
      1024: { spaceBetween: 24 },
    },
  });

  /* ---------- Menu Tab Filtering ---------- */
  const tabs = document.querySelectorAll('.menu-tab');
  const slides = document.querySelectorAll('.menu-swiper .swiper-slide');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      slides.forEach(slide => {
        const categories = slide.dataset.category || '';
        if (filter === 'all' || categories.includes(filter)) {
          slide.style.display = '';
        } else {
          slide.style.display = 'none';
        }
      });

      menuSwiper.update();
      menuSwiper.slideTo(0, 300);
    });
  });

  /* ---------- Sticky Header ---------- */
  const header = document.getElementById('siteHeader');
  const hero = document.getElementById('hero');

  const headerObserver = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('visible', !entry.isIntersecting);
    },
    { threshold: 0, rootMargin: '-80px 0px 0px 0px' }
  );

  headerObserver.observe(hero);

  /* ---------- Floating Mobile CTA ---------- */
  const floatingCta = document.getElementById('floatingCta');

  const floatingObserver = new IntersectionObserver(
    ([entry]) => {
      if (window.innerWidth <= 640) {
        floatingCta.classList.toggle('visible', !entry.isIntersecting);
      }
    },
    { threshold: 0 }
  );

  floatingObserver.observe(hero);

  window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
      floatingCta.classList.remove('visible');
    }
  });

  /* ---------- Fade-in on Scroll ---------- */
  const fadeElements = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  fadeElements.forEach(el => fadeObserver.observe(el));

  /* ---------- Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});