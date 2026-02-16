// === Quick link scroll: tek değişken – başlığın görünmesi için (px)
const SCROLL_OFFSET_TOP = 90;
const SCROLL_OFFSET_PREVIEW = 80; // Sadece Preview (#app-preview) için
const SCROLL_OFFSET_TESTIMONIALS = 20; // Sadece Testimonials (#testimonials) için
const SCROLL_OFFSET_PRICING = 20; // Sadece Pricing (#pricing) için
window.SCROLL_OFFSET_TOP = SCROLL_OFFSET_TOP;
window.SCROLL_OFFSET_PREVIEW = SCROLL_OFFSET_PREVIEW;
window.SCROLL_OFFSET_TESTIMONIALS = SCROLL_OFFSET_TESTIMONIALS;
window.SCROLL_OFFSET_PRICING = SCROLL_OFFSET_PRICING;
document.documentElement.style.setProperty("--scroll-margin-top", SCROLL_OFFSET_TOP + "px");
document.documentElement.style.setProperty("--scroll-margin-top-preview", SCROLL_OFFSET_PREVIEW + "px");
document.documentElement.style.setProperty("--scroll-margin-top-testimonials", SCROLL_OFFSET_TESTIMONIALS + "px");
document.documentElement.style.setProperty("--scroll-margin-top-pricing", SCROLL_OFFSET_PRICING + "px");

document.addEventListener("DOMContentLoaded", () => {
  bindLanguageToggle();
  fetch("assets/data/site.json?v=" + Date.now(), { cache: "no-store" })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Site data load failed: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      applySiteData(data || {});
      window.dispatchEvent(new CustomEvent("site-data-applied"));
    })
    .catch((err) => {
      console.error("Site data load failed:", err);
    });
});

function applySiteData(data) {
  applySeo(data.seo || {}, data.brand || {});
  applyBrand(data.brand || {});
  applyNav(data.nav || []);
  applyHero(data.hero || {});
  applyFeatures(data.features || {});
  applyStats(data.stats || {});
  applyBrandStrip(data.brandStrip || {});
  applyAppPreview(data.appPreview || {});
  applySocialGallery(data.socialGallery || {}, data.footer || {});
  applyTestimonials(data.testimonials || {});
  applyPricing(data.pricing || {});
  applyFaq(data.faq || {});
  applyContact(data.contact || {});
  applyDownloadCta(data.downloadCta || {});
  applyFooter(data.footer || {});
}

function applySeo(seo, brand) {
  if (seo.title) {
    document.title = seo.title;
  }

  setMeta('meta[name="title"]', seo.title);
  setMeta('meta[name="description"]', seo.description);
  setMeta('meta[name="keywords"]', seo.keywords);
  setMeta('meta[name="author"]', seo.author || brand.name);
  setMeta('meta[property="og:title"]', seo.ogTitle || seo.title);
  setMeta('meta[property="og:description"]', seo.ogDescription || seo.description);
  setMeta('meta[property="og:image"]', seo.ogImage);
  setMeta('meta[property="og:url"]', seo.ogUrl || seo.canonical);
  setMeta('meta[property="twitter:title"]', seo.twitterTitle || seo.title);
  setMeta(
    'meta[property="twitter:description"]',
    seo.twitterDescription || seo.description
  );
  setMeta('meta[property="twitter:image"]', seo.twitterImage || seo.ogImage);
  setMeta('meta[name="theme-color"]', seo.themeColor);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical && seo.canonical) {
    canonical.setAttribute("href", seo.canonical);
  }
}

function applyBrand(brand) {
  if (!brand) return;
  const logos = document.querySelectorAll('[data-site="brand-logo"]');
  logos.forEach((logo) => {
    if (brand.logo) {
      logo.setAttribute("src", brand.logo);
    }
    if (brand.logoAlt) {
      logo.setAttribute("alt", brand.logoAlt);
    }
  });
  setText('[data-site="brand-name"]', brand.name);
}

function applyNav(navItems) {
  const nav = document.getElementById("nav");
  if (!nav || !Array.isArray(navItems) || navItems.length === 0) return;
  nav.innerHTML = navItems
    .map((item) => {
      const label = item.label || "";
      const href = item.href || "#";
      return `<li class="nav-item"><a class="ud-menu-scroll" href="${href}">${label}</a></li>`;
    })
    .join("");
  bindNavHandlers();
}

function applyHero(hero) {
  setText('[data-site="hero-kicker"]', hero.kicker);
  setText('[data-site="hero-title"]', hero.headline);
  setText('[data-site="hero-desc"]', hero.subhead);

  const actionsContainer = document.querySelector(
    '[data-site-list="hero-actions"]'
  );
  if (actionsContainer) {
    const actions = Array.isArray(hero.actions) ? hero.actions : [];
    const badges = Array.isArray(hero.badges) ? hero.badges : [];
    const list = actions.length > 0 ? actions : badges;

    actionsContainer.innerHTML = list
      .map((action) => {
        if (action.type === "badge") {
          return renderBadgeAction(action);
        }
        if (action.image) {
          return renderBadgeAction({
            image: action.image,
            alt: action.alt || action.label,
            href: action.href,
          });
        }
        return renderTextAction(action);
      })
      .join("");
  }

  const powerwords = document.querySelector(
    '[data-site-list="hero-powerwords"]'
  );
  if (powerwords && Array.isArray(hero.powerwords)) {
    powerwords.innerHTML = hero.powerwords
      .map((word, index) => {
        const item = `<span class="pw-item pw-${index + 1}">${word}</span>`;
        const separator =
          index < hero.powerwords.length - 1
            ? '<span class="pw-separator">•</span>'
            : "";
        return `${item}${separator}`;
      })
      .join("");
  }

  const heroMedia = document.querySelector('[data-site="hero-media-image"]');
  if (heroMedia && hero.media) {
    if (hero.media.image) {
      heroMedia.setAttribute("src", hero.media.image);
    }
    if (hero.media.alt) {
      heroMedia.setAttribute("alt", hero.media.alt);
    }
  }

  const mediaCards = document.querySelector(
    '[data-site-list="hero-media-cards"]'
  );
  if (mediaCards && Array.isArray(hero.mediaCards)) {
    mediaCards.innerHTML = hero.mediaCards
      .map(
        (card) => `
        <div class="ud-hero-card">
          <span class="ud-hero-card-label">${card.label || ""}</span>
          <strong class="ud-hero-card-value">${card.value || ""}</strong>
        </div>
      `
      )
      .join("");
  }
}

function renderTextAction(action) {
  const label = action.label || "Learn More";
  const href = action.href || "#";
  const className = action.className || "ud-main-btn ud-white-btn";
  const target = action.target ? ` target="${action.target}"` : "";
  const rel = action.rel ? ` rel="${action.rel}"` : "";
  return `<li><a href="${href}" class="${className}"${target}${rel}>${label}</a></li>`;
}

function renderBadgeAction(action) {
  const href = action.href || "#";
  const alt = action.alt || "Download";
  const image = action.image || "";
  const target = action.target ? ` target="${action.target}"` : "";
  const rel = action.rel ? ` rel="${action.rel}"` : "";
  return `<li><a href="${href}" class="store-badge"${target}${rel}><img src="${image}" alt="${alt}" width="120" height="40" loading="lazy" /></a></li>`;
}

function bindNavHandlers() {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  const offset = window.SCROLL_OFFSET_TOP;
  document.querySelectorAll(".ud-menu-scroll").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        event.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const sectionOffset = (h) => {
            if (!h || !h.startsWith("#")) return offset;
            const id = h.slice(1).toLowerCase();
            if (id === "app-preview") return window.SCROLL_OFFSET_PREVIEW ?? 40;
            if (id === "testimonials") return window.SCROLL_OFFSET_TESTIMONIALS ?? 60;
            if (id === "pricing") return window.SCROLL_OFFSET_PRICING ?? 20;
            return offset;
          };
          const useOffset = sectionOffset(href);
          const top = target.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop) - useOffset;
          window.scrollTo({ top: top, behavior: "smooth" });
        }
      }
      if (navbarToggler && navbarCollapse) {
        navbarToggler.classList.remove("active");
        navbarCollapse.classList.remove("show");
      }
    });
  });
}

function applyFeatures(features) {
  setText('[data-site="features-title"]', features.title);
  setText('[data-site="features-desc"]', features.description);

  const container = document.querySelector('[data-site-list="features"]');
  const items = Array.isArray(features.items) ? features.items : [];
  if (!container || items.length === 0) return;
  container.innerHTML = items
    .map((feature, index) => {
      const delay = 0.1 + index * 0.05;
      return `
        <div class="col-xl-4 col-lg-4 col-sm-6">
          <div class="ud-single-feature wow fadeInUp" data-wow-delay=".${Math.round(
            delay * 100
          )}s">
            <div class="ud-feature-icon">
              <i class="${feature.icon || "lni lni-star"}"></i>
            </div>
            <div class="ud-feature-content">
              <h3 class="ud-feature-title">${feature.title || ""}</h3>
              <p class="ud-feature-desc">${feature.text || ""}</p>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

function applyStats(stats) {
  setText('[data-site="stats-title"]', stats.title);
  setText('[data-site="stats-desc"]', stats.description);
  setText('[data-site="stats-note"]', stats.note);
  const container = document.querySelector('[data-site-list="stats"]');
  if (!container || !Array.isArray(stats.items) || stats.items.length === 0) {
    return;
  }
  container.innerHTML = stats.items
    .map((item, index) => {
      const delay = 0.1 + index * 0.05;
      return `
        <div class="col-lg-4 col-md-6 col-sm-10">
          <div class="ud-stat-card wow fadeInUp" data-wow-delay=".${Math.round(
            delay * 100
          )}s">
            <div class="ud-stat-value">${item.value || ""}</div>
            <div class="ud-stat-label">${item.label || ""}</div>
          </div>
        </div>
      `;
    })
    .join("");
}

function applyBrandStrip(brandStrip) {
  setText('[data-site="brand-strip-label"]', brandStrip.label);
  const container = document.querySelector('[data-site-list="brand-logos"]');
  if (!container || !Array.isArray(brandStrip.logos)) return;
  container.innerHTML = brandStrip.logos
    .map(
      (logo) =>
        `<img src="${logo.src || ""}" alt="${logo.alt || "Brand"}" loading="lazy" />`
    )
    .join("");
}

function applyAppPreview(appPreview) {
  const preview = document.querySelector('[data-site="app-preview-image"]');
  if (preview) {
    if (appPreview.mainImage) preview.setAttribute("src", appPreview.mainImage);
    if (appPreview.mainAlt) preview.setAttribute("alt", appPreview.mainAlt);
  }

  const slideContainer = document.querySelector(
    '[data-site-list="app-preview-slides"]'
  );
  if (
    slideContainer &&
    Array.isArray(appPreview.slides) &&
    appPreview.slides.length > 0
  ) {
    slideContainer.innerHTML = appPreview.slides
      .map(
        (slide) => `
        <div class="swiper-slide">
          <img loading="lazy" src="${slide.src || ""}" alt="${
          slide.alt || "Preview"
        }" class="popup-img" width="400" height="800" decoding="async" />
        </div>
      `
      )
      .join("");
  }
}

function platformNameFromIcon(icon) {
  if (!icon) return "Social";
  const s = String(icon).toLowerCase();
  if (s.includes("youtube")) return "YouTube";
  if (s.includes("instagram")) return "Instagram";
  if (s.includes("tiktok")) return "TikTok";
  if (s.includes("facebook")) return "Facebook";
  if (s.includes("twitter")) return "Twitter";
  return "Social";
}

function applySocialGallery(gallery, footer) {
  setText('[data-site="social-gallery-title"]', gallery.title);
  setText('[data-site="social-gallery-desc"]', gallery.description || "Follow for more content.");
  const container = document.querySelector(
    '[data-site-list="social-gallery-items"]'
  );
  if (!container) return;

  const links = Array.isArray(footer.socialLinks) ? footer.socialLinks : [];
  container.innerHTML = links
    .map(
      (item) => {
        const name = platformNameFromIcon(item.icon);
        const href = item.href || "#";
        return `
          <div class="social-item social-item--link">
            <span class="social-item-platform">${name}</span>
            <a href="${href}" target="_blank" rel="noopener noreferrer" class="social-item-follow">Follow for more content</a>
          </div>
        `;
      }
    )
    .join("");
}

function applyTestimonials(testimonials) {
  setText('[data-site="testimonials-title"]', testimonials.title);
  setText('[data-site="testimonials-desc"]', testimonials.description);

  const featured = testimonials.featured || {};
  setText('[data-site="testimonial-highlight-text"]', featured.text);
  setText('[data-site="testimonial-highlight-name"]', featured.name);
  setText('[data-site="testimonial-highlight-role"]', featured.role);
}

function applyPricing(pricing) {
  setText('[data-site="pricing-title"]', pricing.title);
  setText('[data-site="pricing-desc"]', pricing.description);
  const container = document.querySelector('[data-site-list="pricing-plans"]');
  if (!container || !Array.isArray(pricing.plans)) return;

  container.innerHTML = pricing.plans
    .map((plan, index) => {
      const isPopular = Boolean(plan.popular);
      const delay = 0.1 + index * 0.05;
      const tag = isPopular
        ? '<span class="ud-popular-tag">POPULAR</span>'
        : "";
      const buttonClass = isPopular ? "ud-main-btn ud-white-btn" : "ud-main-btn ud-border-btn";
      const features = Array.isArray(plan.features)
        ? plan.features.map((item) => `<li>${item}</li>`).join("")
        : "";
      const cta = plan.cta || {};
      const isFirst = index === 0;
      const isLast = index === pricing.plans.length - 1;
      const itemClass = [isPopular ? "active" : "", isFirst ? "first-item" : "", isLast ? "last-item" : ""].filter(Boolean).join(" ");

      return `
        <div class="col-lg-4 col-md-6 col-sm-10">
          <div class="ud-single-pricing ${itemClass} wow fadeInUp" data-wow-delay=".${Math.round(delay * 100)}s">
            ${tag}
            <div class="ud-pricing-header">
              <h3>${plan.name || ""}</h3>
              <h4>${plan.price || ""}</h4>
            </div>
            <div class="ud-pricing-body">
              <ul>${features}</ul>
            </div>
            <div class="ud-pricing-footer">
              <a href="${cta.href || "#"}" class="${buttonClass}">
                ${cta.label || "Get Started"}
              </a>
            </div>
          </div>
        </div>
      `;
    })
    .join("");
}

function applyFaq(faq) {
  setText('[data-site="faq-title"]', faq.title);
  setText('[data-site="faq-desc"]', faq.description);

  const leftCol = document.querySelector('[data-site="faq-col-left"]');
  const rightCol = document.querySelector('[data-site="faq-col-right"]');
  if (
    !leftCol ||
    !rightCol ||
    !Array.isArray(faq.items) ||
    faq.items.length === 0
  ) {
    return;
  }

  const midpoint = Math.ceil(faq.items.length / 2);
  const leftItems = faq.items.slice(0, midpoint);
  const rightItems = faq.items.slice(midpoint);

  leftCol.innerHTML = leftItems.map((item, index) => renderFaqItem(item, index)).join("");
  rightCol.innerHTML = rightItems
    .map((item, index) => renderFaqItem(item, index + midpoint))
    .join("");
}

function renderFaqItem(item, index) {
  const collapseId = `collapse-${index + 1}`;
  const delay = 0.1 + index * 0.05;
  return `
    <div class="ud-single-faq wow fadeInUp" data-wow-delay=".${Math.round(
      delay * 100
    )}s">
      <div class="accordion">
        <button
          class="ud-faq-btn collapsed"
          data-bs-toggle="collapse"
          data-bs-target="#${collapseId}"
        >
          <span class="icon flex-shrink-0">
            <i class="lni lni-chevron-down"></i>
          </span>
          <span>${item.question || ""}</span>
        </button>
        <div id="${collapseId}" class="accordion-collapse collapse">
          <div class="ud-faq-body">
            ${item.answer || ""}
          </div>
        </div>
      </div>
    </div>
  `;
}

function applyContact(contact) {
  setText('[data-site="contact-title"]', contact.title);
  setText('[data-site="contact-desc"]', contact.description);
  setText('[data-site="contact-address-label"]', contact.addressLabel);
  setText('[data-site="contact-address"]', contact.address);
  setText('[data-site="contact-email-label"]', contact.emailLabel);

  const emailsContainer = document.querySelector('[data-site="contact-emails"]');
  if (emailsContainer && Array.isArray(contact.emails)) {
    emailsContainer.innerHTML = contact.emails
      .map((email) => `<p>${email}</p>`)
      .join("");
  }

  setText('[data-site="contact-form-title"]', contact.form?.title);
  setText('[data-site="contact-submit-label"]', contact.form?.submitLabel);

  const form = document.querySelector('[data-site="contact-form"]');
  if (form && contact.form?.action) {
    form.setAttribute("action", contact.form.action);
  }
  setAttr('[data-site="contact-form-next"]', "value", contact.form?.next);
  setAttr('[data-site="contact-form-error"]', "value", contact.form?.error);
  setAttr('[data-site="contact-form-subject"]', "value", contact.form?.subject);
}

function applyDownloadCta(downloadCta) {
  setText('[data-site="download-title"]', downloadCta.title);
  setText('[data-site="download-desc"]', downloadCta.description);
  const container = document.querySelector('[data-site-list="download-badges"]');
  if (!container || !Array.isArray(downloadCta.badges)) return;
  container.innerHTML = downloadCta.badges
    .map(
      (badge) =>
        `<a href="${badge.href || "#"}" class="store-badge"><img src="${
          badge.image || ""
        }" alt="${badge.alt || "Download"}" width="140" height="46" loading="lazy" /></a>`
    )
    .join("");

  const trust = document.querySelector('[data-site-list="download-trust"]');
  if (trust && Array.isArray(downloadCta.trustItems)) {
    trust.innerHTML = downloadCta.trustItems
      .map(
        (item) => `
        <div class="ud-download-trust-item">
          <span class="ud-download-trust-value">${item.value || ""}</span>
          <span class="ud-download-trust-label">${item.label || ""}</span>
        </div>
      `
      )
      .join("");
  }
}

function bindLanguageToggle() {
  const buttons = document.querySelectorAll(".ud-lang-btn");
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((el) => {
        el.classList.remove("is-active");
        el.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-pressed", "true");
      const lang = btn.getAttribute("data-lang") || "en";
      document.documentElement.setAttribute("data-lang", lang);
    });
  });
}

function applyFooter(footer) {
  setText('[data-site="footer-desc"]', footer.description);
  setText('[data-site="footer-quick-title"]', footer.quickTitle);
  setText('[data-site="footer-social-title"]', footer.socialTitle);
  setText('[data-site="footer-legal-title"]', footer.legalTitle);
  setText('[data-site="footer-emergency-title"]', footer.emergencyTitle);
  setHtml('[data-site="footer-emergency-text"]', footer.emergencyText);
  setText('[data-site="footer-bottom-text"]', footer.bottomText);

  const quickLinks = document.querySelector(
    '[data-site-list="footer-quick-links"]'
  );
  if (quickLinks && Array.isArray(footer.quickLinks)) {
    quickLinks.innerHTML = footer.quickLinks
      .map((link) => `<li><a href="${link.href || "#"}">${link.label || ""}</a></li>`)
      .join("");
  }

  const socialLinks = document.querySelector(
    '[data-site-list="footer-social-links"]'
  );
  if (socialLinks && Array.isArray(footer.socialLinks)) {
    socialLinks.innerHTML = footer.socialLinks
      .map(
        (link) => `
        <li>
          <a href="${link.href || "#"}" target="_blank" rel="noopener">
            <i class="${link.icon || "lni lni-link"}"></i>
          </a>
        </li>
      `
      )
      .join("");
  }

  const legalLinks = document.querySelector(
    '[data-site-list="footer-legal-links"]'
  );
  if (legalLinks && Array.isArray(footer.legalLinks)) {
    legalLinks.innerHTML = footer.legalLinks
      .map((link) => `<li><a href="${link.href || "#"}">${link.label || ""}</a></li>`)
      .join("");
  }
}

function setText(selector, value) {
  if (!value) return;
  const el = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (el) {
    el.textContent = value;
  }
}

function setHtml(selector, value) {
  if (!value) return;
  const el = typeof selector === "string" ? document.querySelector(selector) : selector;
  if (el) {
    el.innerHTML = value;
  }
}

function setAttr(selector, attr, value) {
  if (!value) return;
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute(attr, value);
  }
}

function setMeta(selector, value) {
  if (!value) return;
  const el = document.querySelector(selector);
  if (el) {
    el.setAttribute("content", value);
  }
}
