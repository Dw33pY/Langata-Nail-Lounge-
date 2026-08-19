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

  /* ---------- LIGHTBOX FUNCTIONALITY (Dynamic for Infinite Scroll) ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');
  
  let currentImageIndex = 0;
  let imageSources = []; 

  // Function to update lightbox sources (called on load and after new images load)
  function updateLightboxSources() {
    const galleryItems = document.querySelectorAll('.masonry-item');
    imageSources = Array.from(galleryItems).map(item => item.querySelector('img').src);
    
    // Attach click listeners to any items that don't have them yet
    galleryItems.forEach((item, index) => {
      if (!item.dataset.lightboxListener) {
        item.addEventListener('click', () => openLightbox(index));
        item.dataset.lightboxListener = "true";
      }
    });
  }

  const openLightbox = (index) => {
    currentImageIndex = index;
    // Ensure index stays in bounds
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

  // Initial population of lightbox sources
  updateLightboxSources();

  /* ---------- GALLERY PAGE INFINITE SCROLL ---------- */
  const infiniteGrid = document.querySelector('.gallery-page-grid');
  const trigger = document.getElementById('loadMoreTrigger');
  const loader = document.getElementById('galleryLoader');

  if (infiniteGrid && trigger) {
    // Array of the 10 new images
    const newImages = [
      "https://z-cdn-media.chatglm.cn/files/b8f78a4c-ac1b-4fd7-92ac-910ca30457a8.jpg?auth_key=1887155789-edf6e90a764c4d20b27d88d03fdfa473-0-095407898cecb54655e6d3754c7cf6aa",
      "https://z-cdn-media.chatglm.cn/files/9fd36019-d257-4725-a65e-1e4404cfbac9.jpg?auth_key=1887155789-546866f2948d444688b52c98b0913260-0-638998e948dbb85fbc4824d90cd537af",
      "https://z-cdn-media.chatglm.cn/files/11a8f749-92af-4d05-9455-b5d456e3cd43.jpg?auth_key=1887155789-41973554f6294d39a417ac8c762880c5-0-4325d9f1cce1527b9a825996e29618b3",
      "https://z-cdn-media.chatglm.cn/files/7f6fcea6-fb18-4eb8-bf4b-bd4d23983355.jpg?auth_key=1887155789-6805290b535446568a137b0efab80985-0-05bbf107116cbc16e8f57cf18aebdec9",
      "https://z-cdn-media.chatglm.cn/files/fd001569-b7e8-42f2-8e10-d0b2964c6bf6.jpg?auth_key=1887155789-2b1ff73050634c3f9c7e9812fd79ddbc-0-26ceadfb3874895da8861db4f9f75ad6",
      "https://z-cdn-media.chatglm.cn/files/c5419702-1245-452c-9c08-53180d56ab30.jpg?auth_key=1887155789-847b2ca1161e444a9b9feda851bede6f-0-b4383473f0f7b2fa79d9ed34ec8fec94",
      "https://z-cdn-media.chatglm.cn/files/1c16f23f-56b4-4431-9cb0-96e7e72e65d6.jpg?auth_key=1887155789-8cd5b824e7b64765a7853885a05dbb8b-0-3cfe635e7ce066b4da7552593f536f94",
      "https://z-cdn-media.chatglm.cn/files/1c8d6429-64df-4d84-9418-74ed0c870fa2.jpg?auth_key=1887155789-75df6e9ecc6d4d129bc0a12c9d84f363-0-bcecd6b51864f8e55286954f69d24ce9",
      "https://z-cdn-media.chatglm.cn/files/5930022f-a758-467d-ac3c-0798e61110f3.jpg?auth_key=1887155789-14eeded02ba649939beaa13ef8a18255-0-a7ba4bfb5a67130bb7f73ac8653f79dd",
      "https://z-cdn-media.chatglm.cn/files/a942828f-c0c5-4b01-a26e-2a05e6abcf31.jpg?auth_key=1887155789-fe6980774218496fb244c5928b87a192-0-fa2daf46dd499769890cb12c03573643"
    ];

    let imageIndex = 0;

    function loadMoreImages() {
      if (imageIndex >= newImages.length) {
        trigger.style.display = 'none';
        return;
      }

      loader.style.display = 'block';

      // Simulate a slight network delay for the loader effect
      setTimeout(() => {
        // Load up to 5 images at a time when scrolled
        for(let i = 0; i < 5; i++) {
          if (imageIndex < newImages.length) {
            const src = newImages[imageIndex];
            const div = document.createElement('div');
            div.className = 'masonry-item reveal-up active';
            div.innerHTML = `
              <img src="${src}" alt="Gallery Image ${imageIndex + 11}" loading="lazy">
              <div class="gallery-hover"><i class="fas fa-expand"></i></div>
            `;
            infiniteGrid.appendChild(div);
            imageIndex++;
          }
        }
        
        loader.style.display = 'none';
        
        // Update lightbox sources to include the newly added images
        updateLightboxSources();
        
        if (imageIndex >= newImages.length) {
          trigger.style.display = 'none';
        }
      }, 800);
    }

    // Intersection Observer to trigger loading when user scrolls near the bottom
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMoreImages();
      }
    }, { rootMargin: '200px' }); // Start loading when 200px away from the bottom
    
    observer.observe(trigger);
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