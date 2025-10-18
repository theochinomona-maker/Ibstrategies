// Enhanced dropdown functionality
function initializeDropdown() {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    let timeoutId;
    let isOverDropdown = false;
    let isOverContent = false;

    // Show dropdown on mouse enter
    dropdown.addEventListener('mouseenter', function() {
      isOverDropdown = true;
      clearTimeout(timeoutId);
      const content = this.querySelector('.dropdown-content');
      if (content) {
        content.style.display = 'block';
        // Force reflow for transition
        void content.offsetWidth;
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      }
    });

    // Hide dropdown on mouse leave with delay
    dropdown.addEventListener('mouseleave', function() {
      isOverDropdown = false;
      const content = this.querySelector('.dropdown-content');
      if (content) {
        timeoutId = setTimeout(() => {
          if (!isOverContent && !isOverDropdown) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(-10px)';
            setTimeout(() => {
              if (!isOverContent && !isOverDropdown) {
                content.style.display = 'none';
              }
            }, 300);
          }
        }, 300); // Increased delay before hiding (was 100ms, now 300ms)
      }
    });

    // Keep dropdown visible when hovering over dropdown content
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    if (dropdownContent) {
      dropdownContent.addEventListener('mouseenter', function() {
        isOverContent = true;
        clearTimeout(timeoutId);
      });

      dropdownContent.addEventListener('mouseleave', function() {
        isOverContent = false;
        timeoutId = setTimeout(() => {
          if (!isOverContent && !isOverDropdown) {
            this.style.opacity = '0';
            this.style.transform = 'translateY(-10px)';
            setTimeout(() => {
              if (!isOverContent && !isOverDropdown) {
                this.style.display = 'none';
              }
            }, 300);
          }
        }, 300); // Increased delay (was 100ms, now 300ms)
      });
    }
  });

  // Optional: Close dropdowns when clicking elsewhere
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      const allDropdownContents = document.querySelectorAll('.dropdown-content');
      allDropdownContents.forEach(content => {
        content.style.opacity = '0';
        content.style.transform = 'translateY(-10px)';
        setTimeout(() => {
          content.style.display = 'none';
        }, 300);
      });
    }
  });
}

// Initialize on DOMContentLoaded (for static headers)
document.addEventListener('DOMContentLoaded', initializeDropdown);

// Also initialize when header is loaded dynamically
document.addEventListener('headerLoaded', initializeDropdown);