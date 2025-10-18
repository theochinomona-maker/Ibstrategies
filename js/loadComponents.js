// Load header and footer components
document.addEventListener('DOMContentLoaded', function() {
  // Determine paths based on current location
  const currentPath = window.location.pathname;
  const currentHref = window.location.href;

  // Better detection for subfolder - check if we're in a services folder
  // This works for both file:// protocol and web server
  const isInServicesFolder = currentHref.includes('/services/') ||
                             currentPath.includes('/services/') ||
                             currentHref.includes('\\services\\'); // Windows path

  // For the services folder, we need to go up one level
  const componentsPath = isInServicesFolder ? '../components/' : 'components/';

  // Debug logging
  console.log('Current location:', currentHref);
  console.log('Is in services folder:', isInServicesFolder);
  console.log('Components path:', componentsPath);

  // Load header
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (headerPlaceholder) {
    fetch(componentsPath + 'header.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Header file not found at: ' + componentsPath + 'header.html');
        }
        return response.text();
      })
      .then(data => {
        // Insert the header HTML
        headerPlaceholder.innerHTML = data;
        console.log('Header loaded successfully');

        // Adjust paths based on current location
        adjustPaths();

        // Re-initialize any header scripts after loading
        initializeHeaderScripts();
      })
      .catch(error => {
        console.error('Error loading header:', error);
        console.error('Attempted to load from:', componentsPath + 'header.html');
      });
  }

  // Load footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch(componentsPath + 'footer.html')
      .then(response => {
        if (!response.ok) {
          throw new Error('Footer file not found');
        }
        return response.text();
      })
      .then(data => {
        // Insert the footer HTML
        footerPlaceholder.innerHTML = data;

        // Dispatch event that footer has loaded
        document.dispatchEvent(new CustomEvent('footerLoaded'));
      })
      .catch(error => {
        console.error('Error loading footer:', error);
      });
  }
});

// Function to adjust paths based on current page location
function adjustPaths() {
  // Check if we're in a subfolder
  const currentHref = window.location.href;
  const isInServicesFolder = currentHref.includes('/services/') ||
                             currentHref.includes('\\services\\');

  if (isInServicesFolder) {
    // Fix logo paths
    const mainLogo = document.getElementById('main-logo');
    if (mainLogo) {
      mainLogo.src = '../images/IBS Logo.png';
      mainLogo.dataset.original = '../images/IBS Logo.png';
      mainLogo.dataset.scrolled = '../images/IBS Icon.png';
    }

    // Fix navigation links
    const navLinks = document.querySelectorAll('header a[href]');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Only adjust relative paths (not anchors or external URLs)
      if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('../')) {
        link.href = '../' + href;
      }
    });
  }
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