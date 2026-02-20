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

  /* ---------- Set default booking date to today ---------- */
  const dateInput = document.getElementById('bookDate');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.value = today;
    dateInput.min = today;
  }

});

/* ---------- Booking Modal ---------- */
function openBooking() {
  document.getElementById('bookingModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBooking() {
  document.getElementById('bookingModal').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('bookingModal').addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeBooking();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeBooking();
});

let guestCount = 2;
function updateGuests(delta) {
  guestCount = Math.max(1, Math.min(12, guestCount + delta));
  document.getElementById('guestCount').textContent = guestCount;
}