// ==========================================================================
// code48 v3 — JavaScript
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Scroll Reveal Animation
  initScrollReveal();
  
  // Mobile Menu Toggle
  initMobileMenu();
  
  // Smooth Scroll for Anchor Links
  initSmoothScroll();
  
  // Form Submission
  initFormHandling();
  
  // Nav Background on Scroll
  initNavScroll();
});

// ==========================================================================
// Scroll Reveal
// ==========================================================================
function initScrollReveal() {
  const elements = document.querySelectorAll('.service-card, .process-step, .testimonial-card, .testimonial-large, .price-card, .faq-item, .ps-problem, .ps-solution');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    elements.forEach(el => el.classList.add('revealed'));
  }
}

// ==========================================================================
// Mobile Menu
// ==========================================================================
function initMobileMenu() {
  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuBtn || !navLinks) return;
  
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    menuBtn.classList.toggle('active');
  });
  
  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      menuBtn.classList.remove('active');
    });
  });
}

// ==========================================================================
// Smooth Scroll
// ==========================================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// ==========================================================================
// Form Handling
// ==========================================================================
function initFormHandling() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      // Show loading state
      submitBtn.innerHTML = '<span class="loading">Wird gesendet...</span>';
      submitBtn.disabled = true;
      
      // Simulate form submission (replace with actual endpoint)
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success state
        submitBtn.innerHTML = '✓ Gesendet!';
        submitBtn.style.background = '#10b981';
        
        // Reset form
        form.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
        
      } catch (error) {
        submitBtn.innerHTML = 'Fehler — Bitte erneut versuchen';
        submitBtn.style.background = '#ef4444';
        
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }
    });
  });
}

// ==========================================================================
// Nav Scroll Effect
// ==========================================================================
function initNavScroll() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
    
    // Hide/show nav on scroll direction
    if (currentScroll > lastScroll && currentScroll > 300) {
      nav.style.transform = 'translateY(-100%)';
    } else {
      nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  });
}

// ==========================================================================
// Utility: Add CSS for mobile menu (injected)
// ==========================================================================
const mobileMenuStyles = `
  @media (max-width: 767px) {
    .nav-links {
      position: fixed;
      top: 72px;
      left: 0;
      right: 0;
      background: white;
      padding: 1.5rem;
      border-bottom: 1px solid #e2e8f0;
      flex-direction: column;
      gap: 1rem;
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }
    
    .nav-links.mobile-open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
      display: flex;
    }
    
    .nav-links a {
      font-size: 1.125rem;
      padding: 0.75rem 0;
      border-bottom: 1px solid #f1f5f9;
    }
    
    .btn-nav {
      display: none;
    }
    
    .mobile-menu-btn.active span:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-btn.active span:nth-child(2) {
      opacity: 0;
    }
    
    .mobile-menu-btn.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
  }
  
  .nav {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .nav-scrolled {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.07);
  }
  
  .loading {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
  
  .loading::before {
    content: '';
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

// Inject mobile menu styles
const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);
