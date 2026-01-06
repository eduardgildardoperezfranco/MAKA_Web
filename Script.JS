import { GalleryUI } from './galleryManager.js';

// Enhance interactions and add corner-docking effect for brain video
// NOTE: This file is intentionally named `Script.js` (lowercase extension) to work on case-sensitive hosts.

document.addEventListener('DOMContentLoaded', () => {
  // Logo hover (kept)
  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('mouseenter', () => {
      logo.style.transform = 'scale(1.1) rotate(5deg)';
    });
    logo.addEventListener('mouseleave', () => {
      logo.style.transform = 'scale(1)';
    });
  }

  // Vanish effect on scroll
  const brainVideo = document.getElementById('brain-video');
  const videoTrigger = document.getElementById('video-trigger');

  if (brainVideo && videoTrigger) {
    let stuck = false;

    function onScroll() {
      const rect = videoTrigger.getBoundingClientRect();

      if (rect.top <= 0 && !stuck) {
        stuck = true;
        brainVideo.classList.add('stuck');
      } else if (rect.top > 0 && stuck) {
        stuck = false;
        brainVideo.classList.remove('stuck');
      }
    }

    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // WhatsApp form submission handler
  const whatsappForm = document.getElementById('whatsapp-form');
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validation
      if (!name) {
        alert('Please enter your name.');
        return;
      }
      if (!phone) {
        alert('Please enter your phone number.');
        return;
      }
      // Basic phone validation: should start with + or contain only digits/spaces/-
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
      if (!phoneRegex.test(phone) || phone.length < 7) {
        alert('Please enter a valid phone number.');
        return;
      }
      if (!message) {
        alert('Please enter your message.');
        return;
      }
      // Check for bad words (basic list)
      const badWords = ['fuck', 'shit', 'damn', 'mierda', 'puta', 'coño', 'pendejo']; // Add more as needed
      const lowerMessage = message.toLowerCase();
      for (let word of badWords) {
        if (lowerMessage.includes(word)) {
          alert('Please use appropriate language in your message.');
          return;
        }
      }

      const whatsappNumber = '+573142274000'; // MAKA WhatsApp number
      const text = `Hello, my name is ${name}. Phone: ${phone}. Message: ${message}`;
      const url = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    });
  }

  // Hamburger menu toggle for mobile
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const menuBackdrop = document.getElementById('menu-backdrop');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      hamburger.classList.toggle('active', isActive);
      if (menuBackdrop) menuBackdrop.classList.toggle('active', isActive);
      hamburger.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close menu when clicking backdrop
    if (menuBackdrop) {
      menuBackdrop.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        menuBackdrop.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    }

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });

    // Close menu when a link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        if (menuBackdrop) menuBackdrop.classList.remove('active');
        hamburger.setAttribute('aria-expanded', false);
        document.body.style.overflow = '';
      });
    });

    // Dropdown functionality for mobile
    const dropdowns = navMenu.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
      const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
      dropdownToggle.addEventListener('click', (e) => {
        if (window.innerWidth <= 992) {
          e.preventDefault();
          dropdown.classList.toggle('active');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        if (!e.target.closest('.nav-item.dropdown')) {
          dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
          });
        }
      }
    });
  }

  // Login functionality - Coming Soon alert
  const loginLink = document.getElementById('login-link');
  if (loginLink) {
    loginLink.addEventListener('click', (e) => {
      e.preventDefault();

      const alertMessage = `
      🔒 Login Feature Coming Soon!

      We're currently working on our secure login system and database integration.

      📅 Expected Availability: Soon
      🎯 Features: Secure access, order history, personalized recommendations

      Thank you for your patience!
      `;

      const userChoice = confirm(alertMessage + '\n\nClick OK to return to the main page or Cancel to stay here.');

      if (userChoice) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Search functionality
  const searchLink = document.getElementById('search-link');
  if (searchLink) {
    searchLink.addEventListener('click', (e) => {
      e.preventDefault();
      const query = prompt('Enter search term:');
      if (query) {
        alert(`Searching for: ${query}`);
        // Implement search logic here
      }
    });
  }

  // Theme toggle with local storage support
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // Load saved theme preference from local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light-theme');
      const icon = themeToggle.querySelector('i');
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }

    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('light-theme');
      const icon = themeToggle.querySelector('i');
      if (document.documentElement.classList.contains('light-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // Cart total (placeholder)
  const cartTotal = document.getElementById('cart-total');
  if (cartTotal) {
    // Example: add to cart
    window.addToCart = (price) => {
      const current = parseFloat(cartTotal.textContent.replace('$', ''));
      cartTotal.textContent = `$${current + price}`;
    };
  }

  // Welcome message click to scroll to about
  const welcomeMessage = document.getElementById('welcome-message');
  if (welcomeMessage) {
    welcomeMessage.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Countdown Timer
  function updateCountdown() {
    const now = new Date().getTime();
    // Set next Friday 12 PM
    const nextFriday = new Date();
    nextFriday.setDate(nextFriday.getDate() + (5 - nextFriday.getDay() + 7) % 7);
    nextFriday.setHours(12, 0, 0, 0);
    const distance = nextFriday - now;
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const countdownEl = document.getElementById('countdown');
    if (countdownEl) {
      countdownEl.innerHTML = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
      if (distance < 0) {
        countdownEl.innerHTML = 'DROP LIVE!';
      }
    }
  }
  setInterval(updateCountdown, 1000);
  updateCountdown(); // Initial call

  // Live Stock Update
  let stock = 247;
  function updateStock() {
    stock = Math.max(0, stock - Math.floor(Math.random() * 5));
    const stockEl = document.getElementById('live-stock');
    if (stockEl) {
      stockEl.innerHTML = stock;
      if (stock === 0) {
        // Show sold out
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && !document.querySelector('.notify-form')) {
          heroContent.innerHTML += '<div class="notify-form mt-6"><h3 class="text-white text-xl mb-2">Sold Out!</h3><p class="text-gray-300 mb-4">Notify me for the next drop</p><input type="email" placeholder="Your Email" class="p-2 rounded w-full mb-2"><button class="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded w-full transition duration-300">Notify Me</button></div>';
        }
      }
    }
  }
  setInterval(updateStock, 10000); // Update every 10 seconds

  // Initialize the enhanced gallery system
  const galleryContainer = document.getElementById('maka-gallery');
  if (galleryContainer) {
    // Browsers block `fetch()` from local files. Run a local server (Live Server / http-server) instead.
    if (window.location.protocol === 'file:') {
      galleryContainer.innerHTML = `
        <div style="padding:1rem;border-radius:8px;background:#fff3cd;color:#856404;border:1px solid #ffeeba;">
          <strong>Gallery can’t load while opened as a local file.</strong><br>
          Open this project with a local web server (VSCode Live Server) so <code>fetch('assetsGallery.json')</code> works.
        </div>
      `;
      return;
    }

    try {
      const galleryUI = new GalleryUI();
      galleryUI.initialize(galleryContainer);
    } catch (err) {
      console.error('Gallery initialization failed:', err);
      galleryContainer.innerHTML = `
        <div style="padding:1rem;border-radius:8px;background:#f8d7da;color:#721c24;border:1px solid #f5c6cb;">
          <strong>Gallery failed to initialize.</strong><br>
          Open DevTools Console to see the error details.
        </div>
      `;
    }
  }
});
