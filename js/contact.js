const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", (e) => {
  e.preventDefault(); // stop the page from reloading

  alert("Thanks for reaching out! We'll get back to you soon.");

  contactForm.reset(); // clears all the input fields
});