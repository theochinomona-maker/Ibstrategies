// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
  // Get all links that start with #
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');

      // Handle special case for just "#"
      if (targetId === '#') return;

      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        // Calculate offset for fixed header (70px)
        const headerOffset = 70;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});