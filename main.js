/* ============================================
   LANGATA NAIL LOUNGE — INTERACTIONS
   Engineered by Dw33pY
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- PRELOADER ----------
     Hides the preloader after a delay.
     The number below (2500) is the time in milliseconds (ms).
     1000ms = 1 second. Increase to show preloader longer, decrease to show it shorter. */
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 3500);   /* ← Preloader duration in ms */

  /* ---------- NAVBAR & REVEAL OPTIMIZATION ----------
     Handles navbar background change on scroll, scroll progress bar width,
     back-to-top button visibility, and reveal-on-scroll animations. */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const elementsToReveal = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  let ticking = false;

  const handleScroll = () => {
    const scrollY = window.scrollY;

    // Toggle 'scrolled' class on navbar after scrolling 50px down
    if (scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    // Update scroll progress bar width based on how far we've scrolled
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / docHeight) * 100;
    scrollProgress.style.width = progress + '%';

    // Show back-to-top button after scrolling 500px down
    if (scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');

    // Reveal elements when they enter the viewport (85% of viewport height)
    const triggerPoint = window.innerHeight * 0.85;
    elementsToReveal.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerPoint && !el.classList.contains('active')) {
        el.classList.add('active');
      }
    });

    ticking = false;
  };

  // Use requestAnimationFrame for smooth, performance-friendly scrolling
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  handleScroll();   // Run once on load

  /* ---------- MOBILE MENU ----------
     Opens/closes the fullscreen mobile menu.
     Also locks body scroll while the menu is open. */
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');
  const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-cta');

  const toggleMenu = (open) => {
    const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('active');
    mobileMenu.classList.toggle('active', isOpen);
    menuToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
  
  if (mobileClose) {
    mobileClose.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu(false);
    });
  }
  
  mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));
  
  // Close menu with the Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) toggleMenu(false);
  });

  /* ---------- BACK TO TOP ---------- */
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- SERVICES FILTER ----------
     Filters service categories by their data-cat attribute.
     Buttons with data-filter="all" show every category. */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const categories = document.querySelectorAll('.service-category');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      categories.forEach(cat => {
        if (filter === 'all' || cat.dataset.cat === filter) {
          cat.classList.remove('hidden');
        } else {
          cat.classList.add('hidden');
        }
      });
    });
  });

  /* ---------- MOBILE GALLERY CAROUSEL NAVIGATION ----------
     Scrolls the gallery horizontally by 80% of the viewport width.
     Only functional on mobile where the carousel layout is active. */
  const galleryGrid = document.querySelector('.masonry-grid');
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');

  if (galleryGrid && galleryPrev && galleryNext) {
    galleryPrev.addEventListener('click', () => {
      // Scroll left by 80% of the grid's visible width
      galleryGrid.scrollBy({ left: -galleryGrid.clientWidth * 0.8, behavior: 'smooth' });
    });
    galleryNext.addEventListener('click', () => {
      // Scroll right by 80% of the grid's visible width
      galleryGrid.scrollBy({ left: galleryGrid.clientWidth * 0.8, behavior: 'smooth' });
    });
  }

  /* ---------- BOOKING FORM → WHATSAPP ----------
     Form data is composed into a WhatsApp message and opens wa.me link.
     Phone number below (254720158167) is the destination WhatsApp number.
     Change it if you want to redirect to a different number. */
  const bookingForm = document.getElementById('bookingForm');
  const formNote = document.getElementById('formNote');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(bookingForm);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const service = formData.get('service');
      const date = formData.get('date');
      const notes = formData.get('notes');

      // Build WhatsApp message — %0A = newline character in URL encoding
      const message = `Hello Langata Nail Lounge! I'd like to book an appointment.%0A%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0APreferred Date: ${date}%0ANotes: ${notes || 'None'}`;
      const waUrl = `https://wa.me/254720158167?text=${message}`;

      formNote.textContent = 'Redirecting to WhatsApp...';
      formNote.className = 'form-note success';

      setTimeout(() => {
        window.open(waUrl, '_blank');
        bookingForm.reset();
        setTimeout(() => { formNote.textContent = ''; formNote.className = 'form-note'; }, 2000);
      }, 800);   /* 800ms delay before opening WhatsApp */
    });
  }

  /* ---------- LIGHTBOX FUNCTIONALITY ----------
     Opens gallery images in a fullscreen overlay with prev/next navigation. */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const galleryItems = document.querySelectorAll('.masonry-item');
  let currentImageIndex = 0;
  const imageSources = Array.from(galleryItems).map(item => item.querySelector('img').src);

  const openLightbox = (index) => {
    currentImageIndex = index;
    lightboxImg.src = imageSources[currentImageIndex];
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${imageSources.length}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showPrev = () => {
    currentImageIndex = (currentImageIndex - 1 + imageSources.length) % imageSources.length;
    openLightbox(currentImageIndex);
  };

  const showNext = () => {
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;
    openLightbox(currentImageIndex);
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', showPrev);
  lightboxNext.addEventListener('click', showNext);

  // Swipe support for mobile — swipe threshold is 50px
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);

  lightbox.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) showNext();
      else showPrev();
    }
  }, false);

  /* ---------- CUSTOM CURSOR ----------
     Only runs on devices with a precise pointer (mouse, not touch).
     The follower lags behind the cursor for a smooth trailing effect. */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = 0, mouseY = 0, followX = 0, followY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX; 
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    // Trailing follower — 0.15 is the lag/speed factor (lower = more lag)
    const animateFollower = () => {
      followX += (mouseX - followX) * 0.15;
      followY += (mouseY - followY) * 0.15;
      follower.style.left = followX + 'px';
      follower.style.top = followY + 'px';
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    // Hover effect on interactive elements
    const hoverables = document.querySelectorAll('a, button, .service-item, .masonry-item');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => follower.classList.add('hover'));
      el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
    });
  }

  /* ---------- ACTIVE NAV ON SCROLL ----------
     Highlights the current section's nav link as you scroll. */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;   // 100px offset for navbar height
      if (scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* ---------- MIN DATE TODAY ----------
     Prevents users from booking a date in the past. */
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }
});