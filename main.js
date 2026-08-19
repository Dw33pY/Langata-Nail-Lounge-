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

  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }
  
  if (mobileClose) {
    mobileClose.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu(false);
    });
  }
  
  mobileLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) toggleMenu(false);
  });

  if (mobileMenu) {
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        toggleMenu(false);
      }
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
      toggleMenu(false);
    }
  });

  /* ---------- BACK TO TOP ---------- */
  if (backToTop) {
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

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

  /* ---------- MOBILE GALLERY CAROUSEL NAVIGATION (Index Page Only) ---------- */
  const galleryGrid = document.querySelector('.masonry-grid:not(.gallery-page-grid)');
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

    trigger.addEventListener('click', () => {
      customSelect.classList.toggle('open');
    });

    options.forEach(option => {
      option.addEventListener('click', () => {
        const value = option.getAttribute('data-value');
        hiddenInput.value = value;
        selectText.textContent = value;
        selectText.classList.remove('placeholder'); 
        
        options.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        
        customSelect.classList.remove('open');
      });
    });

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
      const service = formData.get('service'); 
      const date = formData.get('date');
      const notes = formData.get('notes');

      if (!service) {
        formNote.textContent = 'Please select a service.';
        formNote.className = 'form-note';
        formNote.style.color = '#D4A5A5'; 
        return;
      }

      const message = `Hello Langata Nail Lounge! I'd like to book an appointment.%0A%0AName: ${name}%0APhone: ${phone}%0AService: ${service}%0APreferred Date: ${date}%0ANotes: ${notes || 'None'}`;
      const waUrl = `https://wa.me/254720158167?text=${message}`;

      formNote.textContent = 'Redirecting to WhatsApp...';
      formNote.className = 'form-note success';
      formNote.style.color = ''; 

      setTimeout(() => {
        window.open(waUrl, '_blank');
        bookingForm.reset();
        
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

  /* ---------- LIGHTBOX FUNCTIONALITY (Dynamic & HD) ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');
  
  let currentImageIndex = 0;
  let imageSources = []; 

  function updateLightboxSources() {
    const galleryItems = document.querySelectorAll('.masonry-item');
    imageSources = Array.from(galleryItems).map(item => {
      const img = item.querySelector('img');
      return img.dataset.fullsrc || img.src;
    });
    
    galleryItems.forEach((item, index) => {
      if (!item.dataset.lightboxListener) {
        item.addEventListener('click', () => openLightbox(index));
        item.dataset.lightboxListener = "true";
      }
    });
  }

  const openLightbox = (index) => {
    currentImageIndex = index;
    if (currentImageIndex >= imageSources.length) currentImageIndex = 0;
    if (currentImageIndex < 0) currentImageIndex = imageSources.length - 1;
    
    lightboxImg.src = imageSources[currentImageIndex];
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${imageSources.length}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  const showPrev = () => { openLightbox(currentImageIndex - 1); };
  const showNext = () => { openLightbox(currentImageIndex + 1); };

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrev);
  if (lightboxNext) lightboxNext.addEventListener('click', showNext);

  let touchStartX = 0;
  if (lightbox) {
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
  }

  /* ---------- MAGIC LOOP: GALLERY PAGE INFINITE SCROLL & VIDEO INJECTION ---------- */
  const masonryGrid = document.getElementById('masonryGrid');
  const trigger = document.getElementById('loadMoreTrigger');
  const loader = document.getElementById('galleryLoader');
  const videoGrid = document.getElementById('videoGrid');

  if (masonryGrid && trigger) {
    const totalImages = 58;
    
    let imageArray = [];
    // Sequential array [1.jpg, 2.jpg, ..., 58.jpg] for perfect CDN caching
    for (let i = 1; i <= totalImages; i++) {
      imageArray.push(`${i}.jpg`);
    }

    let loadedImages = 0;
    const imagesPerLoad = 10;

    function loadImages() {
      if (loadedImages >= totalImages) {
        trigger.style.display = 'none';
        return;
      }

      loader.style.display = 'block';

      // Small timeout to allow loader to visually render without freezing UI
      setTimeout(() => {
        for(let i = 0; i < imagesPerLoad; i++) {
          if (loadedImages < totalImages) {
            const src = imageArray[loadedImages];
            const div = document.createElement('div');
            div.className = 'masonry-item reveal-up active';
            
            // Removed Vercel Optimizer to fix 404 errors. 
            // Loading raw image directly with fade-in effect.
            div.innerHTML = `
              <img src="${src}" data-fullsrc="${src}" alt="Langata Nail Lounge Artistry ${loadedImages + 1}" loading="lazy" decoding="async" fetchpriority="low" style="opacity: 0; transition: opacity 0.5s ease;" onload="this.style.opacity=1;">
              <div class="gallery-hover"><i class="fas fa-expand"></i></div>
            `;
            masonryGrid.appendChild(div);
            loadedImages++;
          }
        }
        
        loader.style.display = 'none';
        updateLightboxSources(); 
        
        if (loadedImages >= totalImages) {
          trigger.style.display = 'none';
        }
      }, 200);
    }

    loadImages();

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadImages();
      }
    }, { rootMargin: '200px' }); 
    
    observer.observe(trigger);
  }

  // Inject Videos into the Video Grid
  if (videoGrid) {
    const totalVideos = 8;
    for (let i = 1; i <= totalVideos; i++) {
      const videoItem = document.createElement('div');
      videoItem.className = 'video-gallery-item reveal-up active';
      videoItem.style.transitionDelay = `${i * 0.1}s`;
      
      // preload="none" stops the browser from downloading the video until the user clicks play
      videoItem.innerHTML = `
        <video controls preload="none" playsinline>
          <source src="${i}.mp4#t=0.1" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
      videoGrid.appendChild(videoItem);
    }
  }

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

    const hoverables = document.querySelectorAll('a, button, .service-item, .masonry-item, input, textarea, .custom-select-trigger, .custom-option, video');
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