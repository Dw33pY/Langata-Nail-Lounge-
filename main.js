// Elements
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const backToTop = document.getElementById("backToTop");

// Toggle mobile menu
menuToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  navLinks.classList.toggle("active");
});

// Close menu when clicking a link
navItems.forEach(item => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});

// Scroll Reveal + Back to top
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      section.classList.add("active");
    }
  });
  
  backToTop.style.display = window.scrollY > 400 ? "block" : "none";
});

// Back to top click
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
