// Mobile Menu Toggle - Save as js/mobileMenu.js
function initializeMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdowns = document.querySelectorAll('.nav-menu .dropdown');

  // Toggle mobile menu
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  // Handle dropdown clicks on mobile
  dropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('a');
    dropdownLink.addEventListener('click', function(e) {
      // Only prevent default on mobile
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      }
    });
  });

  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('.nav-menu li a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      // Don't close if it's a dropdown parent
      if (!this.parentElement.classList.contains('dropdown')) {
        if (navMenu.classList.contains('active')) {
          mobileMenuToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('nav') && navMenu.classList.contains('active')) {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// Initialize on DOMContentLoaded (for static headers)
document.addEventListener('DOMContentLoaded', initializeMobileMenu);

// Also initialize when header is loaded dynamically
document.addEventListener('headerLoaded', initializeMobileMenu);