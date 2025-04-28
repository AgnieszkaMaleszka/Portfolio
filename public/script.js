let slideIndex = 1;

function showSlides(n) {
    let slides = document.querySelectorAll('.mySlides');
    let dots = document.querySelectorAll('.dot');
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    // Hide all slides and remove active class from dots
    slides.forEach((slide) => slide.style.display = 'none');
    dots.forEach((dot) => dot.classList.remove('active'));
    
    // Show the current slide and activate the corresponding dot
    slides[slideIndex - 1].style.display = 'block';
    dots[slideIndex - 1].classList.add('active');
}

// Next/Previous control
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Current slide control from dots
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Initialize the slideshow
document.addEventListener('DOMContentLoaded', () => {
    showSlides(slideIndex);

    // Event listeners for arrows
    document.querySelector('.leftArrow').addEventListener('click', () => plusSlides(-1));
    document.querySelector('.rightArrow').addEventListener('click', () => plusSlides(1));
});
