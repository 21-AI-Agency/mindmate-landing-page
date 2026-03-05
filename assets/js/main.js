(function () {
  "use strict";

  const backToTop = document.querySelector(".back-to-top");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const menuLinks = document.querySelectorAll(".ud-menu-scroll");

  menuLinks.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector(element.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      if (navbarToggler && navbarCollapse) {
        navbarToggler.classList.remove("active");
        navbarCollapse.classList.remove("show");
        navbarToggler.setAttribute("aria-expanded", "false");
      }
    });
  });

  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener("click", () => {
      const isActive = navbarToggler.classList.toggle("active");
      navbarCollapse.classList.toggle("show", isActive);
      navbarToggler.setAttribute("aria-expanded", isActive ? "true" : "false");
    });
  }

  if (backToTop) {
    backToTop.addEventListener("click", (event) => {
      event.preventDefault();
      const target = document.querySelector("#home");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  async function loadTestimonials() {
    const grid = document.getElementById("testimonials-grid");
    if (!grid) return;

    try {
      const response = await fetch("assets/data/testimonials.json");
      const allTestimonials = await response.json();
      const selectedTestimonials = allTestimonials
        .sort(() => 0.5 - Math.random())
        .slice(0, 10);

      grid.innerHTML = "";

      selectedTestimonials.forEach((testimonial) => {
        const card = document.createElement("article");
        card.className = "ud-single-testimonial";
        card.innerHTML = `
          <div class="ud-testimonial-ratings">
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
          </div>
          <div class="ud-testimonial-content">
            <p>“${testimonial.text}”</p>
          </div>
          <div class="ud-testimonial-info">
            <div class="ud-testimonial-image">
              <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy" decoding="async" width="50" height="50" />
            </div>
            <div class="ud-testimonial-meta">
              <p class="ud-testimonial-name">${testimonial.name}</p>
              <p>${testimonial.role}</p>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    } catch (error) {
      grid.innerHTML =
        '<p class="text-center">Kullanıcı yorumları şu an yüklenemiyor.</p>';
      console.error("Testimonials yüklenemedi:", error);
    }
  }

  function initTestimonialsLazyLoad() {
    const testimonialsSection = document.getElementById("testimonials");
    if (!testimonialsSection) return;

    if (!("IntersectionObserver" in window)) {
      loadTestimonials();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some((entry) => entry.isIntersecting);
        if (!isVisible) return;
        observer.disconnect();
        loadTestimonials();
      },
      { rootMargin: "300px 0px" }
    );

    observer.observe(testimonialsSection);
  }

  initTestimonialsLazyLoad();
})();

document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.getElementById("preview-trigger");
  const popup = document.getElementById("screen-popup");
  const closeButton = document.getElementById("close-popup");

  if (!trigger || !popup || !closeButton) return;

  function openPopup() {
    popup.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  trigger.addEventListener("click", openPopup);
  trigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPopup();
    }
  });

  function closePopup() {
    popup.style.display = "none";
    document.body.style.overflow = "auto";
  }

  closeButton.addEventListener("click", closePopup);
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closePopup();
    }
  });
});
