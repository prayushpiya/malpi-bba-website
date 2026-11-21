/* ==========================================================================
   MALPI INTERNATIONAL COLLEGE — main.js
   --------------------------------------------------------------------------
   Vanilla JS, no dependencies. Everything here is progressive enhancement:
   with JavaScript disabled the pages still render, navigate and read correctly.

   MODULES
     1. Mobile navigation drawer
     2. Mobile submenu toggles
     3. Sticky header shadow
     4. Back-to-top button
     5. Click-to-load video facades
     6. Contact / enquiry form validation (front-end only)
     7. Even card heights
     8. Carousel (scholarships, endless)
     9. Footer year
   ========================================================================== */
(function () {
  'use strict';

  var DESKTOP = 1024; // must match the breakpoint in style.css §22

  /* ------------------------------------------------------------------
     1. MOBILE NAVIGATION DRAWER
     ------------------------------------------------------------------ */
  function initMobileNav() {
    var toggle = document.querySelector('.nav-toggle');
    var nav    = document.getElementById('primary-nav');
    var scrim  = document.querySelector('.nav-scrim');
    var closeBtn = document.querySelector('.primary-nav__close');
    if (!toggle || !nav) return;

    var lastFocused = null;

    function openNav() {
      lastFocused = document.activeElement;
      nav.classList.add('is-open');
      if (scrim) scrim.classList.add('is-open');
      document.body.classList.add('nav-open');
      toggle.setAttribute('aria-expanded', 'true');
      // Move focus into the drawer so keyboard users land in the right place.
      // The stylesheet flips the drawer to visible with no delay on open, so it
      // is focusable straight away; the rAF is a fallback for slower recalcs.
      var first = closeBtn || nav.querySelector('a, button');
      if (first) {
        first.focus();
        if (document.activeElement !== first) {
          window.requestAnimationFrame(function () { first.focus(); });
        }
      }
      document.addEventListener('keydown', onKeydown);
    }

    function closeNav() {
      nav.classList.remove('is-open');
      if (scrim) scrim.classList.remove('is-open');
      document.body.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      document.removeEventListener('keydown', onKeydown);
      if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    function onKeydown(e) {
      if (e.key === 'Escape') { closeNav(); return; }
      if (e.key !== 'Tab') return;
      // Trap focus inside the open drawer
      var items = nav.querySelectorAll('a[href], button:not([disabled])');
      if (!items.length) return;
      var first = items[0];
      var last  = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    toggle.addEventListener('click', function () {
      if (nav.classList.contains('is-open')) closeNav(); else openNav();
    });
    if (scrim) scrim.addEventListener('click', closeNav);
    if (closeBtn) closeBtn.addEventListener('click', closeNav);

    // Any link tap inside the drawer navigates, so close it
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a') && window.innerWidth < DESKTOP) closeNav();
    });

    // Reset state if the viewport grows past the desktop breakpoint
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth >= DESKTOP && nav.classList.contains('is-open')) closeNav();
      }, 150);
    });
  }

  /* ------------------------------------------------------------------
     2. MOBILE SUBMENU TOGGLES
     On desktop the submenus open on hover/focus via CSS. Below 1024px the
     parent item becomes a real button that expands its submenu.
     ------------------------------------------------------------------ */
  function initSubmenus() {
    var parents = document.querySelectorAll('.primary-nav__item--has-children');

    Array.prototype.forEach.call(parents, function (item) {
      var btn = item.querySelector('.primary-nav__link');
      var sub = item.querySelector('.primary-nav__submenu');
      if (!btn || !sub) return;

      btn.addEventListener('click', function (e) {
        if (window.innerWidth >= DESKTOP) return; // desktop uses CSS hover
        e.preventDefault();
        var isOpen = sub.classList.contains('is-open');

        // close sibling submenus so only one is open at a time
        Array.prototype.forEach.call(parents, function (other) {
          if (other === item) return;
          var oSub = other.querySelector('.primary-nav__submenu');
          var oBtn = other.querySelector('.primary-nav__link');
          if (oSub) oSub.classList.remove('is-open');
          if (oBtn) oBtn.setAttribute('aria-expanded', 'false');
        });

        sub.classList.toggle('is-open', !isOpen);
        btn.setAttribute('aria-expanded', String(!isOpen));
      });
    });
  }

  /* ------------------------------------------------------------------
     3. STICKY HEADER SHADOW
     ------------------------------------------------------------------ */
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    var ticking = false;

    function update() {
      header.classList.toggle('is-stuck', window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ------------------------------------------------------------------
     4. BACK-TO-TOP
     ------------------------------------------------------------------ */
  function initBackToTop() {
    var btn = document.querySelector('.to-top');
    if (!btn) return;
    var ticking = false;

    function update() {
      btn.classList.toggle('is-visible', window.scrollY > 600);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });

    btn.addEventListener('click', function () {
      var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    });
    update();
  }

  /* ------------------------------------------------------------------
     5. CLICK-TO-LOAD VIDEO FACADES
     The YouTube iframe is only injected once the visitor clicks play, so no
     third-party script loads on page arrival.
     ------------------------------------------------------------------ */
  function initVideoFacades() {
    var cards = document.querySelectorAll('.video-card[data-video-id]');

    Array.prototype.forEach.call(cards, function (card) {
      card.addEventListener('click', function () {
        var id = card.getAttribute('data-video-id');
        if (!id || card.dataset.loaded === 'true') return;

        var iframe = document.createElement('iframe');
        iframe.setAttribute('src',
          'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0');
        iframe.setAttribute('title', card.getAttribute('data-video-title') || 'Student video');
        iframe.setAttribute('allow',
          'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        iframe.setAttribute('loading', 'lazy');

        card.innerHTML = '';
        card.appendChild(iframe);
        card.dataset.loaded = 'true';
      });
    });
  }

  /* ------------------------------------------------------------------
     6. FORM VALIDATION
     Front-end only — see README. Errors are written next to the field they
     belong to, and the first invalid field receives focus.
     ------------------------------------------------------------------ */
  function initForms() {
    var forms = document.querySelectorAll('form[data-validate]');

    Array.prototype.forEach.call(forms, function (form) {
      var status = form.querySelector('.form__status');

      function fieldGroup(field) { return field.closest('.form__group'); }

      function showError(field, message) {
        var group = fieldGroup(field);
        if (!group) return;
        group.classList.add('has-error');
        var el = group.querySelector('.form__error');
        if (el) el.textContent = message;
        field.setAttribute('aria-invalid', 'true');
      }

      function clearError(field) {
        var group = fieldGroup(field);
        if (!group) return;
        group.classList.remove('has-error');
        field.removeAttribute('aria-invalid');
      }

      function validateField(field) {
        var value = (field.value || '').trim();
        var label = field.dataset.label || 'This field';

        if (field.hasAttribute('required')) {
          if (field.type === 'checkbox' && !field.checked) {
            showError(field, 'Please tick this box to continue.'); return false;
          }
          if (field.type !== 'checkbox' && !value) {
            showError(field, label + ' is required.'); return false;
          }
        }
        if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
          showError(field, 'Enter a valid email address, for example name@example.com.'); return false;
        }
        if (field.type === 'tel' && value && !/^[0-9+\-()\s]{7,20}$/.test(value)) {
          showError(field, 'Enter a valid phone number.'); return false;
        }
        clearError(field);
        return true;
      }

      // Validate on blur, and clear the error as soon as the visitor corrects it
      var fields = form.querySelectorAll('.form__control, input[type="checkbox"][required]');
      Array.prototype.forEach.call(fields, function (field) {
        field.addEventListener('blur', function () { validateField(field); });
        field.addEventListener('input', function () {
          if (fieldGroup(field) && fieldGroup(field).classList.contains('has-error')) validateField(field);
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault(); // no backend on the static build — see README
        var valid = true;
        var firstInvalid = null;

        Array.prototype.forEach.call(fields, function (field) {
          if (!validateField(field)) {
            valid = false;
            if (!firstInvalid) firstInvalid = field;
          }
        });

        if (!valid) {
          if (firstInvalid) firstInvalid.focus();
          return;
        }

        if (status) {
          status.textContent = form.dataset.successMessage ||
            'Thank you. Your message has been received and our admissions team will be in touch shortly.';
          status.classList.add('is-visible');
          status.setAttribute('tabindex', '-1');
          status.focus();
        }
        form.reset();
      });
    });
  }

  /* ------------------------------------------------------------------
     7. EVEN CARD HEIGHTS
     Flexbox makes cards equal within a flex line but not between wrapped
     lines, so a 3 + 3 grid ends up with two different row heights. This
     levels every card in a row to the tallest one.

     Progressive enhancement only: the CSS line reserves already get cards
     close, and with JavaScript off the layout is still correct, just not
     pixel-level even. Measurements and writes are batched to avoid layout
     thrash. In the WordPress build, use Elementor's own Equal Height option
     on the container instead of shipping this.
     ------------------------------------------------------------------ */
  function initEvenCards() {
    var SELECTOR = '.icon-box, .card, .person, .callout';
    var rows = document.querySelectorAll('.row');
    if (!rows.length) return;

    function equalise() {
      var groups = [];

      // pass 1: clear any previous value so cards report their natural height
      Array.prototype.forEach.call(rows, function (row) {
        var cards = [];
        Array.prototype.forEach.call(row.children, function (col) {
          var card = col.querySelector(':scope > ' + SELECTOR);
          if (card) cards.push(card);
        });
        if (cards.length > 1) {
          cards.forEach(function (c) { c.style.minHeight = ''; });
          groups.push(cards);
        }
      });

      // pass 2: measure everything, then write — never interleaved
      var measured = groups.map(function (cards) {
        var tallest = 0;
        cards.forEach(function (c) {
          var h = c.getBoundingClientRect().height;
          if (h > tallest) tallest = h;
        });
        return tallest;
      });

      groups.forEach(function (cards, i) {
        // single column: nothing to level against
        if (cards[0].getBoundingClientRect().width >= cards[0].parentElement.parentElement.getBoundingClientRect().width - 1) return;
        cards.forEach(function (c) { c.style.minHeight = Math.ceil(measured[i]) + 'px'; });
      });
    }

    var resizeTimer;
    function schedule() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(equalise, 120);
    }

    equalise();
    window.addEventListener('resize', schedule);
    window.addEventListener('load', equalise);
    // web fonts change line counts, so re-level once they have swapped in
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(equalise);
    // images settle the height of person cards
    Array.prototype.forEach.call(document.images, function (img) {
      if (!img.complete) img.addEventListener('load', schedule, { once: true });
    });
  }

  /* ------------------------------------------------------------------
     8. CAROUSEL
     Progressive enhancement only. The track is a native horizontal scroller
     with CSS scroll-snap, so swiping, keyboard scrolling and the scrollbar
     all work with no script. This adds the arrows and dots on top and keeps
     them in sync with the scroll position.
     ------------------------------------------------------------------ */
  function initCarousels() {
    var carousels = document.querySelectorAll('[data-carousel]');

    Array.prototype.forEach.call(carousels, function (root) {
      var track = root.querySelector('.carousel__track');
      var prev  = root.querySelector('[data-carousel-prev]');
      var next  = root.querySelector('[data-carousel-next]');
      var dots  = root.querySelectorAll('.carousel__dot');
      if (!track) return;

      var originals = Array.prototype.slice.call(track.children);
      var count = originals.length;
      if (count < 2) return;

      var loop = root.hasAttribute('data-carousel-loop');

      /* For an endless carousel, place a copy of the whole set either side of
         the real one. The visitor scrolls through real cards; when they drift
         into a copy we shift the scroll position back by exactly one set,
         which lands on identical content and so is invisible. */
      function markCopy(node) {
        node.setAttribute('aria-hidden', 'true');
        node.classList.add('is-clone');
        Array.prototype.forEach.call(node.querySelectorAll('a, button'), function (el) {
          el.setAttribute('tabindex', '-1');
        });
      }

      if (loop) {
        originals.forEach(function (n) { var c = n.cloneNode(true); markCopy(c); track.appendChild(c); });
        originals.slice().reverse().forEach(function (n) {
          var c = n.cloneNode(true); markCopy(c); track.insertBefore(c, track.firstChild);
        });
      }

      var items = track.children;

      function step() {
        var a = items[0].getBoundingClientRect();
        var b = items[1] ? items[1].getBoundingClientRect() : null;
        return b ? (b.left - a.left) : a.width;
      }
      function setWidth() { return step() * count; }
      function maxScroll() { return track.scrollWidth - track.clientWidth; }
      function behavior() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      }

      /* Silently re-centre without animating, so the jump is never seen. */
      var recentring = false;
      function recentre() {
        if (!loop || recentring) return;
        var w = setWidth();
        var x = track.scrollLeft;
        var shift = 0;
        if (x < w * 0.5) shift = w;
        else if (x > w * 1.5) shift = -w;
        if (!shift) return;
        recentring = true;
        var previous = track.style.scrollBehavior;
        track.style.scrollBehavior = 'auto';
        track.scrollLeft = x + shift;
        track.style.scrollBehavior = previous;
        recentring = false;
      }

      function update() {
        var s = step();
        var index;
        if (loop) {
          index = Math.round((track.scrollLeft - setWidth()) / s);
          index = ((index % count) + count) % count;
        } else {
          index = Math.round(track.scrollLeft / s);
          if (track.scrollLeft >= maxScroll() - 2) index = count - 1;
          if (prev) prev.disabled = track.scrollLeft <= 2;
          if (next) next.disabled = track.scrollLeft >= maxScroll() - 2;
        }
        Array.prototype.forEach.call(dots, function (dot, i) {
          dot.setAttribute('aria-current', i === index ? 'true' : 'false');
        });
      }

      /* Step to an absolute position rather than scrollBy, and remember the
         pending target. Without this, clicking the arrow again mid-animation
         adds to wherever the scroll happens to be at that instant, so quick
         clicks advance less than a full card each. Re-centring is left to the
         settle handler so it never fights an animation in flight. */
      var pending = null;
      function go(direction) {
        var s = step();
        var base = (pending === null) ? track.scrollLeft : pending;
        var target = (Math.round(base / s) + direction) * s;
        pending = target;
        track.scrollTo({ left: target, behavior: behavior() });
      }

      if (prev) prev.addEventListener('click', function () { go(-1); });
      if (next) next.addEventListener('click', function () { go(1); });

      Array.prototype.forEach.call(dots, function (dot, i) {
        dot.addEventListener('click', function () {
          var target = loop ? setWidth() + step() * i : Math.min(step() * i, maxScroll());
          pending = target;
          track.scrollTo({ left: target, behavior: behavior() });
        });
      });

      var ticking = false;
      track.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () { update(); ticking = false; });
      }, { passive: true });

      /* Re-centre once scrolling has settled, never mid-animation. */
      var settleTimer;
      track.addEventListener('scroll', function () {
        clearTimeout(settleTimer);
        settleTimer = setTimeout(function () {
          pending = null;
          recentre();
          update();
        }, 160);
      }, { passive: true });

      var resizeTimer;
      window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          if (loop) { track.style.scrollBehavior = 'auto'; track.scrollLeft = setWidth(); track.style.scrollBehavior = ''; }
          update();
        }, 150);
      });

      if (loop) {
        track.style.scrollBehavior = 'auto';
        track.scrollLeft = setWidth();
        track.style.scrollBehavior = '';
      }
      update();
    });
  }

  /* ------------------------------------------------------------------
     9. FOOTER YEAR
     ------------------------------------------------------------------ */
  function initYear() {
    var els = document.querySelectorAll('[data-current-year]');
    var year = String(new Date().getFullYear());
    Array.prototype.forEach.call(els, function (el) { el.textContent = year; });
  }

  /* ------------------------------------------------------------------
     BOOT
     ------------------------------------------------------------------ */
  function init() {
    initMobileNav();
    initSubmenus();
    initStickyHeader();
    initBackToTop();
    initVideoFacades();
    initForms();
    initEvenCards();
    initCarousels();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
