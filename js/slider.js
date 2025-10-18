const slides = document.querySelectorAll('.slide-img');
const sliderTexts = document.querySelectorAll('.slider-text');
const prevBtn = document.querySelector('.slider-arrow.left');
const nextBtn = document.querySelector('.slider-arrow.right');

let currentSlide = 0;
let currentText = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });

  // Also update text (cycling through all text options)
  currentText = (currentText + 1) % sliderTexts.length;
  sliderTexts.forEach((text, i) => {
    text.classList.toggle('active', i === currentText);
  });
}

prevBtn.addEventListener('click', function() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextBtn.addEventListener('click', function() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

showSlide(currentSlide);

// For autoplay (optional)
setInterval(function() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 6000);
