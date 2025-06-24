// Particles Animation
function createParticles() {
  const particlesContainer = document.querySelector('.particles');
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    particlesContainer.appendChild(particle);
  }
}

// Scroll animations
function handleScroll() {
  const sections = document.querySelectorAll('.section');
  const scrollTop = window.pageYOffset;
  const windowHeight = window.innerHeight;

  // Update scroll indicator
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const scrollHeight = document.documentElement.scrollHeight - windowHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  scrollIndicator.style.width = scrollPercentage + '%';

  // Animate sections
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollTop >= sectionTop - windowHeight * 0.7) {
      section.classList.add('visible');
    }
  });

  // Show/hide floating button
  const floatingBtn = document.getElementById('scrollToTop');
  if (scrollTop > 300) {
    floatingBtn.style.display = 'flex';
  } else {
    floatingBtn.style.display = 'none';
  }
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Resume download functionality
function initResumeDownload() {
  const resumeBtn = document.getElementById('downloadResume');
  resumeBtn.addEventListener('click', () => {
    const a = document.createElement('a');
    a.href = 'C:\Users\harsh\OneDrive\Desktop\KHETAN PORTFOLIO WEB\Resume1.pdf'; // path to your actual PDF file
    a.download = 'Resume1.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  });
}

initResumeDownload(); // Call it on page load


// Scroll to top functionality
function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTop');
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Skills cube interaction
function initSkillsCube() {
  const skillsCube = document.getElementById('skillsCube');
  let isRotating = true;

  skillsCube.addEventListener('click', () => {
    if (isRotating) {
      skillsCube.style.animationPlayState = 'paused';
      isRotating = false;
    } else {
      skillsCube.style.animationPlayState = 'running';
      isRotating = true;
    }
  });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  initSmoothScroll();
  initResumeDownload();
  initScrollToTop();
  initSkillsCube();
  handleScroll(); // Initial call
});

// Event listeners
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Contact link hover effects
document.addEventListener('DOMContentLoaded', () => {
  const contactLinks = document.querySelectorAll('.contact-links a');
  contactLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.transform = 'translateX(10px) scale(1.05)';
      link.style.color = '#ffffff';
    });

    link.addEventListener('mouseleave', () => {
      link.style.transform = 'translateX(0) scale(1)';
      link.style.color = '#00f2fe';
    });
  });
});

// Hamburger Menu Functionality
(function() {
  const hamburger = document.getElementById('hamburgerMenu');
  const navLinks = document.querySelector('.nav-links');
  const navClose = document.getElementById('navCloseBtn');
  if (!hamburger || !navLinks || !navClose) return;

  function isMobile() {
    return window.innerWidth <= 900;
  }

  function showCloseBtn(show) {
    navClose.style.display = show && isMobile() ? 'block' : 'none';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    showCloseBtn(false);
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    showCloseBtn(navLinks.classList.contains('open'));
  });

  navClose.addEventListener('click', (e) => {
    e.stopPropagation();
    closeMenu();
  });

  // Close menu when clicking a link (for SPA feel)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && e.target !== hamburger) {
      closeMenu();
    }
  });

  // Responsive: show/hide close button on resize
  window.addEventListener('resize', () => {
    showCloseBtn(navLinks.classList.contains('open'));
  });
})();

// Improved Neon Cursor Effect
(function() {
  if ('ontouchstart' in window) return; // Skip on touch devices
  const cursor = document.querySelector('.neon-cursor') || document.createElement('div');
  cursor.className = 'neon-cursor';
  if (!document.body.contains(cursor)) document.body.appendChild(cursor);

  const trail = document.querySelector('.neon-cursor-trail') || document.createElement('div');
  trail.className = 'neon-cursor-trail';
  if (!document.body.contains(trail)) document.body.appendChild(trail);

  let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
  let cursorX = mouseX, cursorY = mouseY;
  let trailX = mouseX, trailY = mouseY;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
    trail.style.opacity = '0.35';
  });
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    trail.style.opacity = '0';
  });

  function animateCursor() {
    // Smoother, more sensitive follow for main cursor
    cursorX += (mouseX - cursorX) * 0.35;
    cursorY += (mouseY - cursorY) * 0.35;
    cursor.style.transform = `translate3d(${cursorX - 8}px, ${cursorY - 8}px, 0)`;

    // Even smoother for trail
    trailX += (mouseX - trailX) * 0.18;
    trailY += (mouseY - trailY) * 0.18;
    trail.style.transform = `translate3d(${trailX - 18}px, ${trailY - 18}px, 0)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
})();
