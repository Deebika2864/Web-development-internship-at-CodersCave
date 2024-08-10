document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('nav ul li a').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  });