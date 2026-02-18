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

  // ============================================
  // ENHANCED COUNTDOWN TIMER
  // 15 Days + 2 Hours - LIVE from page load
  // ============================================
  
  // Set drop time: 15 days and 2 hours from NOW (live each visit)
  const dropStartTime = new Date().getTime();
  const dropDuration = (15 * 24 * 60 * 60 * 1000) + (2 * 60 * 60 * 1000); // 15 days + 2 hours in milliseconds
  const dropEndTime = dropStartTime + dropDuration;
  
  function updateEnhancedCountdown() {
    const now = new Date().getTime();
    const distance = dropEndTime - now;
    
    // Get countdown elements
    const daysEl = document.getElementById('countdown-days');
    const hoursEl = document.getElementById('countdown-hours');
    const minutesEl = document.getElementById('countdown-minutes');
    const secondsEl = document.getElementById('countdown-seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    if (distance < 0) {
      // Drop is live!
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      
      // Show drop live message
      const countdownContainer = document.querySelector('.drop-countdown-container');
      if (countdownContainer && !document.querySelector('.drop-live-message')) {
        countdownContainer.innerHTML = `
          <div class="drop-live-message" style="text-align: center; padding: 2rem;">
            <h2 style="font-size: 2.5rem; color: #46A9F8; margin-bottom: 1rem;">🔥 DROP IS LIVE!</h2>
            <p style="color: white; font-size: 1.2rem; margin-bottom: 1.5rem;">The exclusive collection is now available!</p>
            <a href="#maka-gallery" style="display: inline-block; padding: 1rem 2rem; background: linear-gradient(135deg, #46A9F8, #05DBF2); color: #0A1D6E; text-decoration: none; border-radius: 50px; font-weight: 700; text-transform: uppercase;">
              Shop Now →
            </a>
          </div>
        `;
      }
      return;
    }
    
    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update display with animation
    updateCountdownValue(daysEl, days);
    updateCountdownValue(hoursEl, hours);
    updateCountdownValue(minutesEl, minutes);
    updateCountdownValue(secondsEl, seconds);
  }
  
  function updateCountdownValue(element, value) {
    const formattedValue = value.toString().padStart(2, '0');
    if (element.textContent !== formattedValue) {
      element.style.transform = 'scale(1.1)';
      element.textContent = formattedValue;
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 100);
    }
  }
  
  // Update countdown every second
  setInterval(updateEnhancedCountdown, 1000);
  updateEnhancedCountdown(); // Initial call

  // ============================================
  // WAITLIST FORM - WHATSAPP REDIRECTION
  // Redirects to Carolina's WhatsApp
  // ============================================
  const waitlistForm = document.getElementById('waitlist-form');
  const waitlistEmail = document.getElementById('waitlist-email');
  const waitlistPhone = document.getElementById('waitlist-phone');
  const waitlistCountEl = document.getElementById('waitlist-count');
  
  // Carolina's WhatsApp number
  const CAROLINA_WHATSAPP = '+573142274000';
  
  // Initialize waitlist count from localStorage or set default
  let waitlistCount = parseInt(localStorage.getItem('makaWaitlistCount') || '1247', 10);
  if (waitlistCountEl) {
    waitlistCountEl.textContent = waitlistCount.toLocaleString();
  }
  
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = waitlistEmail.value.trim();
      const phone = waitlistPhone.value.trim();
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
      }
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Validate phone
      if (!phone) {
        showNotification('Please enter your WhatsApp number', 'error');
        return;
      }
      // Basic phone validation
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,20}$/;
      if (!phoneRegex.test(phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return;
      }
      
      // Increment count
      waitlistCount++;
      localStorage.setItem('makaWaitlistCount', waitlistCount.toString());
      
      // Update display
      if (waitlistCountEl) {
        waitlistCountEl.textContent = waitlistCount.toLocaleString();
      }
      
      // Create WhatsApp message
      const message = `🔥 *MAKA WAITLIST REGISTRATION*

Hello! I want to join the exclusive MAKA drop waitlist!

📧 *Email:* ${email}
📱 *WhatsApp:* ${phone}
🔢 *Position:* #${waitlistCount.toLocaleString()}

Please confirm my spot on the waitlist for early access to the upcoming exclusive drop! 🚀`;
      
      // Encode message for URL
      const encodedMessage = encodeURIComponent(message);
      
      // Create WhatsApp URL
      const whatsappUrl = `https://wa.me/${CAROLINA_WHATSAPP.replace(/\D/g, '')}?text=${encodedMessage}`;
      
      // Show success notification
      showNotification('Redirecting to WhatsApp...', 'success');
      
      // Redirect to WhatsApp after short delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 500);
      
      // Clear form
      waitlistEmail.value = '';
      waitlistPhone.value = '';
      
      console.log('Waitlist signup:', { email, phone, position: waitlistCount });
    });
  }
  
  // Notification helper
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'gallery-notification';
    notification.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      padding: 1rem 1.5rem;
      border-radius: 10px;
      color: white;
      font-weight: 600;
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
      background: ${type === 'error' ? '#ef4444' : type === 'info' ? '#3b82f6' : '#10b981'};
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

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

  // ============================================
  // DESPEGUE DIGITAL VIDEO - POSTER GENERATION
  // Generates poster from second 25 of video
  // ============================================
  const despegueVideo = document.getElementById('despegue-digital-video');
  const videoLoading = document.getElementById('video-loading');

  if (despegueVideo) {
    // Generate poster from second 25
    const generatePoster = () => {
      // Check if video has enough duration
      if (despegueVideo.duration >= 25) {
        // Create canvas to capture frame
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas dimensions to match video
        canvas.width = despegueVideo.videoWidth || 1280;
        canvas.height = despegueVideo.videoHeight || 720;
        
        // Seek to second 25
        despegueVideo.currentTime = 25;
        
        // Wait for seek to complete
        const seekHandler = () => {
          // Draw current frame to canvas
          ctx.drawImage(despegueVideo, 0, 0, canvas.width, canvas.height);
          
          // Convert to data URL and set as poster
          try {
            const posterDataUrl = canvas.toDataURL('image/jpeg', 0.85);
            despegueVideo.setAttribute('poster', posterDataUrl);
            console.log('Video poster generated successfully from second 25');
          } catch (e) {
            console.warn('Could not generate poster:', e);
          }
          
          // Reset video to beginning
          despegueVideo.currentTime = 0;
          
          // Hide loading overlay
          if (videoLoading) {
            videoLoading.classList.add('hidden');
          }
          
          // Remove event listeners
          despegueVideo.removeEventListener('seeked', seekHandler);
          despegueVideo.removeEventListener('loadedmetadata', generatePoster);
        };
        
        despegueVideo.addEventListener('seeked', seekHandler);
      } else {
        // Video is shorter than 25 seconds, use first frame
        console.warn('Video is shorter than 25 seconds, using first frame as poster');
        if (videoLoading) {
          videoLoading.classList.add('hidden');
        }
      }
    };

    // Wait for video metadata to load
    if (despegueVideo.readyState >= 1) {
      // Metadata already loaded
      generatePoster();
    } else {
      despegueVideo.addEventListener('loadedmetadata', generatePoster);
    }

    // Handle video play/pause for analytics (optional)
    despegueVideo.addEventListener('play', () => {
      console.log('Despegue Digital video started playing');
    });

    despegueVideo.addEventListener('ended', () => {
      console.log('Despegue Digital video ended');
    });

    // Error handling
    despegueVideo.addEventListener('error', (e) => {
      console.error('Video error:', e);
      if (videoLoading) {
        videoLoading.innerHTML = `
          <span style="color: #ff6b6b;">Video could not be loaded</span>
          <span style="font-size: 0.8rem; margin-top: 0.5rem;">Please check your connection and refresh</span>
        `;
      }
    });

    // Hide loading when video can play through
    despegueVideo.addEventListener('canplaythrough', () => {
      if (videoLoading && !videoLoading.classList.contains('hidden')) {
        // Keep loading overlay until poster is generated
        // It will be hidden by the poster generation function
      }
    });
  }
});
