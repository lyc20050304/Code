const scroll = document.getElementById("scroll");
const navMenu = document.getElementById("navMenu");
const toggler = document.querySelector(".toggler");

scroll.addEventListener("click", () => {
  document.querySelector(".get-started").scrollIntoView({ behavior: "smooth" });
});

toggler.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
