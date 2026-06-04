// ===== IMPORTS =====
import { projects } from './data/projects.js';
import { certificates } from './data/certificates.js';
import { skills } from './data/skills.js';

// ===== GSAP SETUP =====
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ===== PARTICLES CONFIGURATION =====
if (typeof particlesJS !== 'undefined') {
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
}

// ===== CUSTOM CURSOR GLOBAL CONFIG =====
const cursor = document.getElementById('cursor');
const cursorOutline = document.getElementById('cursor-outline');
let soundEnabled = true;

document.addEventListener('mousemove', (e) => {
  if (cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
  
  if (cursorOutline) {
    setTimeout(() => {
      cursorOutline.style.left = e.clientX - 15 + 'px';
      cursorOutline.style.top = e.clientY - 15 + 'px';
    }, 100);
  }
});

// Initialize cursor interactions
function initCursorHoverEffects() {
  document.querySelectorAll('a, button, .project-card, .cert-item, .skill-card-new').forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursor) cursor.style.transform = 'scale(1.5)';
      if (cursorOutline) cursorOutline.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
      if (cursor) cursor.style.transform = 'scale(1)';
      if (cursorOutline) cursorOutline.style.transform = 'scale(1)';
    });
  });
}

// ===== DYNAMIC COMPONENT RENDERING =====
function renderProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  
  container.innerHTML = projects.map(proj => {
    const techIconsHTML = proj.techIcons ? proj.techIcons.map(icon => `<i class="${icon}"></i>`).join('') : '';
    const featuresHTML = proj.features ? proj.features.map(feat => `<li><i class="fas fa-check-circle"></i> ${feat}</li>`).join('') : '';
    const impactHTML = proj.impact ? proj.impact.map(imp => `
      <div class="impact-metric">
        <span class="metric-val">${imp.value}</span>
        <span class="metric-lbl">${imp.label}</span>
      </div>
    `).join('') : '';
    const tagsHTML = proj.tags ? proj.tags.map(tag => `<span class="tag font-mono">${tag}</span>`).join('') : '';

    return `
      <div class="project-card" data-category="${proj.category}">
        <div class="project-image">
          <img src="${proj.image}" alt="${proj.title}" />
          <div class="project-overlay">
            <a href="${proj.demoUrl}" target="_blank" class="project-link">
              <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
        <div class="project-info">
          <div class="project-header-top">
            <span class="project-category-tag font-mono">${proj.categoryTag}</span>
            <div class="project-tech">
              ${techIconsHTML}
            </div>
          </div>
          <h3 class="project-title font-display">${proj.title}</h3>
          <p class="project-description">${proj.description}</p>
          <div class="project-features-list">
            <h4 class="font-mono">Key Features</h4>
            <ul>
              ${featuresHTML}
            </ul>
          </div>
          <div class="project-impact font-mono">
            ${impactHTML}
          </div>
          <div class="project-tags">
            ${tagsHTML}
          </div>
          <div class="project-actions font-mono">
            <a href="${proj.demoUrl}" target="_blank" class="action-btn live">
              <span>Live Demo</span>
              <i class="fas fa-external-link-alt"></i>
            </a>
            <a href="${proj.githubUrl}" target="_blank" class="action-btn code">
              <span>View Code</span>
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderCertificates() {
  const container = document.getElementById('certificates-container');
  if (!container) return;
  
  container.innerHTML = certificates.map(cert => `
    <a href="${cert.path}" target="_blank" class="cert-item">
      <i class="${cert.icon}"></i>
      <span>${cert.title}</span>
    </a>
  `).join('');
}

function renderSkills() {
  const categories = ['frontend', 'backend', 'ai', 'databases', 'cloud', 'languages'];
  categories.forEach(category => {
    const panel = document.getElementById(`${category}-panel`);
    if (!panel) return;
    const grid = panel.querySelector('.skills-grid-new');
    if (!grid) return;
    
    const skillList = skills[category] || [];
    grid.innerHTML = skillList.map(skill => `
      <div class="skill-card-new">
        <div class="skill-header">
          <div class="skill-icon"><i class="${skill.icon}"></i></div>
          <div class="skill-meta">
            <h4>${skill.name}</h4>
            <span class="app-tag font-mono">${skill.tag}</span>
          </div>
          <div class="progress-ring-wrapper">
            <svg class="progress-ring" width="50" height="50">
              <circle class="progress-ring__circle-bg" stroke="rgba(255, 255, 255, 0.03)" stroke-width="3" fill="transparent" r="20" cx="25" cy="25"/>
              <circle class="progress-ring__circle" stroke="var(--primary-color)" stroke-width="3" fill="transparent" r="20" cx="25" cy="25" data-pct="${skill.pct}"/>
            </svg>
            <span class="progress-text">0%</span>
          </div>
        </div>
        <p class="skill-desc">${skill.desc}</p>
        <div class="skill-ats font-mono">${skill.ats}</div>
      </div>
    `).join('');
  });
}

// ===== PLAY AUDIO HELPER =====
function playClickSound() {
  if (soundEnabled) {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiT2fPPfCkFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjiT2fPPfCkFJHfH8N2QQA==');
    audio.play().catch(() => {});
  }
}

// ===== LOADER & GSAP TIMELINE TRIGGER =====
function hideLoaderAndStart() {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
  }
  if (typeof initAnimations === 'function') {
    try {
      initAnimations();
    } catch (err) {
      console.error('Error starting animations:', err);
    }
  }
}

// Start loader countdown
if (document.readyState === 'complete') {
  setTimeout(hideLoaderAndStart, 2500);
} else {
  window.addEventListener('load', () => {
    setTimeout(hideLoaderAndStart, 2500);
  });
}

// ===== NAVIGATION SETUP =====
function initNavigation() {
  const nav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });
  
  window.addEventListener('scroll', () => {
    if (nav) {
      if (window.scrollY > 100) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
    updateActiveNav(navLinks);
  });
}

function updateActiveNav(navLinks) {
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

// ===== THEME & SOUND TOGGLES =====
function initToggles() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('light');
      themeToggle.querySelector('i').classList.toggle('fa-sun');
      themeToggle.querySelector('i').classList.toggle('fa-moon');
    });
  }
  
  const soundToggle = document.getElementById('soundToggle');
  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundToggle.querySelector('i').classList.toggle('fa-volume-up');
      soundToggle.querySelector('i').classList.toggle('fa-volume-mute');
    });
  }
}

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

// ===== GSAP ANIMATIONS DEFINITION =====
function initAnimations() {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP is not defined. Skipping animations.');
    // Trigger counters directly without animations
    document.querySelectorAll('.stat-number').forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      stat.textContent = target + '+';
    });
    return;
  }

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
  
  if (typeof ScrollTrigger === 'undefined') return;

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
      gsap.from('.matrix-tabs', {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: 'power3.out'
      });
      
      gsap.from('.matrix-panel.active .skill-card-new', {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        onComplete: () => {
          const activePanel = document.querySelector('.matrix-panel.active');
          if (activePanel) {
            animateProgressRings(activePanel);
          }
        }
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

  // Project Cards batch reveal
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

  // Certificate Items Stagger
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

  // Timeline Dots
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
}

// ===== PROJECT CARD TILT EFFECT =====
function initProjectCardTilt() {
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
}

// ===== CONTACT FORM =====
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    playClickSound();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted:', data);
    
    contactForm.style.opacity = '0';
    setTimeout(() => {
      contactForm.style.display = 'none';
      if (formSuccess) formSuccess.classList.add('show');
    }, 300);
    
    setTimeout(() => {
      if (formSuccess) formSuccess.classList.remove('show');
      contactForm.style.display = 'flex';
      setTimeout(() => {
        contactForm.style.opacity = '1';
        contactForm.reset();
      }, 300);
    }, 3000);
  });
}

// ===== PARALLAX EFFECT ON SCROLL =====
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
      heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    document.querySelectorAll('.floating-card').forEach((card, index) => {
      const speed = 0.1 + (index * 0.05);
      card.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// ===== SKILL HOVER EFFECT =====
function initSkillHoverEffects() {
  document.querySelectorAll('.skill-card-new').forEach(item => {
    item.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.skill-icon i');
      if (icon && typeof gsap !== 'undefined') {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 360,
          duration: 0.5,
          ease: 'back.out(1.7)'
        });
      }
    });
    
    item.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.skill-icon i');
      if (icon && typeof gsap !== 'undefined') {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    });
  });
}

// ===== INTERSECTION OBSERVER FOR FADE-INS =====
function initIntersectionObservers() {
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
  
  document.querySelectorAll('.timeline-item, .cert-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
}

// ===== MAGNETIC BUTTON EFFECT =====
function initMagneticButtons() {
  document.querySelectorAll('.cta-button, .submit-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      if (typeof gsap !== 'undefined') {
        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });
    
    button.addEventListener('mouseleave', () => {
      if (typeof gsap !== 'undefined') {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      }
    });
  });
}

// ===== PROJECT FILTERING SYSTEM =====
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playClickSound();

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      if (typeof gsap !== 'undefined') {
        gsap.to(projectCards, {
          opacity: 0,
          scale: 0.8,
          y: 20,
          duration: 0.25,
          ease: 'power2.in',
          onComplete: () => {
            projectCards.forEach(card => {
              const categories = card.getAttribute('data-category').split(' ');
              if (filterVal === 'all' || categories.includes(filterVal)) {
                card.style.display = 'block';
                gsap.to(card, {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 0.4,
                  ease: 'power2.out',
                  clearProps: 'all'
                });
              } else {
                card.style.display = 'none';
              }
            });
            if (typeof ScrollTrigger !== 'undefined') {
              ScrollTrigger.refresh();
            }
          }
        });
      } else {
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category').split(' ');
          if (filterVal === 'all' || categories.includes(filterVal)) {
            card.style.display = 'block';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
          }
        });
      }
    });
  });
}

// ===== SKILLS MATRIX INTERACTIVE SYSTEM =====
function animateProgressRings(panel) {
  const rings = panel.querySelectorAll('.progress-ring__circle');
  rings.forEach(circle => {
    const pct = parseInt(circle.getAttribute('data-pct'));
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
    
    const offset = circumference - (pct / 100) * circumference;
    
    if (typeof gsap !== 'undefined') {
      gsap.to(circle, {
        strokeDashoffset: offset,
        duration: 1.2,
        ease: 'power2.out'
      });
      
      const wrapper = circle.closest('.progress-ring-wrapper');
      const textNode = wrapper ? wrapper.querySelector('.progress-text') : null;
      if (textNode) {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: pct,
          duration: 1.2,
          ease: 'power2.out',
          onUpdate: () => {
            textNode.textContent = Math.floor(counter.value) + '%';
          }
        });
      }
    } else {
      circle.style.strokeDashoffset = offset;
      const wrapper = circle.closest('.progress-ring-wrapper');
      const textNode = wrapper ? wrapper.querySelector('.progress-text') : null;
      if (textNode) {
        textNode.textContent = pct + '%';
      }
    }
  });
}

function initSkillsMatrix() {
  const tabs = document.querySelectorAll('.matrix-tab-btn');
  const panels = document.querySelectorAll('.matrix-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playClickSound();

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const targetCategory = tab.getAttribute('data-category');
      const activePanel = document.getElementById(`${targetCategory}-panel`);

      panels.forEach(p => {
        p.classList.remove('active');
      });

      if (activePanel) {
        activePanel.classList.add('active');
        
        if (typeof gsap !== 'undefined') {
          gsap.from(activePanel.querySelectorAll('.skill-card-new'), {
            opacity: 0,
            y: 20,
            stagger: 0.08,
            duration: 0.4,
            ease: 'power2.out'
          });
        }

        animateProgressRings(activePanel);
      }
    });
  });
}

// ===== CONSTANT AMBIENT ANIMATIONS =====
function initAmbientAnimations() {
  if (typeof gsap === 'undefined') return;

  gsap.to('.hero-label', {
    y: -10,
    duration: 2,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });

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

  gsap.to('.achievement-icon-new', {
    scale: 1.1,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
  });
}

// ===== IMAGE PROTECTION =====
function initImageProtection() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => e.preventDefault());
  });
}

// ===== KEYBOARD NAVIGATION =====
function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      scrollToNextSection();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      scrollToPreviousSection();
    }
    if (e.key.toLowerCase() === 'c' && !e.ctrlKey) {
      const contactSec = document.getElementById('contact');
      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

function scrollToNextSection() {
  const sections = Array.from(document.querySelectorAll('.section'));
  const currentScroll = window.scrollY;
  const nextSection = sections.find(section => section.offsetTop > currentScroll + 100);
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function scrollToPreviousSection() {
  const sections = Array.from(document.querySelectorAll('.section'));
  const currentScroll = window.scrollY;
  const previousSection = sections.reverse().find(section => section.offsetTop < currentScroll - 100);
  if (previousSection) {
    previousSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// ===== LAZY IMAGE LOADING =====
function initLazyLoading() {
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
}

// ===== VIEWPORT UNITS FIX FOR MOBILE =====
function setVH() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// ===== TYPING EFFECT HELPER =====
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

// ===== INTERACTIVE TERMINAL SYSTEM =====
function initTerminal() {
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  if (!terminalInput || !terminalOutput) return;

  const startupLogs = [
    { text: 'Initializing Akashdeep_OS v2.1.0...', type: 'info' },
    { text: 'SYS_STATUS: ONLINE // SECURE', type: 'success' },
    { text: 'Connection established via TLS_1.3.', type: 'info' },
    { text: "Type 'help' to query information modules.", type: 'info' },
    { text: '', type: 'info' }
  ];

  let logIndex = 0;
  function printStartup() {
    if (logIndex < startupLogs.length) {
      appendTerminalLine(startupLogs[logIndex].text, startupLogs[logIndex].type);
      logIndex++;
      setTimeout(printStartup, 150);
    }
  }

  printStartup();

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim();
      terminalInput.value = '';
      if (command) {
        handleTerminalCommand(command);
      }
    }
  });

  const widget = document.querySelector('.terminal-widget');
  if (widget) {
    widget.addEventListener('click', () => {
      terminalInput.focus();
    });
  }

  function appendTerminalLine(text, type = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${type}`;
    line.innerText = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  function handleTerminalCommand(cmd) {
    appendTerminalLine(`guest@akash:~$ ${cmd}`, 'command');
    playClickSound();

    const normalizedCmd = cmd.toLowerCase().trim();

    switch (normalizedCmd) {
      case 'help':
        appendTerminalLine('Available commands:', 'response');
        appendTerminalLine('  about    - Brief profile info', 'response');
        appendTerminalLine('  skills   - Technical core strengths', 'response');
        appendTerminalLine('  projects - High priority products', 'response');
        appendTerminalLine('  contact  - Reach out directly', 'response');
        appendTerminalLine('  clear    - Clear terminal output', 'response');
        break;
      case 'about':
        appendTerminalLine('Akashdeep Dey — MCA candidate at Christ University, Bangalore.', 'response');
        appendTerminalLine('Full-Stack Engineer & AI Specialist passionate about production systems.', 'response');
        break;
      case 'skills':
        appendTerminalLine('Top Core Proficiencies:', 'response');
        appendTerminalLine('  React/Next.js   [██████████] 90%', 'response');
        appendTerminalLine('  Node/Express.js [██████████] 85%', 'response');
        appendTerminalLine('  Generative AI   [██████████] 90%', 'response');
        appendTerminalLine('  Databases/SQL   [██████████] 80%', 'response');
        appendTerminalLine('  Python/Cloud    [██████████] 85%', 'response');
        break;
      case 'projects':
        appendTerminalLine('Priority Featured Projects:', 'response');
        appendTerminalLine('  1. Oryzed Legal AI Assistant - AI Legal Tech platform', 'response');
        appendTerminalLine('  2. AirVault - Zero-Knowledge Cloud Object Storage platform', 'response');
        appendTerminalLine('  3. SmartPlate AI - Nutrition Tracking Intelligence platform', 'response');
        break;
      case 'contact':
        appendTerminalLine('Get in touch:', 'response');
        appendTerminalLine('  Email:    akashdeepdey.2004@gmail.com', 'response');
        appendTerminalLine('  LinkedIn: linkedin.com/in/akashdeep-dey-0a9562373', 'response');
        appendTerminalLine('  LeetCode: leetcode.com/u/Akash04471/', 'response');
        break;
      case 'clear':
        terminalOutput.innerHTML = '';
        break;
      default:
        appendTerminalLine(`Command not found: ${cmd}. Type 'help' for instructions.`, 'error');
    }
  }
}

// ===== INITIALIZE ALL COMPONENTS =====
function initAll() {
  console.log('DOM ready check passed. Initializing render and interactivity... 🎉');
  
  // 1. Render all dynamic elements first
  renderProjects();
  renderCertificates();
  renderSkills();
  
  // 2. Initialize interactive hooks and triggers on static and dynamic elements
  initCursorHoverEffects();
  initNavigation();
  initToggles();
  initProjectCardTilt();
  initContactForm();
  initParallax();
  initSkillHoverEffects();
  initIntersectionObservers();
  initMagneticButtons();
  initProjectFilters();
  initSkillsMatrix();
  initAmbientAnimations();
  initImageProtection();
  initKeyboardNav();
  initLazyLoading();
  initBackToTop();
  initTerminal();
  
  setVH();
  window.addEventListener('resize', setVH);

  console.log('%c🚀 Welcome to Akashdeep\'s Portfolio!', 'font-size: 20px; color: #00f0ff; font-weight: bold;');
  console.log('%cLooking for a developer? Let\'s connect!', 'font-size: 14px; color: #ff00ff;');
  console.log('%cEmail: akashdeepdey.2004@gmail.com', 'font-size: 12px; color: #ffd700;');
}

// Trigger initial rendering as soon as the DOM is ready
if (document.readyState === 'interactive' || document.readyState === 'complete') {
  initAll();
} else {
  document.addEventListener('DOMContentLoaded', initAll);
}