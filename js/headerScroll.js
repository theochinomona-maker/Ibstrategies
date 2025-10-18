// In headerScroll.js
let scrollHandler = null;

function initializeHeaderScroll() {
  const header = document.getElementById('main-header');

  if (!header) {
    console.log('Header not found, will retry when loaded');
    return; // Exit if header not found
  }

  console.log('Initializing header scroll behavior');

  // Ensure header starts transparent
  header.style.backgroundColor = 'transparent';
  header.classList.remove('scrolled');

  // Remove any existing scroll listeners to avoid duplicates
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
  }

  scrollHandler = function() {
    const header = document.getElementById('main-header');
    const logo = document.getElementById('main-logo');

    if (!header) return;

    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      header.style.backgroundColor = ''; // Let CSS handle it
      // Switch to scrolled logo
      if (logo && logo.dataset.scrolled) {
        logo.src = logo.dataset.scrolled;
      }
    } else {
      header.classList.remove('scrolled');
      header.style.backgroundColor = 'transparent';
      // Switch back to original logo
      if (logo && logo.dataset.original) {
        logo.src = logo.dataset.original;
      }
    }
  };

  // Add scroll listener
  window.addEventListener('scroll', scrollHandler);

  // Check initial scroll position
  scrollHandler();
}

// Try to initialize on DOMContentLoaded (for pages with static headers)
document.addEventListener('DOMContentLoaded', initializeHeaderScroll);

// Also listen for the custom headerLoaded event (for dynamically loaded headers)
document.addEventListener('headerLoaded', initializeHeaderScroll);