// Clients slider functionality
document.addEventListener('DOMContentLoaded', function() {
  const sliderTrack = document.querySelector('.slider-track');

  if (!sliderTrack) {
    console.log('Clients slider not found on this page');
    return;
  }

  // The CSS animation handles the sliding automatically
  // This file exists to prevent 404 errors and can be extended
  // with additional functionality if needed in the future

  // Optional: Pause animation on hover
  sliderTrack.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
  });

  sliderTrack.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
  });

  console.log('Clients slider initialized');
});