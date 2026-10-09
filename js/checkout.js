/* ==========================================================================
   BIODUN STYLE GRID (BSG) - CHECKOUT CONTROLLER
   Manages shipping validation, order summary calculations, and Paystack trigger
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  renderCheckoutSummary();
  prefillCheckoutUser();

  const checkoutForm = document.getElementById('bsgCheckoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  }
});

function prefillCheckoutUser() {
  const user = getCurrentUser();
  if (user) {
    const nameInput = document.getElementById('checkoutName');
    const emailInput = document.getElementById('checkoutEmail');
    const phoneInput = document.getElementById('checkoutPhone');

    if (nameInput && !nameInput.value) nameInput.value = user.name;
    if (emailInput && !emailInput.value) emailInput.value = user.email;
    if (phoneInput && !phoneInput.value) phoneInput.value = user.phone || '';
  }
}

function renderCheckoutSummary() {
  const cart = getCart();
  const container = document.getElementById('checkoutSummaryItems');
  if (!container) return;

  if (cart.length === 0) {
    window.location.href = 'shop.html';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
      <div class="d-flex align-items-center gap-3">
        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 62px; object-fit: cover;" class="rounded">
        <div>
          <h6 class="mb-0 font-heading" style="font-size: 0.9rem;">${item.name}</h6>
          <small class="text-muted">Size: <strong>${item.size}</strong> | Color: <strong>${item.colour}</strong> | Qty: ${item.qty}</small>
        </div>
      </div>
      <div class="fw-bold">₦${(item.price * item.qty).toLocaleString()}</div>
    </div>
  `).join('');

  const totals = calculateCartTotals();
  const subtotalEl = document.getElementById('summarySubtotal');
  const deliveryEl = document.getElementById('summaryDelivery');
  const totalEl = document.getElementById('summaryTotal');

  if (subtotalEl) subtotalEl.textContent = `₦${totals.subtotal.toLocaleString()}`;
  if (deliveryEl) deliveryEl.textContent = `₦${totals.delivery.toLocaleString()}`;
  if (totalEl) totalEl.textContent = `₦${totals.total.toLocaleString()}`;
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const cart = getCart();
  if (cart.length === 0) {
    showBsgToast("Your cart is empty!", "danger");
    return;
  }

  const name = document.getElementById('checkoutName').value.trim();
  const email = document.getElementById('checkoutEmail').value.trim();
  const phone = document.getElementById('checkoutPhone').value.trim();
  const address = document.getElementById('checkoutAddress').value.trim();
  const city = document.getElementById('checkoutCity').value.trim();
  const state = document.getElementById('checkoutState').value;

  if (!name || !email || !phone || !address || !city || !state) {
    showBsgToast("Please complete all required delivery details.", "danger");
    return;
  }

  const totals = calculateCartTotals();
  const customerInfo = {
    name,
    email,
    phone,
    address: `${address}, ${city}, ${state}`,
    notes: document.getElementById('checkoutNotes')?.value || ''
  };

  // Trigger Paystack Payment
  payWithPaystack({
    email: email,
    amount: totals.total,
    customer: customerInfo,
    items: cart,
    subtotal: totals.subtotal,
    delivery: totals.delivery
  });
}
