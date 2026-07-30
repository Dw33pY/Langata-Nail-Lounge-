/* ============================================
   LANGATA NAIL LOUNGE — INTERACTIONS
   Engineered by Dw33pY
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- PRELOADER ---------- */
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
  }, 3500); 

  /* ---------- NAVBAR & REVEAL OPTIMIZATION ---------- */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');
  const elementsToReveal = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  let ticking = false;

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / docHeight) * 100;
    scrollProgress.style.width = progress + '%';

    if (scrollY > 500) backToTop.classList.add('show');
    else backToTop.classList.remove('show');

    const triggerPoint = window.innerHeight * 0.85;
    elementsToReveal.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < triggerPoint && !el.classList.contains('active')) {
        el.classList.add('active');
      }
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });

  handleScroll(); 

  /* ---------- MOBILE MENU ---------- */
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
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) toggleMenu(false);
  });

  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      toggleMenu(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
      toggleMenu(false);
    }
  });

  /* ---------- BACK TO TOP ---------- */
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- SERVICES FILTER ---------- */
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

  /* ---------- MOBILE GALLERY CAROUSEL NAVIGATION ---------- */
  const galleryGrid = document.querySelector('.masonry-grid');
  const galleryPrev = document.getElementById('galleryPrev');
  const galleryNext = document.getElementById('galleryNext');

  if (galleryGrid && galleryPrev && galleryNext) {
    galleryPrev.addEventListener('click', () => {
      galleryGrid.scrollBy({ left: -galleryGrid.clientWidth * 0.8, behavior: 'smooth' });
    });
    galleryNext.addEventListener('click', () => {
      galleryGrid.scrollBy({ left: galleryGrid.clientWidth * 0.8, behavior: 'smooth' });
    });
  }

  /* ---------- CUSTOM SELECT DROPDOWN ---------- */
  const customSelect = document.getElementById('customServiceSelect');
  if (customSelect) {
    const trigger = customSelect.querySelector('.custom-select-trigger');
    const options = customSelect.querySelectorAll('.custom-option');
    const hiddenInput = customSelect.querySelector('input[type="hidden"]');
    const selectText = customSelect.querySelector('.custom-select-text');

    // Open/Close dropdown
    trigger.addEventListener('click', () => {
      customSelect.classList.toggle('open');
    });

    // Select option
    options.forEach(option => {
      option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        hiddenInput.value = value;
        selectText.textContent = value;
        selectText.classList.remove('placeholder'); // Remove muted color
        
        // Remove selected from all, add to clicked
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        // Close dropdown
        customSelect.classList.remove('open');
      });
    });

    // Close if clicked outside
    document.addEventListener('click', (e) => {
      if (!customSelect.contains(e.target)) {
        customSelect.classList.remove('open');
      }
    });
  }

  /* ---------- BOOKING FORM → WHATSAPP ---------- */
  const bookingForm = document.getElementById('bookingForm');
  const formNote = document.getElementById('formNote');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(bookingForm);
      const name = formData.get('name');
      const phone = formData.get('phone');
      const service = formData.get('service'); // Gets value from our hidden input
      const date = formData.get('date');
      const notes = formData.get('notes');

      // Simple validation to ensure custom dropdown was selected
      if (!service) {
        formNote.textContent = 'Please select a service.';
        formNote.className = 'form-note';
        formNote.style.color = '#D4A5A5'; // Rose color for error
        return;
      }

      const message = `Hello Langata Nail Lounge! I'd like to book an appointment.%0A%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0APreferred Date: ${date}%0ANotes: ${notes || 'None'}`;
      const waUrl = `https://wa.me/254720158167?text=${message}`;

      formNote.textContent = 'Redirecting to WhatsApp...';
      formNote.className = 'form-note success';
      formNote.style.color = ''; // Reset color

      setTimeout(() => {
        window.open(waUrl, '_blank');
        bookingForm.reset();
        
        // Reset custom dropdown visually
        const selectText = document.querySelector('.custom-select-text');
        const hiddenInput = document.getElementById('service');
        const options = document.querySelectorAll('.custom-option');
        if(selectText) {
            selectText.textContent = 'Select service';
            selectText.classList.add('placeholder');
        }
        if(hiddenInput) hiddenInput.value = '';
        if(options) options.forEach(opt => opt.classList.remove('selected'));

        setTimeout(() => { formNote.textContent = ''; formNote.className = 'form-note'; }, 2000);
      }, 800);
    });
  }

  /* ---------- LIGHTBOX FUNCTIONALITY ---------- */
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

  /* ---------- CUSTOM CURSOR ---------- */
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

    const animateFollower = () => {
      followX += (mouseX - followX) * 0.15;
      followY += (mouseY - followY) * 0.15;
      follower.style.left = followX + 'px';
      follower.style.top = followY + 'px';
      requestAnimationFrame(animateFollower);
    };
    animateFollower();

    const hoverables = document.querySelectorAll('a, button, .service-item, .masonry-item, input, textarea, .custom-select-trigger, .custom-option');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => follower.classList.add('hover'));
      el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
    });
  }

  /* ---------- ACTIVE NAV ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
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

  /* ---------- MIN DATE TODAY ---------- */
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }
});