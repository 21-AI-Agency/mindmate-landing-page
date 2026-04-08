/**
 * Shared header/footer layout renderer for secondary pages
 * (legal, utility). The landing page has its own template engine;
 * this file is a slim, standalone version that only renders the
 * nav and footer from window.PRODUCT_CONFIG.
 *
 * Expects:
 *   <header class="site-header" id="header">
 *     <nav class="nav-container">
 *       <a href="/" class="nav-logo" id="navLogo" aria-label="Home"></a>
 *       <ul class="nav-links" id="navLinks"></ul>
 *       <div class="nav-actions" id="navActions"></div>
 *       <button type="button" class="hamburger" id="menuToggle">
 *         <span></span><span></span><span></span>
 *       </button>
 *     </nav>
 *     <div class="mobile-menu" id="mobileMenu">
 *       <ul id="mobileNavLinks"></ul>
 *       <div class="mobile-menu-actions" id="mobileNavActions"></div>
 *     </div>
 *   </header>
 *   <footer class="site-footer">
 *     <div class="container">
 *       <div class="footer-grid" id="footerGrid"></div>
 *       <div class="footer-bottom" id="footerBottom"></div>
 *     </div>
 *   </footer>
 */
(function () {
  var C = window.PRODUCT_CONFIG;
  if (!C) return;

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s == null ? '' : s;
    return d.innerHTML;
  }

  // Apply theme colors (mirrors index.html inline script)
  if (C.theme) {
    var r = document.documentElement.style;
    if (C.theme.accentColor) r.setProperty('--color-accent-green', C.theme.accentColor);
    if (C.theme.lightBlue) r.setProperty('--color-light-blue', C.theme.lightBlue);
    if (C.theme.bgColor) r.setProperty('--color-bg', C.theme.bgColor);
    if (C.theme.textColor) r.setProperty('--color-text', C.theme.textColor);
    if (C.theme.textMuted) r.setProperty('--color-text-muted', C.theme.textMuted);
    if (C.theme.secondary) r.setProperty('--color-secondary', C.theme.secondary);
    if (C.theme.ctaBg) r.setProperty('--color-cta-bg', C.theme.ctaBg);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta && C.theme.themeColor) meta.content = C.theme.themeColor;
  }

  var defaultLang = (C.langSwitch && C.langSwitch.default) || 'tr';
  var currentLang = defaultLang;
  if (C.langSwitch && C.langSwitch.storageKey) {
    var saved = localStorage.getItem(C.langSwitch.storageKey);
    if (saved) currentLang = saved;
  }
  document.documentElement.lang = currentLang;
  document.documentElement.setAttribute('data-lang', currentLang);

  function t(section, key) {
    if (currentLang === defaultLang || !C.translations || !C.translations[currentLang]) return undefined;
    var tr = C.translations[currentLang];
    if (!tr[section]) return undefined;
    if (key !== undefined) return tr[section][key];
    return tr[section];
  }

  // Convert in-page anchors (#features) to absolute landing links (/#features)
  // so secondary pages navigate back to the landing page.
  function resolveHref(href) {
    if (!href) return '#';
    if (href.indexOf('#') === 0) return '/' + href;
    return href;
  }

  function render() {
    var brandName = t('name') !== undefined ? t('name') : C.name;

    // ── DOCUMENT TITLE ────────────────────────────
    // Pages may declare per-language titles via
    // <html data-title-tr="..." data-title-en="...">
    var htmlEl = document.documentElement;
    var titleAttr = htmlEl.getAttribute('data-title-' + currentLang);
    if (titleAttr) document.title = titleAttr;

    // ── NAV ───────────────────────────────────────
    var navLogo = document.getElementById('navLogo');
    if (navLogo) {
      navLogo.setAttribute('href', '/');
      navLogo.innerHTML = C.logoSvg + '<span>' + esc(brandName) + '</span>';
    }

    var navItems = t('navLinks') || C.navLinks || [];
    var navLinksHtml = '';
    navItems.forEach(function (link) {
      navLinksHtml += '<li><a href="' + resolveHref(link.href) + '">' + esc(link.label) + '</a></li>';
    });
    var navLinksEl = document.getElementById('navLinks');
    if (navLinksEl) navLinksEl.innerHTML = navLinksHtml;
    var mobileNavLinksEl = document.getElementById('mobileNavLinks');
    if (mobileNavLinksEl) mobileNavLinksEl.innerHTML = navLinksHtml;

    var navActionsEl = document.getElementById('navActions');
    var mobileNavActionsEl = document.getElementById('mobileNavActions');
    if (C.langSwitch && navActionsEl) {
      var langHtml = '<div class="lang-switch" role="group" aria-label="Language selector">';
      C.langSwitch.options.forEach(function (opt) {
        var active = opt.code === currentLang ? ' is-active' : '';
        langHtml += '<button type="button" class="lang-btn' + active + '" data-lang="' + opt.code + '" aria-pressed="' + (active ? 'true' : 'false') + '">' + opt.flag + '</button>';
      });
      langHtml += '</div>';
      navActionsEl.innerHTML = langHtml;
      if (mobileNavActionsEl) {
        mobileNavActionsEl.innerHTML = langHtml.replace('lang-switch', 'lang-switch lang-switch--mobile');
      }
    } else if (navActionsEl && C.navCta) {
      navActionsEl.innerHTML =
        '<a href="' + resolveHref(C.navCta.loginHref) + '" class="btn btn-sm btn-outline">' + esc(C.navCta.loginLabel) + '</a>' +
        '<a href="' + resolveHref(C.navCta.primaryHref) + '" class="btn btn-sm btn-primary">' + esc(C.navCta.primaryLabel) + '</a>';
      if (mobileNavActionsEl) {
        mobileNavActionsEl.innerHTML =
          '<a href="' + resolveHref(C.navCta.loginHref) + '" class="btn btn-outline">' + esc(C.navCta.loginLabel) + '</a>' +
          '<a href="' + resolveHref(C.navCta.primaryHref) + '" class="btn btn-primary">' + esc(C.navCta.primaryLabel) + '</a>';
      }
    }

    // ── FOOTER ────────────────────────────────────
    var trFooter = t('footer') || {};
    var trMetaDesc = (t('meta') && t('meta').description) || C.description;
    var footerHtml = '<div class="footer-brand"><a href="/" class="nav-logo">' + C.logoSvg + '<span>' + esc(brandName) + '</span></a><p>' + esc(trMetaDesc) + '</p></div>';

    var footerCols = trFooter.columns || (C.footer && C.footer.columns) || [];
    var supportText = trFooter.supportText || (C.footer && C.footer.supportText) || '';
    footerCols.forEach(function (col) {
      footerHtml += '<div class="footer-col"><h4>' + esc(col.title) + '</h4><ul>';
      (col.links || []).forEach(function (link) {
        footerHtml += '<li><a href="' + resolveHref(link.href) + '">' + esc(link.label) + '</a></li>';
      });
      footerHtml += '</ul>';
      if (supportText && (col.title === 'Support' || col.title === 'Destek')) {
        footerHtml += '<p class="footer-support">' + esc(supportText) + '</p>';
      }
      footerHtml += '</div>';
    });

    if (C.footer && C.footer.appStore && C.footer.appStore.show) {
      var appStoreTitle = (trFooter.appStore && trFooter.appStore.title) || (currentLang === 'tr' ? 'Uygulamayı İndir' : 'Get the App');
      footerHtml += '<div class="footer-col"><h4>' + esc(appStoreTitle) + '</h4><div class="store-buttons">' +
        '<a href="' + C.footer.appStore.googlePlayHref + '" class="store-btn">' +
          '<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3.5 1.275a1 1 0 0 0-.5.866v15.718a1 1 0 0 0 .5.866l.062.036L12.063 10 3.562 1.24l-.062.035z" fill="#4285F4"/><path d="M15.4 6.955L12.063 10l3.337 3.045 3.77-2.143a1 1 0 0 0 0-1.804L15.4 6.955z" fill="#FBBC04"/><path d="M3.5 18.859a1 1 0 0 0 .5-.134l.062-.036L15.4 13.045 12.063 10 3.5 18.859z" fill="#EA4335"/><path d="M3.5 1.141a1 1 0 0 1 .5.134l.062.036L15.4 6.955 12.063 10 3.5 1.141z" fill="#34A853"/></svg>' +
          '<div><small>' + (currentLang === 'tr' ? 'Şimdi indir' : 'Get it on') + '</small><strong>Google Play</strong></div></a>' +
        '<a href="' + C.footer.appStore.appStoreHref + '" class="store-btn">' +
          '<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M14.94 10.55c-.02-2.12 1.73-3.14 1.81-3.19-1-1.45-2.54-1.65-3.08-1.67-1.3-.14-2.56.78-3.23.78-.68 0-1.71-.76-2.82-.74-1.44.02-2.78.85-3.52 2.15-1.51 2.62-.39 6.49 1.07 8.62.72 1.04 1.57 2.2 2.68 2.16 1.08-.04 1.49-.7 2.8-.7 1.3 0 1.67.7 2.8.67 1.16-.02 1.89-1.05 2.59-2.1.83-1.2 1.17-2.37 1.18-2.43-.03-.01-2.27-.87-2.28-3.45zM12.82 3.88c.58-.72.98-1.7.87-2.7-.84.04-1.88.58-2.49 1.28-.54.63-1.02 1.65-.9 2.62.95.07 1.92-.48 2.52-1.2z"/></svg>' +
          '<div><small>' + (currentLang === 'tr' ? 'Şimdi indir' : 'Download on the') + '</small><strong>App Store</strong></div></a>' +
        '</div></div>';
    }

    var footerGridEl = document.getElementById('footerGrid');
    if (footerGridEl) footerGridEl.innerHTML = footerHtml;

    var rightsText = currentLang === 'tr' ? 'Tüm hakları saklıdır.' : 'All rights reserved.';
    var copyrightName = C.copyrightName || C.name;
    var bottomHtml = '<div class="footer-legal-row"><p>&copy; ' + esc(C.year) + ' ' + esc(copyrightName) + '. ' + rightsText + '</p><div class="footer-links">';
    var footerLegal = trFooter.legal || (C.footer && C.footer.legal) || [];
    footerLegal.forEach(function (l) {
      bottomHtml += '<a href="' + l.href + '">' + esc(l.label) + '</a>';
    });
    bottomHtml += '</div></div>';
    var footerBottomEl = document.getElementById('footerBottom');
    if (footerBottomEl) footerBottomEl.innerHTML = bottomHtml;
  }

  render();

  // ── Mobile menu toggle ────────────────────────
  var toggleBtn = document.getElementById('menuToggle');
  var mobileMenu = document.getElementById('mobileMenu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', function () {
      toggleBtn.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleBtn.classList.remove('active');
        mobileMenu.classList.remove('open');
      });
    });
  }

  // ── Header scroll effect ──────────────────────
  var headerEl = document.getElementById('header');
  if (headerEl) {
    window.addEventListener('scroll', function () {
      headerEl.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ── Language switch ───────────────────────────
  function bindLang() {
    if (!C.langSwitch) return;
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var lang = this.getAttribute('data-lang');
        if (lang === currentLang) return;
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.setAttribute('data-lang', lang);
        if (C.langSwitch.storageKey) {
          localStorage.setItem(C.langSwitch.storageKey, lang);
        }
        render();
        bindLang();
        // Let pages translate their own content via a custom event
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang: lang } }));
      });
    });
  }
  bindLang();
})();
