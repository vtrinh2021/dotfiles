/* VAÉ Confidante — global behavior.
   Everything here enhances a working no-JS baseline. */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Mobile menu */
  document.querySelectorAll('[data-menu-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var header = btn.closest('.site-header');
      var open = header.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  /* Hero video: play only when motion is welcome; poster remains the fallback */
  document.querySelectorAll('[data-hero-video]').forEach(function (video) {
    function sync() {
      if (reducedMotion.matches) {
        video.pause();
        video.removeAttribute('autoplay');
      } else {
        var p = video.play();
        if (p && p.catch) p.catch(function () {});
      }
    }
    sync();
    reducedMotion.addEventListener('change', sync);
  });

  /* Whisper reveals — content is fully visible without JS or with reduced motion */
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px' }
    );
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* Product form: resolve option selections to a variant */
  document.querySelectorAll('[data-product-form]').forEach(function (root) {
    var dataEl = root.querySelector('[data-variants]');
    if (!dataEl) return;
    var variants = JSON.parse(dataEl.textContent);
    var idInput = root.querySelector('input[name="id"]');
    var priceEl = root.querySelector('[data-price]');
    var compareEl = root.querySelector('[data-compare-price]');
    var button = root.querySelector('[data-add-button]');
    var money = function (cents) {
      var format = root.getAttribute('data-money-format') || '${{amount}}';
      var amount = (cents / 100).toFixed(2);
      return format.replace(/\{\{\s*amount\s*\}\}/, amount);
    };

    function currentOptions() {
      var opts = [];
      root.querySelectorAll('fieldset[data-option-index]').forEach(function (fs) {
        var checked = fs.querySelector('input:checked');
        opts[parseInt(fs.getAttribute('data-option-index'), 10)] = checked ? checked.value : null;
      });
      return opts;
    }

    function sync() {
      var opts = currentOptions();
      var match = variants.find(function (v) {
        return v.options.every(function (value, i) {
          return opts[i] === null || opts[i] === value;
        });
      });
      if (!match) {
        if (button) {
          button.disabled = true;
          button.textContent = button.getAttribute('data-text-unavailable') || 'Unavailable';
        }
        return;
      }
      idInput.value = match.id;
      if (priceEl) priceEl.textContent = money(match.price);
      if (compareEl) {
        if (match.compare_at_price && match.compare_at_price > match.price) {
          compareEl.textContent = money(match.compare_at_price);
          compareEl.hidden = false;
        } else {
          compareEl.hidden = true;
        }
      }
      if (button) {
        if (match.available) {
          button.disabled = false;
          button.textContent = button.getAttribute('data-text-add') || 'Add to cart';
        } else {
          button.disabled = true;
          button.textContent = button.getAttribute('data-text-soldout') || 'Sold out';
        }
      }
    }

    root.querySelectorAll('fieldset[data-option-index] input').forEach(function (input) {
      input.addEventListener('change', sync);
    });
    sync();
  });

  /* Product gallery thumbnails */
  document.querySelectorAll('[data-gallery]').forEach(function (gallery) {
    var main = gallery.querySelector('[data-gallery-main] img');
    gallery.querySelectorAll('[data-gallery-thumb]').forEach(function (thumb) {
      thumb.addEventListener('click', function () {
        main.src = thumb.getAttribute('data-src');
        main.srcset = thumb.getAttribute('data-srcset') || '';
        main.alt = thumb.querySelector('img') ? thumb.querySelector('img').alt : '';
        gallery.querySelectorAll('[data-gallery-thumb]').forEach(function (t) {
          t.setAttribute('aria-current', t === thumb ? 'true' : 'false');
        });
      });
    });
  });

  /* Cart: submit the update form when a quantity changes */
  document.querySelectorAll('[data-cart-form] input[name="updates[]"]').forEach(function (input) {
    input.addEventListener('change', function () {
      input.closest('form').submit();
    });
  });

  /* Collection sort */
  document.querySelectorAll('[data-sort-select]').forEach(function (select) {
    select.addEventListener('change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', select.value);
      window.location.href = url.toString();
    });
  });
})();
