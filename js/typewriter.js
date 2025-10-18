export function typewriter({
  element,
  textArray,
  typingSpeed = 35,
  pauseAfterType = 2600,
  erasingSpeed = 15,
  pauseAfterErase = 1000,
}) {
  let textIndex = 0;
  let charIndex = 0;
  let isErasing = false;

  // Make sure it's empty and hidden at first
  element.textContent = "";
  element.style.visibility = "hidden"; // Hide it on load

  function type() {
    // Reveal only when actually typing begins!
    if (charIndex === 0 && !isErasing) {
      element.style.visibility = 'visible';
    }
    const currentText = textArray[textIndex];
    if (!isErasing && charIndex <= currentText.length) {
      element.textContent = currentText.slice(0, charIndex);
      charIndex++;
      if (charIndex <= currentText.length) {
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(() => { isErasing = true; type(); }, pauseAfterType);
      }
    } else if (isErasing && charIndex >= 0) {
      element.textContent = currentText.slice(0, charIndex);
      charIndex--;
      if (charIndex >= 0) {
        setTimeout(type, erasingSpeed);
      } else {
        isErasing = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(type, pauseAfterErase);
      }
    }
  }
  type();
}
