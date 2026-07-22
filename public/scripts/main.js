// ---- Page Loader ----
window.addEventListener('load', function() {
  var loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(function() { loader.classList.add('loaded'); }, 2500);
  }
});

// ---- Cart System ----
var WHATSAPP_NUMBER = '51919599132';
var cart = [];

function addToCart(name, price) {
  var existing = cart.find(function(item) { return item.name === name; });
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: name, price: price, qty: 1 });
  }
  updateCartBadge();
  showAddedToast(name);
}

function updateCartBadge() {
  var total = cart.reduce(function(sum, item) { return sum + item.qty; }, 0);
  var badge = document.getElementById('cart-badge');
  if (badge) badge.textContent = total;
}

function showAddedToast(name) {
  var toast = document.getElementById('toast');
  if (!toast) return;
  toast.querySelector('span').textContent = name + ' agregada al pedido';
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');
  setTimeout(function() {
    toast.classList.add('translate-y-20', 'opacity-0');
    toast.classList.remove('translate-y-0', 'opacity-100');
  }, 2200);
}

function sendToWhatsApp() {
  if (cart.length === 0) {
    alert('Agrega productos al carrito primero.');
    return;
  }
  var total = 0;
  var lines = ['*Pedido ERICK — Resumen de compra*', ''];
  cart.forEach(function(item, i) {
    var subtotal = item.price * item.qty;
    total += subtotal;
    lines.push((i + 1) + '. ' + item.name + '  x' + item.qty + '  →  S/ ' + subtotal.toFixed(2));
  });
  lines.push('');
  lines.push('*TOTAL: S/ ' + total.toFixed(2) + '*');
  lines.push('');
  lines.push('¡Hola! Me gustaría realizar este pedido. ¿Podemos coordinar?');

  var msg = encodeURIComponent(lines.join('\n'));
  window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + msg, '_blank');
}

// ---- Mobile Menu ----
var menuToggle = document.getElementById('menu-toggle');
var menuClose = document.getElementById('menu-close');
var mobileMenu = document.getElementById('mobile-menu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', function() { mobileMenu.classList.add('open'); });
}
if (menuClose && mobileMenu) {
  menuClose.addEventListener('click', function() { mobileMenu.classList.remove('open'); });
}

function closeMobileMenu() {
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// ---- Sort Dropdown ----
var sortToggle = document.getElementById('sort-toggle');
var sortDropdown = document.getElementById('sort-dropdown');

if (sortToggle && sortDropdown) {
  sortToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    sortDropdown.classList.toggle('open');
  });

  document.addEventListener('click', function() {
    sortDropdown.classList.remove('open');
  });
}

function setSortText(text) {
  if (!sortToggle) return;
  sortToggle.childNodes[0].textContent = text + ' ';
  if (sortDropdown) sortDropdown.classList.remove('open');
}

// ---- Floating Offer Close ----
var closeOffer = document.getElementById('close-offer');
var floatingOffer = document.getElementById('floating-offer');

if (closeOffer && floatingOffer) {
  closeOffer.addEventListener('click', function() {
    floatingOffer.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    floatingOffer.style.opacity = '0';
    floatingOffer.style.transform = 'translateY(-50%) translateX(20px)';
    setTimeout(function() { floatingOffer.style.display = 'none'; }, 300);
  });
}

// ---- Product Filters ----
var filterBtns = document.querySelectorAll('.filter-btn');
var products = document.querySelectorAll('.product-card');
var productCount = document.getElementById('product-count');

filterBtns.forEach(function(btn) {
  btn.addEventListener('click', function() {
    filterBtns.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');

    var filter = btn.getAttribute('data-filter');
    var count = 0;

    products.forEach(function(product) {
      var category = product.getAttribute('data-category');
      if (filter === 'todos' || category === filter) {
        product.style.display = '';
        count++;
      } else {
        product.style.display = 'none';
      }
    });

    if (productCount) productCount.textContent = count;
  });
});

// ---- Form Submit ----
function handleFormSubmit(e) {
  e.preventDefault();
  var successMsg = document.getElementById('form-success');
  if (successMsg) {
    successMsg.classList.remove('hidden');
    e.target.reset();
    setTimeout(function() { successMsg.classList.add('hidden'); }, 5000);
  }
}

// ---- Fade-in on Scroll ----
var fadeElements = document.querySelectorAll('.fade-in');
var fadeObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(function(el) { fadeObserver.observe(el); });

// ---- Smooth Scroll ----
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});