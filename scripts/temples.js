// temples.js

// Footer dynamic year + last modified
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;

// Hamburger toggle
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("nav");

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuButton.textContent = navMenu.classList.contains("open") ? "✖" : "☰";
});

