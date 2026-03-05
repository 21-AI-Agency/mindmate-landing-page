(function () {
  "use strict";

  const udHeader = document.querySelector(".ud-header");
  const backToTop = document.querySelector(".back-to-top");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  function handleScroll() {
    if (!udHeader) return;
    const stickyPoint = udHeader.offsetTop;

    if (window.pageYOffset > stickyPoint) {
      udHeader.classList.add("sticky");
    } else {
      udHeader.classList.remove("sticky");
    }

    if (!backToTop) return;
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (navbarToggler && navbarCollapse) {
    document.querySelectorAll(".ud-menu-scroll").forEach((element) =>
      element.addEventListener("click", () => {
        navbarToggler.classList.remove("active");
        navbarCollapse.classList.remove("show");
        navbarToggler.setAttribute("aria-expanded", "false");
      })
    );

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
              <h4>${testimonial.name}</h4>
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

  loadTestimonials();
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
