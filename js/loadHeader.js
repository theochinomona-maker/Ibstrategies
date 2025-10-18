// Load the header component
document.addEventListener('DOMContentLoaded', function() {
  // Create a placeholder for the header
  const headerPlaceholder = document.getElementById('header-placeholder');

  if (headerPlaceholder) {
    // Determine the path to the header file based on current location
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(s => s);
    const isInSubfolder = pathSegments.length > 1;
    const headerPath = isInSubfolder ? '../components/header.html' : 'components/header.html';

    // Fetch the header HTML
    fetch(headerPath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Header file not found');
        }
        return response.text();
      })
      .then(data => {
        // Insert the header HTML
        headerPlaceholder.innerHTML = data;

        // Adjust paths based on current location
        adjustPaths();

        // Re-initialize any header scripts after loading
        initializeHeaderScripts();
      })
      .catch(error => {
        console.error('Error loading header:', error);
        // Fallback: you could insert a basic header here
      });
  }
});

// Function to adjust paths based on current page location
function adjustPaths() {
  // No adjustment needed since we're using relative paths in header.html
  // This function is kept for potential future use
}

// Function to re-initialize header scripts after loading
function initializeHeaderScripts() {
  // Re-initialize mobile menu if the script exists
  if (typeof initializeMobileMenu === 'function') {
    initializeMobileMenu();
  }

  // Re-initialize dropdown if the script exists
  if (typeof initializeDropdown === 'function') {
    initializeDropdown();
  }

  // Re-initialize header scroll if the script exists
  if (typeof initializeHeaderScroll === 'function') {
    initializeHeaderScroll();
  }

  // Dispatch a custom event to notify that the header has been loaded
  document.dispatchEvent(new CustomEvent('headerLoaded'));
}