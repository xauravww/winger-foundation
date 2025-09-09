document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('ngoSlider');
  const track = slider.querySelector('.slider__track');
  const slides = Array.from(track.children);
  const nav = document.getElementById('sliderNav');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;

  // Create navigation buttons
  slides.forEach((_, index) => {
    const btn = document.createElement('button');
    btn.classList.add('slider__nav-button');
    if (index === 0) btn.classList.add('active');
    btn.addEventListener('click', () => {
      goToSlide(index);
    });
    nav.appendChild(btn);
  });

  const navButtons = Array.from(nav.children);

  function goToSlide(index) {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${slideWidth * index}px)`;
    navButtons[currentIndex].classList.remove('active');
    navButtons[index].classList.add('active');
    currentIndex = index;
  }

  // Prev button click
  prevBtn.addEventListener('click', () => {
    let prevIndex = currentIndex - 1;
    if (prevIndex < 0) prevIndex = slides.length - 1;
    goToSlide(prevIndex);
  });

  // Next button click
  nextBtn.addEventListener('click', () => {
    let nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  });

  // Optional: Auto slide every 5 seconds
  setInterval(() => {
    let nextIndex = (currentIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }, 5000);
});
