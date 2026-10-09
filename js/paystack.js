/* ==========================================================================
   BIODUN STYLE GRID (BSG) - PAYSTACK FRONTEND INTEGRATION
   Note: In a production environment, payment verification MUST be performed
   securely on a backend server via Paystack webhooks / verify API endpoints.
   For this frontend prototype, payment completion is verified via frontend callbacks.
   ========================================================================== */

// Placeholder Paystack Public Key for Test Mode
const PAYSTACK_SECRET_KEY = "sk_test_6e44980deb90556ba54e61222d2628513cd8dc2d";
const PAYSTACK_PUBLIC_KEY="pk_test_efd6a5864b7f5d89617872bd1e9352ae71ac7013"

/**
 * Triggers Paystack Inline Payment Checkout
 * @param {Object} orderDetails
 */
function payWithPaystack(orderDetails) {
  const reference = 'BSG-REF-' + Math.floor(Math.random() * 10000000);
  const amountInKobo = Math.round(orderDetails.amount * 100);

  // Check if official Paystack script is loaded in browser
  if (typeof PaystackPop !== 'undefined') {
    try {
      const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: orderDetails.email,
        amount: amountInKobo,
        currency: "NGN",
        ref: reference,
        metadata: {
          custom_fields: [
            { display_name: "Customer Name", variable_name: "customer_name", value: orderDetails.customer.name },
            { display_name: "Phone Number", variable_name: "phone", value: orderDetails.customer.phone },
            { display_name: "Delivery Address", variable_name: "address", value: orderDetails.customer.address }
          ]
        },
        callback: function(response) {
          console.log("Paystack Payment Successful. Reference:", response.reference);
          onPaystackSuccess(response.reference, orderDetails);
        },
        onClose: function() {
          showBsgToast("Payment window closed.", "danger");
        }
      });
      handler.openIframe();
      return;
    } catch (err) {
      console.warn("Paystack Inline initialization failed, launching prototype Paystack modal fallback:", err);
    }
  }

  // Fallback: Prototype Paystack Test Modal Simulator
  launchPaystackTestModal({
    reference: reference,
    amount: orderDetails.amount,
    email: orderDetails.email,
    customer: orderDetails.customer,
    onSuccess: (ref) => onPaystackSuccess(ref, orderDetails)
  });
}

function onPaystackSuccess(reference, orderDetails) {
  const orderRecord = {
    orderRef: reference,
    date: new Date().toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
    customer: orderDetails.customer,
    items: orderDetails.items,
    subtotal: orderDetails.subtotal,
    delivery: orderDetails.delivery,
    total: orderDetails.amount,
    paymentStatus: 'Paid via Paystack (Test Mode)',
    status: 'Order Confirmed - Preparing Tailoring'
  };

  // Save order to LocalStorage
  const orders = JSON.parse(localStorage.getItem('bsg_orders')) || [];
  orders.unshift(orderRecord);
  localStorage.setItem('bsg_orders', JSON.stringify(orders));
  localStorage.setItem('bsg_latest_order', JSON.stringify(orderRecord));

  // Clear cart
  clearCart();

  showBsgToast("Payment Verified Successfully!", "success");

  // Redirect to Order Confirmation page
  setTimeout(() => {
    window.location.href = `order-success.html?ref=${reference}`;
  }, 1000);
}

/**
 * Prototype Paystack Test Checkout Modal (Visual Fallback for Stakeholder Review)
 */
function launchPaystackTestModal(params) {
  const existingModal = document.getElementById('bsgPaystackSimModal');
  if (existingModal) existingModal.remove();

  const modalHtml = `
    <div class="modal fade show" id="bsgPaystackSimModal" tabindex="-1" style="display: block; background: rgba(0,0,0,0.75); z-index: 2000;">
      <div class="modal-dialog modal-dialog-centered" style="max-width: 420px;">
        <div class="modal-content border-0 shadow-lg" style="border-radius: 12px; overflow: hidden;">
          <div class="modal-header bg-bsg-black text-white p-3">
            <div class="d-flex align-items-center gap-2">
              <span class="badge bg-bsg-gold text-dark fw-bold">PAYSTACK TEST MODE</span>
              <h6 class="modal-title font-heading mb-0 text-white">Biodun Style Grid Checkout</h6>
            </div>
            <button type="button" class="btn-close btn-close-white" id="closePaystackModalBtn"></button>
          </div>
          
          <div class="modal-body p-4 text-center">
            <img src="assets/logo.svg" alt="BSG Logo" height="38" class="mb-3">
            <div class="display-6 font-heading fw-bold text-bsg-burgundy">₦${params.amount.toLocaleString()}</div>
            <p class="text-muted small mb-3">${params.email}</p>
            <div class="p-2 bg-light rounded font-monospace small mb-4">Ref: ${params.reference}</div>

            <div class="text-start bg-light p-3 rounded mb-4 small">
              <div class="d-flex justify-content-between mb-1">
                <span class="text-muted">Test Card:</span>
                <strong>4084 0000 0000 0000</strong>
              </div>
              <div class="d-flex justify-content-between">
                <span class="text-muted">Expiry / CVV:</span>
                <strong>04/28 • 408</strong>
              </div>
            </div>

            <button id="paystackSimConfirmBtn" class="btn btn-bsg-primary w-100 py-3 fw-bold">
              <i class="bi bi-shield-check me-1"></i> SIMULATE PAYSTACK SUCCESSFUL PAYMENT
            </button>
          </div>
          <div class="modal-footer bg-light py-2 justify-content-center">
            <small class="text-muted" style="font-size: 0.75rem;"><i class="bi bi-lock-fill text-success"></i> Secured by Paystack Payments Limited</small>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  document.getElementById('paystackSimConfirmBtn').addEventListener('click', function() {
    this.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span> Processing Verification...';
    this.disabled = true;
    setTimeout(() => {
      document.getElementById('bsgPaystackSimModal').remove();
      params.onSuccess(params.reference);
    }, 1200);
  });

  document.getElementById('closePaystackModalBtn').addEventListener('click', () => {
    document.getElementById('bsgPaystackSimModal').remove();
    showBsgToast("Payment cancelled.", "danger");
  });
}
