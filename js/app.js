/* ==========================================================================
   BIODUN STYLE GRID (BSG) - MAIN APPLICATION LOGIC
   Handles page product renders, wishlist management, search, and interactions
   ========================================================================== */

function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem('bsg_wishlist')) || [];
  } catch (e) {
    return [];
  }
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);

  if (index > -1) {
    wishlist.splice(index, 1);
    showBsgToast("Item removed from wishlist.", "info");
  } else {
    wishlist.push(productId);
    showBsgToast("Item saved to wishlist.", "success");
  }

  localStorage.setItem('bsg_wishlist', JSON.stringify(wishlist));
  updateWishlistIcons();
}

function updateWishlistIcons() {
  const wishlist = getWishlist();
  document.querySelectorAll('.btn-wishlist').forEach(btn => {
    const pId = parseInt(btn.dataset.id);
    if (wishlist.includes(pId)) {
      btn.innerHTML = `<i class="bi bi-heart-fill text-danger"></i>`;
    } else {
      btn.innerHTML = `<i class="bi bi-heart"></i>`;
    }
  });
}

/**
 * Render Product Card HTML
 */
function createProductCardHtml(product) {
  const wishlist = getWishlist();
  const isWishlisted = wishlist.includes(product.id);

  return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="bsg-product-card h-100 d-flex flex-column bg-white border rounded overflow-hidden shadow-sm">
        <div class="bsg-product-img-wrapper position-relative overflow-hidden">
          ${product.discount ? `<span class="badge-bsg-discount">${product.discount}</span>` : ''}
          ${product.isNew ? `<span class="badge-bsg-new">NEW</span>` : `
            <button class="btn btn-sm bg-white rounded-circle position-absolute top-0 end-0 m-2 shadow-sm btn-wishlist z-2" 
                    data-id="${product.id}" onclick="toggleWishlist(${product.id})" title="Add to Wishlist">
              <i class="bi ${isWishlisted ? 'bi-heart-fill text-danger' : 'bi-heart'}"></i>
            </button>
          `}
          <a href="product.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}" class="bsg-product-img w-100" style="height: 380px; object-fit: cover;" loading="lazy">
          </a>
        </div>
        <div class="bsg-card-body p-3 d-flex flex-column flex-grow-1">
          <div class="text-muted small mb-1 font-heading text-uppercase tracking-wider">${product.category}</div>
          <h5 class="bsg-product-title font-heading mb-2 fs-6">
            <a href="product.html?id=${product.id}" class="text-dark">${product.name}</a>
          </h5>
          <p class="text-muted small mb-3 flex-grow-1 line-clamp-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 2.6rem;">
            ${product.description || 'Authentic Nigerian men\'s native wear, crafted with precision.'}
          </p>
          <div class="d-flex align-items-center justify-content-between pt-2 border-top mt-auto">
            <div>
              <span class="bsg-product-price fw-bold text-bsg-burgundy fs-6">₦${Number(product.price).toLocaleString()}</span>
              ${product.oldPrice ? `<span class="bsg-product-old-price text-muted text-decoration-line-through small ms-1" style="font-size: 0.8rem;">₦${Number(product.oldPrice).toLocaleString()}</span>` : ''}
            </div>
            <a href="product.html?id=${product.id}" class="btn btn-bsg-primary btn-sm px-3 py-2">View Details</a>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Initialize Full-Page Scroll-Triggered Observer
 */
function initBsgScrollObserver() {
  const animatedElements = document.querySelectorAll('.bsg-scroll-item');
  if (!animatedElements.length) return;

  if (!('IntersectionObserver' in window)) {
    animatedElements.forEach(el => el.classList.add('bsg-in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('bsg-in-view');
      } else {
        entry.target.classList.remove('bsg-in-view');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  updateWishlistIcons();
  initBsgScrollObserver();
});
