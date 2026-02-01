// ===== GSAP SETUP =====
gsap.registerPlugin(ScrollTrigger);

// ===== PARTICLES CONFIGURATION =====
particlesJS('particles-js', {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    color: {
      value: '#00f0ff'
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      value: 0.3,
      random: true,
      anim: {
        enable: true,
        speed: 1,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 3,
      random: true,
      anim: {
        enable: true,
        speed: 2,
        size_min: 0.1,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#00f0ff',
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'grab'
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 0.5
        }
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorOutline = document.getElementById('cursor-outline');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  
  setTimeout(() => {
    cursorOutline.style.left = e.clientX - 15 + 'px';
    cursorOutline.style.top = e.clientY - 15 + 'px';
  }, 100);
});

// Cursor effects on hover
document.querySelectorAll('a, button, .project-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)';
    cursorOutline.style.transform = 'scale(1.5)';
  });
  
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    cursorOutline.style.transform = 'scale(1)';
  });
});

// ===== LOADER =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    initAnimations();
  }, 2500);
});

// ===== NAVIGATION =====
const nav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('.nav-link');

// Smooth scroll
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      
      // Update active state
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// Nav scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
  
  // Update active nav based on scroll position
  updateActiveNav();
});

function updateActiveNav() {
  const sections = document.querySelectorAll('.section');
  const scrollPos = window.scrollY + 200;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
let isDark = true;

themeToggle.addEventListener('click', () => {
  isDark = !isDark;
  document.documentElement.classList.toggle('light');
  themeToggle.querySelector('i').classList.toggle('fa-sun');
  themeToggle.querySelector('i').classList.toggle('fa-moon');
});

// ===== SOUND TOGGLE =====
const soundToggle = document.getElementById('soundToggle');
let soundEnabled = true;

soundToggle.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  soundToggle.querySelector('i').classList.toggle('fa-volume-up');
  soundToggle.querySelector('i').classList.toggle('fa-volume-mute');
});

// ===== COUNTER ANIMATION =====
function animateCounter(element, target) {
  const duration = 2000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ===== GSAP ANIMATIONS =====
function initAnimations() {
  // Hero animations
  gsap.from('.hero-label', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  gsap.from('.line-reveal', {
    opacity: 0,
    y: 100,
    stagger: 0.2,
    duration: 1,
    ease: 'power4.out',
    delay: 0.2
  });
  
  gsap.from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power3.out',
    delay: 0.8
  });
  
  gsap.from('.stat-item', {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.6,
    ease: 'power3.out',
    delay: 1,
    onComplete: () => {
      document.querySelectorAll('.stat-number').forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        animateCounter(stat, target);
      });
    }
  });
  
  gsap.from('.cta-button', {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.6,
    ease: 'power3.out',
    delay: 1.3
  });
  
  gsap.from('.floating-card', {
    opacity: 0,
    scale: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: 'back.out(1.7)',
    delay: 1.5
  });
  
  gsap.from('.scroll-indicator', {
    opacity: 0,
    y: -30,
    duration: 0.8,
    ease: 'power3.out',
    delay: 2
  });
  
  // About section animations
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('.about-image', {
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
      });
      
      gsap.from('.about-content > *', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
    },
    once: true
  });
  
  // Projects section animations
  ScrollTrigger.create({
    trigger: '#work',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('.project-card', {
        opacity: 0,
        y: 100,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
    },
    once: true
  });
  
  // Skills section animations
  ScrollTrigger.create({
    trigger: '#skills',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('.skill-category', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      });
      
      // Animate skill bars
      document.querySelectorAll('.skill-progress').forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        gsap.to(bar, {
          width: progress + '%',
          duration: 1.5,
          ease: 'power2.out',
          delay: 0.5
        });
      });
    },
    once: true
  });
  
  // Contact section animations
  ScrollTrigger.create({
    trigger: '#contact',
    start: 'top 80%',
    onEnter: () => {
      gsap.from('.contact-method', {
        opacity: 0,
        x: -50,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      });
      
      gsap.from('.form-group', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      });
    },
    once: true
  });
  
  // Section headers animation
  document.querySelectorAll('.section-header').forEach(header => {
    ScrollTrigger.create({
      trigger: header,
      start: 'top 90%',
      onEnter: () => {
        gsap.from(header.querySelector('.section-number'), {
          opacity: 0,
          scale: 0.5,
          duration: 0.8,
          ease: 'back.out(1.7)'
        });
        
        gsap.from(header.querySelector('.section-title'), {
          opacity: 0,
          x: -50,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.2
        });
      },
      once: true
    });
  });
}

// ===== PROJECT CARD TILT EFFECT =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Play sound if enabled
  if (soundEnabled) {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiT2fPPfCkFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiT2fPPfCkFJHfH8N2QQA==');
    audio.play().catch(() => {});
  }
  
  // Simulate form submission
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  console.log('Form submitted:', data);
  
  // Show success message
  contactForm.style.opacity = '0';
  setTimeout(() => {
    contactForm.style.display = 'none';
    formSuccess.classList.add('show');
  }, 300);
  
  // Reset form after 3 seconds
  setTimeout(() => {
    formSuccess.classList.remove('show');
    contactForm.style.display = 'flex';
    setTimeout(() => {
      contactForm.style.opacity = '1';
      contactForm.reset();
    }, 300);
  }, 3000);
});

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  // Parallax for hero visual
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
  
  // Parallax for floating cards
  document.querySelectorAll('.floating-card').forEach((card, index) => {
    const speed = 0.1 + (index * 0.05);
    card.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===== SKILL HOVER EFFECT =====
document.querySelectorAll('.skill-item').forEach(item => {
  item.addEventListener('mouseenter', function() {
    const icon = this.querySelector('i');
    gsap.to(icon, {
      scale: 1.2,
      rotation: 360,
      duration: 0.5,
      ease: 'back.out(1.7)'
    });
  });
  
  item.addEventListener('mouseleave', function() {
    const icon = this.querySelector('i');
    gsap.to(icon, {
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  });
});

// ===== TYPING EFFECT FOR HERO SUBTITLE =====
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ===== INTERSECTION OBSERVER FOR FADE IN EFFECTS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.timeline-item, .cert-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// ===== SMOOTH REVEAL ON SCROLL =====
ScrollTrigger.batch('.project-card', {
  onEnter: batch => gsap.to(batch, {
    opacity: 1,
    y: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: 'power3.out'
  }),
  start: 'top 90%',
  once: true
});

// ===== MAGNETIC BUTTON EFFECT =====
document.querySelectorAll('.cta-button, .submit-button').forEach(button => {
  button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(button, {
      x: x * 0.3,
      y: y * 0.3,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  button.addEventListener('mouseleave', () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  });
});

// ===== FLOATING ANIMATION FOR HERO LABEL =====
gsap.to('.hero-label', {
  y: -10,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: 'power1.inOut'
});

// ===== GRADIENT ANIMATION =====
const gradients = document.querySelectorAll('.gradient-text');
gradients.forEach(gradient => {
  gradient.style.backgroundSize = '200% 200%';
  gsap.to(gradient, {
    backgroundPosition: '100% 50%',
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'none'
  });
});

// ===== ACHIEVEMENTS PULSE ANIMATION =====
gsap.to('.achievement-icon', {
  scale: 1.1,
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: 'power1.inOut'
});

// ===== CERTIFICATE ITEMS STAGGER ANIMATION ON SCROLL =====
ScrollTrigger.create({
  trigger: '.cert-grid',
  start: 'top 80%',
  onEnter: () => {
    gsap.from('.cert-item', {
      opacity: 0,
      x: -30,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out'
    });
  },
  once: true
});

// ===== TIMELINE DOTS ANIMATION =====
ScrollTrigger.create({
  trigger: '.education-timeline',
  start: 'top 80%',
  onEnter: () => {
    gsap.from('.timeline-dot', {
      scale: 0,
      stagger: 0.2,
      duration: 0.5,
      ease: 'back.out(1.7)'
    });
  },
  once: true
});

// ===== CONSOLE EASTER EGG =====
console.log('%c🚀 Welcome to Akashdeep\'s Portfolio!', 'font-size: 20px; color: #00f0ff; font-weight: bold;');
console.log('%cLooking for a developer? Let\'s connect!', 'font-size: 14px; color: #ff00ff;');
console.log('%cEmail: akashdeepdey.2004@gmail.com', 'font-size: 12px; color: #ffd700;');

// ===== PREVENT CONTEXT MENU ON IMAGES =====
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', (e) => e.preventDefault());
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
  // Arrow down - scroll to next section
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    scrollToNextSection();
  }
  
  // Arrow up - scroll to previous section
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    scrollToPreviousSection();
  }
  
  // Press 'C' to scroll to contact
  if (e.key.toLowerCase() === 'c' && !e.ctrlKey) {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
  }
});

function scrollToNextSection() {
  const sections = Array.from(document.querySelectorAll('.section'));
  const currentScroll = window.scrollY;
  
  const nextSection = sections.find(section => {
    return section.offsetTop > currentScroll + 100;
  });
  
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToPreviousSection() {
  const sections = Array.from(document.querySelectorAll('.section'));
  const currentScroll = window.scrollY;
  
  const previousSection = sections.reverse().find(section => {
    return section.offsetTop < currentScroll - 100;
  });
  
  if (previousSection) {
    previousSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// ===== VIEWPORT UNITS FIX FOR MOBILE =====
function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVH();
window.addEventListener('resize', setVH);

// ===== INITIALIZE ON DOM LOAD =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('Portfolio loaded successfully! 🎉');
});