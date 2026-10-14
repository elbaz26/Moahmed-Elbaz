/**
 * ==========================================================================
 * MOHAMED IBRAHIM ELBAZ YOUSSEF - DEVELOPER PORTFOLIO
 * Core Interactions & Utilities (Vanilla JavaScript)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileNavigation();
  initScrollSpy();
  initScrollReveal();
  initContactForm();
  initBackToTop();
  initCertificateModal();
  initProjectGallery();
  updateCurrentYear();
});

/**
 * 1. Theme Switcher (Dark Mode is Default, Light Mode Supported)
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  // Retrieve saved preference or default to 'dark'
  const savedTheme = localStorage.getItem('site-theme') || 'dark';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('site-theme', newTheme);
  });
}

function applyTheme(theme) {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', 'Switch to dark theme');
      themeToggleBtn.setAttribute('title', 'Switch to dark theme');
    }
  } else {
    document.documentElement.removeAttribute('data-theme');
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', 'Switch to light theme');
      themeToggleBtn.setAttribute('title', 'Switch to light theme');
    }
  }
}

/**
 * 2. Mobile Responsive Navigation Drawer
 */
function initMobileNavigation() {
  const hamburger = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!hamburger || !navMenu) return;

  const toggleMenu = () => {
    const isOpen = hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close drawer on any navigation link click
  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}

/**
 * 3. Sticky Navbar & Scroll Spy for Active Navigation Links
 */
function initScrollSpy() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const onScroll = () => {
    const scrollY = window.scrollY;

    // Navbar shadow on scroll
    if (navbar) {
      if (scrollY > 30) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // ScrollSpy active link detection
    let currentActiveId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentActiveId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // initial trigger
}

/**
 * 4. Scroll Reveal Animations (Subtle & Professional)
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

/**
 * 5. Interactive Contact Form Handling
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-alert');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      alert('Please complete all required fields.');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Loading simulation
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending message...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      if (alertBox) {
        alertBox.className = 'form-alert success';
        alertBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you, ' + escapeHtml(nameInput.value.trim()) + '! Your message has been prepared. Mohamed will get back to you shortly.';
        alertBox.style.display = 'flex';
      }

      contactForm.reset();

      // Auto-hide alert after 8 seconds
      setTimeout(() => {
        if (alertBox) alertBox.style.display = 'none';
      }, 8000);
    }, 750);
  });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * 6. Back to Top Button Interaction
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * 7. Dynamic Year Setter for Footer
 */
function updateCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = '2026';
  }
}

/**
 * 8. Certificate Lightbox Modal Interaction
 */
function initCertificateModal() {
  const modal = document.getElementById('cert-modal');
  if (!modal) return;

  const openTriggers = [
    document.getElementById('cert-thumb-trigger'),
    document.getElementById('open-cert-modal-btn')
  ].filter(Boolean);

  const closeBtn = document.getElementById('cert-modal-close');
  const backdrop = document.getElementById('cert-modal-backdrop');

  const openModal = () => {
    modal.removeAttribute('hidden');
    // Trigger reflow to start transition smoothly
    void modal.offsetWidth;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  };

  const closeModal = () => {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.setAttribute('hidden', '');
      document.body.style.overflow = '';
    }, 300);
  };

  openTriggers.forEach(trigger => {
    trigger.addEventListener('click', openModal);
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/**
 * 9. Project Screenshots Galleries & Lightbox
 */
function initProjectGallery() {
  const toggleButtons = document.querySelectorAll('.gallery-toggle');
  const lightbox = document.getElementById('gallery-lightbox');

  // Toggle Gallery collapse/expand for each gallery toggle button
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('aria-controls');
      const gallery = document.getElementById(targetId);
      if (!gallery) return;
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !isExpanded);
      if (isExpanded) {
        gallery.setAttribute('hidden', '');
      } else {
        gallery.removeAttribute('hidden');
      }
    });
  });

  // Lightbox Modal Logic
  if (!lightbox) return;

  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const backdrop = lightbox.querySelector('.lightbox-backdrop');

  let activeItems = [];
  let currentIndex = 0;

  function showImage(index) {
    if (activeItems.length === 0) return;
    currentIndex = (index + activeItems.length) % activeItems.length;
    const item = activeItems[currentIndex];
    const img = item.querySelector('img');
    const caption = item.getAttribute('data-caption') || (img ? img.alt : '');

    if (img && lightboxImg) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || caption;
    }
    if (lightboxCaption) {
      lightboxCaption.textContent = `${currentIndex + 1} / ${activeItems.length}: ${caption}`;
    }
  }

  function openLightbox(items, index) {
    activeItems = items;
    showImage(index);
    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  const galleries = document.querySelectorAll('.project-gallery');
  galleries.forEach(gallery => {
    const items = Array.from(gallery.querySelectorAll('.gallery-item'));
    items.forEach((item, idx) => {
      item.addEventListener('click', () => openLightbox(items, idx));
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(items, idx);
        }
      });
      if (!item.hasAttribute('tabindex')) {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View ${item.getAttribute('data-caption') || 'screenshot'}`);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImage(currentIndex + 1);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (lightbox.hasAttribute('hidden')) return;

    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowLeft') {
      showImage(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      showImage(currentIndex + 1);
    }
  });

  // Touch swipe navigation for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        showImage(currentIndex - 1); // Swipe right -> Previous
      } else {
        showImage(currentIndex + 1); // Swipe left -> Next
      }
    }
  }, { passive: true });
}
