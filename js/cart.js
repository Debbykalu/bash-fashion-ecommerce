/* ==========================================================================
   BIODUN STYLE GRID (BSG) - CART MANAGEMENT ENGINE
   LocalStorage persistence for cart items, size validation, subtotals, quantity adjustments
   ========================================================================== */

const DELIVERY_FEE = 5000; // Flat ₦5,000 delivery fee for Nigeria

function getCart() {
  try {
    return JSON.parse(localStorage.getItem('bsg_cart')) || [];
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('bsg_cart', JSON.stringify(cart));
  updateCartBadge();
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count-badge').forEach(badge => {
    badge.textContent = totalItems;
    badge.style.display = 'inline-block';
  });
}

/**
 * Add Product to Cart with Mandatory Size Validation
 */
function addToCart(productId, selectedSize, selectedColour, qty = 1) {
  if (!selectedSize) {
    showBsgToast("Please select a size.", "danger");
    return false;
  }

  const product = getProductById(productId);
  if (!product) return false;

  const colour = selectedColour || product.colour;
  const cart = getCart();
  const quantity = parseInt(qty) || 1;

  // Check if item with same ID, size, and colour already exists
  const existingIndex = cart.findIndex(item => item.id === product.id && item.size === selectedSize && item.colour === colour);

  if (existingIndex > -1) {
    cart[existingIndex].qty += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      colour: colour,
      qty: quantity
    });
  }

  saveCart(cart);
  showBsgToast(`${product.name} (Size: ${selectedSize}, Qty: ${quantity}) added to your cart.`, "success");
  return true;
}

function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    const item = cart[index];
    cart.splice(index, 1);
    saveCart(cart);
    showBsgToast(`Removed ${item.name} from cart`, "info");
  }
}

function updateCartQty(index, newQty) {
  const cart = getCart();
  const qtyNum = parseInt(newQty);
  
  if (index >= 0 && index < cart.length) {
    if (qtyNum <= 0) {
      removeFromCart(index);
    } else {
      cart[index].qty = qtyNum;
      saveCart(cart);
    }
  }

  // Auto re-render cart page if on cart.html
  if (typeof renderCartPage === 'function') {
    renderCartPage();
  }
}

function clearCart() {
  localStorage.removeItem('bsg_cart');
  updateCartBadge();
}

function calculateCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const delivery = cart.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  return { subtotal, delivery, total };
}

/**
 * Bootstrap Toast Helper
 */
function showBsgToast(message, type = "success") {
  let container = document.getElementById('bsgToastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'bsgToastContainer';
    container.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    container.style.zIndex = '1090';
    document.body.appendChild(container);
  }

  const toastId = 'toast_' + Date.now();
  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center text-white bg-bsg-black border-0" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body font-heading" style="font-size: 0.9rem;">
          <i class="bi ${type === 'danger' ? 'bi-exclamation-circle-fill text-danger' : 'bi-check-circle-fill text-bsg-gold'} me-2"></i>
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('beforeend', toastHtml);
  const toastEl = document.getElementById(toastId);
  if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
    const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
    toast.show();
  } else {
    toastEl.classList.add('show');
    setTimeout(() => toastEl.remove(), 3500);
  }
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
