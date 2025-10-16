(function () {
  "use strict";

  // ======= Sticky
  window.onscroll = function () {
    const ud_header = document.querySelector(".ud-header");
    const sticky = ud_header.offsetTop;
    const logo = document.querySelector(".navbar-brand img");

    if (window.pageYOffset > sticky) {
      ud_header.classList.add("sticky");
    } else {
      ud_header.classList.remove("sticky");
    }

    // === logo change
    if (ud_header.classList.contains("sticky")) {
      logo.src = "assets/images/logo/logo.webp";
    } else {
      logo.src = "assets/images/logo/logo.webp";
    }

    // show or hide the back-top-top button
    const backToTop = document.querySelector(".back-to-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  };

  //===== close navbar-collapse when a  clicked
  let navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");

  document.querySelectorAll(".ud-menu-scroll").forEach((e) =>
    e.addEventListener("click", () => {
      navbarToggler.classList.remove("active");
      navbarCollapse.classList.remove("show");
    })
  );
  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("active");
    navbarCollapse.classList.toggle("show");
  });

  // ===== submenu
  const submenuButton = document.querySelectorAll(".nav-item-has-children");
  submenuButton.forEach((elem) => {
    elem.querySelector("a").addEventListener("click", () => {
      elem.querySelector(".ud-submenu").classList.toggle("show");
    });
  });

  // ===== wow js
  new WOW().init();

  // ====== scroll top js
  function scrollTo(element, to = 0, duration = 500) {
    const start = element.scrollTop;
    const change = to - start;
    const increment = 20;
    let currentTime = 0;

    const animateScroll = () => {
      currentTime += increment;

      const val = Math.easeInOutQuad(currentTime, start, change, duration);

      element.scrollTop = val;

      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  document.querySelector(".back-to-top").onclick = () => {
    scrollTo(document.documentElement);
  };

// ====== Load Testimonials from JSON and init Swiper ======
    async function loadTestimonials() {
        try {
            const res = await fetch("assets/data/testimonials.json");
            const all = await res.json();

            // Shuffle and select 10
            const selected = all.sort(() => 0.5 - Math.random()).slice(0, 10);

            const wrapper = document.querySelector("#testimonials .swiper-wrapper");
            wrapper.innerHTML = "";

            selected.forEach(t => {
                const slide = document.createElement("div");
                slide.className = "swiper-slide";
                slide.innerHTML = `
        <div class="ud-single-testimonial">
          <div class="ud-testimonial-ratings">
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
            <i class="lni lni-star-filled"></i>
          </div>
          <div class="ud-testimonial-content">
            <p>“${t.text}”</p>
          </div>
          <div class="ud-testimonial-info">
            <div class="ud-testimonial-image">
              <img src="${t.image}" alt="${t.name}" />
            </div>
            <div class="ud-testimonial-meta">
              <h4>${t.name}</h4>
              <p>${t.role}</p>
            </div>
          </div>
        </div>`;
                wrapper.appendChild(slide);
            });

            new Swiper(".ud-testimonials-swiper", {
                loop: true,
                // loopedSlides must be bigger than cart number of slides
                loopedSlides:11,
                speed: 4000,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                },
                slidesPerView: 1,
                spaceBetween: 20,
                grabCursor: true,
                centeredSlides: false,
                breakpoints: {
                    768: { slidesPerView: 2, spaceBetween: 24 },
                    1200: { slidesPerView: 3, spaceBetween: 30 },
                },
                pagination: false,
                navigation: false,
            });


        } catch (err) {
            console.error("Testimonials yüklenemedi:", err);
        }
    }

    loadTestimonials();
})();

// === Hero Section Animation Trigger ===
window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const heroContent = document.querySelector(".ud-hero-content");
        if (heroContent) {
            heroContent.classList.add("show-all");
        }
    }, 6400); // 6.4 seconds after final scene come up
});

// === App Preview Popup with Swiper ===
document.addEventListener("DOMContentLoaded", () => {
    const trigger = document.getElementById("preview-trigger");
    const popup = document.getElementById("screen-popup");
    const closeBtn = document.getElementById("close-popup");
    let swiperInstance = null;

    if (!trigger || !popup || !closeBtn) return;

    trigger.addEventListener("click", () => {
        popup.style.display = "flex";
        document.body.style.overflow = "hidden";

        // Swiper yalnızca bir kez oluşturulsun
        if (!swiperInstance) {
            swiperInstance = new Swiper(".popup-swiper", {
                loop: true,
                slidesPerView: 1,
                centeredSlides: true,   // centeralize image
                spaceBetween: 0,        // prevent space bias
                speed: 400,
                watchSlidesProgress: true,
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
            });
        }
    });

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
        document.body.style.overflow = "auto";
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });
});

// === Lazy Load for Promo Video ===
document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("promoVideo");
    if (!video) return; // Video elementi yoksa çık

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.load();
                    observer.unobserve(video);
                }
            });
        });
        observer.observe(video);
    } else {
        video.load();
    }
});

// === TikTok scroll fix ===
// Tiktok embed iframe scroll problem fix we must do that else tiktok will see like scrolling bar
window.addEventListener("load", () => {
    // 1. Embed script'in yüklenmesini bekle
    const fixTikTokScroll = () => {
        const tiktokFrame = document.querySelector(".tiktok-embed iframe");
        if (tiktokFrame) {
            tiktokFrame.setAttribute("scrolling", "no"); // ✅ Scroll tamamen kapatılır
            tiktokFrame.style.overflow = "hidden";
            tiktokFrame.style.height = "100%";
            tiktokFrame.style.maxHeight = "100%";
            tiktokFrame.style.border = "none";
        } else {
            // If not iframe exist yet
            setTimeout(fixTikTokScroll, 500);
        }
    };

    // Try Again
    setTimeout(fixTikTokScroll, 1200);
    setTimeout(fixTikTokScroll, 2500);
    setTimeout(fixTikTokScroll, 4000);
});

// Instagram loading problem solver
window.addEventListener("load", () => {
    // Render it
    if (window.instgrm && window.instgrm.Embeds) {
        setTimeout(() => {
            window.instgrm.Embeds.process();
        }, 1000);
    }
});


